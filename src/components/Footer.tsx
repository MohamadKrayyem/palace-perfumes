import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="border-t border-primary/20 py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-display text-3xl text-foreground mb-4">
              Palace Perfumes
            </h3>
            <p className="text-foreground/60 leading-relaxed max-w-md">
              Where luxury whispers your name. Discover our curated collection of the world's finest fragrances, each bottle a masterpiece of olfactory artistry.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase text-primary mb-6">
              Quick Links
            </h4>
            <nav className="space-y-3">
              <Link to="/" className="block text-foreground/60 hover:text-primary transition-colors">
                Shop
              </Link>
              <Link to="/about" className="block text-foreground/60 hover:text-primary transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="block text-foreground/60 hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-[0.3em] uppercase text-primary mb-6">
              Contact
            </h4>
            <div className="space-y-3 text-foreground/60">
              <p>contact@palaceperfumes.com</p>
              <p>+1 (555) 123-4567</p>
              <p>Mon - Sat: 10AM - 8PM</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Palace Perfumes. All rights reserved.
          </p>
          <div className="gold-divider w-24" />
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
