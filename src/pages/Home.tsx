import { Helmet } from 'react-helmet-async';
import PageTransition from '@/components/PageTransition';
import Hero from '@/components/Hero';
import ShopSection from '@/components/ShopSection';
import Footer from '@/components/Footer';
import GoldDust from '@/components/GoldDust';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Palace Perfumes | Ultra-Luxury Fragrances</title>
        <meta name="description" content="Palace Perfumes - Where luxury whispers your name. Shop our curated collection of 60 world-class fragrances for men, women, and unisex." />
      </Helmet>
      <PageTransition>
        <main className="relative">
          {/* Ambient dots background */}
          <div className="ambient-dots" />
          
          {/* Gold Dust - Global */}
          <div className="fixed inset-0 pointer-events-none z-[1]">
            <GoldDust />
          </div>
          
          <Hero />
          <ShopSection />
        </main>
        <Footer />
      </PageTransition>
    </>
  );
};

export default Home;