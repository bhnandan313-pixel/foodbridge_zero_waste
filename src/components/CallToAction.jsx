import React from 'react';
import { motion } from 'framer-motion';
import { HeartHandshake, UserPlus, Sparkles, CheckCircle2 } from 'lucide-react';

export default function CallToAction({ onOpenSignIn, onOpenDonation }) {
  return (
    <section id="cta" className="section-padding bg-gradient-to-br from-trust-950 via-slate-900 to-fresh-950 text-white relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-fresh-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-trust-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6 flex items-center justify-center gap-4">
            <div className="w-12 h-[2px] bg-emerald-500/40"></div>
            <span className="text-emerald-400 text-xs font-black tracking-[0.25em] uppercase">Zero-Waste Movement</span>
            <div className="w-12 h-[2px] bg-emerald-500/40"></div>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-balance">
            Join the Zero-Waste Movement Today
          </h2>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Whether you run a kitchen with surplus meals or have a few hours to help distribute them,
            your action feeds a neighbor today.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenDonation && onOpenDonation()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-trust-950 bg-gradient-to-r from-fresh-400 to-fresh-300 hover:from-fresh-300 hover:to-fresh-200 shadow-2xl shadow-fresh-500/30 transition-all duration-300 hover:scale-[1.03] text-base"
            >
              <HeartHandshake className="w-5 h-5" />
              Sign Up as Donor
            </button>
            <button
              onClick={() => onOpenSignIn && onOpenSignIn('volunteer')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 border border-slate-700 text-white font-bold hover:border-emerald-400 hover:text-emerald-400 transition-all duration-300 text-base"
            >
              <UserPlus className="w-5 h-5" />
              Join as Volunteer
            </button>
          </div>

          {/* Trust bullets */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-fresh-400" />
              100% Free for Donors &amp; NGOs
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-fresh-400" />
              Tax Benefits (80G Certificate)
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-fresh-400" />
              Setup in under 5 minutes
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
