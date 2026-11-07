import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Building2, Eye, EyeOff, HeartHandshake, LockKeyhole, Mail, UserRound, X } from 'lucide-react';

const roles = [
  {
    id: 'donor',
    label: 'Food Donor',
    description: 'Restaurants, hotels and food businesses',
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85',
    alt: 'Restaurant team preparing meals for delivery',
    accent: 'fresh',
  },
  {
    id: 'ngo',
    label: 'NGO / Shelter',
    description: 'Receive and distribute rescued meals',
    icon: HeartHandshake,
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=1200&q=85',
    alt: 'Community volunteers serving food',
    accent: 'trust',
  },
  {
    id: 'volunteer',
    label: 'Volunteer',
    description: 'Help collect and deliver food',
    icon: UserRound,
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=85',
    alt: 'Volunteer helping children receive food',
    accent: 'earth',
  },
];

export default function SignInModal({ isOpen, onClose, defaultRole = 'donor', onSignedIn }) {
  const [activeRole, setActiveRole] = useState(defaultRole);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const closeTimerRef = useRef(null);
  const active = roles.find((role) => role.id === activeRole);

  useEffect(() => {
    if (isOpen) setActiveRole(defaultRole);
  }, [defaultRole, isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const endpoint = mode === 'register' ? '/api/auth/register' : '/api/auth/login';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, role: activeRole }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to sign in.');

      if (mode === 'register' || mode === 'login') {
        localStorage.setItem('foodbridge_token', data.token);
        localStorage.setItem('foodbridge_user', JSON.stringify(data.user));
        onSignedIn?.(data.user);
        setMessage(`Welcome, ${data.user.name}!`);
        closeTimerRef.current = window.setTimeout(onClose, 800);
      }
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!form.email) {
      setError('Enter your email address first.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to request password reset.');
      setMessage(data.message);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTilt = (event) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    setTilt({ rotateX: y * -7, rotateY: x * 7 });
  };

  const resetTilt = () => setTilt({ rotateX: 0, rotateY: 0 });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] grid place-items-center overflow-y-auto bg-slate-950/75 p-3 backdrop-blur-sm sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-label="Anna Sethu sign in"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseMove={handleTilt}
          onMouseLeave={resetTilt}
          style={{
            transformStyle: 'preserve-3d',
            transform: `perspective(1200px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
          }}
          className="signin-tilt-card relative grid max-h-[calc(100vh-24px)] w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/95 shadow-2xl shadow-emerald-900/10 backdrop-blur-xl sm:max-h-[calc(100vh-48px)] lg:grid-cols-[1.05fr_.95fr]"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-white/95 text-slate-700 shadow-md transition-colors hover:bg-slate-100"
            aria-label="Close sign in"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="relative hidden min-h-[620px] overflow-hidden lg:block">
            <AnimatePresence mode="wait">
              <motion.img
                key={active.id}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
                src={active.image}
                alt={active.alt}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-trust-950 via-trust-950/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-10 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-fresh-300">Welcome to Anna Sethu</p>
              <p className="mt-3 max-w-md text-3xl font-black leading-tight">
                Turn surplus food into someone&apos;s next meal.
              </p>
            </div>
          </div>

          <div className="flex min-h-0 flex-col overflow-y-auto p-5 sm:p-8 lg:max-h-[620px] lg:p-9">
            <div className="mb-5 lg:mb-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-fresh-600">Partner sign in</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Welcome back</h2>
              <p className="mt-2 text-sm text-slate-500">Choose your Anna Sethu account type to continue.</p>
            </div>

            <div className="mb-5 grid grid-cols-3 gap-2">
              {roles.map((role) => {
                const Icon = role.icon;
                const selected = activeRole === role.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setActiveRole(role.id)}
                    className={`flex min-w-0 items-center justify-center gap-2 rounded-xl border p-2.5 text-center transition-all ${
                      selected
                        ? 'border-fresh-500 bg-fresh-50 text-fresh-800 ring-1 ring-fresh-500'
                        : 'border-slate-200 text-slate-600 hover:border-fresh-300 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`h-5 w-5 shrink-0 ${selected ? 'text-fresh-600' : 'text-slate-400'}`} />
                    <span>
                      <span className="block truncate text-[11px] font-bold text-slate-900 sm:text-xs">{role.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <img
              key={`${active.id}-mobile`}
              src={active.image}
              alt={active.alt}
              className="mb-5 h-36 w-full rounded-2xl object-cover lg:hidden"
            />

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-slate-700">Full name</span>
                  <input
                    required
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-fresh-500 focus:ring-2 focus:ring-fresh-100"
                  />
                </label>
              )}
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-slate-700">Email address</span>
                <span className="relative block">
                  <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                    placeholder="you@annasethu.org"
                    className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition-shadow focus:border-fresh-500 focus:ring-2 focus:ring-fresh-100"
                  />
                </span>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-bold text-slate-700">Password</span>
                <span className="relative block">
                  <LockKeyhole className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    required
                    type={showPassword ? 'text' : 'password'}
                    minLength={8}
                    value={form.password}
                    onChange={(event) => setForm({ ...form, password: event.target.value })}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-11 text-sm outline-none transition-shadow focus:border-fresh-500 focus:ring-2 focus:ring-fresh-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-md text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </span>
              </label>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-slate-600">
                  <input type="checkbox" className="rounded border-slate-300 text-fresh-600 focus:ring-fresh-500" />
                  Remember me
                </label>
                <button type="button" onClick={handleForgotPassword} className="font-bold text-fresh-700 hover:text-fresh-800">
                  Forgot password?
                </button>
              </div>

              {(error || message) && (
                <p className={`rounded-xl px-3 py-2 text-xs font-semibold ${error ? 'bg-red-50 text-red-700' : 'bg-fresh-50 text-fresh-700'}`}>
                  {error || message}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-fresh-600 to-fresh-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-fresh-200 transition-transform hover:-translate-y-0.5"
              >
                {loading ? 'Please wait...' : `${mode === 'register' ? 'Create account' : 'Sign in'} as ${active.label}`}
              </button>
            </form>
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'login' ? 'register' : 'login');
                setError('');
                setMessage('');
              }}
              className="mt-4 text-center text-xs font-bold text-slate-500 hover:text-fresh-700"
            >
              {mode === 'login' ? 'New to Anna Sethu? Create an account' : 'Already have an account? Sign in'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
