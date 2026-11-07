import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';

export default function Footer({ onOpenSignIn, onOpenDonation }) {
  return (
    <footer className="relative overflow-x-hidden bg-slate-950 pb-16 pt-32">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Floating CTA Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative mb-24 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-900/50 p-8 shadow-2xl shadow-emerald-900/20 backdrop-blur-xl md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="max-w-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-emerald-500/40"></div>
              <span className="text-emerald-400 text-xs font-black tracking-[0.25em] uppercase">Join the Movement</span>
              <div className="w-12 h-[2px] bg-emerald-500/40"></div>
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-white leading-tight">
              The next meal you save could change someone&apos;s day.
            </h3>
            <p className="mt-5 max-w-xl text-slate-400 leading-relaxed">
              Whether you&apos;re a restaurant, an NGO, or someone who wants to make a difference, there&apos;s a place for you in Anna Sethu.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 md:w-auto">
            <button onClick={onOpenDonation} className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-emerald-400 px-7 py-4 font-bold text-slate-950 transition-all duration-300 hover:scale-105 hover:bg-emerald-300">
              Donate Surplus Food
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button onClick={() => onOpenSignIn?.('ngo')} className="inline-flex items-center justify-center rounded-2xl border border-slate-700 bg-slate-900 px-7 py-4 font-bold text-white transition-all duration-300 hover:border-emerald-400 hover:text-emerald-400">
              Become an NGO Partner →
            </button>
          </div>
        </motion.div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 gap-12 mb-16 md:grid-cols-2 lg:grid-cols-5">
          
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                <Heart className="text-slate-950 w-6 h-6 fill-slate-950" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">Anna<span className="text-fresh-400">_Sethu</span></span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Connecting surplus food with communities in need. Building a future where good food reaches people, not landfills.
            </p>
            <div className="flex gap-4">
              {['X', 'GH', 'in'].map((label) => (
                <a key={label} href="#" aria-label={label === 'in' ? 'LinkedIn' : label === 'GH' ? 'GitHub' : 'X'} className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-black text-slate-400 hover:text-emerald-400 hover:border-emerald-400 hover:bg-emerald-400/10 transition-all duration-300">
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {[
            { title: "Explore", links: ["Our Mission", "The Problem", "Our Solution", "How It Works", "Our Impact"] },
            { title: "Get Involved", links: ["Donate Food", "Partner as NGO", "Volunteer", "Community Stories"] },
            { title: "Resources", links: ["Food Safety Guidelines", "FAQs", "Help Centre", "Privacy Policy", "Terms of Service"] },
            { title: "Contact", links: ["hello@annasethu.org", "Bengaluru, India", "Contact the Team"] }
          ].map((column, idx) => (
            <div key={idx} className="flex flex-col gap-4">
              <h4 className="text-white font-bold tracking-wider uppercase text-sm mb-2">{column.title}</h4>
              {column.links.map((link, i) => (
                <a key={i} href="#" className="text-slate-400 text-sm hover:text-emerald-400 hover:translate-x-1 transition-all duration-300 w-fit">
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/50 pt-8 pb-24 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Anna Sethu. Built for Hackathon 2026.</p>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

      <div className="w-full overflow-hidden px-4 pb-8 text-center">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="select-none whitespace-nowrap text-[clamp(3rem,12vw,10rem)] font-black leading-[0.72] tracking-tighter text-slate-900"
          aria-hidden="true"
        >
          Anna_Sethu
        </motion.div>
      </div>
    </footer>
  );
}