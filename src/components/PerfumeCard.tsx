import { motion } from 'framer-motion';
import { Plus, Eye, Sparkles } from 'lucide-react';
import { Perfume } from '@/data/perfumes';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';
import { useState } from 'react';

interface PerfumeCardProps {
  perfume: Perfume;
  onViewDetails: (perfume: Perfume) => void;
  index: number;
}

const PerfumeCard = ({ perfume, onViewDetails, index }: PerfumeCardProps) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(perfume);
    toast.success(
      <div className="flex items-center gap-3">
        <Sparkles className="w-4 h-4 text-primary" />
        <span className="font-display tracking-wide">Added to cart — Palace Perfumes</span>
      </div>,
      {
        className: 'toast-luxury',
        duration: 2500,
      }
    );
    setTimeout(() => setIsAdding(false), 300);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="card-signature group"
    >
      {/* Signature Corner Lines */}
      <div className="signature-corner signature-corner-tl" />
      <div className="signature-corner signature-corner-br" />

      {/* Image Container */}
      <div className="relative aspect-[3/4] sm:aspect-[3/4] overflow-hidden">
        <motion.img
          src={perfume.imageUrl}
          alt={`${perfume.brand} ${perfume.name}`}
          className="w-full h-full object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Image Vignette */}
        <div className="absolute inset-0 card-vignette" />
        
        {/* Light Reflection Sweep */}
        <div className="card-light-sweep" />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />
        
        {/* Category Badge */}
        <span className="category-badge-signature absolute top-2 left-2 sm:top-4 sm:left-4 text-[8px] sm:text-[10px]">
          {perfume.category}
        </span>

        {/* Quick Actions */}
        <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 flex gap-1.5 sm:gap-2 opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-out">
          <motion.button
            onClick={handleAddToCart}
            className="btn-card-primary flex-1 text-[10px] sm:text-xs py-2 sm:py-2.5"
            whileTap={{ scale: 0.95 }}
            animate={isAdding ? { scale: [1, 0.95, 1] } : {}}
            aria-label={`Add ${perfume.name} to cart`}
          >
            <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">Add to Cart</span>
            <span className="sm:hidden">Add</span>
          </motion.button>
          <button
            onClick={() => onViewDetails(perfume)}
            className="btn-card-secondary p-2 sm:p-2.5"
            aria-label={`View ${perfume.name} details`}
          >
            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-2 sm:p-5 md:p-6 relative">
        {/* Subtle top line glow on hover */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <p className="text-[8px] sm:text-[9px] tracking-[0.25em] sm:tracking-[0.35em] uppercase text-primary/70 mb-1 sm:mb-3">
          {perfume.brand}
        </p>
        <h3 className="font-display text-sm sm:text-lg md:text-xl text-foreground mb-2 sm:mb-4 group-hover:text-primary transition-colors duration-700 leading-tight line-clamp-2">
          {perfume.name}
        </h3>
        <p className="font-display text-base sm:text-xl md:text-2xl text-primary">
          ${perfume.price}
        </p>
      </div>
    </motion.article>
  );
};

export default PerfumeCard;