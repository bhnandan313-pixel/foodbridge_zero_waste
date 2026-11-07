import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardList, Handshake, Truck } from 'lucide-react';

const steps = [
  {
    id: '01',
    title: 'List Your Surplus',
    description: 'Have extra food? Register your donation with its food type, quantity, preparation time, and pickup details.',
    icon: ClipboardList,
    color: 'from-blue-500 to-blue-600',
    shadow: 'shadow-blue-500/25',
    bgLight: 'bg-blue-50/50',
  },
  {
    id: '02',
    title: 'Find the Right NGO',
    description: 'Our matching system identifies nearby verified organizations based on location, capacity, food requirements, and availability.',
    icon: Handshake,
    color: 'from-emerald-400 to-emerald-500',
    shadow: 'shadow-emerald-500/25',
    bgLight: 'bg-emerald-50/50',
  },
  {
    id: '03',
    title: 'Rescue and Confirm',
    description: 'Coordinate collection, update the donation status, and confirm successful handover.',
    icon: Truck,
    color: 'from-orange-400 to-orange-500',
    shadow: 'shadow-orange-500/25',
    bgLight: 'bg-orange-50/50',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } },
};

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="w-12 h-[2px] bg-emerald-500/40"></div>
            <span className="text-emerald-400 text-xs font-black tracking-[0.25em] uppercase">
              How It Works
            </span>
            <div className="w-12 h-[2px] bg-emerald-500/40"></div>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-4xl font-black tracking-tight text-white md:text-5xl"
          >
            From Surplus to Someone&apos;s Next Meal.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg leading-relaxed text-slate-400"
          >
            A simple, coordinated process that helps surplus food find the people who need it.
          </motion.p>
        </div>

        {/* Animated Timeline & Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Background Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-1 bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 via-emerald-400 to-orange-400"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div 
                  key={step.id} 
                  variants={itemVariants}
                  className="relative flex flex-col items-center group"
                >
                  {/* The Icon Node */}
                  <div className="relative z-10 mb-8">
                    <div className="absolute inset-0 bg-current opacity-20 blur-xl rounded-full scale-150 group-hover:scale-175 transition-transform duration-500" style={{ color: `var(--tw-${step.color.split(' ')[1].replace('to-', '')})` }} />
                    <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${step.color} shadow-xl ${step.shadow} flex items-center justify-center transform group-hover:-translate-y-2 transition-all duration-300 relative z-20`}>
                      <Icon className="text-white w-10 h-10" strokeWidth={2} />
                    </div>
                  </div>

                  {/* The Card Content */}
                  <div className={`relative w-full overflow-hidden rounded-3xl bg-slate-900/50 p-8 text-center backdrop-blur-xl border border-slate-800 shadow-2xl shadow-emerald-900/10 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30`}>
                    
                    {/* Ghost Step Number */}
                    <div className="absolute -top-4 -right-4 text-7xl font-black text-slate-900/[0.03] select-none pointer-events-none">
                      {step.id}
                    </div>

                    <div className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-3">
                      Step {step.id}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">
                      {step.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>
    </section>
  );
}