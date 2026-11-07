import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, Home, Utensils } from "lucide-react";

const communityFaces = [
  { id: 1, url: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=100&q=80", x: -60, y: -40, delay: 0.1 },
  { id: 2, url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80", x: 60, y: -20, delay: 0.3 },
  { id: 3, url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80", x: 0, y: -70, delay: 0.5 },
];

export default function DonationLoader({ isVisible, onComplete, matchedNgo, volunteerName }) {
  const [stage, setStage] = useState(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!isVisible) {
      setStage(0);
      return undefined;
    }

    const timers = [
      window.setTimeout(() => setStage(1), 800),
      window.setTimeout(() => setStage(2), 2400),
      window.setTimeout(() => setStage(3), 4200),
      window.setTimeout(() => onCompleteRef.current?.(), 7500),
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-xl"
      >
        <div className="relative flex w-full max-w-2xl flex-col items-center px-6 py-12 text-center">
          <div className="pointer-events-none absolute left-1/2 top-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative mb-8 flex h-64 w-full max-w-md items-end justify-between px-4 pb-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 flex flex-col items-center gap-2"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 p-4 shadow-lg shadow-orange-500/20">
                <Utensils className="h-8 w-8 text-white" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-orange-200">Your Kitchen</span>
            </motion.div>

            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 400 250" fill="none">
              <path
                d="M 60,150 C 150,30 250,30 340,150"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="8 6"
              />
              {stage >= 1 && (
                <motion.path
                  d="M 60,150 C 150,30 250,30 340,150"
                  stroke="url(#hope-gradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2.8, ease: "easeInOut" }}
                />
              )}
              <defs>
                <linearGradient id="hope-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="50%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>

            {stage >= 1 && stage < 3 && (
              <motion.div
                className="absolute z-20"
                initial={{ offsetDistance: "0%" }}
                animate={{ offsetDistance: "100%" }}
                transition={{ duration: 3.2, ease: "easeInOut" }}
                style={{ offsetPath: "path('M 60,150 C 150,30 250,30 340,150')", position: "absolute" }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/50"
                >
                  <Heart className="h-5 w-5 fill-white text-white" />
                </motion.div>
              </motion.div>
            )}

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative z-10 flex flex-col items-center gap-2"
            >
              <AnimatePresence>
                {stage >= 3 && communityFaces.map((face) => (
                  <motion.div
                    key={face.id}
                    initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                    animate={{ scale: 1, opacity: 1, x: face.x, y: face.y }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", bounce: 0.6, delay: face.delay }}
                    className="absolute z-30"
                  >
                    <div className="relative">
                      <img
                        src={face.url}
                        alt="Thankful recipient"
                        className="h-12 w-12 rounded-full border-2 border-emerald-400 object-cover shadow-lg"
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: face.delay + 0.3 }}
                        className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-2 py-0.5 text-[9px] font-bold text-emerald-600 shadow-md"
                      >
                        Thank You!
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <motion.div
                animate={stage >= 3 ? { scale: [1, 1.15, 1] } : {}}
                className={`relative z-20 flex h-16 w-16 items-center justify-center rounded-2xl p-4 transition-all duration-500 ${
                  stage >= 3
                    ? "bg-gradient-to-tr from-emerald-500 to-teal-400 shadow-[0_0_30px_rgba(16,185,129,0.5)]"
                    : "border border-slate-700 bg-slate-800 text-slate-400"
                }`}
              >
                <Home className="h-8 w-8 text-white" />
              </motion.div>
              <span className={`text-xs font-semibold uppercase tracking-wider ${stage >= 3 ? "text-emerald-300" : "text-slate-400"}`}>
                Those in Need
              </span>
            </motion.div>
          </div>

          <div className="mx-auto mt-4 h-24 max-w-md">
            <AnimatePresence mode="wait">
              {stage === 0 && (
                <motion.div key="s0" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold text-white">Carefully Packaging...</h3>
                </motion.div>
              )}
              {stage === 1 && (
                <motion.div key="s1" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold text-emerald-400">Finding Safe Passage</h3>
                  {matchedNgo && (
                    <p className="text-sm font-medium text-slate-300">
                      Matched with: {matchedNgo.ngoName} ({matchedNgo.distanceKm.toFixed(1)} km away). Driver {volunteerName} is available.
                    </p>
                  )}
                </motion.div>
              )}
              {stage === 2 && (
                <motion.div key="s2" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} className="flex flex-col gap-2">
                  <h3 className="text-xl font-bold text-emerald-300">Food is on the Way</h3>
                </motion.div>
              )}
              {stage === 3 && (
                <motion.div key="s3" initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-col gap-2">
                  <h3 className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-2xl font-black text-transparent">
                    Nourishment Delivered!
                  </h3>
                  <p className="text-sm font-medium text-slate-200">Real people are enjoying a hot meal because of you today.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
