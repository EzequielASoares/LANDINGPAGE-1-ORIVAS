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
  CircleCheck, // Substituiu o CheckCircle2
  Menu,
  X,
  Sparkles,
  Zap,
  ShieldCheck,
  Layers,
  ArrowRight,
  Server
} from 'lucide-react';

// Nova importação para as redes sociais
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

// --- STYLES & FONT INJECTION ---
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

  :root {
    --bg-color: #050508;
    --accent-blue: #38bdf8;
    --accent-purple: #a855f7;
  }

  body {
    background-color: var(--bg-color);
    color: #f8fafc; /* text-slate-50 equivalent */
    font-family: 'Plus Jakarta Sans', sans-serif;
    overflow-x: hidden;
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

  /* Premium Icon Glow */
  .icon-glow-wrapper {
    position: relative;
  }
  .icon-glow-wrapper::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    transform: translate(-50%, -50%);
    background: inherit;
    filter: blur(15px);
    opacity: 0.5;
    z-index: -1;
    transition: opacity 0.3s ease;
  }
  .group:hover .icon-glow-wrapper::after {
    opacity: 0.8;
  }

  /* Ultra-smooth Apple-like scroll reveal */
  .reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .reveal.active {
    opacity: 1;
    transform: translateY(0);
  }

  .delay-100 { transition-delay: 100ms; }
  .delay-200 { transition-delay: 200ms; }
  .delay-300 { transition-delay: 300ms; }

  /* Hide scrollbar for carousels */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  /* Subtle pulsing background for CTA */
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
  // 1. Dizemos que a referência é de um Canvas
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    // 2. Criamos uma trava de segurança. Se for nulo, para aqui.
    if (!canvas) return; 
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    
    // 3. Tipamos o mouse dizendo que x e y podem ser números ou nulos
    let mouse = { x: null as number | null, y: null as number | null, radius: 250 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    // 4. Tipamos o evento do mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 5. Declaramos a estrutura da classe ANTES do array
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth; 
        this.y = Math.random() * canvasHeight;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 1.5 + 0.5;
      }

      // Recebe as dimensões para calcular a colisão com as bordas
      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvasWidth) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvasHeight) this.vy = -this.vy;
      }

      // Recebe o contexto (ctx) para desenhar na tela
      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fillStyle = 'rgba(168, 85, 247, 0.2)';
        context.fill();
      }
    }

   let particles: Particle[] = [];
    const particleCount = window.innerWidth < 768 ? 30 : 60;
    const connectionDistance = 150;

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        // Agora passamos a largura e altura na criação da partícula!
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        // Passamos os dados necessários para os métodos update e draw
        particles[i].update(canvas.width, canvas.height);
        particles[i].draw(ctx);

        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.05 - distance/connectionDistance * 0.05})`;
            ctx.lineWidth = 1;
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
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.15 - distance/mouse.radius * 0.15})`;
            ctx.lineWidth = 1;
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

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.3)] group-hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-shadow duration-500">
              <Cpu className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white ml-1">Orivatech</span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-10">
              {['Serviços', 'Metodologia', 'Diferenciais', 'Cases'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-slate-300 hover:text-white transition-colors text-sm font-semibold relative group">
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-sky-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <button className="relative inline-flex h-11 items-center justify-center overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-50 transition-transform hover:scale-105 active:scale-95 group">
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-6 py-1 text-sm font-semibold text-white backdrop-blur-3xl gap-2 group-hover:bg-slate-900 transition-colors">
                Inicie seu Projeto <Sparkles className="w-4 h-4 text-sky-400" />
              </span>
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-white transition-colors">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-[#050508]/95 backdrop-blur-xl border-b border-white/10 absolute w-full">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {['Serviços', 'Metodologia', 'Diferenciais', 'Cases'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-slate-300 hover:text-white block px-3 py-3 rounded-md text-base font-medium">
                {item}
              </a>
            ))}
            <button className="w-full mt-4 bg-gradient-to-r from-sky-500 to-purple-600 text-white px-4 py-3 rounded-xl font-semibold flex justify-center items-center gap-2">
              Inicie seu Projeto <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-24 lg:pt-56 lg:pb-40 overflow-hidden min-h-screen flex items-center">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div className="reveal inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-10 shadow-lg">
          <span className="flex h-2 w-2 rounded-full bg-sky-400 animate-pulse"></span>
          <span className="text-xs font-semibold text-slate-300 tracking-wider uppercase">Pioneiros em IA & Dados</span>
        </div>
        
        <h1 className="reveal delay-100 text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] font-extrabold tracking-tight mb-8">
          Construindo o futuro com <br className="hidden md:block" />
          <span className="gradient-text">Inteligência Artificial</span>
        </h1>
        
        <p className="reveal delay-200 mt-6 text-lg md:text-xl lg:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
          A Orivatech transforma ideias complexas em produtos digitais de <strong className="text-white font-semibold">alto impacto</strong>. 
          Especialistas em Web Dev, Ciência de Dados e implementação de LLMs sob medida para escalar o seu negócio.
        </p>
        
        <div className="reveal delay-300 flex flex-col sm:flex-row gap-5 justify-center items-center">
          <button className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-xl font-bold hover:bg-slate-100 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:-translate-y-1 group">
            Descubra Nossas Soluções <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white rounded-xl font-semibold hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-1">
            <Terminal className="w-5 h-5 text-slate-400" /> Falar com Especialista
          </button>
        </div>
      </div>
    </section>
  );
};
interface TiltCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  delay: string;
}
const TiltCard = ({ title, description, icon: Icon, delay }: TiltCardProps) => {
  // 1. Adicionamos <HTMLDivElement> aqui:
  const cardRef = useRef<HTMLDivElement>(null);

  // 2. Tipamos o evento 'e' como um evento de mouse do React:
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <div 
      ref={cardRef}
      className={`reveal ${delay} animated-gradient-border p-10 cursor-pointer flex flex-col h-full group bg-[#08080c]/80 backdrop-blur-sm`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      <div className="icon-glow-wrapper w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:bg-white/10 transition-colors duration-500">
        <Icon className="w-8 h-8 text-sky-400 group-hover:text-white transition-colors duration-300" />
      </div>
      <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-sky-300 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-slate-400 leading-relaxed flex-grow text-base font-light">
        {description}
      </p>
      <div className="mt-8 flex items-center text-sky-400 font-semibold text-sm group">
        Explorar Solução <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" />
      </div>
    </div>
  );
};

