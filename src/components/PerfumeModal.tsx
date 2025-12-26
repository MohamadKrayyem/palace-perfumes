import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus } from 'lucide-react';
import { Perfume } from '@/data/perfumes';
import { useCart } from '@/context/CartContext';

interface PerfumeModalProps {
  perfume: Perfume | null;
  isOpen: boolean;
  onClose: () => void;
}

const PerfumeModal = ({ perfume, isOpen, onClose }: PerfumeModalProps) => {
  const { addToCart, setIsCartOpen } = useCart();

  if (!perfume) return null;

  const handleAddToCart = () => {
    addToCart(perfume);
    onClose();
    setTimeout(() => setIsCartOpen(true), 300);
  };

  const categoryColors = {
    men: 'text-blue-300',
    women: 'text-pink-300',
    unisex: 'text-primary',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-background/90 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto glass border border-primary/20"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 text-foreground/50 hover:text-foreground transition-colors duration-300"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid md:grid-cols-2">
              {/* Image */}
              <div className="aspect-square md:aspect-auto">
                <img
                  src={perfume.imageUrl}
                  alt={`${perfume.brand} ${perfume.name}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                {/* Category */}
                <p className={`text-xs tracking-[0.3em] uppercase mb-4 ${categoryColors[perfume.category]}`}>
                  {perfume.category}
                </p>

                {/* Brand */}
                <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-2">
                  {perfume.brand}
                </p>

                {/* Name */}
                <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6">
                  {perfume.name}
                </h2>

                {/* Gold Divider */}
                <div className="gold-divider w-20 mb-6" />

                {/* Description */}
                <p className="text-foreground/70 leading-relaxed mb-8">
                  {perfume.description}
                </p>

                {/* Notes */}
                <div className="space-y-4 mb-8">
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-primary mb-2">Top Notes</p>
                    <p className="text-sm text-foreground/70">{perfume.notes.top.join(' • ')}</p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-primary mb-2">Middle Notes</p>
                    <p className="text-sm text-foreground/70">{perfume.notes.middle.join(' • ')}</p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.3em] uppercase text-primary mb-2">Base Notes</p>
                    <p className="text-sm text-foreground/70">{perfume.notes.base.join(' • ')}</p>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center gap-6">
                  <span className="font-display text-4xl text-primary">
                    ${perfume.price}
                  </span>
                  <button
                    onClick={handleAddToCart}
                    className="btn-luxury-filled flex items-center gap-3"
                  >
                    <Plus className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PerfumeModal;
