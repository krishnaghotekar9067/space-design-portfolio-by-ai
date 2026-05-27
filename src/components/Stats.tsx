/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { STATS } from '../types';

export default function Stats() {
  return (
    <section 
      id="stats" 
      className="bg-bg py-24 md:py-36 border-t border-stroke/20 relative z-1"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 animate-section-reveal">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col items-center md:items-start text-center md:text-left gap-2 group relative"
            >
              {/* Giant Numerical Value */}
              <div className="text-6xl sm:text-7xl lg:text-8xl font-display text-text-primary mt-1 line-height-none font-light tracking-tight group-hover:text-[#89AACC] transition-colors duration-500">
                {stat.value}
              </div>

              {/* Accent Divider Bar */}
              <div className="w-12 h-[2px] bg-stroke group-hover:w-20 transition-all duration-500 border-none relative mt-1 overflow-hidden rounded-full">
                <div className="absolute inset-0 accent-gradient" />
              </div>

              {/* Description Tagline */}
              <p className="text-xs sm:text-sm text-muted uppercase tracking-[0.25em] font-medium leading-relaxed mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
