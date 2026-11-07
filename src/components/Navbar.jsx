import React, { useState, useEffect } from 'react';
import { Menu, X, HeartHandshake, ChevronRight, Radar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { collection, doc, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import { db } from '../firebase';
import { ngos } from '../utils/demoData';

export default function Navbar({ onOpenSignIn, onOpenDonation, user, onLogout, setCurrentView }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDonationsCount, setActiveDonationsCount] = useState(0);
  const [seedStatus, setSeedStatus] = useState('');
  const isAdmin = String(user?.role ?? '').toLowerCase() === 'admin';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    const availableQuery = query(collection(db, 'donations'), where('status', '==', 'Available'));
    return onSnapshot(availableQuery, (snapshot) => setActiveDonationsCount(snapshot.size));
  }, []);

  const navLinks = [
    { label: 'The Problem', href: '#problem' },
    { label: 'Solution', href: '#solution' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Impact', href: '#impact' },
    { label: 'Stories', href: '#stories' },
  ];

  const seedDemoNGOs = async () => {
    try {
      await Promise.all(ngos.map((ngo) => setDoc(doc(db, 'users', ngo.id), {
        ...ngo,
        role: 'ngo',
        verified: true,
        demoEntity: true,
      })));
      setSeedStatus('Demo NGOs seeded');
    } catch (seedError) {
      setSeedStatus(seedError.message || 'Unable to seed demo NGOs');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080F1F]/95 backdrop-blur-xl shadow-sm border-b border-[#263650]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button type="button" onClick={() => setCurrentView?.('home')} className="flex items-center gap-2.5 group text-left">
            <img
              src="/annasethu-logo.png"
              alt="Anna_Sethu logo"
              className="w-10 h-10 rounded-xl object-cover shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300"
            />
            <div>
              <span className={`text-xl font-extrabold tracking-tight text-white`}>
                Anna<span className="text-emerald-400">_Sethu</span>
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  scrolled
                    ? 'text-[#94A3B8] hover:text-[#34D399] hover:bg-[#111D35]'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              onClick={() => setCurrentView?.('radar')}
              className={`relative grid h-10 w-10 place-items-center rounded-xl transition-colors ${
                scrolled ? 'text-slate-700 hover:bg-fresh-50' : 'text-white hover:bg-white/10'
              }`}
              aria-label={`Open Rescue Radar, ${activeDonationsCount} active donations`}
            >
              <Radar className="h-5 w-5" />
              {activeDonationsCount > 0 && (
                <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-fresh-400 ring-2 ring-slate-950 animate-pulse" />
              )}
            </button>
            {user ? (
              <div className="flex items-center gap-2">
                <span className={`max-w-32 truncate px-2 text-sm font-bold ${scrolled ? 'text-slate-800' : 'text-white'}`}>
                  Hi, {user.name}
                </span>
                <button
                  onClick={onLogout}
                  className={`px-3 py-2 text-sm font-semibold transition-colors ${
                    scrolled                     ? 'text-[#94A3B8] hover:text-red-400' : 'text-slate-200 hover:text-white'
                  }`}
                >
                  Log out
                </button>
              </div>
            ) : (
              <button
                onClick={() => onOpenSignIn && onOpenSignIn()}
                className={`px-4 py-2 text-sm font-semibold transition-colors ${
                  scrolled ? 'text-slate-700 hover:text-fresh-700' : 'text-slate-200 hover:text-white'
                }`}
              >
                Sign In
              </button>
            )}
            {isAdmin && (
              <button
                type="button"
                onClick={seedDemoNGOs}
                className="px-3 py-2 text-xs font-bold text-[#34D399] border border-[#263650] rounded-xl hover:bg-[#111D35] transition-colors"
                title={seedStatus}
              >
                {seedStatus || 'Seed Demo Data'}
              </button>
            )}
            <button
              onClick={() => onOpenDonation && onOpenDonation()}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-fresh-600 to-fresh-500 hover:from-fresh-700 hover:to-fresh-600 rounded-xl shadow-md shadow-fresh-200/50 hover:shadow-lg hover:shadow-fresh-300/50 transition-all duration-300 hover:scale-[1.03]"
            >
              <HeartHandshake className="w-4 h-4" />
              Donate Food
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled
                ? 'text-[#94A3B8] hover:text-[#34D399] hover:bg-[#111D35]'
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md"
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) setIsOpen(false);
              }}
            >
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                className="ml-auto flex h-[100dvh] w-[min(88vw,390px)] flex-col border-l border-slate-800 bg-[#080F1F] px-5 pb-6 pt-5 shadow-2xl"
              >
                <div className="mb-7 flex items-center justify-between border-b border-slate-800 pb-4">
                  <span className="text-lg font-black text-white">Menu</span>
                  <button type="button" onClick={() => setIsOpen(false)} className="grid h-11 w-11 place-items-center rounded-full border border-slate-800 text-slate-300" aria-label="Close menu">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <nav className="flex-1 overflow-y-auto">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex min-h-14 items-center justify-between border-b border-slate-800/70 px-1 text-base font-bold text-slate-200 active:text-[#34D399] transition-colors"
                  >
                    {link.label}
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </a>
                ))}
                </nav>
                <div className="mt-4 space-y-3 border-t border-[#263650] pt-4">
                  <button
                    type="button"
                    onClick={() => { setIsOpen(false); setCurrentView?.('radar'); }}
                    className="relative w-full inline-flex items-center justify-center gap-2 py-2.5 text-sm font-bold text-white bg-[#111D35] rounded-xl"
                  >
                    <Radar className="h-4 w-4" />
                    Rescue Radar
                    {activeDonationsCount > 0 && (
                      <span className="h-2 w-2 rounded-full bg-fresh-500 animate-pulse" />
                    )}
                  </button>
                  {user ? (
                    <>
                      <div className="px-1 py-2 text-sm font-bold text-slate-300">Hi, {user.name}</div>
                      <button
                        onClick={() => { setIsOpen(false); onLogout && onLogout(); }}
                        className="w-full py-2.5 text-sm font-semibold text-red-600 bg-red-50 rounded-xl"
                      >
                        Log out
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => { setIsOpen(false); onOpenSignIn && onOpenSignIn(); }}
                      className="w-full py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 rounded-xl"
                    >
                      Sign In
                    </button>
                  )}
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={seedDemoNGOs}
                      className="w-full py-2.5 text-xs font-bold text-[#34D399] bg-[#111D35] rounded-xl"
                    >
                      {seedStatus || 'Seed Demo Data'}
                    </button>
                  )}
                  <button
                    onClick={() => { setIsOpen(false); onOpenDonation && onOpenDonation(); }}
                    className="min-h-12 w-full inline-flex items-center justify-center gap-2 py-3 text-sm font-bold text-slate-950 bg-emerald-400 rounded-xl"
                  >
                    <HeartHandshake className="w-4 h-4" />
                    Donate Food
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
