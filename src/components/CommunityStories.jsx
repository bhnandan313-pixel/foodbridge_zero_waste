import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, MessageSquareHeart } from 'lucide-react';

const stories = [
  {
    id: 1,
    role: 'Restaurant Owner',
    name: 'Chef Rajesh Sharma',
    org: 'The Spice Pavilion, Bangalore',
    avatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&auto=format&fit=crop&q=80',
    quote:
      "Before FoodBridge, throwing away 20-30 portions every night broke my heart. Now, it takes us literally two minutes to log the surplus, and within an hour it's being served to children who need it. It's the most rewarding part of running a kitchen.",
  },
  {
    id: 2,
    role: 'NGO Volunteer Lead',
    name: 'Priya Narayanan',
    org: 'Asha Food Drive Foundation',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    quote:
      "FoodBridge transformed our operations. We used to spend half our day calling restaurants asking for donations. Now we get instant alerts, know exactly what's coming, and can plan our community distributions with dignity and reliability.",
  },
];

export default function CommunityStories() {
  const [current, setCurrent] = useState(0);

  // Auto-advance every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % stories.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % stories.length);
  const prev = () => setCurrent((prev) => (prev - 1 + stories.length) % stories.length);

  return (
    <section id="stories" className="section-padding bg-white overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-16">
          <span className="section-badge bg-fresh-100 text-fresh-700">
            <MessageSquareHeart className="w-3.5 h-3.5" />
            Voices from the Ground
          </span>
          <h2 className="section-title text-slate-900 mt-6">Community Stories</h2>
          <p className="section-subtitle">Real people making zero waste a daily reality.</p>
        </div>

        {/* Carousel Container */}
        <div className="max-w-4xl mx-auto relative">
          <div className="relative min-h-[340px] sm:min-h-[280px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={stories[current].id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="w-full bg-gradient-to-br from-slate-50 to-fresh-50/30 rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-sm"
              >
                <Quote className="w-10 h-10 text-fresh-400 mb-6" />

                <p className="text-lg sm:text-xl text-slate-700 leading-relaxed italic mb-8">
                  &ldquo;{stories[current].quote}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src={stories[current].avatar}
                    alt={stories[current].name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-fresh-400 shadow-sm"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{stories[current].name}</h4>
                    <p className="text-xs font-semibold text-fresh-700 uppercase tracking-wider">
                      {stories[current].role}
                    </p>
                    <p className="text-xs text-slate-500">{stories[current].org}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex gap-2">
              {stories.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => setCurrent(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    current === idx ? 'w-8 bg-fresh-600' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev/Next buttons */}
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="p-3 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                aria-label="Previous story"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="p-3 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                aria-label="Next story"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

