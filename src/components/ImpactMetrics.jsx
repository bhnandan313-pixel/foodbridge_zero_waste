import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Utensils, Building2, CloudOff, Award } from 'lucide-react';

function Counter({ end, suffix = '', prefix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    const startValue = 0;
    const endValue = end;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(ease * (endValue - startValue) + startValue));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="font-black">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function ImpactMetrics() {
  const metrics = [
    {
      num: 120000,
      suffix: '+',
      label: 'Meals Saved',
      desc: 'Nutritious meals rescued and served',
      icon: Utensils,
      color: 'text-fresh-400',
    },
    {
      num: 450,
      suffix: '+',
      label: 'Active Donors',
      desc: 'Restaurants, caterers, and grocers',
      icon: Building2,
      color: 'text-trust-400',
    },
    {
      num: 48,
      suffix: ' Tons',
      label: 'Carbon Emissions Reduced',
      desc: 'CO₂ equivalent diverted from landfills',
      icon: CloudOff,
      color: 'text-earth-400',
    },
  ];

  return (
    <section id="impact" className="py-24 bg-gradient-to-b from-slate-900 to-trust-950 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-fresh-500/10 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-trust-500/10 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="relative z-10 section-container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="section-badge bg-white/10 text-fresh-300 border border-white/10">
            <Award className="w-3.5 h-3.5" />
            Real Impact in Numbers
          </span>
          <h2 className="section-title text-white mt-6">Every meal counts. Here is proof.</h2>
          <p className="section-subtitle text-slate-400">
            Transparent, auditable data from every donation made through FoodBridge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {metrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.15, duration: 0.5 }}
                className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center hover:bg-white/10 transition-colors"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/10 mx-auto flex items-center justify-center mb-6">
                  <Icon className={`w-7 h-7 ${metric.color}`} />
                </div>
                <div className={`text-5xl sm:text-6xl ${metric.color} tracking-tight`}>
                  <Counter end={metric.num} suffix={metric.suffix} />
                </div>
                <h3 className="text-xl font-bold text-white mt-4">{metric.label}</h3>
                <p className="text-sm text-slate-400 mt-2">{metric.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

