'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioStore } from '../lib/store';
import projectsData from '../data/projects.json';
import worksData from '../data/works.json';
import { Project, WorkItem } from '../types';
import {
  Search, ExternalLink, X, Calendar, User, Compass,
  ClipboardCheck, Terminal, Palette, Settings, ArrowUpRight,
  FolderGit2, Layers,
} from 'lucide-react';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'qa': return <ClipboardCheck size={13} className="text-emerald-400" />;
    case 'devops': return <Terminal size={13} className="text-blue-400" />;
    case 'design': return <Palette size={13} className="text-pink-400" />;
    case 'frontend': return <Compass size={13} className="text-accent" />;
    default: return <Settings size={13} className="text-purple-400" />;
  }
};

export default function ProjetosTrabalhos() {
  const [mainTab, setMainTab] = useState<'projetos' | 'trabalhos'>('projetos');

  const {
    projectSearch, setProjectSearch,
    selectedTag, setSelectedTag,
    selectedProject, setSelectedProject,
    activeWorkCategory, setActiveWorkCategory,
  } = usePortfolioStore();

  const allTags = ['Todos', ...Array.from(new Set(projectsData.flatMap((p) => p.tags)))];
  const workCategories = ['Todos', 'QA', 'Frontend', 'Suporte'];

  const filteredProjects = projectsData.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.description.toLowerCase().includes(projectSearch.toLowerCase());
    const matchesTag = selectedTag === 'Todos' || p.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const filteredWorks = worksData.filter((w) =>
    activeWorkCategory === 'Todos' || w.category === activeWorkCategory
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedProject]);

  return (
    <div className="space-y-6">

      {/* Header + main tab switcher */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Projetos & Trabalhos
          </h2>
          <p className="text-sm text-text-secondary mt-1 leading-relaxed">
            Plataformas desenvolvidas do zero e atividades complementares de QA e front-end.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1 glass-panel rounded-xl p-1 border-border-color self-start sm:self-auto shrink-0">
          <button
            onClick={() => setMainTab('projetos')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wider transition-all cursor-pointer focus:outline-none ${
              mainTab === 'projetos'
                ? 'bg-accent/20 text-text-primary border border-accent/40 shadow-[0_0_12px_var(--accent-glow)]'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <FolderGit2 size={13} />
            Projetos
          </button>
          <button
            onClick={() => setMainTab('trabalhos')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold tracking-wider transition-all cursor-pointer focus:outline-none ${
              mainTab === 'trabalhos'
                ? 'bg-accent/20 text-text-primary border border-accent/40 shadow-[0_0_12px_var(--accent-glow)]'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Layers size={13} />
            Outros Trabalhos
          </button>
        </div>
      </div>

      {/* ── PROJETOS TAB ───────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {mainTab === 'projetos' && (
          <motion.div
            key="projetos"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            {/* Filter row */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center border-b border-border-color pb-4">
              <div className="relative flex-1 max-w-xs">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary/50" />
                <input
                  type="text"
                  placeholder="Buscar projeto..."
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  className="w-full h-9 pl-9 pr-4 rounded-xl text-xs font-medium glass-input focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
                {projectSearch && (
                  <button onClick={() => setProjectSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary/60 hover:text-text-primary">
                    <X size={13} />
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {allTags.slice(0, 6).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold tracking-wider transition-all cursor-pointer border focus:outline-none ${
                      selectedTag === tag
                        ? 'text-text-primary border-accent/40 bg-accent/10 shadow-[0_0_10px_var(--accent-glow)]'
                        : 'text-text-secondary border-border-color hover:border-border-hover bg-card-bg/15'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredProjects.map((project: Project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    onClick={() => setSelectedProject(project)}
                    className="glass-panel glass-panel-hover rounded-2xl p-4 border-border-color cursor-pointer flex flex-col justify-between group overflow-hidden relative"
                  >
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent/0 via-accent/30 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="space-y-2.5">
                      <div className="w-full h-16 rounded-lg bg-card-inner border border-border-color/60 flex items-center justify-center relative overflow-hidden group-hover:border-accent/20 transition-colors">
                        {project.image ? (
                          <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, 50vw"
                            loading="lazy"
                            quality={75}
                          />
                        ) : (
                          <Compass size={20} className="text-text-secondary/35 group-hover:text-accent/60 group-hover:scale-110 transition-all duration-300" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-primary/40 pointer-events-none" />
                        <div className="absolute bottom-1.5 left-2.5 text-[8px] font-mono text-text-secondary/40 select-none tracking-widest uppercase">SYS_BUILD // OK</div>
                      </div>

                      <h3 className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors leading-snug">
                        {project.title}
                      </h3>
                      <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-border-color/30">
                      <div className="flex gap-1 overflow-hidden">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="text-[8px] font-mono tracking-wider bg-bg-secondary border border-border-color px-1.5 py-0.5 rounded text-text-secondary/80 shrink-0">
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="text-[8px] font-mono bg-bg-secondary border border-border-color px-1.5 py-0.5 rounded text-text-secondary/50 shrink-0">+{project.tags.length - 3}</span>
                        )}
                      </div>
                      <span className="text-[10px] font-mono font-bold text-accent shrink-0 group-hover:underline">Detalhes</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="glass-panel rounded-2xl p-8 border-border-color text-center space-y-2">
                <p className="text-sm text-text-secondary">Nenhum projeto encontrado.</p>
                <button onClick={() => { setProjectSearch(''); setSelectedTag('Todos'); }} className="text-xs font-semibold text-accent hover:underline cursor-pointer">
                  Limpar filtros
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* ── OUTROS TRABALHOS TAB ───────────────────────────────── */}
        {mainTab === 'trabalhos' && (
          <motion.div
            key="trabalhos"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            {/* Category filters */}
            <div className="flex flex-wrap gap-2 border-b border-border-color pb-4">
              {workCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveWorkCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold tracking-wider transition-all cursor-pointer border focus:outline-none ${
                    activeWorkCategory === cat
                      ? 'text-text-primary border-accent/40 bg-accent/10 shadow-[0_0_10px_var(--accent-glow)]'
                      : 'text-text-secondary border-border-color hover:border-border-hover bg-card-bg/15'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {filteredWorks.map((work: WorkItem, index) => (
                  <motion.div
                    layout
                    key={work.id}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ duration: 0.25, delay: index * 0.04 }}
                    className="glass-panel glass-panel-hover rounded-2xl p-4 border-border-color flex flex-col justify-between group relative overflow-hidden"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-[10px] font-mono font-bold tracking-wider text-text-secondary/70">
                        <span className="flex items-center gap-1 bg-bg-secondary/80 border border-border-color px-2 py-0.5 rounded">
                          {getCategoryIcon(work.category)}
                          <span className="uppercase">{work.category}</span>
                        </span>
                        {work.date && <span>{work.date}</span>}
                      </div>

                      <h3 className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors leading-snug">
                        {work.title}
                      </h3>

                      <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                        {work.description}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-3 pt-2.5 border-t border-border-color/30">
                      <div className="flex gap-1 overflow-hidden">
                        {work.tags?.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-[8px] font-mono tracking-wider bg-bg-secondary border border-border-color px-1.5 py-0.5 rounded text-text-secondary/80 shrink-0">
                            {tag}
                          </span>
                        ))}
                      </div>
                      {work.link && (
                        <a
                          href={work.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="h-7 w-7 rounded-lg bg-card-inner border border-border-color/60 flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/30 hover:shadow-[0_0_10px_var(--accent-glow)] transition-all shrink-0"
                          aria-label={`Visualizar ${work.title}`}
                        >
                          <ArrowUpRight size={13} />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PROJECT DETAIL MODAL ──────────────────────────────────── */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-bg-primary/80 backdrop-blur-md cursor-zoom-out"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="glass-panel w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative z-10 flex flex-col max-h-[88vh]"
            >
              <div className="h-10 bg-bg-secondary flex items-center justify-between px-4 border-b border-border-color shrink-0">
                <span className="text-xs font-mono text-text-secondary/70">
                  PROJETO_SPECS // ID_{selectedProject.id}
                </span>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1 rounded bg-card-bg hover:bg-card-hover border border-border-color text-text-secondary hover:text-text-primary transition-colors cursor-pointer focus:outline-none"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="p-6 md:p-8 space-y-5 overflow-y-auto">
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-bold text-text-primary">{selectedProject.title}</h3>
                  <div className="flex flex-wrap gap-4 text-xs font-mono text-text-secondary">
                    {selectedProject.year && (
                      <span className="flex items-center gap-1.5"><Calendar size={12} className="text-accent" />Ano: {selectedProject.year}</span>
                    )}
                    {selectedProject.role && (
                      <span className="flex items-center gap-1.5"><User size={12} className="text-accent" />Função: {selectedProject.role}</span>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-[10px] uppercase font-mono tracking-widest text-text-secondary/60">Sobre o Projeto</h4>
                  <p className="text-xs md:text-sm text-text-secondary leading-relaxed">{selectedProject.description}</p>
                </div>

                {selectedProject.features && (
                  <div className="space-y-2">
                    <h4 className="text-[10px] uppercase font-mono tracking-widest text-text-secondary/60">Principais Funcionalidades</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-text-secondary">
                      {selectedProject.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 bg-card-inner border border-border-color/40 p-2.5 rounded-lg">
                          <span className="text-accent select-none shrink-0">•</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="space-y-2">
                  <h4 className="text-[10px] uppercase font-mono tracking-widest text-text-secondary/60">Tecnologias</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tags.map((tag) => (
                      <span key={tag} className="text-xs font-mono tracking-wider bg-bg-secondary border border-border-color px-2.5 py-1 rounded-md text-text-secondary">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-bg-secondary border-t border-border-color flex items-center justify-end gap-3 shrink-0">
                {selectedProject.github && (
                  <a href={selectedProject.github} target="_blank" rel="noopener noreferrer"
                    className="h-9 px-4 rounded-xl border border-border-color hover:border-border-hover bg-card-bg/20 text-xs font-semibold flex items-center gap-2 text-text-primary hover:bg-card-bg/50 transition-all focus:outline-none">
                    <GithubIcon className="w-3.5 h-3.5" />
                    Código Fonte
                  </a>
                )}
                {selectedProject.demo && (
                  <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer"
                    className="h-9 px-4 rounded-xl bg-accent hover:bg-accent/80 text-xs font-semibold flex items-center gap-2 text-text-primary hover:shadow-[0_0_15px_var(--accent-glow)] transition-all focus:outline-none">
                    <ExternalLink size={13} />
                    Demonstração
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
