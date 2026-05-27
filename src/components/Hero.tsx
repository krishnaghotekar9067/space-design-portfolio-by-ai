/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import gsap from 'gsap';
import { motion } from 'motion/react';

interface HeroProps {
  startAnimation: boolean;
  onSeeWorkClick: () => void;
  onContactClick: () => void;
}

const ROLES = ["Creative", "Fullstack", "Founder", "Scholar"];

export default function Hero({ startAnimation, onSeeWorkClick, onContactClick }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [roleIndex, setRoleIndex] = useState(0);

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

  // Role Word Cycling every 2 seconds
  useEffect(() => {
    if (!startAnimation) return;

    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [startAnimation]);

  // GSAP Entrance Motion Triggered on completed load
  useEffect(() => {
    if (!startAnimation) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' }
      });

      // Name Reveal animation: opacity 0 -> 1, y 50 -> 0, duration 1.2s, delay 0.1s
      tl.fromTo('.name-reveal', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2 },
        0.1
      );

      // Blur-In Elements: opacity 0->1, blur(10px)->0px, y 20->0, duration 1s, stagger 0.1, delay 0.3s
      tl.fromTo('.blur-in',
        { opacity: 0, filter: 'blur(10px)', y: 20 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.1 },
        0.3
      );
    }, containerRef);

    return () => ctx.revert();
  }, [startAnimation]);

  return (
    <section 
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-bg"
    >
      {/* 1. Background Video Stream */}
      <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 select-none"
        />
        {/* Dark film-noise layer */}
        <div className="absolute inset-0 bg-black/40 z-1" />
        {/* Soft bottom glow-fade to page background */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent z-2" />
      </div>

      {/* 2. Hero Content */}
      <div className="relative z-10 text-center max-w-4xl px-6 flex flex-col items-center">
        {/* Eyebrow */}
        <p className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-6 font-medium">
          Collection '26
        </p>

        {/* Name Title */}
        <h1 className="name-reveal text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6 select-none">
          Krishna
        </h1>

        {/* Cycling role description */}
        <div className="blur-in h-8 flex items-center justify-center mb-6">
          <p className="text-sm md:text-lg font-light tracking-wide text-muted flex items-center gap-1.5">
            A 
            <span 
              key={roleIndex}
              className="font-display italic text-text-primary animate-role-fade-in inline-block font-medium min-w-[70px]"
            >
              {ROLES[roleIndex]}
            </span> 
            lives in Nagpur, India.
          </p>
        </div>

        {/* Core statement */}
        <p className="blur-in text-sm md:text-base text-muted max-w-md mx-auto mb-10 leading-relaxed font-light">
          Designing seamless digital interactions by focusing on the unique nuances which bring systems to life.
        </p>

        {/* Call to Actions */}
        <div className="blur-in flex flex-col sm:flex-row gap-4 items-center">
          {/* Button A: See Works (Solid) */}
          <button
            onClick={onSeeWorkClick}
            className="group relative rounded-full text-sm font-medium px-8 py-3.5 bg-text-primary text-bg hover:bg-bg hover:text-text-primary transition-all duration-300 md:duration-500 cursor-pointer overflow-hidden flex items-center justify-center hover:scale-105"
          >
            {/* Gradient border visible on hover */}
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-[1.5px] accent-gradient z-0">
              <span className="block w-full h-full bg-bg rounded-full" />
            </span>
            <span className="relative z-10">See Works</span>
          </button>

          {/* Button B: Reach out (Outlined) */}
          <button
            onClick={onContactClick}
            className="group relative rounded-full text-sm font-medium px-8 py-3.5 border border-stroke bg-bg/50 hover:border-transparent text-text-primary hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden flex items-center justify-center"
          >
            {/* Accent gradient ring overlay on hover */}
            <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-[1.5px] accent-gradient z-0">
              <span className="block w-full h-full bg-bg rounded-full" />
            </span>
            <span className="relative z-10 text-muted group-hover:text-text-primary transition-colors duration-300">
              Reach out...
            </span>
          </button>
        </div>
      </div>

      {/* 3. Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 select-none pointer-events-none">
        <span className="text-[10px] text-muted uppercase tracking-[0.2em] font-medium opacity-60">
          Scroll
        </span>
        <div className="w-[1px] h-10 bg-stroke relative overflow-hidden">
          {/* Scrolling dash */}
          <div className="absolute top-0 left-0 w-full h-1/2 accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
