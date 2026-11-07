import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TheProblem from './components/TheProblem';
import OurSolution from './components/OurSolution';
import HowItWorks from './components/HowItWorks';
import ImpactMarquee from './components/ImpactMarquee';
import ImpactMetrics from './components/ImpactMetrics';
import CommunityStories from './components/CommunityStories';
import Footer from './components/Footer';
import SignInModal from './components/SignInModal';
import DonationForm from './components/DonationForm';
import NgoDashboard from './components/NgoDashboard';
import WelcomeLoader from './components/WelcomeLoader';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [signInOpen, setSignInOpen] = useState(false);
  const [signInRole, setSignInRole] = useState('donor');
  const [donationOpen, setDonationOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('foodbridge_user')) || null;
    } catch {
      return null;
    }
  });

  const openSignIn = (role = 'donor') => {
    setSignInRole(role);
    setSignInOpen(true);
  };

  const handleSignedIn = (signedInUser) => {
    setUser(signedInUser);
    setShowWelcome(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('foodbridge_token');
    localStorage.removeItem('foodbridge_user');
    setUser(null);
  };

  const handleOpenDonation = () => {
    if (!user) {
      setSignInRole('donor');
      setSignInOpen(true);
      return;
    }

    setDonationOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080F1F] font-sans">
      <Navbar
        onOpenSignIn={openSignIn}
        onOpenDonation={handleOpenDonation}
        user={user}
        onLogout={handleLogout}
        setCurrentView={setCurrentView}
      />
      {currentView === 'home' ? (
        <>
          <main className="flex-grow">
            <Hero onOpenSignIn={openSignIn} onOpenDonation={handleOpenDonation} />
            <TheProblem />
            <OurSolution />
            <HowItWorks />
            <ImpactMarquee />
            <ImpactMetrics />
            <CommunityStories />
          </main>
          <Footer onOpenSignIn={openSignIn} onOpenDonation={handleOpenDonation} />
        </>
      ) : (
        <NgoDashboard setCurrentView={setCurrentView} />
      )}
      <SignInModal
        isOpen={signInOpen}
        onClose={() => setSignInOpen(false)}
        defaultRole={signInRole}
        onSignedIn={handleSignedIn}
      />
      <DonationForm
        isOpen={donationOpen}
        user={user}
        onAuthenticationRequired={() => {
          setDonationOpen(false);
          setSignInRole('donor');
          setSignInOpen(true);
        }}
        onClose={() => setDonationOpen(false)}
      />
      <WelcomeLoader
        isVisible={showWelcome}
        onComplete={() => setShowWelcome(false)}
      />
    </div>
  );
}
