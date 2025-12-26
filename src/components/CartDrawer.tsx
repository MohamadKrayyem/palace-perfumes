import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

const CartDrawer = () => {
  const { items, itemCount, subtotal, total, updateQuantity, removeFromCart, isCartOpen, setIsCartOpen } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-background/85 backdrop-blur-md"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-md glass flex flex-col"
            style={{
              borderLeft: '1px solid hsl(43 50% 55% / 0.2)',
              boxShadow: '-20px 0 60px hsl(0 0% 0% / 0.5), 0 0 40px hsl(43 50% 55% / 0.05)'
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-primary/20">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="font-display text-2xl text-foreground">Your Cart</h2>
                <span className="text-xs tracking-widest text-muted-foreground">({itemCount})</span>
              </div>
              <motion.button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-foreground/50 hover:text-primary transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <ShoppingBag className="w-16 h-16 text-primary/20 mx-auto mb-6" />
                  <p className="text-muted-foreground tracking-wide mb-8">Your cart is empty</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="btn-luxury"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {items.map((item, i) => (
                    <motion.div
                      key={item.perfume.id}
                      layout
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="flex gap-4 pb-6 border-b border-primary/10"
                    >
                      {/* Image */}
                      <div className="w-20 h-24 flex-shrink-0 overflow-hidden border border-primary/10">
                        <img
                          src={item.perfume.imageUrl}
                          alt={item.perfume.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] tracking-[0.25em] uppercase text-muted-foreground mb-1">
                          {item.perfume.brand}
                        </p>
                        <h3 className="font-display text-lg text-foreground truncate mb-2">
                          {item.perfume.name}
                        </h3>
                        <p className="font-display text-lg text-primary">
                          ${item.perfume.price}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 mt-3">
                          <motion.button
                            onClick={() => updateQuantity(item.perfume.id, item.quantity - 1)}
                            className="w-8 h-8 border border-primary/30 hover:border-primary flex items-center justify-center text-foreground/70 hover:text-primary transition-all duration-300"
                            whileTap={{ scale: 0.9 }}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </motion.button>
                          <span className="text-sm text-foreground w-6 text-center font-display">
                            {item.quantity}
                          </span>
                          <motion.button
                            onClick={() => updateQuantity(item.perfume.id, item.quantity + 1)}
                            className="w-8 h-8 border border-primary/30 hover:border-primary flex items-center justify-center text-foreground/70 hover:text-primary transition-all duration-300"
                            whileTap={{ scale: 0.9 }}
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </motion.button>
                          <motion.button
                            onClick={() => removeFromCart(item.perfume.id)}
                            className="ml-auto p-2 text-muted-foreground hover:text-destructive transition-colors duration-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 border-t border-primary/20 space-y-4"
                style={{
                  background: 'linear-gradient(to top, hsl(20 15% 4%) 0%, transparent 100%)'
                }}
              >
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground tracking-widest uppercase text-xs">Subtotal</span>
                  <span className="text-foreground font-display">${subtotal}</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="font-display text-xl text-foreground">Total</span>
                  <span className="font-display text-3xl text-primary">${total}</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="btn-luxury-filled w-full text-center block"
                >
                  Checkout
                </Link>
              </motion.div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;