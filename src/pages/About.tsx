import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import PageTransition from '@/components/PageTransition';
import Footer from '@/components/Footer';
import GoldDust from '@/components/GoldDust';
import aboutHeroImage from '@/assets/about-hero.jpg';

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <>
      <Helmet>
        <title>About Us | Palace Perfumes</title>
        <meta name="description" content="Discover the legacy of Palace Perfumes - a journey through the art of luxury fragrance creation." />
      </Helmet>
      <PageTransition>
        <main className="min-h-screen pt-24 relative">
          {/* Ambient dots background */}
          <div className="ambient-dots" />
          
          {/* Gold Dust */}
          <div className="fixed inset-0 pointer-events-none z-[1]">
            <GoldDust />
          </div>

          {/* Hero Section */}
          <section ref={ref} className="grid lg:grid-cols-2 min-h-[80vh] relative z-10">
            {/* Left Content */}
            <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 order-2 lg:order-1 relative">
              {/* Ambient glow */}
              <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-[10px] tracking-[0.6em] uppercase text-primary mb-8"
              >
                The Beginning
              </motion.p>

              <div className="overflow-hidden mb-4">
                <motion.h1
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="font-display text-5xl md:text-6xl lg:text-7xl text-foreground"
                >
                  A Legacy of
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-10">
                <motion.h1
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="font-display text-5xl md:text-6xl lg:text-7xl"
                >
                  <span className="text-gold-gradient">Excellence</span>
                </motion.h1>
              </div>

              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.7 }}
                className="gold-divider w-24 mb-10"
              />

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                className="space-y-6 text-foreground/70 leading-relaxed"
              >
                <p className="font-display text-xl italic text-foreground/80">
                  "In every bottle, a universe of sensation awaits."
                </p>
                <p>
                  Founded on the principle that fragrance is the most intimate form of self-expression, 
                  Palace Perfumes has spent decades curating the world's most exceptional scents. 
                  Our journey began in the perfume houses of Paris, where we learned that true luxury 
                  lies not in extravagance, but in the quiet whisper of exquisite quality.
                </p>
                <p>
                  Each fragrance in our collection has been chosen for its ability to evoke emotion, 
                  create memory, and transform the ordinary into the extraordinary. We believe that 
                  the right scent doesn't just accompany you through life—it becomes part of your story.
                </p>
                <p>
                  From the sun-drenched citrus groves of Sicily to the mystical oud forests of the 
                  Middle East, our fragrances capture the essence of the world's most precious 
                  ingredients. Every note has been carefully orchestrated to create symphonies 
                  that speak to the soul.
                </p>
              </motion.div>

              {/* Values */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.1 }}
                className="grid grid-cols-3 gap-8 mt-14 pt-14 border-t border-primary/20"
              >
                {[
                  { value: '60+', label: 'Curated Fragrances' },
                  { value: '50+', label: 'Premium Brands' },
                  { value: '100%', label: 'Authentic' },
                ].map((stat, i) => (
                  <motion.div 
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.3 + i * 0.1 }}
                  >
                    <p className="font-display text-4xl text-primary mb-2">{stat.value}</p>
                    <p className="text-[9px] tracking-[0.25em] uppercase text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="relative h-64 lg:h-auto order-1 lg:order-2 overflow-hidden"
            >
              <motion.div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${aboutHeroImage})`,
                  scale: imageScale
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent lg:via-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent lg:hidden" />
              
              {/* Gold vignette on image */}
              <div className="absolute inset-0" style={{
                background: 'radial-gradient(ellipse at center, transparent 30%, hsl(20 15% 4% / 0.6) 100%)'
              }} />
            </motion.div>
          </section>

          {/* Philosophy Section */}
          <section className="py-28 md:py-36 relative z-10">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="max-w-4xl mx-auto text-center"
              >
                <p className="text-[10px] tracking-[0.6em] uppercase text-primary mb-6">
                  Our Philosophy
                </p>
                <h2 className="font-display text-4xl md:text-6xl text-foreground mb-10">
                  The Art of Scent
                </h2>
                <div className="gold-divider w-28 mx-auto mb-10" />
                <p className="text-lg text-foreground/70 leading-relaxed">
                  We believe that perfume is more than a fragrance—it's an invisible accessory, 
                  a signature, a memory in the making. At Palace Perfumes, we don't just sell scents; 
                  we curate experiences that become part of your identity. Every spritz is an invitation 
                  to discover something extraordinary about yourself.
                </p>
              </motion.div>

              {/* Pillars */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, delay: 0.2 }}
                className="grid md:grid-cols-3 gap-16 mt-24"
              >
                {[
                  {
                    title: 'Authenticity',
                    description: 'Every fragrance we offer is 100% genuine, sourced directly from authorized distributors and renowned perfume houses.',
                  },
                  {
                    title: 'Curation',
                    description: 'Our selection is not random. Each scent is carefully chosen for its quality, complexity, and ability to create lasting impressions.',
                  },
                  {
                    title: 'Experience',
                    description: 'From the moment you browse our collection to the day your fragrance arrives, we ensure every touchpoint reflects luxury.',
                  },
                ].map((pillar, index) => (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 + index * 0.15 }}
                    className="text-center"
                  >
                    <h3 className="font-display text-2xl text-foreground mb-5">{pillar.title}</h3>
                    <div className="gold-divider w-12 mx-auto mb-5" />
                    <p className="text-foreground/60 leading-relaxed">{pillar.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        </main>
        <Footer />
      </PageTransition>
    </>
  );
};

export default About;