import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const collageImages = [
  {
    src: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=900&q=85',
    className: 'left-[8%] top-[12%] h-[42%] w-[30%] -rotate-3',
    delay: 2.2,
  },
  {
    src: 'https://images.unsplash.com/photo-1593113565771-8e2c2b5ff6f5?auto=format&fit=crop&w=900&q=85',
    className: 'right-[7%] top-[18%] h-[38%] w-[28%] rotate-2',
    delay: 2.55,
  },
  {
    src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=900&q=85',
    className: 'bottom-[8%] left-[18%] h-[35%] w-[27%] rotate-2',
    delay: 2.9,
  },
  {
    src: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
    className: 'bottom-[10%] right-[16%] h-[34%] w-[29%] -rotate-2',
    delay: 3.25,
  },
];

const purposeWords = "Thank you for dedicating your time to something bigger.".split(' ');

export default function WelcomeLoader({ isVisible, onComplete }) {
  const [phase, setPhase] = useState('welcome');
  const completionRef = useRef(onComplete);

  useEffect(() => {
    completionRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!isVisible) {
      setPhase('welcome');
      return undefined;
    }

    const purposeTimer = window.setTimeout(() => setPhase('purpose'), 2200);
    const actionTimer = window.setTimeout(() => setPhase('action'), 7800);
    const completeTimer = window.setTimeout(() => completionRef.current?.(), 10800);

    return () => {
      window.clearTimeout(purposeTimer);
      window.clearTimeout(actionTimer);
      window.clearTimeout(completeTimer);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9 }}
        className="fixed inset-0 z-[110] flex items-center justify-center overflow-hidden bg-slate-950/95 backdrop-blur-2xl"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.12),_transparent_45%)]" />

        <div className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(2,6,23,0.96)_0%,rgba(2,6,23,0.72)_18%,transparent_38%,transparent_62%,rgba(2,6,23,0.72)_82%,rgba(2,6,23,0.96)_100%)]" />

        {phase !== 'welcome' && collageImages.map((image) => (
          <motion.img
            key={image.src}
            src={image.src}
            alt=""
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.82, filter: 'blur(8px)' }}
            animate={{ opacity: 0.28, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 3, delay: image.delay - 2.2, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute z-[2] rounded-3xl object-cover shadow-2xl ring-1 ring-white/10 ${image.className}`}
          />
        ))}

        <div className="relative z-10 max-w-4xl px-8 text-center">
          <AnimatePresence mode="wait">
            {phase === 'welcome' && (
              <motion.p
                key="welcome"
                initial={{ opacity: 0, scale: 0.96, letterSpacing: '0.02em' }}
                animate={{ opacity: 1, scale: 1, letterSpacing: '-0.03em' }}
                exit={{ opacity: 0, y: -18, filter: 'blur(8px)' }}
                transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl font-black text-white sm:text-6xl lg:text-7xl"
              >
                Welcome to Anna Sethu.
              </motion.p>
            )}
            {phase === 'purpose' && (
              <motion.p
                key="purpose"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl"
              >
                {purposeWords.map((word, index) => (
                  <motion.span
                    key={`${word}-${index}`}
                    initial={{ opacity: 0, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 0.85, delay: 0.35 + index * 0.42 }}
                    className="mr-[0.22em] inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.p>
            )}
            {phase === 'action' && (
              <motion.p
                key="action"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl font-black text-fresh-400 sm:text-6xl lg:text-7xl"
              >
                <motion.span
                  animate={{
                    opacity: [1, 1, 0],
                    filter: ['blur(0px)', 'blur(0px)', 'blur(12px)'],
                    y: [0, 0, -8],
                    letterSpacing: ['-0.03em', '-0.03em', '0.08em'],
                  }}
                  transition={{ duration: 3.6, times: [0, 0.65, 1], ease: 'easeInOut', delay: 0.35 }}
                  className="inline-block"
                >
                  Let&apos;s rescue some food.
                </motion.span>
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
