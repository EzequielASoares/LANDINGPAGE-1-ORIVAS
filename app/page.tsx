"use client";

import React, { useEffect, useRef, useState } from 'react';
import { 
  Cpu, 
  Code2, 
  Database, 
  BrainCircuit, 
  ChevronRight, 
  Terminal, 
  LineChart,
  Lightbulb,
  CircleCheck,
  Menu,
  X,
  Sparkles,
  Zap,
  ShieldCheck,
  Layers,
  ArrowRight,
  Server
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// Importações de ícones de redes sociais e tecnologias
import { FaGithub, FaTwitter, FaLinkedin, FaPython } from 'react-icons/fa';
import { 
  SiNextdotjs, SiTailwindcss, SiOpenai, SiLangchain, 
  SiPytorch, SiVercel, SiFastapi, SiPostgresql, SiTypescript, SiDocker 
} from 'react-icons/si';

import OrivatechLogoMini from './OrivatechLogoMini'; // Ajuste o caminho se necessário
import OrivatechLogo from './Orivatechlogo'; // Ajuste o caminho se estiver em outra pasta
// --- STYLES & FONT INJECTION ---
const globalStyles = `
  /* Importa as duas fontes */
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500&display=swap');

  :root {
    --bg-color: #050508;
  }

  body {
    background-color: var(--bg-color);
    color: #f8fafc;
    /* Fonte base (limpa) para textos normais */
    font-family: 'Plus Jakarta Sans', sans-serif;
    overflow-x: hidden;
  }

  /* Força a Orbitron apenas nos títulos e elementos de destaque */
  h1, h2, h3, h4, .font-extrabold, .font-bold {
    font-family: 'Orbitron', sans-serif !important;
  }

  .glass-nav {
    background: rgba(5, 5, 8, 0.5);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  }

  .gradient-text {
    background: linear-gradient(135deg, #38bdf8 0%, #a855f7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .animated-gradient-border {
    position: relative;
    border-radius: 1.5rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  .animated-gradient-border:hover {
    border-color: rgba(56, 189, 248, 0.3);
    background: rgba(255, 255, 255, 0.04);
    box-shadow: 0 10px 40px -10px rgba(56, 189, 248, 0.15);
    transform: translateY(-5px);
  }

  /* Section Glow - O "Desvaneio" Premium */
  .section-glow {
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(56, 189, 248, 0.07) 0%, transparent 70%);
    filter: blur(90px);
    pointer-events: none;
    z-index: -1;
  }

  .reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .reveal.active {
    opacity: 1;
    transform: translateY(0);
  }

  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .animate-marquee {
    display: flex;
    width: max-content;
    animation: marquee 35s linear infinite;
  }

  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

  @keyframes subtlePulse {
    0% { opacity: 0.5; transform: scale(1); }
    50% { opacity: 0.8; transform: scale(1.05); }
    100% { opacity: 0.5; transform: scale(1); }
  }
  .animate-subtle-pulse {
    animation: subtlePulse 8s infinite ease-in-out;
  }
`;

// --- CUSTOM HOOKS ---
const useScrollReveal = () => {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.15 });

    reveals.forEach(reveal => observer.observe(reveal));
    return () => reveals.forEach(reveal => observer.unobserve(reveal));
  }, []);
};

