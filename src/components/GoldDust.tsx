import { useEffect, useState, useMemo } from 'react';

interface Particle {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

const GoldDust = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Delay rendering for performance
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const particles = useMemo(() => {
    const particleCount = 40;
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 18 + Math.random() * 12,
      size: 1 + Math.random() * 2.5,
      opacity: 0.3 + Math.random() * 0.4,
    }));
  }, []);

  if (!isVisible) return null;

  return (
    <div className="gold-dust">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="gold-particle"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            '--particle-opacity': particle.opacity,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default GoldDust;