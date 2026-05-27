/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, X, ZoomIn, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { EXPLORATIONS, ExplorationItem } from '../types';

// Register GSAP ScrollTrigger plugin safely
gsap.registerPlugin(ScrollTrigger);

export default function Explorations() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const pinnedRef = useRef<HTMLDivElement | null>(null);
  const [selectedItem, setSelectedItem] = useState<ExplorationItem | null>(null);

  // Parallax + Pinned layout effects with GSAP ScrollTrigger
  useEffect(() => {
    const container = sectionRef.current;
    const pinnedElement = pinnedRef.current;
    if (!container || !pinnedElement) return;

    const ctx = gsap.context(() => {
      // Pin Layer 1 Center-Left Details throughout the 300vh section scroll
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        pin: pinnedElement,
        pinSpacing: false,
      });

      // Left Column Parallax Motion (slower upward pull)
      gsap.fromTo(".col-left-item", 
        { y: 80 },
        {
          y: -120,
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          }
        }
      );

      // Right Column Parallax Motion (faster downward lag to create extreme speed separation)
      gsap.fromTo(".col-right-item", 
        { y: 220 },
        {
          y: -20,
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.8,
          }
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  // Keyboard handler for escaping the Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Split calculations (items 1, 3, 5 for left; items 2, 4, 6 for right)
  const leftColItems = EXPLORATIONS.filter((_, i) => i % 2 === 0);
  const rightColItems = EXPLORATIONS.filter((_, i) => i % 2 !== 0);

  return (
    <section 
      id="explorations"
      ref={sectionRef}
      className="relative w-full min-h-[300vh] bg-[#070707] z-1 border-t border-stroke/30"
    >
      {/* BACKGROUND GRAPHIC STRIPS */}
      <div className="absolute inset-0 flex justify-between px-6 pointer-events-none opacity-5 z-0">
        <div className="w-px h-full bg-stroke" />
        <div className="w-px h-full bg-stroke hidden md:block" />
        <div className="w-px h-full bg-stroke hidden md:block" />
        <div className="w-px h-full bg-stroke" />
      </div>

      {/* LAYER 1: PINNED CENTER (Z-10) */}
      <div 
        ref={pinnedRef}
        className="absolute top-0 left-0 w-full h-screen flex items-center z-10 pointer-events-none select-none"
      >
        <div className="max-w-[1200px] w-full mx-auto px-6 md:px-10 lg:px-16 flex flex-col items-start pointer-events-auto">
          <div className="max-w-xs md:max-w-sm">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke block" />
              <p className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
                Explorations
              </p>
            </div>

            {/* Heading: Visual playground with display italic */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans tracking-tight text-text-primary mb-4 leading-none font-medium">
              Visual <span className="font-display italic font-light">playground</span>
            </h2>

            {/* Description */}
            <p className="text-xs md:text-sm text-muted mb-8 leading-relaxed font-light">
              A curated catalog of shaders, organic pigment layouts, material curvatures, and raw visual prototypes.
            </p>

            {/* External Call to Action button: Dribbble */}
            <a
              href="https://dribbble.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center rounded-full p-[1.5px] bg-stroke/50 hover:scale-105 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 accent-gradient p-[1px] pointer-events-none" />
              <div className="flex items-center gap-2 bg-surface hover:bg-surface/80 text-muted group-hover:text-text-primary px-5 py-2.5 rounded-full relative z-10 text-xs font-semibold transition-all duration-300">
                Full Feed
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* LAYER 2: PARALLAX COLUMNS (Z-20, ABSOLUTE SCROLLER, FLUSH RIGHT) */}
      <div className="relative w-full z-20 flex justify-end">
        <div className="max-w-[1400px] w-full px-6 md:px-12 flex justify-end py-32 md:py-48">
          
          {/* Asymmetric Split Columns inside Grid */}
          <div className="grid grid-cols-2 gap-8 md:gap-20 max-w-2xl select-none">
            
            {/* COLUMN LEFT (Parallax A) */}
            <div className="col-left-item flex flex-col gap-12 md:gap-24">
              {leftColItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  style={{ transform: 'translate3d(0, 0, 0)' }}
                  className={`group relative aspect-square w-full max-w-[280px] sm:max-w-[320px] rounded-2xl md:rounded-3xl border border-stroke bg-surface overflow-hidden cursor-zoom-in self-start shadow-xl shadow-black/30 transition-all duration-500 ease-out hover:scale-[1.03] hover:border-white/25 ${item.rotation}`}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Glass Card Tint + Overlay */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center">
                    {/* Centered micro action zoom indicator */}
                    <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 flex items-center justify-center">
                      <ZoomIn className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* COLUMN RIGHT (Parallax B) */}
            <div className="col-right-item flex flex-col gap-12 md:gap-24 pt-24 md:pt-[200px]">
              {rightColItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  style={{ transform: 'translate3d(0, 0, 0)' }}
                  className={`group relative aspect-square w-full max-w-[280px] sm:max-w-[320px] rounded-2xl md:rounded-3xl border border-stroke bg-surface overflow-hidden cursor-zoom-in self-start shadow-xl shadow-black/30 transition-all duration-500 ease-out hover:scale-[1.03] hover:border-white/25 ${item.rotation}`}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  {/* Glass Card Tint + Overlay */}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/35 transition-colors duration-300 flex items-center justify-center">
                    {/* Centered micro action zoom indicator */}
                    <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 flex items-center justify-center">
                      <ZoomIn className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* FULL-SCREEN LIGHTBOX OVERLAY modal (Fixed) */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedItem(null)}
          >
            {/* Modal Body Container */}
            <motion.div
              initial={{ scale: 0.92, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 15 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="relative max-w-3xl w-full bg-surface/80 border border-white/10 p-6 md:p-8 rounded-3xl flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-stretch overflow-hidden shadow-2xl shadow-black"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button top right */}
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 text-muted hover:text-white bg-bg/60 w-8 h-8 rounded-full border border-stroke flex items-center justify-center transition-all cursor-pointer z-50 hover:scale-110"
                aria-label="Close Lightbox"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left Side: High contrast image showcase */}
              <div className="w-full md:w-3/5 aspect-square rounded-2xl overflow-hidden border border-stroke relative flex-shrink-0 bg-bg select-none">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 halftone-overlay opacity-15 mix-blend-multiply pointer-events-none" />
              </div>

              {/* Right Side: Narrative Details */}
              <div className="w-full md:w-2/5 flex flex-col justify-between py-2 text-left">
                <div className="flex flex-col gap-4">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#89AACC] uppercase font-semibold">
                      Exploration Catalog
                    </span>
                    <h3 className="text-2xl font-medium tracking-tight text-white mt-1 leading-tight font-sans">
                      {selectedItem.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-muted font-light leading-relaxed">
                    {selectedItem.description}
                  </p>
                </div>

                <div className="flex justify-between items-center border-t border-stroke/40 pt-4 mt-6">
                  {/* Creator footnote */}
                  <span className="text-[10px] font-mono text-muted">
                    No. {selectedItem.id.replace('exp-', 'MS0')}
                  </span>
                  
                  {/* Tiny heart action */}
                  <button className="flex items-center gap-1 text-[10px] font-mono hover:text-red-400 text-muted transition-colors cursor-pointer group">
                    <Heart className="w-3.5 h-3.5 group-hover:fill-red-400/20 group-hover:text-red-400 transition-all" />
                    Archive
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
