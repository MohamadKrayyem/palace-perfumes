import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Perfume } from '@/data/perfumes';
import { usePerfumes } from '@/hooks/usePerfumes';
import PerfumeCard from './PerfumeCard';
import PerfumeModal from './PerfumeModal';

// Luxury filter categories - MEN, WOMEN, UNISEX only (no "All")
const FILTER_CATEGORIES = [
  { id: 'men', label: 'Men' },
  { id: 'women', label: 'Women' },
  { id: 'unisex', label: 'Unisex' },
];

const ShopSection = () => {
  const [activeCategory, setActiveCategory] = useState<string>('men');
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { perfumes, isLoading, filterPerfumes } = usePerfumes();
  const filteredPerfumes = filterPerfumes(activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleViewDetails = (perfume: Perfume) => {
    setSelectedPerfume(perfume);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedPerfume(null), 300);
  };

  return (
    <section id="shop" ref={sectionRef} className="py-16 md:py-20 relative scroll-mt-16 md:scroll-mt-20 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-3 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-[10px] tracking-[0.6em] uppercase text-primary mb-6">
            The Collection
          </p>
          <h2 className="font-display text-5xl md:text-7xl text-foreground mb-8">
            Shop Our Fragrances
          </h2>
          <div className="gold-divider w-28 mx-auto" />
        </motion.div>

        {/* Luxury Category Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-12 sm:mb-16"
        >
          <div className="luxury-filter-container">
            {FILTER_CATEGORIES.map((category, i) => (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`luxury-filter-btn ${activeCategory === category.id ? 'active' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="luxury-filter-text">{category.label}</span>
                {activeCategory === category.id && (
                  <motion.span
                    layoutId="luxury-filter-indicator"
                    className="luxury-filter-underline"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="luxury-filter-shimmer" />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} 
              className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full" 
            />
          </div>
        ) : (
          <motion.div 
            layout 
            className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 lg:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredPerfumes.map((perfume, index) => (
                <motion.div
                  key={perfume.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.03 }}
                >
                  <PerfumeCard
                    perfume={perfume}
                    onViewDetails={handleViewDetails}
                    index={index}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Results Count */}
        <motion.p
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-muted-foreground text-xs tracking-[0.2em] uppercase mt-16"
        >
          Showing {filteredPerfumes.length} of {perfumes.length} fragrances
        </motion.p>
      </div>

      {/* Perfume Detail Modal */}
      <PerfumeModal
        perfume={selectedPerfume}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
};

export default ShopSection;