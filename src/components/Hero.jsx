import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, ChevronDown } from 'lucide-react';

const heroImages = [
  { src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=85', alt: 'Children sharing a meal' },
  { src: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=900&q=85', alt: 'Children receiving nutritious food' },
  { src: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=900&q=85', alt: 'Young people enjoying food together' },
  { src: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85', alt: 'Wholesome community meal' },
  { src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=85', alt: 'Fresh food prepared for sharing' },
  { src: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=900&q=85', alt: 'Fresh vegetables prepared for a meal' },
  { src: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85', alt: 'Colorful fresh food bowl' },
  { src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=85', alt: 'Food being prepared to share' },
  { src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85', alt: 'Freshly prepared meal' },
  { src: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=85', alt: 'Nutritious meal made with fresh ingredients' },
];

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

  return (
    <section ref={sectionRef} className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#080F1F]">
      <div className="hero-image-grid" aria-hidden="true">
        {[heroImages.slice(0, 5), heroImages.slice(5)].map((row, rowIndex) => (
          <div className={`hero-image-row hero-image-row-${rowIndex + 1}`} key={rowIndex}>
            <div className="hero-image-track">
              {[...row, ...row].map((image, imageIndex) => (
                <div className="hero-image-card" key={`${image.src}-${imageIndex}`}>
                  <img src={image.src} alt="" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={`hero-tunnel ${heroVisible ? 'hero-tunnel-visible' : ''}`} aria-hidden="true">
        <div className="hero-tunnel-track">
          {heroImages.slice(0, 5).map((image, index) => (
            <div className={`hero-tunnel-card hero-tunnel-card-${index + 1}`} key={image.src}>
              <img src={image.src} alt="" />
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-fresh-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-trust-400/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="hero-image-overlay absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
        <div className="hero-copy-backdrop relative z-20 mx-auto flex max-w-4xl flex-col items-center rounded-[2rem] px-4 py-6 text-center sm:p-8">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-20 mb-4 sm:mb-6 flex items-center justify-center gap-2 sm:gap-4"
        >
          <div className="hidden h-[2px] w-12 bg-emerald-500/40 sm:block"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-400 sm:text-xs sm:tracking-[0.25em]">
            Rescuing Food. Restoring Hope.
          </span>
          <div className="hidden h-[2px] w-12 bg-emerald-500/40 sm:block"></div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-3 text-[2.35rem] font-black leading-[1.08] tracking-tight text-white text-balance sm:mt-8 sm:text-6xl lg:text-7xl"
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
          className="mt-5 text-base sm:mt-6 sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto"
        >
          Anna Sethu connects restaurants, food businesses, and event organizers with verified NGOs to rescue surplus food and deliver it to communities that need it.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-7 flex w-full flex-col sm:mt-10 sm:w-auto sm:flex-row items-center justify-center gap-3 sm:gap-4"
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-8 sm:mt-16 flex items-center justify-center gap-6 text-xs sm:text-sm text-slate-400"
        >
          <span>
            Building a network of food donors, NGOs, and volunteers.
          </span>
        </motion.div>
        </div>
      </div>

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
