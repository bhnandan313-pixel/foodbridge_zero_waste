import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TheProblem from './components/TheProblem';
import OurSolution from './components/OurSolution';
import HowItWorks from './components/HowItWorks';
import KeyFeatures from './components/KeyFeatures';
import ImpactMetrics from './components/ImpactMetrics';
import CommunityStories from './components/CommunityStories';
import FAQ from './components/FAQ';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import Modal from './components/Modal';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState('donor');

  const openModal = (tab = 'donor') => {
    setModalTab(tab);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar onOpenModal={openModal} />
      <main className="flex-1">
        <Hero onOpenModal={openModal} />
        <TheProblem />
        <OurSolution />
        <HowItWorks />
        <KeyFeatures />
        <ImpactMetrics />
        <CommunityStories />
        <FAQ onOpenModal={openModal} />
        <CallToAction onOpenModal={openModal} />
      </main>
      <Footer onOpenModal={openModal} />
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} defaultTab={modalTab} />
    </div>
  );
}
