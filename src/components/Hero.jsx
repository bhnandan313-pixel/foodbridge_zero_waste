import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, ChevronDown } from 'lucide-react';

export default function Hero({ onOpenModal }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-trust-950 via-trust-900 to-slate-900">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-fresh-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-trust-400/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-earth-500/5 rounded-full blur-3xl animate-pulse-soft" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-fresh-300 text-xs font-semibold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-fresh-400 animate-pulse" />
            Rescuing food, Restoring hope
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-8 text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] text-balance"
        >
          Don&apos;t Let Good Food{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-fresh-400 via-fresh-300 to-earth-300">
            Go Bad.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto"
        >
          FoodBridge connects restaurants with surplus meals to verified NGOs and shelters,
          turning potential waste into warm plates for families who need them most.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => onOpenModal && onOpenModal('donor')}
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-trust-950 bg-gradient-to-r from-fresh-400 to-fresh-300 hover:from-fresh-300 hover:to-fresh-200 shadow-2xl shadow-fresh-500/25 transition-all duration-300 hover:scale-[1.03] text-base"
          >
            Donate Surplus Food
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => onOpenModal && onOpenModal('ngo')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white bg-white/10 backdrop-blur-sm border border-white/15 hover:bg-white/20 hover:border-white/25 transition-all duration-300 text-base"
          >
            <Users className="w-4 h-4" />
            Partner as NGO
          </button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mt-16 flex items-center justify-center gap-6 text-sm text-slate-400"
        >
          <div className="flex -space-x-2">
            {['R', 'N', 'V', 'D'].map((letter, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-trust-400 to-fresh-400 border-2 border-trust-900 flex items-center justify-center text-[10px] font-bold text-white"
              >
                {letter}
              </div>
            ))}
          </div>
          <span>
            Trusted by <strong className="text-white">450+</strong> restaurants &amp; NGOs
          </span>
        </motion.div>
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
