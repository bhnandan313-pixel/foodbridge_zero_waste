import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Heart, TrendingDown, MapPin } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 25 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5 },
};

export default function TheProblem() {
  const wasteStats = [
    { num: '1.3B', unit: 'Tons', desc: 'of food wasted globally every year', icon: TrendingDown },
    { num: '40%', unit: '', desc: 'of food produced in India is wasted', icon: AlertTriangle },
  ];

  const hungerStats = [
    { num: '190M', unit: '', desc: 'Indians are undernourished daily', icon: Heart },
    { num: '3,000+', unit: '', desc: 'children die from hunger every day', icon: MapPin },
  ];

  return (
    <section id="problem" className="section-padding bg-white">
      <div className="section-container">
        {/* Header */}
        <motion.div {...fadeInUp} className="text-center mb-16">
          <span className="section-badge bg-red-100 text-red-700">
            <AlertTriangle className="w-3.5 h-3.5" />
            The Paradox We Must Solve
          </span>
          <h2 className="section-title text-slate-900 mt-6 text-balance">
            Too much food wasted.<br />
            <span className="text-red-600">Too many still hungry.</span>
          </h2>
        </motion.div>

        {/* Split Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Food Waste Side */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 p-8 sm:p-10"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <h3 className="text-lg font-bold text-red-800 mb-8 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </span>
              Food Waste Crisis
            </h3>
            <div className="space-y-8">
              {wasteStats.map((stat) => (
                <div key={stat.desc} className="relative">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl sm:text-6xl font-black text-red-600 tracking-tight">
                      {stat.num}
                    </span>
                    {stat.unit && (
                      <span className="text-xl font-bold text-red-400">{stat.unit}</span>
                    )}
                  </div>
                  <p className="mt-2 text-base text-red-900/70 font-medium">{stat.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hunger Side */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-trust-50 to-indigo-50 border border-trust-100 p-8 sm:p-10"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-trust-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <h3 className="text-lg font-bold text-trust-800 mb-8 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-trust-600 text-white flex items-center justify-center">
                <Heart className="w-4 h-4" />
              </span>
              Hunger Reality
            </h3>
            <div className="space-y-8">
              {hungerStats.map((stat) => (
                <div key={stat.desc} className="relative">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl sm:text-6xl font-black text-trust-600 tracking-tight">
                      {stat.num}
                    </span>
                    {stat.unit && (
                      <span className="text-xl font-bold text-trust-400">{stat.unit}</span>
                    )}
                  </div>
                  <p className="mt-2 text-base text-trust-900/70 font-medium">{stat.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Connector message */}
        <motion.p
          {...fadeInUp}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-12 text-center text-lg sm:text-xl font-semibold text-slate-700 max-w-2xl mx-auto"
        >
          The food exists. The need exists. What&apos;s missing is the{' '}
          <span className="text-fresh-600 font-extrabold">bridge</span>.
        </motion.p>
      </div>
    </section>
  );
}

