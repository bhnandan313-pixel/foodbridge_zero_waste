import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Truck, Users, Sparkles } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 25 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5 },
};

export default function KeyFeatures() {
  const features = [
    {
      icon: Zap,
      title: 'Instant Matching',
      desc: 'AI-powered algorithm connects surplus food to the nearest verified NGO within seconds of listing.',
      bg: 'bg-gradient-to-br from-amber-50 to-orange-50',
      border: 'border-amber-100',
      iconBg: 'bg-amber-100 text-amber-700',
      span: 'md:col-span-2',
    },
    {
      icon: ShieldCheck,
      title: 'Verified NGOs',
      desc: 'Every partner organization undergoes a thorough vetting process for trust, capacity, and transparency.',
      bg: 'bg-gradient-to-br from-trust-50 to-indigo-50',
      border: 'border-trust-100',
      iconBg: 'bg-trust-100 text-trust-700',
      span: 'md:col-span-1',
    },
    {
      icon: Truck,
      title: 'Logistics Support',
      desc: 'Integrated pickup coordination and cold-chain guidance ensure food safety from kitchen to community.',
      bg: 'bg-gradient-to-br from-fresh-50 to-teal-50',
      border: 'border-fresh-100',
      iconBg: 'bg-fresh-100 text-fresh-700',
      span: 'md:col-span-1',
    },
    {
      icon: Users,
      title: 'Community Impact',
      desc: "Detailed impact dashboards show exactly how many meals you've served, emissions saved, and lives touched.",
      bg: 'bg-gradient-to-br from-earth-50 to-rose-50',
      border: 'border-earth-100',
      iconBg: 'bg-earth-100 text-earth-700',
      span: 'md:col-span-2',
    },
  ];

  return (
    <section className="section-padding bg-slate-50">
      <div className="section-container">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <span className="section-badge bg-earth-100 text-earth-700">
            <Sparkles className="w-3.5 h-3.5" />
            Key Features
          </span>
          <h2 className="section-title text-slate-900 mt-6">Built for impact, designed for ease</h2>
          <p className="section-subtitle">
            Every feature in FoodBridge is crafted to remove friction and maximize the amount of food rescued.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                {...fadeInUp}
                transition={{ delay: 0.05 + idx * 0.1, duration: 0.5 }}
                className={`group ${feat.span} ${feat.bg} ${feat.border} border rounded-3xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default`}
              >
                <div
                  className={`w-12 h-12 rounded-xl ${feat.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feat.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

