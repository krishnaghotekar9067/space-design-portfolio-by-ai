/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import Hls from 'hls.js';
import { gsap } from 'gsap';
import { Mail, ArrowUpRight, Github, Twitter, Linkedin, Dribbble } from 'lucide-react';

const SOCIAL_LINKS = [
  { label: 'Twitter', url: 'https://twitter.com', icon: Twitter },
  { label: 'LinkedIn', url: 'https://linkedin.com', icon: Linkedin },
  { label: 'Dribbble', url: 'https://dribbble.com', icon: Dribbble },
  { label: 'GitHub', url: 'https://github.com', icon: Github },
];

export default function Footer() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const marqueeContainerRef = useRef<HTMLDivElement | null>(null);
  const marqueeTrackRef = useRef<HTMLDivElement | null>(null);

  // Background HLS Video Initialization
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const source = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";
    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({
        maxMaxBufferLength: 8,
        enableWorker: true,
      });
      hls.loadSource(source);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = source;
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  // GSAP Infinite Horizontal Marquee Loop
  useEffect(() => {
    const track = marqueeTrackRef.current;
    if (!track) return;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        xPercent: -50,
        duration: 35,
        ease: "none",
        repeat: -1
      });
    }, marqueeContainerRef);

    return () => ctx.revert();
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer 
      id="contact" 
      className="relative bg-bg pt-20 md:pt-36 pb-8 md:pb-12 overflow-hidden z-2 border-t border-stroke/20"
    >
      {/* 1. Background Video (Inverted and scaled vertically -scale-y-100) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          style={{ transform: 'translateX(-54%) translateY(-50%) scaleY(-1)' }}
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover select-none scale-y-[-1]"
        />
        {/* Heavier overlay (bg-black/60) */}
        <div className="absolute inset-0 bg-black/75 z-1" />
        {/* Soft top vignetting to blend with background */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-bg to-transparent z-2" />
      </div>

      {/* 2. GSAP SCROLLING MARQUEE */}
      <div 
        ref={marqueeContainerRef}
        className="relative z-10 w-full overflow-hidden border-y border-stroke/30 bg-[#0A0A0A]/40 backdrop-blur-sm py-4 md:py-6 select-none"
      >
        <div 
          ref={marqueeTrackRef}
          className="flex whitespace-nowrap w-max"
        >
          {/* We duplicate the repeated layout to make it smooth and infinite */}
          <div className="text-sm md:text-base font-medium uppercase tracking-[0.4em] text-text-primary px-4 flex items-center shrink-0">
            {Array(10).fill("BUILDING THE FUTURE • ").join("")}
          </div>
          <div className="text-sm md:text-base font-medium uppercase tracking-[0.4em] text-text-primary px-4 flex items-center shrink-0">
            {Array(10).fill("BUILDING THE FUTURE • ").join("")}
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 relative z-10 mt-16 md:mt-24">
        
        {/* 3. CORE CONTACT CTA */}
        <div className="flex flex-col items-center text-center gap-8 mb-16 md:mb-24">
          <div className="max-w-xl">
            <span className="text-[10px] font-mono text-[#89AACC] uppercase tracking-[0.3em] font-bold">
              GET IN TOUCH
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-sans text-text-primary tracking-tight font-medium mt-3 mb-4 leading-none select-none">
              Let's create something <span className="font-display italic font-light text-white/90">remarkable</span>
            </h2>
            <p className="text-xs sm:text-sm text-muted max-w-sm mx-auto font-light leading-relaxed">
              Accepting select client collaborations, agency bookings, and long range contract developments.
            </p>
          </div>

          {/* Core Email button: mailto:krishnaghotekar1@gmail.com with gradient hover border ring */}
          <a
            href="mailto:krishnaghotekar1@gmail.com"
            className="group relative rounded-full p-[1.5px] bg-stroke hover:scale-105 transition-all duration-300"
          >
            {/* Pulsing glow gradient border highlight */}
            <div className="absolute inset-0 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300 accent-gradient p-[1px] pointer-events-none" />
            
            <div className="flex items-center gap-3 bg-surface hover:bg-surface/80 text-muted group-hover:text-text-primary px-8 py-4 rounded-full relative z-10 text-xs sm:text-sm font-semibold transition-all duration-300">
              <Mail className="w-4 h-4 text-[#89AACC] group-hover:scale-110 transition-transform duration-300" />
              krishnaghotekar1@gmail.com
              <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
            </div>
          </a>
        </div>

        {/* 4. FOOTER META BAR */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-stroke/40 pt-8 mt-12">
          
          {/* Active status pulse indicators */}
          <div className="flex items-center gap-2.5 bg-surface/50 border border-stroke rounded-full px-4 py-1.5 select-none">
            {/* Pulser shadow dot */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] font-mono tracking-wider text-muted font-medium">
              Available for projects
            </span>
          </div>

          {/* Social links loop */}
          <div className="flex items-center gap-2">
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-stroke hover:border-white/20 hover:text-white bg-surface/30 hover:bg-surface/80 rounded-full flex items-center justify-center text-muted transition-all duration-300 scale-100 hover:scale-110"
                  aria-label={social.label}
                  title={social.label}
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              );
            })}
          </div>

          {/* Copyright note */}
          <div className="text-[10px] font-mono text-muted tracking-wider select-none">
            © {currentYear} KRISHNA. NGP. IND.
          </div>

        </div>

      </div>
    </footer>
  );
}
