'use client';

import React, { useEffect } from 'react';
import { usePortfolioStore } from '../lib/store';
import Navigation from '../components/Navigation';
import SectionWrapper from '../components/SectionWrapper';
import Hero from '../sections/Hero';
import Sobre from '../sections/Sobre';
import Skills from '../sections/Skills';
import Experiencia from '../sections/Experiencia';
import Projetos from '../sections/Projetos';
import OutrosTrabalhos from '../sections/OutrosTrabalhos';
import Contato from '../sections/Contato';
import { Home as HomeIcon, User, Cpu, Briefcase, FolderGit2, Layers, Mail } from 'lucide-react';

export default function Page() {
  const { setActiveSection } = usePortfolioStore();

  // Scroll active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['hero', 'sobre', 'skills', 'experiencia', 'projetos', 'trabalhos', 'contato'];
    
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          // Triggers section change when the element crosses around the mid-height region of viewport
          rootMargin: '-30% 0px -55% 0px',
          threshold: 0,
        }
      );
      
      observer.observe(el);
      
      return { observer, el };
    });

    return () => {
      observers.forEach((item) => {
        if (item) {
          item.observer.unobserve(item.el);
        }
      });
    };
  }, [setActiveSection]);

  return (
    <main className="min-h-screen relative w-full overflow-hidden bg-bg-primary">
      {/* Universal Starfield drift space background */}
      <div className="starfield" />

      {/* Floating navigation dock (Desktop left bar, Mobile bottom bar) */}
      <Navigation />

      {/* Main stacked sections list layout container */}
      <div className="relative max-w-5xl mx-auto px-4 lg:pl-24 lg:pr-8 py-20 flex flex-col gap-0 select-none">
        
        {/* Cosmos System Deck Logo Header */}
        <div className="flex items-center justify-between mb-8 px-2 select-none">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-accent/20 border border-accent flex items-center justify-center text-[10px] font-bold text-text-primary shadow-[0_0_10px_var(--accent-glow)]">
              Ω
            </div>
            <span className="font-mono text-xs font-black tracking-widest text-text-primary uppercase">
              COSMOS_DECK
            </span>
          </div>
          <div className="text-[10px] font-mono text-text-secondary/50">
            SYSTEM_UPTIME // 99.98%
          </div>
        </div>

        {/* Stack of Sections wrapped in Browser Frames */}
        <SectionWrapper 
          id="hero" 
          title="hero.tsx" 
          index={0} 
          icon={<HomeIcon size={13} />} 
          urlPath="portfolio.cosmos/home"
        >
          <Hero />
        </SectionWrapper>

        <SectionWrapper 
          id="sobre" 
          title="sobre.tsx" 
          index={1} 
          icon={<User size={13} />} 
          urlPath="portfolio.cosmos/sobre"
        >
          <Sobre />
        </SectionWrapper>

        <SectionWrapper 
          id="skills" 
          title="skills.tsx" 
          index={2} 
          icon={<Cpu size={13} />} 
          urlPath="portfolio.cosmos/skills"
        >
          <Skills />
        </SectionWrapper>

        <SectionWrapper 
          id="experiencia" 
          title="experiencia.tsx" 
          index={3} 
          icon={<Briefcase size={13} />} 
          urlPath="portfolio.cosmos/experiencia"
        >
          <Experiencia />
        </SectionWrapper>

        <SectionWrapper 
          id="projetos" 
          title="projetos.tsx" 
          index={4} 
          icon={<FolderGit2 size={13} />} 
          urlPath="portfolio.cosmos/projetos"
        >
          <Projetos />
        </SectionWrapper>

        <SectionWrapper 
          id="trabalhos" 
          title="outros_trabalhos.tsx" 
          index={5} 
          icon={<Layers size={13} />} 
          urlPath="portfolio.cosmos/outros-trabalhos"
        >
          <OutrosTrabalhos />
        </SectionWrapper>

        <SectionWrapper 
          id="contato" 
          title="contato.tsx" 
          index={6} 
          icon={<Mail size={13} />} 
          urlPath="portfolio.cosmos/contato"
        >
          <Contato />
        </SectionWrapper>

      </div>
    </main>
  );
}
