import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Utensils, Building2, HandHeart, Scale } from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

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
  const [impact, setImpact] = useState({
    meals: 1248,
    donors: 86,
    ngos: 24,
    kilograms: 680,
  });

  useEffect(() => {
    const unsubscribeDonations = onSnapshot(collection(db, 'donations'), (snapshot) => {
      let meals = 0;
      let kilograms = 0;

      snapshot.forEach((documentSnapshot) => {
        const donation = documentSnapshot.data();
        const status = String(donation.status || '').trim().toLowerCase();
        if (status !== 'delivered') return;

        const quantity = Number(donation.meals ?? donation.quantity ?? 0);
        if (String(donation.quantityUnit).toLowerCase() === 'kg') {
          kilograms += Number(donation.weightKg ?? quantity ?? 0);
        } else {
          meals += Number(quantity);
          kilograms += Number(donation.weightKg ?? donation.kilograms ?? quantity * 0.5);
        }
      });

      setImpact((current) => ({
        ...current,
        meals: 1248 + meals,
        kilograms: 680 + kilograms,
      }));
    });

    const unsubscribeUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      let donors = 0;
      let ngos = 0;

      snapshot.forEach((documentSnapshot) => {
        const role = String(documentSnapshot.data().role ?? '').toLowerCase();
        if (role === 'donor') donors += 1;
        if (role === 'ngo') ngos += 1;
      });

      setImpact((current) => ({
        ...current,
        donors: 86 + donors,
        ngos: 24 + ngos,
      }));
    });

    return () => {
      unsubscribeDonations();
      unsubscribeUsers();
    };
  }, []);

  const metrics = [
    {
      num: impact.meals,
      label: 'Meals Rescued',
      desc: 'Successfully redistributed, delivery confirmed',
      icon: Utensils,
      color: 'text-emerald-400',
    },
    {
      num: impact.donors,
      label: 'Food Donors',
      desc: 'Restaurants and businesses in our network',
      icon: Building2,
      color: 'text-emerald-400',
    },
    {
      num: impact.ngos,
      label: 'NGO Partners',
      desc: 'Verified participating organizations',
      icon: HandHeart,
      color: 'text-emerald-400',
    },
    {
      num: impact.kilograms,
      suffix: ' kg',
      label: 'Food Saved',
      desc: 'Delivery-confirmed food rescued',
      icon: Scale,
      color: 'text-emerald-400',
    },
  ];

  return (
    <section id="impact" className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-fresh-500/10 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-trust-500/10 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="relative z-10 section-container px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-emerald-500/40"></div>
            <span className="text-emerald-400 text-xs font-black tracking-[0.25em] uppercase">Our Impact</span>
            <div className="w-12 h-[2px] bg-emerald-500/40"></div>
          </div>
          <h2 className="section-title text-white mt-6">Every rescued meal makes a difference.</h2>
          <p className="section-subtitle text-slate-400">
            Live platform totals include only donations marked as successfully delivered.
          </p>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-emerald-400/80">
            Prototype baseline included
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.15, duration: 0.5 }}
                className="relative rounded-3xl border border-slate-800 bg-slate-900/50 p-8 text-center backdrop-blur-xl shadow-2xl shadow-emerald-900/10 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30"
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

        <div className="mt-16 max-w-3xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-black text-white">Our impact goes beyond numbers.</h3>
          <p className="mt-4 text-slate-400 leading-relaxed">
            Every successful food rescue represents resources saved, waste prevented, and another opportunity to serve a community.
          </p>
        </div>
      </div>
    </section>
  );
}
