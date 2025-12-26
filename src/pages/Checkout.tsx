import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, MessageCircle } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { useCart } from '@/context/CartContext';
import { useCreateOrder } from '@/hooks/useOrders';
import { toast } from 'sonner';

// Owner's WhatsApp number (Lebanon - country code without +)
const OWNER_WHATSAPP = '9613044467';

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const { createOrder, isLoading: isSavingOrder } = useCreateOrder();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    cityCountry: '',
    notes: '',
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate WhatsApp message
  const generateWhatsAppMessage = () => {
    const itemsList = items
      .map(item => `• ${item.perfume.name} x${item.quantity} — $${item.perfume.price * item.quantity}`)
      .join('%0A');

    const message = 
      `New Order — Palace Perfumes%0A%0A` +
      `Name: ${encodeURIComponent(formData.name)}%0A` +
      `Phone: ${encodeURIComponent(formData.phone)}%0A` +
      `Address: ${encodeURIComponent(formData.address)}%0A` +
      `City/Country: ${encodeURIComponent(formData.cityCountry)}%0A%0A` +
      `Items:%0A${itemsList}%0A%0A` +
      `Total: $${total}` +
      `${formData.notes ? `%0ANotes: ${encodeURIComponent(formData.notes)}` : ''}`;

    return message;
  };

  const handleWhatsAppOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate form
    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim() || !formData.cityCountry.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Save order to database first
      const orderResult = await createOrder({
        customer_name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || undefined,
        address: formData.address.trim(),
        city_country: formData.cityCountry.trim(),
        notes: formData.notes.trim() || undefined,
        total_price: total,
        items: items.map(item => ({
          perfume_id: String(item.perfume.id),
          perfume_name: item.perfume.name,
          category: item.perfume.category,
          quantity: item.quantity,
          price: item.perfume.price * item.quantity,
        })),
      });

      if (!orderResult.success) {
        throw new Error('Failed to save order');
      }

      // Generate and open WhatsApp
      const message = generateWhatsAppMessage();
      window.open(`https://wa.me/${OWNER_WHATSAPP}?text=${message}`, '_blank');
      
      // Show success state
      setIsSuccess(true);
      clearCart();
      toast.success('Order saved successfully!');
    } catch (err) {
      console.error('Error processing order:', err);
      setError('Failed to process order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0 && !isSuccess) {
    return (
      <PageTransition>
        <main className="min-h-screen pt-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-4xl text-foreground mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">Add some fragrances to proceed to checkout.</p>
            <Link to="/" className="btn-luxury">
              Continue Shopping
            </Link>
          </div>
        </main>
      </PageTransition>
    );
  }

  return (
    <>
      <Helmet>
        <title>Checkout | Palace Perfumes</title>
        <meta name="description" content="Complete your order at Palace Perfumes." />
      </Helmet>
      <PageTransition>
        <main className="min-h-screen pt-24 pb-16">
          <div className="container mx-auto px-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-4 mb-12"
            >
              <Link
                to="/"
                className="p-2 text-foreground/50 hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-primary mb-1">Secure Checkout</p>
                <h1 className="font-display text-4xl text-foreground">Complete Your Order</h1>
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="max-w-2xl mx-auto text-center py-16"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="w-24 h-24 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center"
                  >
                    <CheckCircle className="w-12 h-12 text-primary" />
                  </motion.div>
                  <h2 className="font-display text-4xl text-foreground mb-4">
                    Order Ready
                  </h2>
                  <p className="text-foreground/60 text-lg leading-relaxed mb-4 max-w-md mx-auto">
                    Your order is ready in WhatsApp.
                  </p>
                  <motion.p 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-primary text-xl font-display mb-8"
                  >
                    Press Send to confirm.
                  </motion.p>
                  <div className="gold-divider w-24 mx-auto mb-8" />
                  <Link to="/" className="btn-luxury">
                    Continue Shopping
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid lg:grid-cols-2 gap-12"
                >
                  {/* Checkout Form */}
                  <div>
                    <h2 className="font-display text-2xl text-foreground mb-8">Delivery Details</h2>
                    <form onSubmit={handleWhatsAppOrder} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="input-luxury"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="phone" className="block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="input-luxury"
                            placeholder="+961 XX XXX XXX"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="input-luxury"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="address" className="block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
                          Delivery Address *
                        </label>
                        <input
                          type="text"
                          id="address"
                          required
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className="input-luxury"
                          placeholder="Street address"
                        />
                      </div>

                      <div>
                        <label htmlFor="cityCountry" className="block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
                          City / Country *
                        </label>
                        <input
                          type="text"
                          id="cityCountry"
                          required
                          value={formData.cityCountry}
                          onChange={(e) => setFormData({ ...formData, cityCountry: e.target.value })}
                          className="input-luxury"
                          placeholder="City, Country"
                        />
                      </div>

                      <div>
                        <label htmlFor="notes" className="block text-xs tracking-[0.2em] uppercase text-muted-foreground mb-3">
                          Order Notes (Optional)
                        </label>
                        <textarea
                          id="notes"
                          rows={3}
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          className="input-luxury resize-none"
                          placeholder="Any special requests or delivery instructions"
                        />
                      </div>

                      {error && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-destructive text-sm"
                        >
                          {error}
                        </motion.p>
                      )}

                      {/* WhatsApp Order Button - Luxury Styled */}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                        className="w-full py-5 px-8 text-sm tracking-[0.2em] uppercase font-medium transition-all duration-500 flex items-center justify-center gap-3 rounded-sm bg-velvet text-primary border border-primary/40 hover:border-primary hover:shadow-[0_0_30px_hsl(var(--gold)/0.25)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full"
                          />
                        ) : (
                          <>
                            <MessageCircle className="w-5 h-5" />
                            Order via WhatsApp
                          </>
                        )}
                      </motion.button>
                    </form>
                  </div>

                  {/* Order Summary */}
                  <div>
                    <h2 className="font-display text-2xl text-foreground mb-8">Order Summary</h2>
                    <div className="glass border border-primary/20 p-6">
                      <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                        {items.map((item) => (
                          <div key={item.perfume.id} className="flex gap-4 pb-4 border-b border-primary/10">
                            <div className="w-16 h-20 flex-shrink-0 overflow-hidden">
                              <img
                                src={item.perfume.imageUrl}
                                alt={item.perfume.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                                {item.perfume.brand}
                              </p>
                              <p className="font-display text-foreground">{item.perfume.name}</p>
                              <div className="flex justify-between mt-2">
                                <span className="text-sm text-muted-foreground">
                                  Qty: {item.quantity}
                                </span>
                                <span className="text-primary">
                                  ${item.perfume.price * item.quantity}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-3 pt-4 border-t border-primary/20">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span className="text-foreground">${total}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Shipping</span>
                          <span className="text-primary">Free</span>
                        </div>
                        <div className="flex justify-between pt-4 border-t border-primary/20">
                          <span className="font-display text-xl text-foreground">Total</span>
                          <span className="font-display text-2xl text-primary">${total}</span>
                        </div>
                      </div>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-8 flex justify-center gap-8 text-muted-foreground">
                      <div className="text-center">
                        <p className="text-xs tracking-[0.2em] uppercase">Secure</p>
                        <p className="text-[10px]">SSL Encrypted</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs tracking-[0.2em] uppercase">Authentic</p>
                        <p className="text-[10px]">100% Genuine</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs tracking-[0.2em] uppercase">Support</p>
                        <p className="text-[10px]">24/7 Service</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>
      </PageTransition>
    </>
  );
};

export default Checkout;
