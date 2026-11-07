import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, ArrowLeftRight, ShieldCheck, BarChart3 } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 25 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5 },
};

export default function OurSolution() {
  const pillars = [
    {
      icon: ArrowLeftRight,
      title: 'Smart Matching',
      desc: 'Our algorithm instantly pairs surplus food with the nearest NGO based on quantity, type, and proximity.',
      color: 'trust',
    },
    {
      icon: ShieldCheck,
      title: 'Quality Assured',
      desc: 'Every donation is verified for safety, hygiene, and freshness before it reaches the community.',
      color: 'fresh',
    },
    {
      icon: BarChart3,
      title: 'Full Transparency',
      desc: 'Real-time dashboards let donors and NGOs track every meal from kitchen to table.',
      color: 'earth',
    },
  ];

  const colorMap = {
    trust: {
      bg: 'bg-trust-50',
      iconBg: 'bg-trust-100 text-trust-700 group-hover:bg-trust-600 group-hover:text-white',
      border: 'border-trust-100',
    },
    fresh: {
      bg: 'bg-fresh-50',
      iconBg: 'bg-fresh-100 text-fresh-700 group-hover:bg-fresh-600 group-hover:text-white',
      border: 'border-fresh-100',
    },
    earth: {
      bg: 'bg-earth-50',
      iconBg: 'bg-earth-100 text-earth-700 group-hover:bg-earth-600 group-hover:text-white',
      border: 'border-earth-100',
    },
  };

  return (
    <section id="solution" className="section-padding bg-slate-50">
      <div className="section-container">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <span className="section-badge bg-fresh-100 text-fresh-700">
            <Lightbulb className="w-3.5 h-3.5" />
            Our Solution
          </span>
          <h2 className="section-title text-slate-900 mt-6 text-balance">
            Technology that turns{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fresh-600 to-trust-600">
              surplus into sustenance
            </span>
          </h2>
          <p className="section-subtitle">
            FoodBridge is a digital platform that creates a seamless, trusted pipeline between
            food donors and hunger-relief organizations — powered by smart matching and real-time logistics.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const colors = colorMap[pillar.color];
            return (
              <motion.div
                key={pillar.title}
                {...fadeInUp}
                transition={{ delay: 0.1 + idx * 0.12, duration: 0.5 }}
                className={`group card ${colors.bg} ${colors.border} p-8 hover:-translate-y-1`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${colors.iconBg} flex items-center justify-center mb-6 transition-all duration-300`}
                >
                  <Icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{pillar.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{pillar.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

