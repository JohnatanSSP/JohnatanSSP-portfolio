'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, Copy, Check, Info } from 'lucide-react';

const GithubIcon = ({ size = 16, className }: { size?: number; className?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 16, className }: { size?: number; className?: string }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Contato() {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const contactDetails = [
    { type: 'E-mail', val: 'johnatan.sousa@gmail.com', icon: Mail, action: 'copy' },
    { type: 'GitHub', val: 'https://github.com/sirpantheon', icon: GithubIcon, action: 'link' },
    { type: 'LinkedIn', val: 'https://linkedin.com/in/johnatanssp', icon: LinkedinIcon, action: 'link' },
  ];

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 4000);
    }, 1500);
  };

  return (
    <div className="space-y-12">
      
      {/* Intro Header */}
      <div className="max-w-3xl space-y-4">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight select-none">
          Iniciar Transmissão (Contato)
        </h2>
        <p className="text-sm md:text-base text-text-secondary leading-relaxed">
          Preencha o formulário para enviar uma mensagem criptografada diretamente para o meu terminal ou clique nas opções de contato rápido para copiar ou abrir links externos.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        
        {/* Contact Info Deck */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-sm uppercase font-mono tracking-widest text-text-secondary/60">
            Conexão Rápida
          </h3>

          <div className="space-y-3">
            {contactDetails.map((contact) => {
              const Icon = contact.icon;
              const isCopy = contact.action === 'copy';
              
              return (
                <div
                  key={contact.type}
                  className="glass-panel rounded-2xl p-4 border-border-color flex flex-col gap-3 bg-bg-secondary/20 hover:border-accent/20 transition-all group"
                >
                  {/* Icon + label + value */}
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/25 flex items-center justify-center text-accent shrink-0">
                      <Icon size={16} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase font-mono tracking-wider text-text-secondary/60 select-none">
                        {contact.type}
                      </div>
                      <div className="text-xs md:text-sm font-semibold text-text-primary break-all">
                        {isCopy ? contact.val : contact.val.replace('https://', '')}
                      </div>
                    </div>
                  </div>

                  {/* Button on its own line */}
                  {isCopy ? (
                    <button
                      onClick={() => handleCopy(contact.val, contact.type)}
                      className="w-full h-9 px-3 rounded-xl border border-border-color hover:border-accent/40 bg-card-bg/30 text-xs text-text-secondary hover:text-text-primary hover:bg-accent/10 transition-all cursor-pointer flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-accent/30"
                      title={`Copiar ${contact.type}`}
                    >
                      <AnimatePresence mode="wait">
                        {copiedType === contact.type ? (
                          <motion.span 
                            key="check" 
                            initial={{ scale: 0.8 }} 
                            animate={{ scale: 1 }} 
                            exit={{ scale: 0.8 }}
                            className="flex items-center gap-1.5 text-emerald-400 font-semibold"
                          >
                            <Check size={13} />
                            <span>Copiado!</span>
                          </motion.span>
                        ) : (
                          <motion.span 
                            key="copy" 
                            initial={{ scale: 0.8 }} 
                            animate={{ scale: 1 }} 
                            exit={{ scale: 0.8 }}
                            className="flex items-center gap-1.5"
                          >
                            <Copy size={13} />
                            <span>Copiar e-mail</span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>
                  ) : (
                    <a
                      href={contact.val}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-9 px-3 rounded-xl border border-border-color hover:border-accent/40 bg-card-bg/30 text-xs text-text-secondary hover:text-text-primary hover:bg-accent/10 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-accent/30"
                    >
                      <span>Acessar {contact.type}</span>
                    </a>
                  )}
                </div>
              );
            })}
          </div>

          {/* Availability note */}
          <div className="glass-panel rounded-2xl p-4 border-border-color bg-bg-secondary/40 text-xs text-text-secondary flex items-start gap-3">
            <Info size={16} className="text-accent shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Disponível para novos projetos corporativos, auditorias avançadas de testes de software e assessorias focadas em Web Core Vitals.
            </p>
          </div>
        </div>

        {/* Message Form (Neumorphic Accent) */}
        <div className="lg:col-span-3">
          <form 
            onSubmit={handleSubmit}
            className="glass-panel rounded-3xl p-6 md:p-8 border-border-color space-y-5"
          >
            <h3 className="text-sm uppercase font-mono tracking-widest text-text-secondary/60 pb-2 border-b border-border-color/30">
              Formulário de Mensagem
            </h3>

            {/* Name Input */}
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-xs font-semibold text-text-secondary">
                Nome Identificador
              </label>
              <input
                id="name"
                type="text"
                required
                disabled={formStatus === 'sending'}
                placeholder="Ex. Alice Smith"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                className="w-full h-11 px-4 rounded-xl text-xs md:text-sm font-medium glass-input neumorphic-inset focus:outline-none"
              />
            </div>

            {/* Email Input */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-xs font-semibold text-text-secondary">
                Ponto de Contato (E-mail)
              </label>
              <input
                id="email"
                type="email"
                required
                disabled={formStatus === 'sending'}
                placeholder="Ex. alice@domain.com"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                className="w-full h-11 px-4 rounded-xl text-xs md:text-sm font-medium glass-input neumorphic-inset focus:outline-none"
              />
            </div>

            {/* Message Area */}
            <div className="space-y-1.5">
              <label htmlFor="message" className="text-xs font-semibold text-text-secondary">
                Carga Útil da Mensagem
              </label>
              <textarea
                id="message"
                required
                rows={4}
                disabled={formStatus === 'sending'}
                placeholder="Digite aqui o propósito de seu contato..."
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                className="w-full p-4 rounded-xl text-xs md:text-sm font-medium glass-input neumorphic-inset focus:outline-none resize-none"
              />
            </div>

            {/* Action button / Status block */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              
              <AnimatePresence mode="wait">
                {formStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="text-emerald-400 text-xs font-bold font-mono flex items-center gap-1.5"
                  >
                    <Check size={14} className="animate-bounce" />
                    <span>TRANSMISSÃO COMPLETA COM SUCESSO!</span>
                  </motion.div>
                )}
                {formStatus === 'sending' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-accent text-xs font-mono flex items-center gap-1.5"
                  >
                    <div className="w-3.5 h-3.5 rounded-full border border-accent border-t-transparent animate-spin" />
                    <span>ENVIANDO TRANSMISSÃO...</span>
                  </motion.div>
                )}
                {formStatus === 'idle' && (
                  <span className="text-[10px] font-mono text-text-secondary/40 select-none uppercase">
                    CANAL_DE_FIBRA // DISPONÍVEL
                  </span>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={formStatus !== 'idle'}
                className="h-11 px-6 rounded-xl bg-accent text-text-primary text-xs font-bold tracking-wider hover:bg-accent/80 hover:shadow-[0_0_15px_var(--accent-glow)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-40 disabled:pointer-events-none focus:outline-none"
              >
                <span>Enviar Mensagem</span>
                <Send size={12} />
              </button>

            </div>

          </form>
        </div>

      </div>

    </div>
  );
}
