'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Compass, ShieldCheck, Heart } from 'lucide-react';

const cardsData = [
  {
    icon: Code2,
    title: 'Front-End Moderno',
    desc: 'Especializado em React.js e Next.js com TypeScript, criando interfaces responsivas e acessíveis para e-commerces, blogs e plataformas web escaláveis.',
  },
  {
    icon: ShieldCheck,
    title: 'QA & Qualidade',
    desc: 'QA manual, Smoke Testing, criação de casos de teste e documentação de bugs com Jira e TestRail. Garantia de qualidade integrada ao fluxo ágil.',
  },
  {
    icon: Compass,
    title: 'Stack Completa',
    desc: 'Experiência prática com Node.js, NestJS, PostgreSQL, Docker e APIs RESTful/GraphQL — do frontend ao backend.',
  },
  {
    icon: Heart,
    title: 'Foco no Usuário',
    desc: 'Interfaces premium devem ser acessíveis e fluidas. Utilizo Figma, Tailwind CSS e SASS para entregar experiências visuais de alta qualidade.',
  },
];

export default function Sobre() {
  return (
    <div className="space-y-8">
      
      {/* Intro Text */}
      <div className="max-w-3xl space-y-4">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight select-none">
          Sobre Mim
        </h2>
        <p className="text-sm md:text-base text-text-secondary leading-relaxed">
          Desenvolvedor Web Front-End e QA Tester com mais de 3 anos de experiência em desenvolvimento de
          aplicações web modernas, e-commerces e plataformas escaláveis utilizando React, Next.js, JavaScript e
          TypeScript. Também possuo vivência em suporte técnico e manutenção de sistemas, o que me confere
          uma visão analítica apurada para resolução de problemas complexos.
        </p>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cardsData.map((card, i) => {
          const Icon = card.icon;
          
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-panel glass-panel-hover rounded-2xl p-6 relative flex flex-col justify-between gap-4 border-border-color"
            >
              {/* Corner decor */}
              <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-accent/30 pointer-events-none" />
              
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/25 flex items-center justify-center text-accent">
                  <Icon size={20} />
                </div>
                <h3 className="text-base font-semibold text-text-primary">
                  {card.title}
                </h3>
                <p className="text-xs md:text-sm text-text-secondary leading-relaxed">
                  {card.desc}
                </p>
              </div>

              {/* Status byte marker */}
              <div className="text-[9px] font-mono text-text-secondary/35 select-none self-end mt-2 uppercase">
                BLOCK_SEC // {i + 1}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Quick Stats */}
      <div className="glass-panel rounded-2xl p-6 border-border-color grid grid-cols-2 lg:grid-cols-4 gap-6 text-center shadow-lg bg-bg-secondary/40">
        {[
          { num: '+3 Anos', label: 'Experiência' },
          { num: '50+', label: 'Projetos Entregues' },
          { num: '3+', label: 'Empresas' },
          { num: '99%+', label: 'Disponibilidade QA' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="space-y-1 group"
          >
            <div className="text-lg md:text-2xl font-black text-text-primary group-hover:text-accent transition-colors">
              {stat.num}
            </div>
            <div className="text-[10px] md:text-xs uppercase font-mono tracking-wider text-text-secondary/70">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
      
    </div>
  );
}
