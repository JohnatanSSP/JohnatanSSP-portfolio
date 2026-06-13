'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, Award } from 'lucide-react';

const experiences = [
  {
    role: 'Analista de Suporte Técnico',
    company: 'SONDA',
    period: 'Jan 2025 – Mar 2026',
    description: 'Suporte técnico de software e hardware para equipamentos médicos críticos, garantindo disponibilidade superior a 99% dos sistemas vitais em ambientes de produção.',
    achievements: [
      'Diagnóstico avançado e resolução de falhas em ambientes de produção, reduzindo o MTTR com novos protocolos de documentação técnica',
      'Interface técnica entre clientes finais e time de engenharia, traduzindo falhas operacionais em requisitos de correção de software',
      'Suporte a sistemas de alta criticidade com foco em continuidade e estabilidade operacional'
    ]
  },
  {
    role: 'Front-End Software Engineer Junior',
    company: 'Zoio Brands – Design Studio',
    period: 'Jan 2020 – Abr 2023',
    description: 'Desenvolvimento e manutenção de aplicações web estáticas e dinâmicas, e-commerces e blogs, com foco em performance e responsividade em projetos ágeis.',
    achievements: [
      'Criação de websites, landing pages, e-commerces e blogs usando React.js, Next.js e TypeScript',
      'Integração com APIs RESTful e GraphQL para consumo de dados',
      'Experiência backend com Node.js, Prisma ORM, PostgreSQL, Docker e NestJS'
    ]
  }
];

export default function Experiencia() {
  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div className="max-w-3xl space-y-4">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight select-none">
          Trajetória Profissional
        </h2>
        <p className="text-sm md:text-base text-text-secondary leading-relaxed">
          Minha trajetória em desenvolvimento front-end e suporte técnico, construindo interfaces modernas e garantindo a qualidade dos sistemas.
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