// --- COMPONENTS ---

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; 
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let mouse = { x: null as number | null, y: null as number | null, radius: 200 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    class Particle {
      x: number; y: number; vx: number; vy: number; size: number;
      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth; 
        this.y = Math.random() * canvasHeight;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 1.8 + 0.5;
      }
      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvasWidth) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvasHeight) this.vy = -this.vy;
      }
      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = 'rgba(168, 85, 247, 0.35)';
        context.fill();
      }
    }

    let particles: Particle[] = [];
    const particleCount = window.innerWidth < 768 ? 40 : 85;
    const connectionDistance = 160;

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(canvas.width, canvas.height);
        particles[i].draw(ctx);

        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 - distance/connectionDistance * 0.15})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }

        if (mouse.x != null && mouse.y != null) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.3 - distance/mouse.radius * 0.3})`;
            ctx.lineWidth = 1.2;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Criamos uma lista onde separamos o Nome Visual do ID do link
  const navLinks = [
    { label: 'Serviços', id: 'servicos' },
    { label: 'Metodologia', id: 'metodologia' },
    { label: 'Diferenciais', id: 'diferenciais' },
  ];

  return (
    <nav className="fixed w-full z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* ÁREA DA LOGO */}
          <div className="flex-shrink-0 flex items-center cursor-pointer group mr-8 lg:mr-16">
            <OrivatechLogoMini className="w-24 md:w-28 h-auto hover:scale-105 transition-transform duration-300" />
          </div>
          
          {/* MENU LINKS DESKTOP */}
          <div className="hidden md:flex flex-1 items-center">
            <div className="flex items-baseline space-x-8 lg:space-x-12">
              {navLinks.map((item) => (
                <a 
                  key={item.id} 
                  href={`#${item.id}`} // Usa o ID sem acento
                  className="text-slate-300 hover:text-white transition-colors text-sm font-semibold relative group"
                >
                  {item.label} {/* Mostra o nome com acento */}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-sky-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </div>

          {/* BOTÃO DE CTA NO NAVBAR (JÁ COM O WHATSAPP) */}
          <div className="hidden md:block">
  <a 
    href="https://wa.me/558699291399?text=Olá!%20Tenho%20uma%20ideia%20inovadora,%20e%20queria%20saber%20mais%20sobre%20a%20OrivaTech" 
    target="_blank" 
    rel="noopener noreferrer"
    className="relative inline-flex h-11 items-center justify-center overflow-hidden rounded-full group"
  >
    {/* Removido o span da animação de borda */}
    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-sm font-semibold text-white transition-colors gap-2 group-hover:bg-slate-800">
      Inicie seu Projeto <Sparkles className="w-4 h-4 text-sky-400" />
    </span>
  </a>
