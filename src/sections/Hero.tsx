'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Terminal, Send, ArrowRight } from 'lucide-react';
import { scrollToSection } from '../lib/scrollTo';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Motion values for profile card mouse tilt parallax effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Transform coordinates to rotate angles
  const rotateX = useTransform(y, [-150, 150], [15, -15]);
  const rotateY = useTransform(x, [-150, 150], [-15, 15]);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  // Canvas particle field (local to Hero section)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }> = [];

    // Initialize particles
    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.7 + 0.2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 139, 250, ${p.opacity})`;
        ctx.fill();

        // Update positions
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around borders
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleScrollTo = (id: string) => scrollToSection(id);

  return (
    <div className="relative w-full py-8 px-2 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 min-h-[55vh] overflow-hidden">
      
      {/* Local Canvas Stars */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none opacity-60 z-0" 
      />

      {/* Hero Metadata / Introduction */}
      <div className="flex-1 space-y-6 text-left relative z-10">
        
        {/* Glowing badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/25 text-xs text-text-secondary select-none font-mono tracking-wider"
        >
          <Terminal size={12} className="text-accent" />
          <span>SISTEMA OPERACIONAL ATIVO</span>
        </motion.div>

        {/* Title Stagger */}
        <div className="space-y-3">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm font-semibold tracking-widest text-text-secondary uppercase"
          >
            Olá, eu sou
          </motion.h2>
          
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-text-primary via-text-secondary to-accent glow-text">
              Johnatan Paixão
            </span>
          </motion.h1>
          
          <motion.h3 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-xl md:text-2xl font-medium text-text-secondary/80 flex items-center gap-2"
          >
            Engenheiro Front-End & QA Tester
          </motion.h3>
        </div>

        {/* Descriptive Bio snippet */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-sm md:text-base text-text-secondary max-w-xl leading-relaxed"
        >
          Especializado na criação de interfaces modernas com Next.js e React, com experiência em e-commerces, plataformas escaláveis e testes de qualidade (QA manual, Smoke Testing e validação funcional). Unindo design responsivo e integridade técnica.
        </motion.p>

        {/* Call to Actions (CTAs) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center gap-4 pt-4"
        >
          {/* Primary CTA */}
          <button
            onClick={() => handleScrollTo('projetos')}
            className="px-6 py-3 rounded-xl bg-accent text-text-primary text-sm font-semibold tracking-wider hover:bg-accent/80 hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all flex items-center gap-2 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/40"
          >
            <span>Ver Projetos</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Secondary CTA */}
          <button
            onClick={() => handleScrollTo('contato')}
            className="px-6 py-3 rounded-xl border border-border-color hover:border-border-hover bg-card-bg/20 text-text-primary text-sm font-semibold tracking-wider hover:bg-card-bg/50 hover:shadow-[0_0_15px_rgba(255,255,255,0.05)] transition-all flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-border-hover/40"
          >
            <span>Falar Comigo</span>
            <Send size={14} className="text-text-secondary" />
          </button>
        </motion.div>
        
      </div>

      {/* Interactive 3D tilt Card Profile Area (Right side) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-64 h-64 md:w-80 md:h-80 relative z-10 perspective-1000 flex items-center justify-center"
      >
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          className="w-56 h-56 md:w-72 md:h-72 glass-panel rounded-3xl p-3 flex items-center justify-center relative shadow-[0_20px_50px_rgba(0,0,0,0.6)] cursor-grab active:cursor-grabbing border-color-border-color/30"
        >
          {/* Neon inner border glow */}
          <div className="absolute inset-2 rounded-2xl border border-accent/15 pointer-events-none" />
          
          {/* Tech grid layout decoration */}
          <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none rounded-3xl" />
          
          {/* Cybernetic Circle / Photo Placeholder */}
          <div 
            style={{ transform: 'translateZ(40px)' }}
            className="w-full h-full rounded-2xl bg-gradient-to-tr from-bg-secondary via-card-inner to-accent/10 border border-border-color flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300"
          >
            {/* Ambient scanner light effect */}
            <div className="absolute left-0 right-0 h-0.5 bg-accent/40 shadow-[0_0_10px_var(--accent-glow)] animate-[pulse_2s_infinite]" style={{ top: '35%' }} />
            
            {/* Graphic Symbol representing space/future */}
            <div className="w-24 h-24 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center relative shadow-[0_0_30px_rgba(147,51,234,0.15)]">
              <span className="text-3xl text-accent font-bold select-none tracking-widest animate-pulse">
                JS
              </span>
              
              {/* Spinning orbit ring */}
              <div className="absolute inset-[-10px] rounded-full border border-dashed border-text-secondary/20 animate-[spin_20s_linear_infinite]" />
            </div>

            <div className="mt-4 text-center">
              <span className="text-[10px] uppercase font-mono tracking-widest text-text-secondary/70">
                FRONT-END ENGINEER
              </span>
              <div className="text-xs text-text-primary font-bold mt-1 select-none">
                SYS_STATUS: READY
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
      
    </div>
  );
}
