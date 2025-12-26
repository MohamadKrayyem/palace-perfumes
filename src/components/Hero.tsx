import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import GoldDust from './GoldDust';

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const scrollToShop = () => {
    const shopSection = document.getElementById('shop');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=1920&h=1080&fit=crop')`,
            }}
          />
        </motion.div>
      </motion.div>
      
      {/* Overlay Layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80 z-[1]" />
      
      {/* Vignette */}
      <div className="absolute inset-0 z-[2]" style={{
        background: 'radial-gradient(ellipse at center, transparent 20%, hsl(20 15% 4% / 0.8) 100%)'
      }} />

      {/* Center Glow */}
      <div className="center-glow z-[2]" />
      
      {/* Mist Effect */}
      <div className="mist-layer z-[3]" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 0.5 }}
        className="absolute inset-0 z-[3]"
        style={{
          background: 'radial-gradient(ellipse at 30% 80%, hsl(43 50% 55% / 0.05) 0%, transparent 50%), radial-gradient(ellipse at 70% 20%, hsl(43 50% 55% / 0.03) 0%, transparent 40%)'
        }}
      />

      {/* Gold Dust in Hero */}
      <div className="absolute inset-0 z-[4] pointer-events-none overflow-hidden">
        <GoldDust />
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-10 container mx-auto px-6 text-center"
        style={{ opacity }}
      >
        {/* Small Label */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-[10px] tracking-[0.6em] uppercase text-primary mb-10"
        >
          Luxury Fragrances
        </motion.p>

        {/* Main Title */}
        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display text-6xl md:text-8xl lg:text-9xl text-foreground leading-none"
          >
            Palace
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display text-6xl md:text-8xl lg:text-9xl leading-none"
          >
            <span className="text-gold-gradient">Perfumes</span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="font-display text-xl md:text-2xl text-foreground/60 italic mb-14 max-w-xl mx-auto"
        >
          Where luxury whispers your name.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.button
            onClick={scrollToShop}
            className="btn-luxury group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">Shop Now</span>
          </motion.button>
        </motion.div>

        {/* Gold Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.8 }}
          className="gold-divider w-32 mx-auto mt-20"
        />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-9 border border-primary/30 rounded-full flex items-start justify-center p-1.5"
        >
          <motion.div
            animate={{ height: ['30%', '60%', '30%'], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-0.5 bg-primary rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;