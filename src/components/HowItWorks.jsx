import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Handshake, Truck, ArrowRight } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 25 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5 },
};

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Log Surplus',
      desc: 'Restaurants and events list available meals through our simple dashboard — type, quantity, and pickup window.',
      icon: ClipboardList,
      color: 'from-trust-500 to-trust-600',
      glow: 'shadow-trust-200',
      bg: 'bg-trust-50',
    },
    {
      num: '02',
      title: 'Match with NGO',
      desc: 'Our engine instantly identifies verified NGOs nearby and sends a notification. The nearest match claims the donation.',
      icon: Handshake,
      color: 'from-fresh-500 to-fresh-600',
      glow: 'shadow-fresh-200',
      bg: 'bg-fresh-50',
    },
    {
      num: '03',
      title: 'Track Delivery',
      desc: 'Both parties track pickup and delivery in real-time. Donors receive impact receipts and tax-benefit documentation.',
      icon: Truck,
      color: 'from-earth-500 to-earth-600',
      glow: 'shadow-earth-200',
      bg: 'bg-earth-50',
    },
  ];

  return (
    <section id="how-it-works" className="section-padding bg-white">
      <div className="section-container">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <span className="section-badge bg-trust-100 text-trust-700">
            <ClipboardList className="w-3.5 h-3.5" />
            How It Works
          </span>
          <h2 className="section-title text-slate-900 mt-6">Three steps to zero waste</h2>
          <p className="section-subtitle">From surplus to served — in under 60 minutes.</p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connection line — desktop only */}
          <div className="hidden md:block absolute top-[88px] left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-trust-300 via-fresh-300 to-earth-300" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  {...fadeInUp}
                  transition={{ delay: 0.1 + idx * 0.15, duration: 0.5 }}
                  className="relative flex flex-col items-center text-center"
                >
                  {/* Step circle */}
                  <div
                    className={`relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-xl ${step.glow} mb-6`}
                  >
                    <Icon className="w-8 h-8" strokeWidth={1.5} />
                  </div>

                  {/* Mobile arrow between steps */}
                  {idx < steps.length - 1 && (
                    <div className="md:hidden my-2">
                      <ArrowRight className="w-5 h-5 text-slate-300 rotate-90" />
                    </div>
                  )}

                  {/* Content card */}
                  <div className={`${step.bg} rounded-2xl p-6 w-full border border-slate-100`}>
                    <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">
                      Step {step.num}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-2 mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

