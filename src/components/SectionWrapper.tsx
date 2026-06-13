'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Globe, RefreshCw } from 'lucide-react';

interface SectionWrapperProps {
  id: string;
  title: string;
  index: number;
  children: React.ReactNode;
  icon: React.ReactNode;
  urlPath: string;
}

export default function SectionWrapper({
  id,
  title,
  index,
  children,
  icon,
  urlPath,
}: SectionWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of this specific section container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Smooth scale down and fade out as the card gets scrolled past / covered by the next card
  // This produces a stacked cards depth parallax effect
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.6]);
  const blur = useTransform(scrollYProgress, [0, 0.8], ['blur(0px)', 'blur(4px)']);

  // Progressive top offset for sticky stacking cards
  // The first section sticks at 70px. The next ones stack slightly lower or overlap
  const stickyTop = 70 + index * 4;

  return (
    <motion.section
      id={id}
      ref={containerRef}
      style={{
        scale,
        opacity,
        filter: blur,
        top: `${stickyTop}px`,
        zIndex: index * 10,
      }}
      className="sticky w-full mb-[8vh] first:mt-6 last:mb-[5vh] pointer-events-auto origin-top"
    >
      {/* Outer Window Frame */}
      <div className="glass-panel rounded-3xl overflow-hidden flex flex-col shadow-2xl transition-all duration-500 border-color-border-color">
        
        {/* Browser Top Bar / Control Deck */}
        <div className="h-12 bg-bg-secondary/90 flex items-center justify-between px-4 border-b border-border-color relative select-none">
          
          {/* macOS Style Window Dots (Left Side) */}
          <div className="flex items-center space-x-2 w-1/4 z-10">
            <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer" title="Close" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer" title="Minimize" />
            <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-pointer" title="Maximize" />
          </div>

          {/* Active Folder/Browser Tab (Mid-Left) */}
          <div className="absolute bottom-0 left-20 h-9 flex items-end">
            <div className="bg-card-bg px-5 py-1.5 rounded-t-xl border-t border-l border-r border-border-color flex items-center gap-2 text-xs font-semibold text-text-primary tracking-wide relative select-none shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
              {/* Left ear curve */}
              <div className="tab-curve-left" />
              
              <span className="text-text-secondary w-3.5 h-3.5 flex items-center justify-center">
                {icon}
              </span>
              <span>{title}</span>
              
              {/* Right ear curve */}
              <div className="tab-curve-right" />
            </div>
          </div>

          {/* Simulated Glass Address Bar (Center) */}
          <div className="hidden md:flex items-center justify-center w-2/5 z-10">
            <div className="w-full h-7 glass-input rounded-lg px-3 flex items-center justify-between text-[11px] text-text-secondary/70 font-mono tracking-wider shadow-inner select-all">
              <div className="flex items-center gap-1.5 overflow-hidden truncate">
                <Globe size={11} className="text-accent/60 shrink-0" />
                <span className="truncate">{urlPath}</span>
              </div>
              <RefreshCw size={10} className="hover:text-text-primary transition-colors cursor-pointer shrink-0 ml-1.5" />
            </div>
          </div>

          {/* Empty Space / Layout Balancer (Right Side) */}
          <div className="w-1/4 flex justify-end z-10">
            <div className="text-[10px] uppercase font-mono tracking-widest text-text-secondary/40 mr-1 select-none">
              v1.0.0
            </div>
          </div>
          
        </div>

        {/* Card Body - Content Area */}
        <div className="p-6 md:p-8 bg-gradient-to-b from-card-bg to-bg-primary/95 overflow-y-auto relative">
          {/* Decorative background radial lights */}
          <div className="absolute inset-0 bg-bg-glow opacity-30 pointer-events-none" />
          <div className="relative z-10">
            {children}
          </div>
        </div>
        
      </div>
    </motion.section>
  );
}
