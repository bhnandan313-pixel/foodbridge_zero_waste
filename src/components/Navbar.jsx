import React, { useState, useEffect } from 'react';
import { UtensilsCrossed, Menu, X, HeartHandshake, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ onOpenModal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'The Problem', href: '#problem' },
    { label: 'Solution', href: '#solution' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Impact', href: '#impact' },
    { label: 'Stories', href: '#stories' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-sm border-b border-slate-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fresh-500 to-trust-600 flex items-center justify-center text-white shadow-md group-hover:shadow-lg group-hover:scale-105 transition-all duration-300">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <span className={`text-xl font-extrabold tracking-tight ${scrolled ? 'text-slate-900' : 'text-white'}`}>
                Food<span className="text-fresh-400">Bridge</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  scrolled
                    ? 'text-slate-600 hover:text-fresh-700 hover:bg-fresh-50/80'
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
              onClick={() => onOpenModal && onOpenModal('ngo')}
              className={`px-4 py-2 text-sm font-semibold transition-colors ${
                scrolled ? 'text-slate-700 hover:text-fresh-700' : 'text-slate-200 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => onOpenModal && onOpenModal('donor')}
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
                ? 'text-slate-600 hover:text-fresh-600 hover:bg-fresh-50'
                : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden bg-white rounded-2xl mt-2 shadow-xl border border-slate-100"
            >
              <div className="py-4 px-2 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between px-4 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:bg-fresh-50 hover:text-fresh-700 transition-colors"
                  >
                    {link.label}
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </a>
                ))}
                <div className="pt-3 mt-3 border-t border-slate-100 px-2 space-y-2">
                  <button
                    onClick={() => { setIsOpen(false); onOpenModal && onOpenModal('ngo'); }}
                    className="w-full py-2.5 text-sm font-semibold text-slate-700 bg-slate-100 rounded-xl"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { setIsOpen(false); onOpenModal && onOpenModal('donor'); }}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-fresh-600 to-fresh-500 rounded-xl"
                  >
                    <HeartHandshake className="w-4 h-4" />
                    Donate Food
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
