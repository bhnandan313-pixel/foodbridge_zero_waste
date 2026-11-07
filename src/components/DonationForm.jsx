import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MapPin, UtensilsCrossed, X } from 'lucide-react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import DonationLoader from './DonationLoader';
import { findNearestNGO } from '../utils/matchingAlgo';
import { volunteer } from '../utils/demoData';

export default function DonationForm({ isOpen, onClose, user, onAuthenticationRequired }) {
  const [foodType, setFoodType] = useState('');
  const [meals, setMeals] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [foodCategory, setFoodCategory] = useState('');
  const [foodDescription, setFoodDescription] = useState('');
  const [quantityUnit, setQuantityUnit] = useState('meals');
  const [preparationTime, setPreparationTime] = useState('');
  const [bestBefore, setBestBefore] = useState('');
  const [storageCondition, setStorageCondition] = useState('');
  const [allergens, setAllergens] = useState('');
  const [packaging, setPackaging] = useState('');
  const [pickupStart, setPickupStart] = useState('');
  const [pickupEnd, setPickupEnd] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [error, setError] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [matchDetails, setMatchDetails] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setError('');
      setShowLoader(false);
      setMatchDetails(null);
    }
  }, [isOpen]);

  const handleDonate = async (event) => {
    event.preventDefault();
    setError('');

    if (!user) {
      onClose?.();
      onAuthenticationRequired?.();
      return;
    }

    try {
      const preparedAt = new Date(preparationTime);
      const safeUntil = new Date(bestBefore);
      const pickupFrom = new Date(pickupStart);
      const pickupTo = new Date(pickupEnd);
      const now = new Date();

      if (Number.isNaN(preparedAt.getTime()) || preparedAt > now) {
        throw new Error('Preparation time cannot be in the future.');
      }
      if (Number.isNaN(safeUntil.getTime()) || safeUntil <= now) {
        throw new Error('The best-before or safe distribution deadline has expired.');
      }
      if (pickupTo <= pickupFrom) {
        throw new Error('Pickup end time must be after pickup start time.');
      }
      if (pickupTo > safeUntil) {
        throw new Error('The pickup window must end before the safe distribution deadline.');
      }

      const matchedNgo = findNearestNGO(`${foodCategory} ${foodDescription}`, quantityUnit === 'meals' ? Number(meals) : 0);
      setMatchDetails({
        ngoName: matchedNgo.name,
        distanceKm: matchedNgo.distanceKm,
        volunteerName: `${volunteer.name} (${volunteer.role})`,
        matchConfidence: matchedNgo.matchConfidence,
      });
      await addDoc(collection(db, 'donations'), {
        foodType: foodCategory || foodType,
        foodCategory,
        foodDescription,
        meals: Number(meals),
        quantity: Number(meals),
        quantityUnit,
        weightKg: quantityUnit === 'kg' ? Number(meals) : null,
        preparationTime,
        bestBefore,
        storageCondition,
        allergens: allergens.trim() || 'None declared',
        packaging,
        pickupWindow: { start: pickupStart, end: pickupEnd },
        pickupLocation,
        contactNumber,
        status: 'Available',
        createdAt: serverTimestamp(),
        matchedNgoName: matchedNgo.name,
        matchedNgoDistanceKm: matchedNgo.distanceKm,
        matchConfidence: matchedNgo.matchConfidence,
        volunteerName: volunteer.name,
        volunteerRole: volunteer.role,
      });
      setShowLoader(true);
    } catch (submitError) {
      setError(submitError.message || 'Unable to submit your donation. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {!showLoader && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] grid place-items-center bg-slate-950/75 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Donate surplus food"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-slate-800 bg-slate-900/50 shadow-2xl shadow-emerald-900/10 backdrop-blur-xl"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-slate-700 bg-slate-900 text-slate-400 shadow-md hover:text-white"
              aria-label="Close donation form"
            >
              <X className="h-5 w-5" />
            </button>

            <form onSubmit={handleDonate} className="p-7 sm:p-9">
              <div className="mb-7 grid h-14 w-14 place-items-center rounded-2xl bg-emerald-400 text-slate-950">
                <UtensilsCrossed className="h-7 w-7" />
              </div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-emerald-400">Surplus food donation</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight text-white">Give Good Food a Second Chance.</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Tell us what food is available. We&apos;ll help connect your donation with a nearby verified organization.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-slate-300">Food category</span>
                  <select required value={foodCategory} onChange={(event) => { setFoodCategory(event.target.value); setFoodType(event.target.value); }} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400">
                    <option value="">Select category</option>
                    {['Cooked meals', 'Groceries', 'Fruits', 'Vegetables', 'Bakery', 'Packaged food'].map((category) => <option key={category}>{category}</option>)}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-slate-300">Food description</span>
                  <input
                    required
                    value={foodDescription}
                    onChange={(event) => setFoodDescription(event.target.value)}
                    placeholder="Rice, vegetable curry, bread..."
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-slate-300">Quantity</span>
                  <input
                    required
                    min="1"
                    step="1"
                    type="number"
                    value={meals}
                    onChange={(event) => setMeals(event.target.value)}
                    placeholder={quantityUnit === 'meals' ? 'e.g. 25' : 'e.g. 12'}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-slate-300">Quantity unit</span>
                  <select value={quantityUnit} onChange={(event) => setQuantityUnit(event.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400">
                    <option value="meals">Meals</option>
                    <option value="kg">Kilograms</option>
                  </select>
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-slate-300">Preparation time</span>
                  <input required type="datetime-local" value={preparationTime} onChange={(event) => setPreparationTime(event.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-slate-300">Best-before / safe deadline</span>
                  <input required type="datetime-local" value={bestBefore} onChange={(event) => setBestBefore(event.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-slate-300">Storage condition</span>
                  <select required value={storageCondition} onChange={(event) => setStorageCondition(event.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400">
                    <option value="">Select storage</option>
                    <option>Ambient</option>
                    <option>Refrigerated</option>
                    <option>Frozen</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-slate-300">Allergens</span>
                  <input value={allergens} onChange={(event) => setAllergens(event.target.value)} placeholder="e.g. Milk, nuts, gluten; or none" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400" />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-xs font-bold text-slate-300">Packaging and hygiene</span>
                  <textarea required rows="2" value={packaging} onChange={(event) => setPackaging(event.target.value)} placeholder="Describe packaging, sealed containers, serving utensils, and hygiene controls..." className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-slate-300">Pickup location</span>
                  <span className="relative block">
                    <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                    <input
                      required
                      value={pickupLocation}
                      onChange={(event) => setPickupLocation(event.target.value)}
                      placeholder="Restaurant or pickup address"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-10 pr-4 text-sm text-white outline-none focus:border-emerald-400"
                    />
                  </span>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-slate-300">Contact number</span>
                  <input required type="tel" value={contactNumber} onChange={(event) => setContactNumber(event.target.value)} placeholder="+91 98765 43210" className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-slate-300">Pickup window start</span>
                  <input required type="datetime-local" value={pickupStart} onChange={(event) => setPickupStart(event.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400" />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-bold text-slate-300">Pickup window end</span>
                  <input required type="datetime-local" value={pickupEnd} onChange={(event) => setPickupEnd(event.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-emerald-400" />
                </label>
              </div>

              {error && <p className="mt-4 rounded-xl border border-red-500/30 bg-red-950/40 px-3 py-2 text-xs font-semibold text-red-300">{error}</p>}

              <button
                type="submit"
                className="mt-6 w-full rounded-xl bg-emerald-400 py-3.5 text-sm text-slate-950 font-bold hover:bg-emerald-300 hover:scale-105 transition-all duration-300"
              >
                Find an NGO for My Donation →
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
          <DonationLoader
            isVisible={showLoader}
            matchedNgo={matchDetails}
            volunteerName={matchDetails?.volunteerName}
            onComplete={() => {
              setShowLoader(false);
              onClose();
            }}
          />
        </AnimatePresence>
  );
}
