/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 transition-all duration-300">
      <div
        className={`inline-flex items-center rounded-full transition-all duration-500 border border-white/10 bg-surface/80 px-2 py-2 ${
          hasScrolled 
            ? 'shadow-xl shadow-black/40 backdrop-blur-xl scale-98 bg-surface/90 border-white/15' 
            : 'backdrop-blur-md'
        }`}
      >
        {/* 1. Logo */}
        <a 
          href="#hero"
          onClick={(e) => handleLinkClick(e, 'hero')}
          className="relative group flex items-center justify-center rounded-full hover:scale-110 transition-transform duration-300"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          aria-label="Home"
        >
          {/* Logo outer ring */}
          <div 
            className={`w-9 h-9 rounded-full p-[1.5px] transition-all duration-700 ${
              logoHovered ? 'rotate-180' : 'rotate-0'
            }`}
            style={{
              background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)'
            }}
          >
            <div className="w-full h-full bg-bg rounded-full flex items-center justify-center">
              <span className="font-display italic text-[13px] tracking-tighter text-text-primary">
                K
              </span>
            </div>
          </div>
        </a>

        {/* 2. Divider (hidden on mobile) */}
        <div className="hidden sm:block w-px h-5 bg-stroke mx-2" />

        {/* 3. Nav Links */}
        <div className="flex items-center gap-1">
          {['Home', 'Work', 'Resume'].map((link) => {
            const id = link.toLowerCase();
            const isActive = activeSection === id;
            return (
              <a
                key={link}
                href={`#${id}`}
                onClick={(e) => {
                  if (id === 'resume') {
                    // Could link to actual file or a section. Let's make smooth scroll to a resume presentation/stats section.
                    handleLinkClick(e, 'stats');
                  } else {
                    handleLinkClick(e, id);
                  }
                }}
                className={`text-xs sm:text-sm font-medium rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-300 ${
                  isActive
                    ? 'text-text-primary bg-stroke/70'
                    : 'text-muted hover:text-text-primary hover:bg-stroke/30'
                }`}
              >
                {link}
              </a>
            );
          })}
        </div>

        {/* 4. Divider */}
        <div className="w-px h-5 bg-stroke mx-2" />

        {/* 5. "Say hi" button */}
        <a
          href="#contact"
          onClick={(e) => handleLinkClick(e, 'contact')}
          className="relative group ml-1 overflow-hidden rounded-full inline-flex items-center text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 bg-stroke/20 text-text-primary hover:text-white transition-all duration-300"
        >
          {/* Border highlight under hover */}
          <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-[1px] accent-gradient pointer-events-none">
            <div className="w-full h-full bg-surface rounded-full" />
          </div>

          <span className="relative z-10 flex items-center gap-1">
            Say hi
            <ArrowUpRight className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </span>
        </a>
      </div>
    </nav>
  );
}
