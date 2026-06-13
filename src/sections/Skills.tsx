'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Server, ClipboardCheck, Infinity, Wrench } from 'lucide-react';

const skillCategories = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: Layout,
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'Next.js', level: 90 },
      { name: 'TypeScript / JavaScript (ES6+)', level: 88 },
      { name: 'Tailwind CSS / SASS', level: 90 },
      { name: 'HTML5 / CSS3', level: 95 },
    ]
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: Server,
    skills: [
      { name: 'Node.js / NestJS', level: 75 },
      { name: 'Java', level: 65 },
      { name: 'PostgreSQL', level: 70 },
      { name: 'REST API / GraphQL', level: 82 },
      { name: 'Prisma ORM', level: 72 },
    ]
  },
  {
    id: 'qa',
    label: 'QA & Testes',
    icon: ClipboardCheck,
    skills: [
      { name: 'QA Manual / Smoke Testing', level: 85 },
      { name: 'Test Cases & Bug Report', level: 88 },
      { name: 'TestRail', level: 80 },
      { name: 'Testes de Regressão', level: 82 },
      { name: 'Jira', level: 85 },
    ]
  },
  {
    id: 'devops',
    label: 'DevOps & Infra',
    icon: Infinity,
    skills: [
      { name: 'Docker', level: 75 },
      { name: 'Git / GitHub', level: 92 },
      { name: 'Scrum / Metodologias Ágeis', level: 85 },
    ]
  },
  {
    id: 'ferramentas',
    label: 'Ferramentas',
    icon: Wrench,
    skills: [
      { name: 'Postman', level: 85 },
      { name: 'Figma', level: 78 },
      { name: 'VS Code', level: 95 },
      { name: 'Jira / TestRail', level: 85 },
    ]
  }
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState('frontend');

  const activeCategory = skillCategories.find(cat => cat.id === activeTab) || skillCategories[0];

  return (
    <div className="space-y-7">
      
      {/* Title */}
      <div className="max-w-3xl space-y-4">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight select-none">
          Tecnologias & Skills
        </h2>
        <p className="text-sm md:text-base text-text-secondary leading-relaxed">
          Navegue pelas categorias abaixo para ver os níveis técnicos e as pilhas de ferramentas que utilizo no meu cotidiano para projetar e testar.
        </p>
      </div>

      {/* Categories Bar */}
      <div className="flex flex-wrap gap-2.5 border-b border-border-color pb-4">
        {skillCategories.map((cat) => {
          const Icon = cat.icon;
          const isActive = cat.id === activeTab;
          
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`relative px-4 py-2 rounded-xl text-xs md:text-sm font-semibold tracking-wider flex items-center gap-2 cursor-pointer transition-colors border select-none focus:outline-none focus:ring-2 focus:ring-accent/40 ${
                isActive 
                  ? 'text-text-primary border-accent/40 bg-accent/10 shadow-[0_0_15px_var(--accent-glow)]' 
                  : 'text-text-secondary border-border-color hover:border-border-hover bg-card-bg/25 hover:text-text-primary'
              }`}
            >
              <Icon size={14} className={isActive ? 'text-accent' : 'text-text-secondary'} />
              <span>{cat.label}</span>
              
              {isActive && (
                <motion.div
                  layoutId="active-skill-dot"
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent-glow)]"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Skills Pill list with animated stagger */}
      <div className="min-h-[220px] relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {activeCategory.skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="glass-panel rounded-xl p-4 flex flex-col justify-between gap-3 border-border-color select-none hover:border-accent/30 hover:shadow-[0_0_15px_rgba(147,51,234,0.15)] transition-all"
              >
                <div className="flex justify-between items-center text-xs md:text-sm">
                  <span className="font-semibold text-text-primary">{skill.name}</span>
                  <span className="font-mono text-accent text-xs font-bold">{skill.level}%</span>
                </div>
                
                {/* Visual Neumorphic Meter */}
                <div className="w-full h-2 rounded-full bg-card-inner border border-border-color overflow-hidden p-0.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-accent to-text-secondary shadow-[0_0_8px_var(--accent-glow)]"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Sub-card footer details */}
      <div className="text-[10px] font-mono text-text-secondary/40 select-none uppercase text-right">
        INTEGRIDADE_STACK: 100% // ALL_SYSTEMS_OPERATIONAL
      </div>

    </div>
  );
}
