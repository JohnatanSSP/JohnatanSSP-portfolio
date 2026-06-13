'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioStore } from '../lib/store';
import projectsData from '../data/projects.json';
import { Project } from '../types';
import { Search, ExternalLink, X, Calendar, User, Compass } from 'lucide-react';

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);


export default function Projetos() {
  const {
    projectSearch,
    setProjectSearch,
    selectedTag,
    setSelectedTag,
    selectedProject,
    setSelectedProject,
  } = usePortfolioStore();

  // Get all unique tags for filter tabs (plus a default "Todos")
  const allTags = ['Todos', ...Array.from(new Set(projectsData.flatMap((p) => p.tags)))];

  // Filter projects by search query and category tag
  const filteredProjects = projectsData.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.description.toLowerCase().includes(projectSearch.toLowerCase());
      
    const matchesTag =
      selectedTag === 'Todos' || p.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedProject]);

  return (
    <div className="space-y-8 relative">
      
      {/* Intro Header */}
      <div className="max-w-3xl space-y-4">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight select-none">
          Projetos Realizados
        </h2>
        <p className="text-sm md:text-base text-text-secondary leading-relaxed">
          Explore uma seleção de plataformas criadas a partir do zero. Filtre pela tecnologia de sua preferência ou digite na barra de busca para pesquisar.
        </p>
      </div>

      {/* Filter controls row */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center border-b border-border-color pb-6">
        
        {/* Search bar input */}
        <div className="relative flex-1 max-w-md">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary/50">
            <Search size={16} />
          </span>
          <input
            type="text"
            placeholder="Buscar projetos por palavra-chave..."
            value={projectSearch}
            onChange={(e) => setProjectSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl text-xs md:text-sm font-medium glass-input focus:outline-none focus:ring-2 focus:ring-accent/40"
            aria-label="Buscar projetos"
          />
          {projectSearch && (
            <button
              onClick={() => setProjectSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary/60 hover:text-text-primary transition-colors cursor-pointer"
              aria-label="Limpar busca"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Tech Tag select box for mobile / simple bar for desktop */}
        <div className="flex flex-wrap gap-1.5 max-w-2xl">
          {allTags.slice(0, 7).map((tag) => {
            const isActive = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all cursor-pointer border select-none focus:outline-none focus:ring-2 focus:ring-accent/40 ${
                  isActive
                    ? 'text-text-primary border-accent/40 bg-accent/10 shadow-[0_0_12px_var(--accent-glow)]'
                    : 'text-text-secondary border-border-color hover:border-border-hover bg-card-bg/15 hover:text-text-primary'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project: Project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => setSelectedProject(project)}
              className="glass-panel glass-panel-hover rounded-2xl p-5 border-border-color cursor-pointer flex flex-col justify-between h-[280px] group overflow-hidden relative"
            >
              {/* Outer decorative tech lines */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent/0 via-accent/30 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="space-y-3">
                {/* Simulated Thumbnail Card Graphic */}
                <div className="w-full h-24 rounded-lg bg-card-inner border border-border-color/60 flex items-center justify-center relative overflow-hidden group-hover:border-accent/20 transition-colors">
                  {project.image ? (
                    <div className="absolute inset-0">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ) : (
                    <Compass size={24} className="text-text-secondary/35 group-hover:text-accent/60 group-hover:scale-110 transition-all duration-300" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-primary/40 pointer-events-none" />

                  <div className="absolute bottom-2 left-3 text-[9px] font-mono text-text-secondary/40 select-none tracking-widest uppercase">
                    SYS_BUILD // OK
                  </div>
                </div>

                <h3 className="text-base font-bold text-text-primary group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tags & Action Button Footer */}
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-border-color/30">
                <div className="flex gap-1 overflow-hidden truncate mr-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-semibold font-mono tracking-wider bg-bg-secondary border border-border-color px-2 py-0.5 rounded text-text-secondary/80 shrink-0"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="text-[9px] font-semibold font-mono bg-bg-secondary border border-border-color px-1.5 py-0.5 rounded text-text-secondary/50 shrink-0">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
                
                <span className="text-[10px] font-mono font-bold text-accent shrink-0 group-hover:underline flex items-center gap-1">
                  Detalhes
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="glass-panel rounded-2xl p-12 border-border-color text-center space-y-3">
          <p className="text-sm text-text-secondary">Nenhum projeto encontrado correspondendo aos termos da busca.</p>
          <button 
            onClick={() => { setProjectSearch(''); setSelectedTag('Todos'); }}
            className="text-xs font-semibold text-accent hover:underline cursor-pointer focus:outline-none"
          >
            Limpar Filtros e Voltar
          </button>
        </div>
      )}

      {/* Details Modal overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            
            {/* Modal Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-bg-primary/80 backdrop-blur-md cursor-zoom-out"
            />

            {/* Modal Body Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="glass-panel w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative border-color-border-color z-10 select-none flex flex-col max-h-[90vh]"
            >
              {/* Fake modal browser top bar */}
              <div className="h-10 bg-bg-secondary flex items-center justify-between px-4 border-b border-border-color">
                <span className="text-xs font-mono text-text-secondary/70">
                  PROJETO_SPECS // ID_{selectedProject.id}
                </span>
                
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1 rounded bg-card-bg hover:bg-card-hover border border-border-color text-text-secondary hover:text-text-primary transition-colors cursor-pointer focus:outline-none"
                  aria-label="Fechar modal"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Modal scrollable content body */}
              <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
                
                {/* Header detail */}
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-bold text-text-primary">
                    {selectedProject.title}
                  </h3>
                  
                  <div className="flex flex-wrap gap-4 text-xs font-mono text-text-secondary">
                    {selectedProject.year && (
                      <span className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-accent" />
                        <span>Ano: {selectedProject.year}</span>
                      </span>
                    )}
                    {selectedProject.role && (
                      <span className="flex items-center gap-1.5">
                        <User size={13} className="text-accent" />
                        <span>Função: {selectedProject.role}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Description block */}
                <div className="space-y-2">
                  <h4 className="text-xs uppercase font-mono tracking-widest text-text-secondary/60">
                    Sobre o Projeto
                  </h4>
                  <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Features block */}
                {selectedProject.features && (
                  <div className="space-y-2.5">
                    <h4 className="text-xs uppercase font-mono tracking-widest text-text-secondary/60">
                      Principais Funcionalidades
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-text-secondary">
                      {selectedProject.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2 bg-card-inner border border-border-color/40 p-2.5 rounded-lg">
                          <span className="text-accent select-none">•</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tags block */}
                <div className="space-y-2">
                  <h4 className="text-xs uppercase font-mono tracking-widest text-text-secondary/60">
                    Tecnologias Utilizadas
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-semibold font-mono tracking-wider bg-bg-secondary border border-border-color px-2.5 py-1 rounded-md text-text-secondary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Footer action buttons */}
              <div className="p-4 bg-bg-secondary border-t border-border-color flex items-center justify-end gap-3 shrink-0">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 px-4 rounded-xl border border-border-color hover:border-border-hover bg-card-bg/20 text-xs font-semibold flex items-center gap-2 text-text-primary hover:bg-card-bg/50 transition-all focus:outline-none"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Código Fonte</span>
                  </a>
                )}
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 px-4 rounded-xl bg-accent hover:bg-accent/80 text-xs font-semibold flex items-center gap-2 text-text-primary hover:shadow-[0_0_15px_var(--accent-glow)] transition-all focus:outline-none"
                  >
                    <ExternalLink size={14} />
                    <span>Demonstração</span>
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
