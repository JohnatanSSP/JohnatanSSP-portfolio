'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolioStore } from '../lib/store';
import { scrollToSection } from '../lib/scrollTo';
import { 
  Home, 
  User, 
  Cpu, 
  Briefcase, 
  FolderGit2, 
  Mail 
} from 'lucide-react';

const navItems = [
  { id: 'hero', label: 'Início', icon: Home },
  { id: 'sobre', label: 'Sobre', icon: User },
  { id: 'skills', label: 'Skills', icon: Cpu },
  { id: 'experiencia', label: 'Carreira', icon: Briefcase },
  { id: 'projetos', label: 'Projetos', icon: FolderGit2 },
  { id: 'contato', label: 'Contato', icon: Mail },
];

export default function Navigation() {
  const { activeSection, setActiveSection } = usePortfolioStore();

  const handleScroll = (id: string) => {
    setActiveSection(id);
    scrollToSection(id);
  };

  return (
    <>
      {/* Desktop Navigation Sidebar (Left side, always visible) */}
      <nav className="hidden lg:flex flex-col justify-center items-center fixed left-6 top-0 bottom-0 z-50 pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="glass-panel p-3.5 rounded-2xl flex flex-col gap-5 border-border-color pointer-events-auto shadow-2xl relative"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className="relative p-3 rounded-xl text-text-secondary hover:text-text-primary transition-colors cursor-pointer group focus:outline-none focus:ring-2 focus:ring-accent/40"
                aria-label={`Ir para a seção ${item.label}`}
              >
                {/* Slid-in Capsule Highlight Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="desktop-nav-highlight"
                    className="absolute inset-0 bg-accent/25 rounded-xl border border-accent/40 shadow-[0_0_15px_var(--accent-glow)] z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                
                <Icon size={18} className="relative z-10" />

                {/* Floating Tooltip Label */}
                <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-bg-secondary border border-border-color text-text-primary text-[11px] font-semibold tracking-wider px-2.5 py-1 rounded-md opacity-0 scale-95 translate-x-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 transition-all duration-200 pointer-events-none shadow-xl select-none">
                  {item.label}
                </div>
              </button>
            );
          })}
        </motion.div>
      </nav>

      {/* Mobile Navigation Bottom Dock (Fixed at bottom) */}
      <nav className="lg:hidden fixed bottom-5 left-4 right-4 z-50 pointer-events-none flex justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="glass-panel w-full max-w-[420px] px-3 py-2.5 rounded-2xl flex justify-around items-center border-border-color pointer-events-auto shadow-2xl relative"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleScroll(item.id)}
                className="relative p-2.5 rounded-xl text-text-secondary hover:text-text-primary transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40"
                aria-label={`Ir para a seção ${item.label}`}
              >
                {/* Slide Capsule Highlight Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-highlight"
                    className="absolute inset-0 bg-accent/25 rounded-xl border border-accent/40 shadow-[0_0_15px_var(--accent-glow)] z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                
                <Icon size={18} className="relative z-10" />
              </button>
            );
          })}
        </motion.div>
      </nav>
    </>
  );
}
