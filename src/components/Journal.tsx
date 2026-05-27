/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { JOURNAL_ENTRIES } from '../types';

export default function Journal() {
  return (
    <section 
      id="journal" 
      className="bg-bg py-20 md:py-32 relative z-1 border-t border-stroke/20"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* 1. JOURNAL HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div>
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke block" />
              <p className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
                Journal
              </p>
            </div>

            {/* Custom Header heading: Recent Thoughts with display italic */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans tracking-tight text-text-primary mb-4 leading-none font-medium">
              Recent <span className="font-display italic font-light">thoughts</span>
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-muted max-w-sm leading-relaxed font-light">
              Reflections on development, design systems, and visual choreographies.
            </p>
          </div>

          {/* Desktop "View all" Action */}
          <div className="hidden md:block">
            <button className="group relative rounded-full p-[1.5px] bg-stroke/40 hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 accent-gradient p-[1px] pointer-events-none" />
              <div className="flex items-center gap-2 bg-surface text-muted group-hover:text-text-primary px-6 py-3 rounded-full relative z-10 text-xs sm:text-sm transition-all duration-300">
                View all writing
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </button>
          </div>
        </motion.div>

        {/* 2. JOURNAL ENTRIES (As dynamic horizontal pills) */}
        <div className="flex flex-col gap-4">
          {JOURNAL_ENTRIES.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 md:p-5 bg-surface/35 hover:bg-surface border border-stroke rounded-[24px] sm:rounded-full transition-all duration-300 relative overflow-hidden cursor-pointer"
            >
              {/* Left core details (image + text) */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 w-full sm:w-auto">
                {/* Entry cover thumbnail */}
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden select-none flex-shrink-0 relative border border-white/5">
                  <img
                    src={entry.imageUrl}
                    alt={entry.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                  {/* Subtle vignette on thumbnail */}
                  <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
                </div>

                {/* Date + Title info */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono tracking-wider text-[#89AACC] uppercase font-semibold">
                      {entry.category}
                    </span>
                    <span className="w-1 h-1 bg-stroke rounded-full" />
                    <span className="text-[10px] font-mono tracking-wider text-muted font-light">
                      {entry.date}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg text-text-primary tracking-tight font-medium group-hover:text-[#89AACC] transition-colors duration-300">
                    {entry.title}
                  </h3>
                </div>
              </div>

              {/* Right indicators (read time + action action arrow link) */}
              <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 border-stroke/30 pt-3 sm:pt-0">
                <div className="flex items-center gap-1.5 text-muted">
                  <BookOpen className="w-3.5 h-3.5 opacity-60" />
                  <span className="text-[11px] font-mono tracking-wider">
                    {entry.readTime}
                  </span>
                </div>

                {/* Circular arrow index highlight */}
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-stroke bg-bg flex items-center justify-center text-muted group-hover:text-text-primary group-hover:border-white/20 transition-all duration-300 group-hover:scale-105">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* Mobile View all button (only visible on mobile screens) */}
        <div className="flex mt-8 justify-center md:hidden">
          <button className="flex items-center gap-2 rounded-full px-5 py-3 border border-stroke text-muted text-xs font-medium bg-surface/40 hover:text-white transition-all duration-300">
            View all writing
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
