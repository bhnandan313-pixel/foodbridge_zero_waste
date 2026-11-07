import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const stories = [
  {
    id: 1,
    category: 'From the Donors',
    role: 'Restaurant experience',
    name: 'Authorized donor story',
    org: 'Bengaluru restaurant network',
    location: 'Bengaluru, Karnataka',
    quote: 'A donor experience can show how surplus registration becomes a coordinated rescue while keeping food details and pickup information clear.',
  },
  {
    id: 2,
    category: 'From the NGOs',
    role: 'Distribution experience',
    name: 'Authorized NGO story',
    org: 'Verified hunger-relief partner',
    location: 'Location shared with permission',
    quote: 'An NGO experience can demonstrate how coordinated alerts, verified food details, and delivery confirmation support dignified community distribution.',
  },
  {
    id: 3,
    category: 'From the Communities',
    role: 'Community impact',
    name: 'Community story',
    org: 'Resident and volunteer network',
    location: 'Community location shared with permission',
    quote: 'Community stories can explain how reliable access to rescued food creates dignity, connection, and a better chance for every shared meal.',
  },
];

export default function CommunityStories() {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(null);

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
    <section id="stories" className="section-padding bg-slate-950 overflow-hidden">
      <div className="section-container">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[2px] bg-emerald-500/40"></div>
              <span className="text-emerald-400 text-xs font-black tracking-[0.25em] uppercase">Voices from the Ground</span>
              <div className="w-12 h-[2px] bg-emerald-500/40"></div>
            </div>
            <h2 className="section-title mt-6 text-white font-black tracking-tight">Real Stories. Real People. Real Impact.</h2>
            <p className="section-subtitle text-slate-400 leading-relaxed">Behind every rescued meal is a person, a community, and a story worth sharing.</p>
        </div>

        {/* Carousel Container */}
        <div
          className="max-w-4xl mx-auto relative touch-pan-y"
          onTouchStart={(event) => setTouchStart(event.changedTouches[0].clientX)}
          onTouchEnd={(event) => {
            if (touchStart === null) return;
            const distance = event.changedTouches[0].clientX - touchStart;
            if (Math.abs(distance) > 48) {
              if (distance > 0) prev();
              else next();
            }
            setTouchStart(null);
          }}
        >
          <div className="relative min-h-[360px] sm:min-h-[280px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={stories[current].id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="w-full bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl shadow-emerald-900/10"
              >
                <Quote className="w-10 h-10 text-emerald-400 mb-6" />

                <span className="block mb-4 text-xs font-black uppercase tracking-[0.2em] text-emerald-400">
                  {stories[current].category}
                </span>
                <p className="text-lg sm:text-xl text-slate-300 leading-relaxed italic mb-8">
                  {stories[current].quote}
                </p>
                <p className="mb-8 text-xs text-slate-500">
                  Illustrative format — publish only with participant authorization and a permissioned photograph.
                </p>

                <div className="flex items-center gap-4">
                  <div>
                    <h4 className="font-bold text-white text-base">{stories[current].name}</h4>
                    <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                      {stories[current].role}
                    </p>
                    <p className="text-xs text-slate-400">{stories[current].org}</p>
                    <p className="text-xs text-slate-500">{stories[current].location}</p>
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
                    current === idx ? 'w-8 bg-emerald-400' : 'w-2.5 bg-slate-700 hover:bg-slate-600'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev/Next buttons */}
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="p-3 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:border-emerald-400 hover:text-emerald-400 transition-colors"
                aria-label="Previous story"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                className="p-3 rounded-full bg-slate-900 border border-slate-700 text-slate-300 hover:border-emerald-400 hover:text-emerald-400 transition-colors"
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
