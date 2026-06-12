'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, Award } from 'lucide-react';

const experiences = [
  {
    role: 'Engenheiro de Software & QA Automation',
    company: 'Cosmos Solutions',
    period: '2024 - Presente',
    description: 'Liderança na arquitetura de aplicações Next.js e estruturação de rotinas completas de QA. Integração de microsserviços e redução de erros em ambiente produtivo utilizando frameworks modernos de asserção.',
    achievements: [
      'Redução de 75% no tempo de testes manuais com automação de ponta a ponta (Playwright)',
      'Otimização de Web Vitals, alcançando escores acima de 95 em mobile',
      'Criação de micro-frontends modulares compartilhados entre múltiplos clusters'
    ]
  },
  {
    role: 'Desenvolvedor Frontend Pleno',
    company: 'Nebula Tech',
    period: '2022 - 2024',
    description: 'Implementação de interfaces responsivas em React com foco em design dinâmico e consumo de APIs RESTful estruturadas.',
    achievements: [
      'Migração de portal legado para Next.js App Router, diminuindo First Contentful Paint em 40%',
      'Criação de biblioteca de componentes Tailwind CSS compartilhada via NPM privado',
      'Configuração de pipelines de integração contínua (CI/CD) integrando lints e Jest'
    ]
  },
  {
    role: 'Desenvolvedor Frontend Júnior',
    company: 'Stellar Corp',
    period: '2021 - 2022',
    description: 'Manutenção de websites corporativos, landing pages promocionais e suporte em testes de acessibilidade.',
    achievements: [
      'Ajustes de acessibilidade (WCAG AA) em portais institucionais de alto tráfego',
      'Refatoração de CSS legado para utilitários modulares Tailwind CSS',
      'Colaboração próxima com equipes de design de produto utilizando Figma'
    ]
  }
];

export default function Experiencia() {
  return (
    <div className="space-y-12">
      
      {/* Title */}
      <div className="max-w-3xl space-y-4">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight select-none">
          Trajetória Profissional
        </h2>
        <p className="text-sm md:text-base text-text-secondary leading-relaxed">
          Minha carreira em desenvolvimento de software e controle de qualidade, construindo sistemas estáveis e interfaces de usuário fluidas.
        </p>
      </div>

      {/* Timeline Layout */}
      <div className="relative border-l border-dashed border-border-color pl-6 md:pl-10 ml-3 md:ml-6 space-y-10">
        
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="relative"
          >
            {/* Pulsing Timeline Dot Icon */}
            <span className="absolute -left-[35px] md:-left-[51px] top-1.5 w-6 h-6 rounded-full bg-bg-secondary border border-accent/40 flex items-center justify-center text-accent shadow-[0_0_10px_var(--accent-glow)] z-10">
              <Briefcase size={12} />
            </span>

            {/* Glowing vertical connector light */}
            <div className="absolute -left-[35px] md:-left-[51px] top-7 bottom-0 w-0.5 bg-gradient-to-b from-accent/40 to-transparent pointer-events-none" />

            <div className="glass-panel rounded-2xl p-6 border-border-color space-y-4 hover:border-accent/20 hover:shadow-[0_0_20px_rgba(147,51,234,0.1)] transition-all">
              
              {/* Header Info */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div>
                  <h3 className="text-base md:text-lg font-bold text-text-primary">
                    {exp.role}
                  </h3>
                  <span className="text-xs md:text-sm font-semibold text-accent/95">
                    {exp.company}
                  </span>
                </div>
                
                {/* Period Stamp */}
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-text-secondary/70 bg-bg-secondary/60 border border-border-color px-2.5 py-1 rounded-md self-start md:self-center">
                  <Calendar size={11} className="text-accent" />
                  <span>{exp.period}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                {exp.description}
              </p>

              {/* Key Achievements Grid */}
              <div className="space-y-2 pt-2 border-t border-border-color/50">
                <div className="text-[10px] uppercase font-mono tracking-widest text-text-secondary/50 flex items-center gap-1">
                  <Award size={10} className="text-accent" />
                  <span>Destaques & Conquistas</span>
                </div>
                <ul className="space-y-1.5 list-none">
                  {exp.achievements.map((ach, j) => (
                    <li key={j} className="text-xs text-text-secondary/80 flex items-start gap-2">
                      <span className="text-accent select-none mt-0.5">•</span>
                      <span className="leading-normal">{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </motion.div>
        ))}

      </div>

    </div>
  );
}
