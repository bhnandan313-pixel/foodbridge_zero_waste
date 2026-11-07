import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, ExternalLink, LoaderCircle, MapPin, Users, PackageCheck, Truck, UtensilsCrossed, HeartHandshake } from 'lucide-react';
import { collection, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { ngos } from '../utils/demoData';

const demoNgoMarkers = ngos.slice(0, 4).map((ngo, index) => ({
  id: `ngo-${index}`,
  name: ngo.name,
}));

function RescueCard({ donation, onClaim, index }) {
  const [claimStatus, setClaimStatus] = useState('idle'); // 'idle' | 'claiming' | 'secured'
  const securedTimer = useRef(null);
  const claimTimer = useRef(null);

  useEffect(() => () => {
    clearTimeout(securedTimer.current);
    clearTimeout(claimTimer.current);
  }, []);

  const handleClaimClick = () => {
    if (claimStatus !== 'idle') return;

    setClaimStatus('claiming');
    securedTimer.current = setTimeout(() => setClaimStatus('secured'), 1500);
    claimTimer.current = setTimeout(async () => {
      try {
        await onClaim(donation.id);
      } catch {
        setClaimStatus('idle');
      }
    }, 3000);
  };

  const meals = Number(donation.meals ?? 0);
  const type = String(donation.foodType || 'Prepared meal').toLowerCase();
  const availableUntil = donation.bestBefore
    ? new Date(donation.bestBefore).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })
    : 'Pickup window pending';
  const typeBadge = /bread|bak|pastry/.test(type)
    ? 'bg-amber-300 text-amber-950'
    : /fruit|vegetable|produce/.test(type)
      ? 'bg-orange-400 text-orange-950'
      : 'bg-fresh-300 text-fresh-950';

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: -8 }}
      transition={{ layout: { duration: 0.35 }, delay: index * 0.045 }}
      whileHover={claimStatus === 'idle' ? { y: -6 } : undefined}
      className={`group relative flex min-h-[250px] flex-col rounded-[1.35rem] border bg-white/[0.055] p-5 backdrop-blur-xl transition-all duration-500 ${
        claimStatus === 'secured'
          ? 'border-fresh-400 shadow-[0_0_30px_rgba(16,185,129,0.6)]'
          : 'border-white/[0.09] shadow-[0_18px_50px_rgba(0,0,0,.22)]'
      }`}
    >
      {claimStatus === 'secured' && (
        <motion.div
          className="pointer-events-none absolute inset-x-10 bottom-16 h-10 rounded-full border-2 border-fresh-400"
          animate={{ scale: [1, 2], opacity: [0.5, 0] }}
          transition={{ duration: 1.1, repeat: 1, ease: 'easeOut' }}
        />
      )}

      <div className="flex items-start justify-between gap-4">
        <span className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] ${typeBadge}`}>
          {donation.foodType || 'Prepared'}
        </span>
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.05] text-fresh-300">
          <UtensilsCrossed className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-5">
        <p className="text-4xl font-black tracking-tight text-white sm:text-[2.7rem]">
          {meals} <span className="text-xl font-bold text-slate-300">Meals</span>
        </p>
        <div className="mt-3 flex min-w-0 items-center gap-2 text-xs text-slate-400">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-fresh-300" />
          <span className="truncate">{donation.pickupLocation || 'Pickup location pending'}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-400">
          <span>Available until: <strong className="text-slate-300">{availableUntil}</strong></span>
          <span>Status: <strong className="text-emerald-400">{donation.status || 'Available'}</strong></span>
        </div>
        {donation.pickupLocation && (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(donation.pickupLocation)}`}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-fresh-300 hover:text-fresh-200"
          >
            Open in Maps
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>

      <div className="relative mt-auto">
        {claimStatus === 'secured' && (
          <motion.div
            className="absolute inset-0 rounded-xl border border-fresh-300"
            animate={{ scale: [1, 1.9], opacity: [0.8, 0] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
        <button
          type="button"
          disabled={claimStatus !== 'idle'}
          onClick={handleClaimClick}
          className={`relative z-10 flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-sm font-bold transition-all duration-300 ${
            claimStatus === 'secured'
              ? 'border-fresh-400 bg-fresh-400 text-slate-950 shadow-[0_0_30px_rgba(16,185,129,0.6)]'
              : claimStatus === 'claiming'
                ? 'border-fresh-400/50 bg-fresh-400/10 text-fresh-300'
                : 'border-fresh-400/70 text-fresh-300 hover:bg-fresh-400 hover:text-slate-950'
          } disabled:cursor-not-allowed`}
        >
          {claimStatus === 'secured' ? (
            <>
              <CheckCircle2 className="h-4 w-4" />
              Rescue Secured! 🚚
            </>
          ) : claimStatus === 'claiming' ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Securing Route...
            </>
          ) : (
            'Claim Rescue'
          )}
        </button>
      </div>
    </motion.article>
  );
}

export default function NgoDashboard({ setCurrentView }) {
  const [donations, setDonations] = useState([]);
  const [allDonations, setAllDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [ngoCount, setNgoCount] = useState(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'donations'),
      (snapshot) => {
        const allDonations = snapshot.docs.map((donation) => ({
          id: donation.id,
          ...donation.data(),
        }));
        setAllDonations(allDonations);
        setDonations(allDonations.filter((donation) => donation.status === 'Available'));
        setLoading(false);
      },
      (snapshotError) => {
        setError(snapshotError.message || 'Unable to listen for available donations.');
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  useEffect(() => {
    return onSnapshot(collection(db, 'users'), (snapshot) => {
      setNgoCount(snapshot.docs.filter((item) => String(item.data().role ?? '').toLowerCase() === 'ngo').length);
    });
  }, []);

  const handleClaim = async (donationId) => {
    await updateDoc(doc(db, 'donations', donationId), { status: 'Claimed' });
  };

  const activePickups = allDonations.filter((donation) => donation.status === 'Claimed').length;
  const completedRescues = allDonations.filter((donation) => donation.status === 'Delivered').length;
  const radarStats = [
    { label: 'Available Donations', value: donations.length, icon: PackageCheck },
    { label: 'Nearby NGOs', value: ngoCount, icon: Users },
    { label: 'Active Pickups', value: activePickups, icon: Truck },
    { label: 'Completed Rescues', value: completedRescues, icon: HeartHandshake },
  ];

  return (
    <div className="min-h-screen bg-slate-950 pb-12 pt-24">
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(52,211,153,0.09),_transparent_32%)]" />
      <div className="relative mx-auto max-w-7xl">
        <button
          type="button"
          onClick={() => setCurrentView?.('home')}
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-300 transition-colors hover:text-fresh-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </button>
        <div className="mb-9 flex items-end justify-between gap-6 border-b border-white/[0.08] pb-7">
          <div>
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fresh-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-fresh-400" />
              </span>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-fresh-300">Live network</p>
            </div>
            <h2 className="mt-2 text-4xl font-black tracking-tight text-white sm:text-5xl">Rescue Radar</h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm leading-relaxed text-slate-400 md:block">
            Find food. Find partners. Make every rescue count.
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-400/20 bg-red-400/[0.08] px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <div className="mb-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {radarStats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="rounded-2xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-3">
                <p className="text-3xl font-black text-white">{value}</p>
                <Icon className="h-5 w-5 text-emerald-400" />
              </div>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-400">{label}</p>
            </div>
          ))}
        </div>

        <div className="mb-10 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/50 p-3">
          <div className="relative h-[260px] overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.14),_transparent_45%),linear-gradient(rgba(15,23,42,0.92),rgba(15,23,42,0.92))]">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(148,163,184,.25) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.25) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
            <div className="absolute inset-x-0 top-5 text-center">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">Bengaluru Rescue Network</p>
            </div>
            {[...donations.slice(0, 5), ...demoNgoMarkers].map((item, index) => (
              <a
                key={`${item.id || item.name}-${index}`}
                href={item.pickupLocation ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.pickupLocation)}` : 'https://www.google.com/maps/search/?api=1&query=verified+NGO+Bengaluru'}
                target="_blank"
                rel="noreferrer"
                aria-label={item.pickupLocation || item.name || 'Rescue network location'}
                className={`absolute grid h-8 w-8 place-items-center rounded-full border-2 text-white shadow-lg transition-transform hover:scale-125 ${item.pickupLocation ? 'border-orange-300 bg-orange-500' : 'border-emerald-300 bg-emerald-600'}`}
                style={{ left: `${18 + ((index * 17) % 68)}%`, top: `${30 + ((index * 23) % 48)}%` }}
              >
                <span className="h-2 w-2 rounded-full bg-white" />
              </a>
            ))}
          </div>
        </div>

        {!loading && donations.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid min-h-[280px] place-items-center text-center"
          >
            <div>
              <div className="relative mx-auto grid h-20 w-20 place-items-center">
                {[0, 1].map((ring) => (
                  <motion.div
                    key={ring}
                    className="absolute inset-0 rounded-full border border-fresh-400/35"
                    animate={{ scale: [0.55, 1.2], opacity: [0.75, 0] }}
                    transition={{ duration: 2.2, delay: ring * 1.1, repeat: Infinity, ease: 'easeOut' }}
                  />
                ))}
                <div className="h-2.5 w-2.5 rounded-full bg-fresh-400 shadow-[0_0_18px_rgba(52,211,153,.9)]" />
              </div>
              <h3 className="mt-7 text-xl font-black text-white">No active food rescues nearby.</h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-slate-400">
                Good food is waiting to be shared. Check back soon or help us grow the network.
              </p>
              <button
                type="button"
                onClick={() => setCurrentView?.('home')}
                className="mt-6 rounded-xl bg-emerald-400 px-6 py-3 text-sm font-bold text-slate-950 transition-all hover:bg-emerald-300"
              >
                Become a Food Donor
              </button>
            </div>
          </motion.div>
        )}

        {donations.length > 0 && (
          <motion.div layout className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {donations.map((donation, index) => (
                <RescueCard
                  key={donation.id}
                  donation={donation}
                  onClaim={handleClaim}
                  index={index}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
    </div>
  );
}
