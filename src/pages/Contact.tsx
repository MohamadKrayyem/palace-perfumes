import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { MapPin, Phone, Mail, CheckCircle, Sparkles } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import Footer from '@/components/Footer';
import GoldDust from '@/components/GoldDust';
import { useSendContactMessage } from '@/hooks/useContactMessages';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const { sendMessage, isLoading: isSubmitting } = useSendContactMessage();
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate form
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    const result = await sendMessage({
      name: formData.name.trim(),
      email: formData.email.trim(),
      message: formData.message.trim(),
    });

    if (result.success) {
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } else {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Palace Perfumes</title>
        <meta name="description" content="Get in touch with Palace Perfumes. We're here to help with your luxury fragrance inquiries." />
      </Helmet>
      <PageTransition>
        <main className="min-h-screen pt-24 relative">
          {/* Ambient dots background */}
          <div className="ambient-dots" />
          
          {/* Gold Dust */}
          <div className="fixed inset-0 pointer-events-none z-[1]">
            <GoldDust />
          </div>

          {/* Ambient glows */}
          <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-[120px]" />
          </div>

          <section className="py-20 md:py-28 relative z-10">
            <div className="container mx-auto px-6">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-center mb-20"
              >
                <p className="text-[10px] tracking-[0.6em] uppercase text-primary mb-6">
                  Get In Touch
                </p>
                <h1 className="font-display text-5xl md:text-7xl text-foreground mb-8">
                  Contact Us
                </h1>
                <div className="gold-divider w-28 mx-auto" />
              </motion.div>

              <div className="max-w-2xl mx-auto">
                {/* Success Message */}
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6 }}
                      className="text-center py-20"
                    >
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="w-24 h-24 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center"
                        style={{
                          boxShadow: '0 0 40px hsl(43 50% 55% / 0.2)'
                        }}
                      >
                        <CheckCircle className="w-12 h-12 text-primary" />
                      </motion.div>
                      <h2 className="font-display text-4xl text-foreground mb-5">
                        Message Sent
                      </h2>
                      <p className="text-foreground/60 mb-10 tracking-wide">
                        Thank you for reaching out. We'll get back to you within 24 hours.
                      </p>
                      <motion.button
                        onClick={() => setIsSuccess(false)}
                        className="btn-luxury"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Send Another Message
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.form
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      onSubmit={handleSubmit}
                      className="space-y-10"
                    >
                      {[
                        { id: 'name', label: 'Your Name', type: 'text', placeholder: 'Enter your name' },
                        { id: 'email', label: 'Email Address', type: 'email', placeholder: 'Enter your email' },
                      ].map((field, i) => (
                        <motion.div
                          key={field.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                        >
                          <label htmlFor={field.id} className="block text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-4">
                            {field.label}
                          </label>
                          <input
                            type={field.type}
                            id={field.id}
                            required
                            value={formData[field.id as keyof typeof formData]}
                            onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                            className="input-luxury"
                            placeholder={field.placeholder}
                          />
                        </motion.div>
                      ))}

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                      >
                        <label htmlFor="message" className="block text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-4">
                          Message
                        </label>
                        <textarea
                          id="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="input-luxury resize-none"
                          placeholder="How can we help you?"
                        />
                      </motion.div>

                      {error && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-destructive text-sm tracking-wide"
                        >
                          {error}
                        </motion.p>
                      )}

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-luxury-filled w-full disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={!isSubmitting ? { scale: 1.01 } : {}}
                        whileTap={!isSubmitting ? { scale: 0.99 } : {}}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-3">
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full"
                            />
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <Sparkles className="w-4 h-4" />
                            Send Message
                          </span>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="grid md:grid-cols-3 gap-10 mt-24 pt-20 border-t border-primary/20"
                >
                  {[
                    {
                      icon: MapPin,
                      label: 'Visit',
                      lines: ['Beirut, Lebanon', 'Available Nationwide']
                    },
                    {
                      icon: Phone,
                      label: 'Call',
                      lines: ['+961 3 044 467', 'Mon - Sat: 10AM - 8PM']
                    },
                    {
                      icon: Mail,
                      label: 'Email',
                      lines: ['contact@palaceperfumes.com', 'support@palaceperfumes.com']
                    },
                  ].map((item, i) => (
                    <motion.div 
                      key={item.label}
                      className="text-center"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1 + i * 0.1 }}
                    >
                      <div 
                        className="w-14 h-14 mx-auto mb-5 rounded-full bg-primary/10 flex items-center justify-center"
                        style={{ boxShadow: '0 0 20px hsl(43 50% 55% / 0.1)' }}
                      >
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <p className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-3">{item.label}</p>
                      {item.lines.map((line, j) => (
                        <p key={j} className="text-foreground/70">{line}</p>
                      ))}
                    </motion.div>
                  ))}
                </motion.div>

                {/* Social Media Icons */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                  className="mt-16 pt-16 border-t border-primary/20"
                >
                  <p className="text-[10px] tracking-[0.6em] uppercase text-primary mb-8 text-center">
                    Connect With Us
                  </p>
                  <div className="flex justify-center gap-6">
                    {/* WhatsApp */}
                    <motion.a
                      href="https://wa.me/9613044467"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative w-16 h-16 rounded-full bg-background border border-primary/30 flex items-center justify-center transition-all duration-500 hover:border-primary hover:bg-primary/10"
                      style={{ boxShadow: '0 0 20px hsl(43 50% 55% / 0.1)' }}
                      whileHover={{ scale: 1.1, boxShadow: '0 0 30px hsl(43 50% 55% / 0.3)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg 
                        className="w-7 h-7 text-primary transition-transform duration-300 group-hover:scale-110" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-[9px] tracking-[0.2em] uppercase text-primary whitespace-nowrap">WhatsApp</span>
                      </div>
                    </motion.a>

                    {/* Instagram */}
                    <motion.a
                      href="https://instagram.com/palaceperfumes"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative w-16 h-16 rounded-full bg-background border border-primary/30 flex items-center justify-center transition-all duration-500 hover:border-primary hover:bg-primary/10"
                      style={{ boxShadow: '0 0 20px hsl(43 50% 55% / 0.1)' }}
                      whileHover={{ scale: 1.1, boxShadow: '0 0 30px hsl(43 50% 55% / 0.3)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg 
                        className="w-7 h-7 text-primary transition-transform duration-300 group-hover:scale-110" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-[9px] tracking-[0.2em] uppercase text-primary whitespace-nowrap">Instagram</span>
                      </div>
                    </motion.a>

                    {/* TikTok */}
                    <motion.a
                      href="https://tiktok.com/@palaceperfumes"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative w-16 h-16 rounded-full bg-background border border-primary/30 flex items-center justify-center transition-all duration-500 hover:border-primary hover:bg-primary/10"
                      style={{ boxShadow: '0 0 20px hsl(43 50% 55% / 0.1)' }}
                      whileHover={{ scale: 1.1, boxShadow: '0 0 30px hsl(43 50% 55% / 0.3)' }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg 
                        className="w-7 h-7 text-primary transition-transform duration-300 group-hover:scale-110" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                      </svg>
                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-[9px] tracking-[0.2em] uppercase text-primary whitespace-nowrap">TikTok</span>
                      </div>
                    </motion.a>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </PageTransition>
    </>
  );
};

export default Contact;
