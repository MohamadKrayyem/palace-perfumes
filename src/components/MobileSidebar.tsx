import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '@/assets/logo.png';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/', label: 'Shop', hash: '#shop' },
    { path: '/', label: 'Collections', hash: '#shop' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const handleNavClick = (path: string, hash?: string) => {
    onClose();
    if (hash && location.pathname === '/') {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 400);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ 
              duration: 0.6, 
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="sidebar-luxury-enhanced"
          >
            {/* Gold Dust Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-primary/30"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.2, 0.6, 0.2],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              onClick={onClose}
              className="absolute top-6 right-6 p-3 text-primary/70 hover:text-primary transition-colors duration-500 hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Logo at top */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="pt-6 px-8"
            >
              <img src={logo} alt="Palace Perfumes" className="h-20 w-auto" />
            </motion.div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-1 mt-12 px-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={`${link.label}-${index}`}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: 0.25 + index * 0.08,
                    duration: 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  {/* Gold divider before each item except first */}
                  {index > 0 && (
                    <div className="w-full h-px bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 mb-1" />
                  )}
                  <Link
                    to={link.path}
                    onClick={() => handleNavClick(link.path, link.hash)}
                    className="sidebar-nav-link-enhanced group"
                  >
                    <span className="sidebar-nav-text-enhanced">{link.label}</span>
                    <motion.span 
                      className="sidebar-nav-glow"
                      initial={{ width: 0 }}
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.4 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Bottom Branding */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="absolute bottom-0 left-0 right-0 p-8"
            >
              <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-6" />
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-primary/60" />
                <h3 className="font-display text-lg tracking-[0.15em] text-foreground">
                  PALACE PERFUMES
                </h3>
              </div>
              <p className="text-muted-foreground text-sm italic font-display leading-relaxed">
                Where luxury whispers your name.
              </p>
            </motion.div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;
