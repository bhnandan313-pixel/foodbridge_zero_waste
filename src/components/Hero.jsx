import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, ChevronDown } from 'lucide-react';

export default function Hero({ onOpenSignIn, onOpenDonation }) {
  const sectionRef = useRef(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.25 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const tunnelImages = [
    { src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=85', alt: 'Children sharing a meal' },
    { src: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=900&q=85', alt: 'Children receiving nutritious food' },
    { src: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=900&q=85', alt: 'Young people enjoying food together' },
    { src: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85', alt: 'Wholesome community meal' },
    { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=85', alt: 'Fresh food prepared for sharing' },
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-trust-950 via-trust-900 to-slate-900">
      <div className={`hero-tunnel absolute inset-0 ${heroVisible ? 'hero-tunnel-visible' : ''}`} aria-hidden="true">
        <div className="hero-tunnel-track">
          {tunnelImages.map((image, index) => (
            <div
              key={image.src}
              className={`hero-tunnel-card hero-tunnel-card-${index + 1}`}
              style={{ '--card-delay': `${index * 90}ms` }}
            >
              <img src={image.src} alt={image.alt} />
            </div>
          ))}
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-fresh-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-trust-400/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-earth-500/5 rounded-full blur-3xl animate-pulse-soft" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
        <div className="relative z-20 mx-auto flex max-w-4xl flex-col items-center rounded-[2rem] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-950/80 via-slate-950/40 to-transparent p-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-20 mb-6 flex items-center justify-center gap-4"
        >
          <div className="h-[2px] w-12 bg-emerald-500/40"></div>
          <span className="text-xs font-black uppercase tracking-[0.25em] text-emerald-400">
            Rescuing Food. Restoring Hope.
          </span>
          <div className="h-[2px] w-12 bg-emerald-500/40"></div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-8 text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] text-balance"
        >
          Good Food Should{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
            Feed People,
          </span>
          {' '}Not Landfills.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto"
        >
          Anna Sethu connects restaurants, food businesses, and event organizers with verified NGOs to rescue surplus food and deliver it to communities that need it.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => onOpenDonation && onOpenDonation()}
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-trust-950 bg-gradient-to-r from-fresh-400 to-fresh-300 hover:from-fresh-300 hover:to-fresh-200 shadow-2xl shadow-fresh-500/25 transition-all duration-300 hover:scale-[1.03] text-base"
          >
            Rescue Surplus Food
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => onOpenSignIn && onOpenSignIn('ngo')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 border border-slate-700 text-white font-bold hover:border-emerald-400 hover:text-emerald-400 transition-all duration-300 text-base"
          >
            <Users className="w-4 h-4" />
            Partner With Us
          </button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-16 flex items-center justify-center gap-6 text-sm text-slate-400"
        >
          <span>
            Building a network of food donors, NGOs, and volunteers.
          </span>
        </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-medium text-slate-500 uppercase tracking-widest">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown className="w-5 h-5 text-slate-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
