'use client';

import React, { useEffect } from 'react';
import { usePortfolioStore } from '../lib/store';
import Navigation from '../components/Navigation';
import SectionWrapper from '../components/SectionWrapper';
import Hero from '../sections/Hero';
import Sobre from '../sections/Sobre';
import Skills from '../sections/Skills';
import Experiencia from '../sections/Experiencia';
import ProjetosTrabalhos from '../sections/ProjetosTrabalhos';
import Contato from '../sections/Contato';
import { Home as HomeIcon, User, Cpu, Briefcase, FolderGit2, Mail } from 'lucide-react';

export default function Page() {
  const { setActiveSection } = usePortfolioStore();

  useEffect(() => {
    const sectionIds = ['hero', 'sobre', 'skills', 'experiencia', 'projetos', 'contato'];

    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-30% 0px -55% 0px', threshold: 0 }
      );

      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((item) => {
        if (item) item.observer.unobserve(item.el);
      });
    };
  }, [setActiveSection]);

  return (
    <main className="min-h-screen relative w-full overflow-hidden bg-bg-primary">
      {/* Universal Starfield drift space background */}
      <div className="starfield" />

      {/* Floating navigation dock */}
      <Navigation />

      {/* Main stacked sections */}
      <div className="relative max-w-5xl mx-auto px-4 lg:pl-24 lg:pr-8 py-20 flex flex-col gap-0 select-none">

        {/* Portfolio Logo Header */}
        <div className="flex items-center justify-between mb-8 px-2 select-none">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-accent/20 border border-accent flex items-center justify-center text-[10px] font-bold text-text-primary shadow-[0_0_10px_var(--accent-glow)]">
              Ω
            </div>
            <span className="font-mono text-xs font-black tracking-widest text-text-primary uppercase">
              JOHNATAN_SSP
            </span>
          </div>
          <div className="text-[10px] font-mono text-text-secondary/50">
            SYSTEM_UPTIME // 99.98%
          </div>
        </div>

        <SectionWrapper id="hero" title="hero.tsx" index={0} icon={<HomeIcon size={13} />} urlPath="portfolio.johnatanssp/home">
          <Hero />
        </SectionWrapper>

        <SectionWrapper id="sobre" title="sobre.tsx" index={1} icon={<User size={13} />} urlPath="portfolio.johnatanssp/sobre">
          <Sobre />
        </SectionWrapper>

        <SectionWrapper id="skills" title="skills.tsx" index={2} icon={<Cpu size={13} />} urlPath="portfolio.johnatanssp/skills">
          <Skills />
        </SectionWrapper>

        <SectionWrapper id="experiencia" title="experiencia.tsx" index={3} icon={<Briefcase size={13} />} urlPath="portfolio.johnatanssp/experiencia">
          <Experiencia />
        </SectionWrapper>

        <SectionWrapper id="projetos" title="projetos_trabalhos.tsx" index={4} icon={<FolderGit2 size={13} />} urlPath="portfolio.johnatanssp/projetos">
          <ProjetosTrabalhos />
        </SectionWrapper>

        <SectionWrapper id="contato" title="contato.tsx" index={5} icon={<Mail size={13} />} urlPath="portfolio.johnatanssp/contato">
          <Contato />
        </SectionWrapper>

      </div>
    </main>
  );
}