</div>

          {/* MENU MOBILE (HAMBÚRGUER) */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-white transition-colors">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* DROPDOWN DO MOBILE */}
      {isOpen && (
        <div className="md:hidden bg-[#050508]/95 backdrop-blur-xl border-b border-white/10 absolute w-full px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((item) => (
            <a 
              key={item.id} 
              href={`#${item.id}`} // Usa o ID sem acento
              onClick={() => setIsOpen(false)} // Fecha o menu ao clicar
              className="text-slate-300 hover:text-white block px-3 py-3 rounded-md text-base font-medium"
            >
              {item.label} {/* Mostra o nome com acento */}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden min-h-screen flex items-center justify-center">
      {/* Brilho de fundo centralizado */}
      <div className="section-glow top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-sky-500/10 w-[600px] h-[600px] opacity-50" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center text-center">
          
          {/* TÍTULO CENTRALIZADO */}
          <h1 className="reveal delay-100 text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] font-extrabold tracking-tight mb-12">
            Transformamos ideias em
            <span className="gradient-text"> software inteligente.</span>
          </h1>
          
          {/* BOTÃO ÚNICO CENTRALIZADO */}
          <div className="reveal delay-300 w-full flex justify-center">
            <a 
              href="https://wa.me/558699291399?text=Olá!%20Tenho%20uma%20ideia%20inovadora,%20e%20queria%20saber%20mais%20sobre%20a%20OrivaTech" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-12 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl font-bold hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(56,189,248,0.15)] hover:-translate-y-1 group"
            >
              <Terminal className="w-6 h-6 text-sky-400" />
              <span className="text-lg">Criar meu produto</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

const TechStack = () => {
  const techs = [
    { icon: SiNextdotjs, name: "Next.js" },
    { icon: SiTypescript, name: "TypeScript" },
    { icon: FaPython, name: "Python" },
    { icon: SiOpenai, name: "OpenAI" },
    { icon: SiLangchain, name: "LangChain" },
    { icon: SiPytorch, name: "PyTorch" },
    { icon: SiFastapi, name: "FastAPI" },
    { icon: SiDocker, name: "Docker" },
    { icon: SiTailwindcss, name: "Tailwind" },
    { icon: SiVercel, name: "Vercel" },
  ];
  return (
    <section id="stack" className="relative py-20 overflow-hidden border-y border-white/5 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-6 mb-12 reveal text-center">
        <h3 className="text-slate-500 font-bold tracking-widest uppercase text-xs">Stack Que Dominamos</h3>
      </div>
      <div className="flex animate-marquee gap-16 items-center">
        {[...techs, ...techs].map((t, i) => (
          <div key={i} className="flex items-center gap-4 group">
            <t.icon className="w-9 h-9 text-slate-600 group-hover:text-sky-400 transition-colors duration-500" />
            <span className="text-xl font-bold text-slate-700 group-hover:text-white transition-colors duration-300 uppercase tracking-tighter">{t.name}</span>
          </div>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#050508] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#050508] to-transparent z-10" />
    </section>
  );
};

const TiltCard = ({ title, description, icon: Icon, delay }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const rotateX = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -10;
    const rotateY = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 10;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };
  const handleMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
  };
  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)' }} className={`reveal ${delay} animated-gradient-border p-10 cursor-pointer flex flex-col h-full group bg-[#08080c]/80 backdrop-blur-sm`}>
      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:bg-white/10 transition-colors duration-500">
        <Icon className="w-8 h-8 text-sky-400 group-hover:text-white transition-colors duration-300" />
      </div>
      <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-sky-300 transition-colors duration-300">{title}</h3>
      <p className="text-slate-400 leading-relaxed flex-grow text-base font-light">{description}</p>
      <div className="mt-8 flex items-center text-sky-400 font-semibold text-sm group">
        Explorar Solução <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" />
      </div>
    </div>
  );
};

const Services = () => {
  const services = [
    { title: "Web Dev com IA", icon: Code2, description: "Aplicações web ultra-rápidas e escaláveis, integradas com IA nativa para oferecer experiências personalizadas e dinâmicas.", delay: "" },
    { title: "Ciência de Dados", icon: Database, description: "Transformamos seus dados brutos em inteligência competitiva pura com dashboards interativos e análises preditivas.", delay: "delay-100" },
    { title: "Soluções LLM", icon: BrainCircuit, description: "Agentes autônomos, fine-tuning de modelos e integração avançada de LLMs para automatizar operações completas.", delay: "delay-200" }
  ];
  return (
    <section id="servicos" className="relative py-32 lg:py-40 z-10">
      <div className="section-glow right-0 top-1/4 bg-purple-500/5" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20 reveal">
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white">Nossas  <span className="gradient-text">Soluções</span></h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">Soluções construídas com as stacks mais modernas, garantindo performance.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {services.map((svc, idx) => <TiltCard key={idx} {...svc} />)}
        </div>
      </div>
    </section>
  );
};

const Workflow = () => {
  const steps = [
    { step: "01", title: "Ideação & Escopo", desc: "Mergulhamos no ecossistema do seu negócio para desenhar a arquitetura ideal.", icon: Lightbulb },
    { step: "02", title: "Engenharia de Dados", desc: "Estruturamos a fundação de dados para alimentar as IAs com segurança.", icon: LineChart },
    { step: "03", title: "Desenvolvimento IA", desc: "Treinamento, integração de LLMs e construção do Front-end responsivo.", icon: Cpu },
    { step: "04", title: "Deploy & Escala", desc: "Lançamento contínuo com monitoramento ativo, garantindo estabilidade enterprise.", icon: Zap }
  ];
  return (
    <section id="metodologia" className="relative py-32 lg:py-40 bg-white/[0.01] border-y border-white/[0.03] z-10">
      <div className="section-glow left-0 top-1/2 -translate-y-1/2 bg-sky-500/5" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row gap-20 items-center">
        <div className="lg:w-1/2 reveal">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 text-white leading-tight">Como transformamos <br/><span className="gradient-text">Visão em Realidade</span></h2>
          <p className="text-slate-400 text-lg md:text-xl mb-10 font-light">Nossa metodologia ágil focada em dados garante entregas hiper-rápidas nível enterprise.</p>
          <div className="bg-[#050508]/80 border border-white/5 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
            {["Código Limpo & Documentado", "Infraestrutura Cloud Native", "Segurança de Dados Rigorosa"].map((text, idx) => (
              <div key={idx} className="reveal flex items-center gap-4 mb-4 last:mb-0">
                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center"><CircleCheck className="text-green-400 w-5 h-5" /></div>
                <span className="font-semibold text-slate-200 text-lg">{text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/2 w-full space-y-12">
          {steps.map((s, i) => (
            <div key={i} className="reveal flex gap-8 group">
              <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-[#0a0a0f] border border-sky-500/20 flex items-center justify-center group-hover:border-sky-400/50 transition-all shadow-lg">
                <s.icon className="w-6 h-6 text-sky-400 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <span className="text-sky-400 text-sm font-bold tracking-widest uppercase mb-1 block">Etapa {s.step}</span>
                <h3 className="text-2xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-slate-400 leading-relaxed font-light">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const BentoDifferentiators = () => (
  <section id="diferenciais" className="relative py-32 lg:py-40 z-10">
    <div className="section-glow right-0 bottom-0 bg-purple-500/5" />
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      
      <div className="text-center mb-20 reveal">
        <span className="text-purple-400 font-bold tracking-wider uppercase text-sm mb-4 block">Nosso DNA</span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white">
          Por que a <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-purple-500">Orivatech?</span>
        </h2>
      </div>

      {/* Grid do Bento Box: 2 Linhas, 4 Cards Assimétricos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
        
        {/* Card 1 (Largo - Linha 1) */}
        <div className="reveal md:col-span-2 rounded-[2rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-10 flex flex-col justify-end relative overflow-hidden group hover:border-sky-400/30 transition-colors duration-300">
          <BrainCircuit className="absolute top-8 right-8 w-32 h-32 text-sky-400/10 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
          <h3 className="text-3xl font-bold text-white mb-3">Expertise Absoluta em IA</h3>
          <p className="text-slate-400 text-lg max-w-md font-light">Dominamos modelos avançados para criar soluções que realmente otimizam e escalam o seu negócio.</p>
        </div>
        
        {/* Card 2 (Curto - Linha 1) */}
        <div className="reveal delay-100 md:col-span-1 rounded-[2rem] bg-gradient-to-bl from-white/5 to-transparent border border-white/10 p-10 flex flex-col justify-end relative overflow-hidden group hover:border-yellow-400/30 transition-colors duration-300">
          <Zap className="absolute top-8 right-8 w-24 h-24 text-yellow-400/10 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
          <h3 className="text-2xl font-bold text-white mb-3">Entregas Ultra-Ágeis</h3>
          <p className="text-slate-400 font-light">Time-to-market crucial. MVPs de alto nível em meses, não anos.</p>
        </div>

        {/* Card 3 (Curto - Linha 2) */}
        <div className="reveal md:col-span-1 rounded-[2rem] bg-gradient-to-tr from-white/5 to-transparent border border-white/10 p-10 flex flex-col justify-end relative overflow-hidden group hover:border-emerald-400/30 transition-colors duration-300">
          <ShieldCheck className="absolute top-8 right-8 w-24 h-24 text-emerald-400/10 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
          <h3 className="text-2xl font-bold text-white mb-3">Segurança Enterprise</h3>
          <p className="text-slate-400 font-light">Proteção de dados blindada e infraestrutura robusta pronta para escalar.</p>
        </div>

        {/* Card 4 (Largo - Linha 2) */}
        <div className="reveal delay-100 md:col-span-2 rounded-[2rem] bg-gradient-to-tl from-white/5 to-transparent border border-white/10 p-10 flex flex-col justify-end relative overflow-hidden group hover:border-purple-400/30 transition-colors duration-300">
          <Layers className="absolute top-8 right-8 w-32 h-32 text-purple-400/10 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
          <h3 className="text-3xl font-bold text-white mb-3">Ecossistema Conectado</h3>
          <p className="text-slate-400 text-lg max-w-md font-light">Integração perfeita e nativa com suas APIs, CRMs e bancos de dados já existentes na sua operação.</p>
        </div>

      </div>
    </div>
  </section>
);
/*
const Testimonials = () => {
  const reviews = [
    { name: "Carlos M.", role: "CTO, FintechX", text: "A Orivatech revolucionou nosso motor de risco. A redução de tempo de análise foi de 80%." },
    { name: "Juliana R.", role: "CEO, HealthData", text: "O painel de Ciência de Dados é uma obra de arte. Intuitivo e extremamente preciso." },
    { name: "André V.", role: "Dir. Inovação", text: "Entregaram a aplicação web com IA generativa antes do prazo e com qualidade estonteante." }
  ];

  return (
    <section id="cases" className="relative py-32 z-10 overflow-hidden border-t border-white/[0.03]">
      <div className="max-w-7xl mx-auto px-6 text-center mb-20 reveal">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white">Confiado por <span className="text-slate-400">Inovadores</span></h2>
      </div>
      
      
      <div className="flex lg:grid lg:grid-cols-3 overflow-x-auto lg:overflow-visible gap-6 lg:gap-8 pb-16 px-6 lg:px-8 snap-x no-scrollbar reveal delay-100 max-w-7xl mx-auto">
        {reviews.map((r, i) => (
          <div key={i} className="snap-center shrink-0 w-[85vw] sm:w-[380px] lg:w-full bg-[#0a0a0f] border border-white/10 p-8 lg:p-10 rounded-[2rem] hover:border-sky-400/30 transition-colors group">
            
            <div className="flex gap-1 mb-8">
              {[1,2,3,4,5].map(s => <span key={s} className="text-sky-400 group-hover:scale-110 transition-transform">★</span>)}
            </div>
            
            
            <p className="text-slate-300 mb-8 text-lg font-light italic">&quot;{r.text}&quot;</p>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white">{r.name.charAt(0)}</div>
              <div>
                <p className="font-bold text-white">{r.name}</p>
                <p className="text-sm text-sky-400">{r.role}</p>
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </section>
  );
};
*/
const MotivationalCTA = () => (
  <section className="relative py-40 z-10 overflow-hidden text-center">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-900/10 to-[#020203]"></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-sky-500/15 rounded-[100%] blur-[120px] animate-subtle-pulse" />
    <div className="relative z-10 max-w-5xl mx-auto px-6 reveal">
      <Server className="w-16 h-16 text-white/50 mx-auto mb-8" strokeWidth={1} />
      <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight">Pronto para transformar seu negócio com  <br className="hidden md:block"/><span className="gradient-text">inteligencia artificial ?</span></h2>
      <a 
  href="https://wa.me/558699291399?text=Olá!%20Tenho%20uma%20ideia%20inovadora,%20e%20queria%20saber%20mais%20sobre%20a%20OrivaTech" 
  target="_blank" 
  rel="noopener noreferrer"
  className="relative inline-flex h-16 md:h-20 items-center justify-center overflow-hidden rounded-full p-[2px] group shadow-[0_0_40px_rgba(56,189,248,0.4)]"
>
  <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#38bdf8_0%,#a855f7_50%,#38bdf8_100%)]" />
  <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-10 md:px-14 py-2 text-lg md:text-xl font-bold text-white backdrop-blur-3xl gap-3 group-hover:bg-transparent transition-colors">
    Entrar em contato <Zap className="w-6 h-6 text-yellow-300" />
  </span>
</a>
    </div>
  </section>
);

const Footer = () => (
  <footer className="relative border-t border-white/5 bg-[#020203] z-10 pt-20 pb-12">
    <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
      
      <div className="col-span-1 md:col-span-2">
        {/* AQUI A MÁGICA: Apenas o SVG da Logo, um pouco maior (w-40) e sem o span de texto redundante */}
        <div className="flex items-center mb-6">
          <OrivatechLogoMini className="w-40 h-auto cursor-pointer hover:opacity-80 transition-opacity" />
        </div>
        
        <p className="text-slate-400 max-w-sm mb-8 font-light text-lg">
          Moldando o futuro digital através de desenvolvimento web avançado e IA generativa.
        </p>
        
        <div className="flex gap-4">
          {[FaTwitter, FaGithub, FaLinkedin].map((Icon, i) => (
            <a key={i} href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-sky-500/20 hover:border-sky-500/50 border border-transparent transition-all">
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="font-bold text-white mb-6 text-lg">Soluções</h4>
        <ul className="space-y-4 text-slate-400 font-light">
          <li className="hover:text-sky-400 cursor-pointer transition-colors">Aplicações Web IA</li>
          <li className="hover:text-sky-400 cursor-pointer transition-colors">Data Pipelines</li>
          <li className="hover:text-sky-400 cursor-pointer transition-colors">Integração LLM</li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-bold text-white mb-6 text-lg">Empresa</h4>
        <ul className="space-y-4 text-slate-400 font-light">
          <li className="hover:text-sky-400 cursor-pointer transition-colors">Sobre Nós</li>
          <li className="hover:text-sky-400 cursor-pointer transition-colors">Contato</li>
        </ul>
      </div>
      
    </div>
    
    <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm">
      <p>© {new Date().getFullYear()} Orivatech. Todos os direitos reservados.</p>
    </div>
  </footer>
);

export default function App() {
  useScrollReveal();
  return (
    <>
      <style>{globalStyles}</style>
      <div className="relative min-h-screen font-sans selection:bg-sky-500/30 selection:text-sky-100">
        <ParticleBackground />
        <Navbar />
        <main>
          <Hero />
          <Services />
          <TechStack />
          <Workflow />
          <BentoDifferentiators />
          
          <MotivationalCTA />
        </main>
        <Footer />
      </div>
    </>
  );
}