/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowLeftRight, ArrowRight, Eye } from 'lucide-react';
import { PROJECTS } from '../types';

export default function SelectedWorks() {
  return (
    <section 
      id="work" 
      className="bg-bg py-20 md:py-32 relative z-1"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* 1. SECTION HEADER (with Framer Motion whileInView) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-6"
        >
          <div>
            {/* Elegant Eyebrow with Line */}
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke block" />
              <p className="text-xs text-muted uppercase tracking-[0.3em] font-medium">
                Selected Work
              </p>
            </div>

            {/* Title with display italic */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans tracking-tight text-text-primary mb-4 leading-none font-medium">
              Featured <span className="font-display italic font-light">projects</span>
            </h2>

            {/* Subtext */}
            <p className="text-sm md:text-base text-muted max-w-sm leading-relaxed font-light">
              A selection of projects I've worked on, from concept to launch.
            </p>
          </div>

          {/* Desktop "View all work" Action Button */}
          <div className="hidden md:block">
            <button className="group relative rounded-full p-[1.5px] bg-stroke/40 hover:scale-105 transition-all duration-300">
              {/* Spinning gradient border overlay */}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 accent-gradient p-[1px] pointer-events-none" />
              <div className="flex items-center gap-2 bg-surface text-muted group-hover:text-text-primary px-6 py-3 rounded-full relative z-10 text-xs sm:text-sm transition-all duration-300">
                View all work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </button>
          </div>
        </motion.div>

        {/* 2. BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className={`${project.spanClass} group relative rounded-3xl overflow-hidden border border-stroke bg-surface flex flex-col justify-between`}
            >
              {/* Media Container */}
              <div className={`relative w-full ${project.aspectRatioClass} overflow-hidden select-none`}>
                
                {/* Image background */}
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                />

                {/* Halftone Dot Overlay Class (Mix blend multiply on image) */}
                <div className="absolute inset-0 halftone-overlay opacity-20 mix-blend-multiply pointer-events-none z-1" />

                {/* Microgradient vignette overlay over the image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-2" />
                
                {/* Persistent Bottom Text (Static visual, slides down on hover when glass panel overrides) */}
                <div className="absolute bottom-6 left-6 right-6 z-10 transition-transform duration-500 group-hover:translate-y-4 group-hover:opacity-0">
                  <span className="text-[10px] font-mono text-white/50 tracking-wider mb-2 uppercase">
                    {project.tags.join(' // ')}
                  </span>
                  <p className="text-xl md:text-2xl font-sans font-medium text-white tracking-tight mt-1">
                    {project.title}
                  </p>
                </div>

                {/* Hover Glass Panel Overlay (bg-bg/70 opacity-0->1 + backdrop-blur-lg) */}
                <div className="absolute inset-0 bg-bg/75 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-lg flex flex-col justify-between p-6 md:p-8 z-20">
                  
                  {/* Top: Metadata */}
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-mono text-muted tracking-wider uppercase">
                      Category // {project.tags[0]}
                    </span>
                    <div className="flex gap-1.5">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[9px] px-2 py-0.5 rounded-full border border-stroke bg-surface/80 text-muted">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom: Title, description, and the special VIEW Pill */}
                  <div className="flex flex-col items-start gap-4">
                    <div>
                      <h3 className="text-2xl font-medium tracking-tight text-text-primary mb-2">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted max-w-md font-light leading-relaxed">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* PILL: animated gradient border, white bg, "View - Title" (title in display italic) */}
                    <div className="relative overflow-hidden rounded-full p-[1.5px] select-none hover:scale-105 transition-transform mt-2">
                      {/* Live border moving highlight */}
                      <div className="absolute inset-0 rounded-full accent-gradient animate-gradient-shift" />
                      
                      <div className="relative rounded-full bg-white px-5 py-2.5 flex items-center gap-2">
                        <Eye className="w-3.5 h-3.5 text-[#0A0A0A]" />
                        <span className="text-xs font-semibold text-[#0A0A0A] tracking-tight">
                          View — <span className="font-display italic font-medium">{project.title}</span>
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View all work button (only visible on mobile) */}
        <div className="flex mt-8 justify-center md:hidden">
          <button className="flex items-center gap-2 rounded-full px-5 py-3 border border-stroke text-muted text-xs font-medium bg-surface/40 hover:text-white transition-all duration-300">
            View all projects
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
