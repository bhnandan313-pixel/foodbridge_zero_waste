import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

export default function TheProblem() {
  const [wastedSinceArrival, setWastedSinceArrival] = useState(107.9);

  useEffect(() => {
    const interval = setInterval(() => {
      setWastedSinceArrival((previous) => previous + 1.3);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="problem" className="relative py-32 bg-slate-950 text-white overflow-hidden flex flex-col items-center justify-center">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-red-900/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Provocative Headline */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="w-12 h-[2px] bg-emerald-500/40"></div>
            <span className="text-emerald-400 text-xs font-black tracking-[0.25em] uppercase">
              The Food Paradox
            </span>
            <div className="w-12 h-[2px] bg-emerald-500/40"></div>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black mb-6 leading-tight tracking-tight"
          >
            We produce enough food.<br />
            <span className="text-slate-500">Yet millions struggle to find their next meal.</span>
          </motion.h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            The problem isn't always the availability of food. It's the gap between surplus and need.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50 p-10 backdrop-blur-xl shadow-2xl shadow-emerald-900/10 transition-all duration-300 md:p-14 hover:-translate-y-1 hover:border-emerald-500/30"
          >
            <div className="relative z-10">
              <h3 className="text-slate-400 font-bold text-sm mb-5 uppercase tracking-[0.2em]">Global Food Waste</h3>
              <div className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">
                1<span className="text-3xl text-red-400">/3</span>
              </div>
              <p className="text-lg font-semibold text-slate-200 mb-4">Approximately one-third of food produced globally is lost or wasted.</p>
              <SourceLink href="https://www.fao.org/platform-food-loss-waste/en/" label="FAO, global estimate" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50 p-10 backdrop-blur-xl shadow-2xl shadow-emerald-900/10 transition-all duration-300 md:p-14 hover:-translate-y-1 hover:border-emerald-500/30"
          >
            <div className="relative z-10">
              <h3 className="text-slate-400 font-bold text-sm mb-5 uppercase tracking-[0.2em]">People Facing Hunger</h3>
              <div className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">
                733<span className="text-3xl text-red-400">M</span>
              </div>
              <p className="text-lg font-semibold text-slate-200 mb-4">People faced hunger globally in 2023.</p>
              <SourceLink href="https://sdgs.un.org/goals/goal2" label="UN Sustainable Development Goal 2" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50 p-10 backdrop-blur-xl shadow-2xl shadow-emerald-900/10 transition-all duration-300 md:p-14 hover:-translate-y-1 hover:border-emerald-500/30"
          >
            <div className="relative z-10">
              <h3 className="text-slate-400 font-bold text-sm mb-5 uppercase tracking-[0.2em]">Post-Harvest Food Loss</h3>
              <div className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">
                13.2<span className="text-3xl text-red-400">%</span>
              </div>
              <p className="text-lg font-semibold text-slate-200 mb-4">Of food was lost globally after harvest and before retail in 2021.</p>
              <SourceLink href="https://www.fao.org/platform-food-loss-waste/en/" label="FAO, 2021 estimate" />
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 max-w-2xl mx-auto bg-red-950/30 border border-red-900/50 rounded-2xl p-8 text-center"
        >
          <p className="text-3xl md:text-4xl font-black text-white mb-3">Every minute matters.</p>
          <p className="text-slate-400 leading-relaxed">
            Food that could feed someone should not become tomorrow&apos;s waste.
          </p>
          <div className="mt-6 flex items-baseline justify-center gap-2">
            <span className="text-4xl md:text-5xl font-mono font-bold text-red-400">
              {wastedSinceArrival.toFixed(1)}
            </span>
            <span className="text-xl font-semibold text-red-400/70">
              tons wasted since you opened this page
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

function SourceLink({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
    >
      {label}
      <ExternalLink className="w-4 h-4" />
    </a>
  );
}