import React from 'react';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 25 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5 },
};

export default function OurSolution() {
  const steps = [
    {
      number: '01',
      label: 'Discover',
      title: 'Smart Matching',
      description: 'Our platform identifies nearby verified NGOs based on food availability, location, quantity, and collection requirements.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85',
    },
    {
      number: '02',
      label: 'Verify',
      title: 'Transparent Food Rescue',
      description: 'Track donations from registration to collection. Keep food details, pickup information, and donation status visible to the relevant participants.',
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=85',
    },
    {
      number: '03',
      label: 'Deliver',
      title: 'Community Impact',
      description: 'Help ensure surplus food reaches its intended destination through coordinated pickups and delivery confirmation.',
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=85',
    },
  ];

  return (
    <section id="solution" className="section-padding bg-slate-950">
      <div className="section-container">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-emerald-500/40"></div>
            <span className="text-emerald-400 text-xs font-black tracking-[0.25em] uppercase">
              Our Solution
            </span>
            <div className="w-12 h-[2px] bg-emerald-500/40"></div>
          </div>
          <h2 className="section-title mt-6 text-balance text-white font-black tracking-tight">
            Technology that turns{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
              surplus into sustenance
            </span>
          </h2>
          <p className="section-subtitle text-slate-400 leading-relaxed">
            Anna Sethu brings food donors and verified hunger-relief organizations together through intelligent matching, transparent coordination, and reliable food redistribution.
          </p>
        </motion.div>

        <div className="relative space-y-14 lg:space-y-20">
          <div className="absolute bottom-6 left-1/2 top-6 hidden w-px -translate-x-1/2 border-l-2 border-dashed border-fresh-300 lg:block" />
          {steps.map((step, idx) => {
            return (
              <motion.div
                key={step.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
                className={`relative grid items-center gap-8 lg:grid-cols-[1fr_72px_1fr] lg:gap-8 ${
                  idx % 2 === 1 ? 'lg:[&>*:first-child]:col-start-3' : ''
                }`}
              >
                <motion.div
                  variants={{ hidden: { opacity: 0, x: idx % 2 === 0 ? -70 : 70 }, visible: { opacity: 1, x: 0 } }}
                  transition={{ duration: 0.65, ease: 'easeOut' }}
                  className={`overflow-hidden rounded-3xl bg-slate-900/50 border border-slate-800 shadow-2xl shadow-emerald-900/10 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 ${
                    idx % 2 === 1 ? 'lg:col-start-3' : 'lg:col-start-1'
                  }`}
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                    <img
                      src={step.image}
                      alt={`${step.label} — Anna Sethu ${step.title}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-slate-950/20" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.45, delay: 0.15 }}
                  className="z-10 mx-auto hidden h-14 w-14 items-center justify-center rounded-full border-4 border-slate-50 bg-fresh-600 text-sm font-black text-white shadow-lg lg:flex"
                >
                  {step.number}
                </motion.div>

                <motion.div
                  variants={{ hidden: { opacity: 0, x: idx % 2 === 0 ? 70 : -70 }, visible: { opacity: 1, x: 0 } }}
                  transition={{ duration: 0.65, ease: 'easeOut', delay: 0.08 }}
                  className={`px-2 py-3 lg:px-6 ${
                    idx % 2 === 1 ? 'lg:col-start-1 lg:row-start-1 lg:text-right' : 'lg:col-start-3'
                  }`}
                >
                  <div className={`mb-3 flex items-center gap-3 lg:mb-5 ${idx % 2 === 1 ? 'lg:justify-end' : ''}`}>
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-fresh-600 text-xs font-black text-white lg:hidden">
                      {step.number}
                    </span>
                    <span className="text-xs font-black uppercase tracking-[0.22em] text-fresh-600">{step.label}</span>
                  </div>
                  <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">{step.title}</h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-slate-400 lg:text-lg">
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
