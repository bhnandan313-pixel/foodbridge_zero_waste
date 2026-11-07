import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const contributions = [
  'Your contribution is bigger than you think',
  'One meal can restore dignity',
  'Surplus can become someone’s supper',
  'Every rescue creates a ripple of hope',
];

export default function ImpactMarquee() {
  const items = [...contributions, ...contributions];

  return (
    <section className="relative overflow-hidden border-y border-emerald-400/20 bg-emerald-400 py-3" aria-label="Anna Sethu impact message">
      <motion.div
        className="flex w-max items-center"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 42, repeat: Infinity, ease: 'linear' }}
      >
        {items.map((message, index) => (
          <React.Fragment key={`${message}-${index}`}>
            <span className="whitespace-nowrap px-4 text-sm font-black uppercase tracking-[0.08em] text-slate-950 sm:px-6 sm:text-base">
              {message}
            </span>
            <Heart
              aria-hidden="true"
              className="h-5 w-5 shrink-0 fill-slate-950 text-slate-950 sm:h-6 sm:w-6"
            />
          </React.Fragment>
        ))}
      </motion.div>
    </section>
  );
}
