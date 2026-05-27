/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SelectedWorks from './components/SelectedWorks';
import Journal from './components/Journal';
import Explorations from './components/Explorations';
import Stats from './components/Stats';
import Footer from './components/Footer';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  // Track scroll position to update active navigation index
  useEffect(() => {
    if (isLoading) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250; // Offset threshold for activations

      const heroElement = document.getElementById('hero');
      const workElement = document.getElementById('work');
      const explorationsElement = document.getElementById('explorations');
      const statsElement = document.getElementById('stats');
      const contactElement = document.getElementById('contact');

      if (contactElement && scrollPosition >= contactElement.offsetTop) {
        setActiveSection('resume'); // Keep "say hi" button aligned, or activate resume
      } else if (statsElement && scrollPosition >= statsElement.offsetTop) {
        setActiveSection('resume');
      } else if (explorationsElement && scrollPosition >= explorationsElement.offsetTop) {
        setActiveSection('resume'); // Explanations acts as visual resume/exploration
      } else if (workElement && scrollPosition >= workElement.offsetTop) {
        setActiveSection('work');
      } else {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Bind an initial check on load
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  // Handle smooth scroll clicks to target regions
  const scrollIntoSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* 1. LOADING SCREEN TRANSITION */}
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="relative min-h-screen bg-bg text-text-primary selection:bg-white/10 selection:text-white">
          
          {/* 2. FLOATING NAVIGATION BAR */}
          <Navbar activeSection={activeSection} />

          {/* 3. HERO BANNER SCREEN (Passes loading trigger state) */}
          <Hero 
            startAnimation={!isLoading} 
            onSeeWorkClick={() => scrollIntoSection('work')}
            onContactClick={() => scrollIntoSection('contact')}
          />

          {/* 4. ASYMMETRIC SELECTED WORKS BENTO GRID */}
          <SelectedWorks />

          {/* 5. MINIMAL DESIGNER JOURNAL LIST */}
          <Journal />

          {/* 6. EXPANSIVE PARALLAX EXPLORATIONS GALLERY */}
          <Explorations />

          {/* 7. TYPOGRAPHICAL STATUS HERO STATS */}
          <Stats />

          {/* 8. INVERTED CINEMATIC FOOTER & CONTACT PORTAL */}
          <Footer />

        </div>
      )}
    </>
  );
}
