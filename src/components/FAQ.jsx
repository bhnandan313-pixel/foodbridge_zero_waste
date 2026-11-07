import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle, HeartHandshake, ShieldCheck } from 'lucide-react';

const faqs = [
  {
    q: 'How quickly is surplus food picked up?',
    a: 'Once a donation is posted, nearby verified NGOs receive an immediate push alert. Typically, matching and pickup happen within 30 to 60 minutes for cooked meals.',
  },
  {
    q: 'What types of food can be donated?',
    a: 'We accept cooked meals from restaurants, banquet halls, and caterers, as well as surplus packaged goods, fresh produce, and bakery items from supermarkets and grocers.',
  },
  {
    q: 'How is food safety and hygiene maintained?',
    a: 'Every donor signs our strict Food Hygiene Pledge. Volunteers and NGOs perform visual, smell, and temperature checks upon pickup, utilizing food-grade insulated bags and vans.',
  },
  {
    q: 'Are food donations eligible for tax benefits in India?',
    a: 'Yes! Donations coordinated through FoodBridge to registered NGOs receive an automated 80G tax receipt and an end-of-year corporate social impact summary.',
  },
  {
    q: 'Is there any cost for NGOs or restaurants to use FoodBridge?',
    a: 'No. FoodBridge is 100% free for both food donors and hunger relief organizations. Our logistics and platform operations are powered by community sponsors and CSR partnerships.',
  },
];

export default function FAQ({ onOpenModal }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="section-padding bg-slate-50/70">
      <div className="section-container max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="section-badge bg-trust-100 text-trust-700">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </span>
          <h2 className="section-title text-slate-900 mt-6">Got questions? We have answers.</h2>
          <p className="section-subtitle">
            Everything you need to know about safety, logistics, tax benefits, and participation.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 pr-4">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-fresh-100 text-fresh-700 rotate-180' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Help Card */}
        <div className="mt-12 bg-gradient-to-r from-trust-900 to-fresh-900 text-white rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-fresh-300 shrink-0 mx-auto sm:mx-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold">Have a specific partnership or bulk query?</h4>
              <p className="text-xs sm:text-sm text-slate-300">Speak directly with our regional disaster relief and food rescue teams.</p>
            </div>
          </div>
          <button
            onClick={() => onOpenModal && onOpenModal('ngo')}
            className="px-6 py-3 bg-fresh-500 hover:bg-fresh-600 text-slate-950 font-bold rounded-xl text-sm transition-all shrink-0 shadow-lg shadow-fresh-500/20"
          >
            Contact Team
          </button>
        </div>
      </div>
    </section>
  );
}