const Services = () => {
  const services = [
    {
      title: "Web Dev com IA",
      icon: Code2,
      description: "Aplicações web ultra-rápidas e escaláveis, integradas com IA nativa para oferecer experiências de usuário personalizadas, dinâmicas e de altíssima conversão.",
      delay: ""
    },
    {
      title: "Ciência de Dados",
      icon: Database,
      description: "Transformamos seus dados brutos em inteligência competitiva pura. Pipelines robustos, dashboards interativos e análises preditivas precisas para decisões críticas.",
      delay: "delay-100"
    },
    {
      title: "Soluções LLM",
      icon: BrainCircuit,
      description: "Agentes autônomos, fine-tuning de modelos e integração avançada de LLMs (GPT-4, Claude 3) para automatizar operações completas e atendimento.",
      delay: "delay-200"
    }
  ];

  return (
    <section id="servicos" className="relative py-32 lg:py-40 z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20 reveal">
          <span className="text-sky-400 font-bold tracking-wider uppercase text-sm mb-4 block">Nossa Especialidade</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white">Arquitetura de <span className="gradient-text">Vanguarda</span></h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">Soluções end-to-end construídas com as stacks mais modernas do mercado, garantindo performance brutal e escalabilidade global.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {services.map((svc, idx) => (
            <TiltCard key={idx} {...svc} />
          ))}
        </div>
      </div>
    </section>
  );
};
interface WorkflowStepProps {
  step: string;
  title: string;
  desc: string;
  icon: React.ElementType; // Diz que é um componente do React (o ícone)
  isLast?: boolean;        // O "?" diz que é opcional, e o boolean diz que é true/false
}
const WorkflowStep = ({ step, title, desc, icon: Icon, isLast }: WorkflowStepProps) => {
  return (
    <div className="reveal flex gap-8 relative group">
      {!isLast && (
        <div className="absolute left-8 top-16 bottom-[-32px] w-[2px] bg-gradient-to-b from-sky-500/30 to-transparent group-hover:from-sky-400/60 transition-colors duration-500"></div>
      )}
      
      <div className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-[#0a0a0f] border border-sky-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.1)] group-hover:shadow-[0_0_30px_rgba(56,189,248,0.3)] group-hover:border-sky-400/50 transition-all duration-500">
        <Icon className="w-6 h-6 text-sky-400 group-hover:scale-110 transition-transform duration-500" />
      </div>
      
      <div className="pb-16 pt-3">
        <span className="text-sky-400 text-sm font-bold tracking-widest uppercase mb-2 block">Etapa {step}</span>
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-slate-400 leading-relaxed max-w-md font-light text-lg">{desc}</p>
      </div>
    </div>
  );
};

const Workflow = () => {
  const steps = [
    { step: "01", title: "Ideação & Escopo", desc: "Mergulhamos no ecossistema do seu negócio para entender os desafios reais e desenhar a arquitetura ideal da solução.", icon: Lightbulb },
    { step: "02", title: "Engenharia de Dados", desc: "Estruturamos a fundação de dados necessária para alimentar as IAs com segurança, integridade e alta disponibilidade.", icon: LineChart },
    { step: "03", title: "Desenvolvimento IA", desc: "Treinamento, integração cirúrgica de LLMs e construção do Front-end responsivo para orquestrar a inteligência.", icon: Cpu },
    { step: "04", title: "Deploy & Escala", desc: "Lançamento contínuo (CI/CD) com monitoramento ativo, garantindo estabilidade enterprise enquanto seu projeto cresce.", icon: Zap }
  ];

  return (
    <section id="metodologia" className="relative py-32 lg:py-40 bg-white/[0.01] border-y border-white/[0.03] z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row gap-20 items-center">
        <div className="lg:w-1/2 reveal">
          <span className="text-sky-400 font-bold tracking-wider uppercase text-sm mb-4 block">O Processo</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 text-white leading-tight">Como transformamos <br/><span className="gradient-text">Visão em Realidade</span></h2>
          <p className="text-slate-400 text-lg md:text-xl mb-10 leading-relaxed font-light">
            Nossa metodologia ágil e focada em dados garante entregas hiper-rápidas sem abrir mão da qualidade a nível enterprise. Do conceito abstrato ao código rodando em produção.
          </p>
          <div className="bg-[#050508]/80 border border-white/5 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
            {[
              { text: "Código Limpo & Documentado", delay: "" },
              { text: "Infraestrutura Cloud Native", delay: "delay-100" },
              { text: "Segurança de Dados Rigorosa", delay: "delay-200" }
            ].map((item, idx) => (
              <div key={idx} className={`reveal ${item.delay} flex items-center gap-4 mb-4 last:mb-0`}>
                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CircleCheck className="text-green-400 w-5 h-5" />
                </div>
                <span className="font-semibold text-slate-200 text-lg">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="lg:w-1/2 w-full">
          <div className="pl-4 md:pl-8">
            {steps.map((s, i) => (
              <WorkflowStep key={i} {...s} isLast={i === steps.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const BentoDifferentiators = () => {
  return (
    <section id="diferenciais" className="relative py-32 lg:py-40 z-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20 reveal">
          <span className="text-purple-400 font-bold tracking-wider uppercase text-sm mb-4 block">Nossos Diferenciais</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white">Por que a <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Orivatech?</span></h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">Não somos apenas desenvolvedores. Somos arquitetos de inteligência artificial focados no ROI do seu negócio.</p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[280px]">
          
          {/* Card 1: Expertise IA (Large) */}
          <div className="reveal md:col-span-2 rounded-[2rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-10 flex flex-col justify-end relative overflow-hidden group hover:border-sky-400/30 transition-colors duration-500">
            <div className="absolute top-8 right-8 text-sky-400/20 group-hover:text-sky-400/40 transition-colors duration-500 group-hover:scale-110 transform">
              <BrainCircuit className="w-32 h-32" strokeWidth={1} />
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-3">Expertise Absoluta em IA</h3>
              <p className="text-slate-400 text-lg max-w-md font-light leading-relaxed">Dominamos os modelos mais avançados do mercado para criar soluções que realmente pensam, otimizam e vendem por você.</p>
            </div>
          </div>

          {/* Card 2: Entregas Ágeis (Small) */}
          <div className="reveal delay-100 md:col-span-1 rounded-[2rem] bg-gradient-to-bl from-white/5 to-transparent border border-white/10 p-10 flex flex-col justify-end relative overflow-hidden group hover:border-purple-400/30 transition-colors duration-500">
            <div className="absolute top-8 right-8 text-purple-400/20 group-hover:text-purple-400/40 transition-colors duration-500 group-hover:scale-110 transform">
              <Zap className="w-24 h-24" strokeWidth={1} />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-3">Entregas Ultra-Ágeis</h3>
              <p className="text-slate-400 font-light leading-relaxed">Time-to-market é crucial. Lançamos MVPs de alto nível em semanas, não meses.</p>
            </div>
          </div>

          {/* Card 3: Segurança (Small) */}
          <div className="reveal delay-200 md:col-span-1 rounded-[2rem] bg-gradient-to-tr from-white/5 to-transparent border border-white/10 p-10 flex flex-col justify-end relative overflow-hidden group hover:border-sky-400/30 transition-colors duration-500">
            <div className="absolute top-8 right-8 text-sky-400/20 group-hover:text-sky-400/40 transition-colors duration-500 group-hover:scale-110 transform">
              <ShieldCheck className="w-24 h-24" strokeWidth={1} />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-3">Segurança Enterprise</h3>
              <p className="text-slate-400 font-light leading-relaxed">Proteção de dados militar em cada camada das nossas aplicações e integrações de LLM.</p>
            </div>
          </div>

          {/* Card 4: Arquitetura de Dados (Large) */}
          <div className="reveal delay-300 md:col-span-2 rounded-[2rem] bg-gradient-to-tl from-white/5 to-transparent border border-white/10 p-10 flex flex-col justify-end relative overflow-hidden group hover:border-purple-400/30 transition-colors duration-500">
            <div className="absolute top-8 right-8 text-purple-400/20 group-hover:text-purple-400/40 transition-colors duration-500 group-hover:scale-110 transform">
              <Layers className="w-32 h-32" strokeWidth={1} />
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-3">Arquitetura de Dados de Ponta</h3>
              <p className="text-slate-400 text-lg max-w-md font-light leading-relaxed">A inteligência da IA depende da qualidade dos dados. Construímos fundações robustas, escaláveis e limpas para o seu crescimento.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { name: "Carlos M.", role: "CTO, FintechX", text: "A Orivatech revolucionou nosso motor de risco. A implementação do LLM customizado reduziu nosso tempo de análise em 80%." },
    { name: "Juliana R.", role: "CEO, HealthData", text: "O painel de Ciência de Dados construído por eles é simplesmente uma obra de arte. Rápido, intuitivo e extremamente preciso." },
    { name: "André V.", role: "Diretor de Inovação", text: "Profissionais raros no mercado. Entregaram a aplicação web com IA generativa antes do prazo e com qualidade estonteante." }
  ];

  return (
    <section id="cases" className="relative py-32 lg:py-40 z-10 overflow-hidden border-t border-white/[0.03]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center mb-20 reveal">
        <span className="text-sky-400 font-bold tracking-wider uppercase text-sm mb-4 block">Casos de Sucesso</span>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-white">Confiado por <span className="text-slate-400">Inovadores</span></h2>
        <p className="text-slate-400 text-lg md:text-xl font-light">O impacto real das nossas soluções nos negócios dos nossos clientes.</p>
      </div>

      <div className="flex overflow-x-auto gap-8 pb-16 px-6 lg:px-8 snap-x snap-mandatory no-scrollbar reveal delay-100 max-w-7xl mx-auto">
        {reviews.map((r, i) => (
          <div key={i} className="snap-center shrink-0 w-[320px] md:w-[450px] bg-[#0a0a0f] border border-white/10 p-10 rounded-[2rem] hover:border-sky-400/30 transition-colors duration-500 group">
            <div className="flex items-center gap-1.5 mb-8">
              {[1,2,3,4,5].map(star => <span key={star} className="text-sky-400 text-xl group-hover:scale-110 transition-transform">★</span>)}
            </div>
            <p className="text-slate-300 mb-8 text-lg font-light leading-relaxed italic">"{r.text}"</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center">
                <span className="text-white font-bold">{r.name.charAt(0)}</span>
              </div>
              <div>
                <p className="font-bold text-white text-lg">{r.name}</p>
                <p className="text-sm text-sky-400 font-medium">{r.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const MotivationalCTA = () => {
  return (
    <section className="relative py-40 z-10 overflow-hidden">
      {/* Immersive Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-900/10 to-[#020203]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-sky-500/20 rounded-[100%] blur-[120px] pointer-events-none animate-subtle-pulse" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center reveal">
        <Server className="w-16 h-16 text-white/50 mx-auto mb-8" strokeWidth={1} />
        <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight">
          Sua grande ideia merece a <br className="hidden md:block"/>
          <span className="gradient-text">melhor tecnologia.</span>
        </h2>
        <p className="text-xl md:text-2xl text-slate-300 mb-12 font-light max-w-3xl mx-auto leading-relaxed">
          Pare de perder tempo com soluções genéricas. Vamos construir uma plataforma robusta, inteligente e pronta para dominar o seu mercado.
        </p>
        
        <button className="relative inline-flex h-16 md:h-20 items-center justify-center overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-50 transition-transform hover:scale-105 active:scale-95 group shadow-[0_0_40px_rgba(56,189,248,0.4)] hover:shadow-[0_0_60px_rgba(168,85,247,0.6)]">
          <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#38bdf8_0%,#a855f7_50%,#38bdf8_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-10 md:px-14 py-2 text-lg md:text-xl font-bold text-white backdrop-blur-3xl gap-3 group-hover:bg-transparent transition-colors duration-500">
            Começar Agora <Zap className="w-6 h-6 text-yellow-300" />
          </span>
        </button>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="relative border-t border-white/5 bg-[#020203] z-10 pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-purple-600 flex items-center justify-center shadow-lg">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl tracking-tight text-white ml-1">Orivatech</span>
            </div>
            <p className="text-slate-400 max-w-sm mb-8 font-light leading-relaxed text-lg">
              Moldando o futuro digital através de desenvolvimento web avançado, engenharia de dados e inteligência artificial generativa.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-sky-500/20 hover:border-sky-500/50 border border-transparent transition-all duration-300 hover:-translate-y-1"><FaTwitter className="w-5 h-5" /></a>
<a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-sky-500/20 hover:border-sky-500/50 border border-transparent transition-all duration-300 hover:-translate-y-1"><FaGithub className="w-5 h-5" /></a>
<a href="#" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-sky-500/20 hover:border-sky-500/50 border border-transparent transition-all duration-300 hover:-translate-y-1"><FaLinkedin className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Soluções</h4>
            <ul className="space-y-4 text-slate-400 font-light">
              <li><a href="#" className="hover:text-sky-400 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> Aplicações Web IA</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> Data Pipelines</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> Integração LLM</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> Agentes Autônomos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 text-lg">Empresa</h4>
            <ul className="space-y-4 text-slate-400 font-light">
              <li><a href="#" className="hover:text-sky-400 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> Sobre Nós</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> Carreiras</a></li>
              <li><a href="#" className="hover:text-sky-400 transition-colors flex items-center gap-2"><ArrowRight className="w-3 h-3"/> Contato</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm font-medium">
          <p>© {new Date().getFullYear()} Orivatech. Todos os direitos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos de Serviço</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

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
          <Workflow />
          <BentoDifferentiators />
          <Testimonials />
          <MotivationalCTA />
        </main>
        <Footer />
      </div>
    </>
  );
}