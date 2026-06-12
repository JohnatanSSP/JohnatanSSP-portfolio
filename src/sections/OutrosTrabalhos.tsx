'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioStore } from '../lib/store';
import worksData from '../data/works.json';
import { WorkItem } from '../types';
import { ClipboardCheck, Terminal, Palette, Settings, ArrowUpRight, FolderOpen } from 'lucide-react';

export default function OutrosTrabalhos() {
  const { activeWorkCategory, setActiveWorkCategory } = usePortfolioStore();

  const categories = ['Todos', 'QA', 'DevOps', 'Design', 'Ferramentas'];

  const filteredWorks = worksData.filter((work) => {
    return activeWorkCategory === 'Todos' || work.category === activeWorkCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'qa':
        return <ClipboardCheck size={14} className="text-emerald-400" />;
      case 'devops':
        return <Terminal size={14} className="text-blue-400" />;
      case 'design':
        return <Palette size={14} className="text-pink-400" />;
      default:
        return <Settings size={14} className="text-purple-400" />;
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Intro Header */}
      <div className="max-w-3xl space-y-4">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight select-none">
          Outros Trabalhos (CMS)
        </h2>
        <p className="text-sm md:text-base text-text-secondary leading-relaxed">
          Atividades complementares focadas em qualidade de software, arquitetura de infraestrutura automatizada, design systems e scripts de utilidades.
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 border-b border-border-color pb-5">
        {categories.map((cat) => {
          const isActive = activeWorkCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveWorkCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all cursor-pointer border select-none focus:outline-none focus:ring-2 focus:ring-accent/40 ${
                isActive
                  ? 'text-text-primary border-accent/40 bg-accent/10 shadow-[0_0_12px_var(--accent-glow)]'
                  : 'text-text-secondary border-border-color hover:border-border-hover bg-card-bg/15 hover:text-text-primary'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Works Grid */}
      <div className="min-h-[200px]">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((work: WorkItem, index) => (
              <motion.div
                layout
                key={work.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="glass-panel glass-panel-hover rounded-2xl p-5 border-border-color flex flex-col justify-between h-[240px] group relative overflow-hidden"
              >
                <div className="space-y-3.5">
                  
                  {/* Category Indicator Tag */}
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold tracking-wider select-none text-text-secondary/70">
                    <span className="flex items-center gap-1 bg-bg-secondary/80 border border-border-color px-2 py-0.5 rounded">
                      {getCategoryIcon(work.category)}
                      <span className="uppercase">{work.category}</span>
                    </span>
                    {work.date && <span>{work.date}</span>}
                  </div>

                  <h3 className="text-sm md:text-base font-bold text-text-primary group-hover:text-accent transition-colors truncate">
                    {work.title}
                  </h3>

                  <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
                    {work.description}
                  </p>
                </div>

                {/* Footer specs / link */}
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-border-color/30">
                  <div className="flex gap-1 overflow-hidden truncate mr-2">
                    {work.tags?.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[8px] font-mono tracking-wider bg-bg-secondary border border-border-color px-1.5 py-0.5 rounded text-text-secondary/80 shrink-0"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {work.link && (
                    <a
                      href={work.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-8 w-8 rounded-lg bg-card-inner border border-border-color/60 flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent/30 hover:shadow-[0_0_10px_var(--accent-glow)] transition-all cursor-pointer focus:outline-none shrink-0"
                      aria-label={`Visualizar link de ${work.title}`}
                    >
                      <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

    </div>
  );
}
