import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, HeartHandshake, Building2, User, Phone, MapPin, Package, Clock, ShieldCheck } from 'lucide-react';

export default function Modal({ isOpen, onClose, defaultTab = 'donor' }) {
  const [tab, setTab] = useState(defaultTab);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    orgName: '',
    email: '',
    phone: '',
    city: 'Bangalore',
    foodType: 'Prepared Cooked Meals',
    quantity: '',
    timeWindow: 'Within 2 hours',
    agreeTerms: false,
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Auto-reset after demo submission
    }, 4000);
  };

  const resetForm = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetForm}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-10"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-trust-900 via-trust-800 to-fresh-800 p-6 text-white relative">
            <button
              onClick={resetForm}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-fresh-400 animate-pulse" />
              <span className="text-xs uppercase font-bold tracking-widest text-fresh-300">
                Quick Registration
              </span>
            </div>
            <h3 className="text-2xl font-black tracking-tight text-white">
              {tab === 'donor' ? 'List Surplus Food' : tab === 'ngo' ? 'Register Your NGO' : 'Volunteer With Us'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Connect in real-time with verified community relief partners.
            </p>

            {/* Switch Tabs */}
            <div className="flex bg-white/10 p-1 rounded-xl mt-5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => { setTab('donor'); setSubmitted(false); }}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  tab === 'donor' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-200 hover:text-white'
                }`}
              >
                Food Donor
              </button>
              <button
                type="button"
                onClick={() => { setTab('ngo'); setSubmitted(false); }}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  tab === 'ngo' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-200 hover:text-white'
                }`}
              >
                NGO / Shelter
              </button>
              <button
                type="button"
                onClick={() => { setTab('volunteer'); setSubmitted(false); }}
                className={`flex-1 py-2 rounded-lg transition-all ${
                  tab === 'volunteer' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-200 hover:text-white'
                }`}
              >
                Volunteer
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center space-y-4"
              >
                <div className="w-16 h-16 bg-fresh-100 text-fresh-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-extrabold text-slate-900">Application Received!</h4>
                <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Thank you for stepping forward. Our automated coordinator has pinged nearby verified partners. You will receive an SMS and email verification in under 5 minutes.
                </p>
                <div className="pt-4">
                  <button
                    onClick={resetForm}
                    className="px-6 py-2.5 bg-fresh-600 hover:bg-fresh-700 text-white rounded-xl text-sm font-bold shadow-md shadow-fresh-200"
                  >
                    Done
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                {/* Contact Name & Org */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {tab === 'volunteer' ? 'Full Name' : 'Contact Person'}
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        required
                        type="text"
                        placeholder="e.g. Ananya Rao"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fresh-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {tab === 'volunteer' ? 'College / Workplace' : 'Business / NGO Name'}
                    </label>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        required
                        type="text"
                        placeholder={tab === 'donor' ? 'e.g. Grand Palace Hotel' : 'e.g. Care Meals Trust'}
                        value={formData.orgName}
                        onChange={(e) => setFormData({ ...formData, orgName: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fresh-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      required
                      type="email"
                      placeholder="contact@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fresh-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        required
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fresh-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Specific Fields for Donors */}
                {tab === 'donor' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-fresh-50/60 rounded-2xl border border-fresh-100">
                    <div>
                      <label className="block text-xs font-bold text-fresh-900 mb-1">
                        <Package className="w-3.5 h-3.5 inline mr-1 text-fresh-600" />
                        Approx. Portions / Servings
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. 50 meals / 20kg"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-white rounded-xl border border-fresh-200 focus:outline-none focus:ring-2 focus:ring-fresh-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-fresh-900 mb-1">
                        <Clock className="w-3.5 h-3.5 inline mr-1 text-fresh-600" />
                        Best Pickup Window
                      </label>
                      <select
                        value={formData.timeWindow}
                        onChange={(e) => setFormData({ ...formData, timeWindow: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-white rounded-xl border border-fresh-200 focus:outline-none focus:ring-2 focus:ring-fresh-500"
                      >
                        <option>Immediate (Within 1 hour)</option>
                        <option>Within 2-3 hours</option>
                        <option>Evening / Post Closing (9pm - 11pm)</option>
                        <option>Scheduled Daily Pickup</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Specific Fields for NGOs */}
                {tab === 'ngo' && (
                  <div className="p-4 bg-trust-50/60 rounded-2xl border border-trust-100 space-y-2">
                    <label className="block text-xs font-bold text-trust-900">
                      <ShieldCheck className="w-3.5 h-3.5 inline mr-1 text-trust-600" />
                      NGO Registration / 12A / 80G No.
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. TRUST/2021/BLR/9482"
                      className="w-full px-3 py-2 text-sm bg-white rounded-xl border border-trust-200 focus:outline-none focus:ring-2 focus:ring-trust-500"
                    />
                    <p className="text-[11px] text-trust-700">
                      Helps us expedite verification and grant instant matching access.
                    </p>
                  </div>
                )}

                {/* Specific Fields for Volunteers */}
                {tab === 'volunteer' && (
                  <div className="p-4 bg-earth-50/60 rounded-2xl border border-earth-100">
                    <label className="block text-xs font-bold text-earth-900 mb-1">
                      Vehicle Availability for Food Rescue Runs
                    </label>
                    <select className="w-full px-3 py-2 text-sm bg-white rounded-xl border border-earth-200 focus:outline-none focus:ring-2 focus:ring-earth-500">
                      <option>Two Wheeler (Bike / Scooter with bag)</option>
                      <option>Four Wheeler (Car / SUV)</option>
                      <option>Commercial Mini Van</option>
                      <option>No Vehicle (On-foot distribution support)</option>
                    </select>
                  </div>
                )}

                {/* City Location */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pickup / Service Area</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      required
                      type="text"
                      placeholder="e.g. Indiranagar / Koramangala, Bangalore"
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fresh-500"
                    />
                  </div>
                </div>

                {/* Terms agreement */}
                <div className="flex items-start gap-2 pt-2">
                  <input
                    required
                    id="terms"
                    type="checkbox"
                    className="mt-1 rounded text-fresh-600 focus:ring-fresh-500 h-4 w-4"
                  />
                  <label htmlFor="terms" className="text-xs text-slate-500 leading-snug">
                    I confirm that all surplus food meets strict food hygiene standards (FSSAI/safe consumption) and complies with the FoodBridge pledge.
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full mt-4 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-fresh-600 to-fresh-500 hover:from-fresh-700 hover:to-fresh-600 shadow-lg shadow-fresh-200 transition-all duration-200 hover:scale-[1.01]"
                >
                  {tab === 'donor' ? 'Publish Surplus Alert' : tab === 'ngo' ? 'Submit NGO Profile' : 'Join Volunteer Fleet'}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

