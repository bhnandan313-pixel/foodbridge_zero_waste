import React from 'react';
import { UtensilsCrossed, Mail, Phone, MapPin, Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900">
      <div className="section-container px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fresh-500 to-trust-600 flex items-center justify-center text-white shadow-md">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                Food<span className="text-fresh-400">Bridge</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Connecting surplus food from restaurants with NGOs.
              Zero waste, full plates, and stronger communities.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {['Twitter', 'LinkedIn', 'Instagram', 'Facebook'].map((net) => (
                <a
                  key={net}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-xs font-semibold transition-colors border border-slate-800"
                  aria-label={net}
                >
                  {net[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-white mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#problem" className="hover:text-fresh-400 transition-colors">The Problem</a></li>
              <li><a href="#solution" className="hover:text-fresh-400 transition-colors">Our Solution</a></li>
              <li><a href="#how-it-works" className="hover:text-fresh-400 transition-colors">How It Works</a></li>
              <li><a href="#impact" className="hover:text-fresh-400 transition-colors">Impact Metrics</a></li>
              <li><a href="#stories" className="hover:text-fresh-400 transition-colors">Community Stories</a></li>
            </ul>
          </div>

          {/* For Partners */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-white mb-4">Get Involved</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#cta" className="hover:text-fresh-400 transition-colors">Donate Food</a></li>
              <li><a href="#cta" className="hover:text-fresh-400 transition-colors">Partner as NGO</a></li>
              <li><a href="#cta" className="hover:text-fresh-400 transition-colors">Volunteer</a></li>
              <li><a href="#" className="hover:text-fresh-400 transition-colors">Corporate CSR</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-wider text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-fresh-400 shrink-0 mt-0.5" />
                <span>Bangalore, Karnataka, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-fresh-400 shrink-0" />
                <a href="mailto:hello@foodbridge.org" className="hover:text-white transition-colors">
                  hello@foodbridge.org
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-fresh-400 shrink-0" />
                <span>+91 (800) 555-FOOD</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for a zero-waste world.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

