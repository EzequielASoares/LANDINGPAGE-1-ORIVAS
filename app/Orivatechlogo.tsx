'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const nodes = [
  { id: 'ai',   label1: 'IDEIA',   gx: -120, gy: 50 },
  { id: 'data', label1: 'SOLUÇÃO', gx: 0, gy: -40 },
  { id: 'bi',   label1: 'MERCADO', gx: 120, gy: -110 },
];

export default function OrivatechLogo({ onPhaseComplete }: { onPhaseComplete?: () => void }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => {
      setPhase(1);
      if (onPhaseComplete) onPhaseComplete();
    }, 5500); 
    return () => clearTimeout(t);
  }, [onPhaseComplete]);

  return (
    <svg viewBox="0 0 500 500" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="softGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      <g transform="translate(250, 250)">
        {/* Fundo sutil do SVG */}
        <circle cx="0" cy="0" r="230" fill="#020205" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />

        <AnimatePresence mode="wait">
          {/* FASE 0: Gráfico de Conexão (Ideia -> Solução -> Mercado) */}
          {phase === 0 && (
            <motion.g key="phase-1" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }} transition={{ duration: 1 }}>
              <motion.line x1="-150" y1="80" x2="150" y2="80" stroke="rgba(255,255,255,0.1)" strokeDasharray="2 4" />
              {nodes.map(node => (
                <motion.line key={`l-${node.id}`} x1={node.gx} y1={node.gy} x2={node.gx} y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="2 4" />
              ))}

              <motion.path
                d="M -120 50 Q -60 -20 0 -40 T 120 -110"
                fill="none" stroke="url(#softGrad)" strokeWidth="3" filter="url(#softGlow)"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 4, ease: "easeInOut" }}
              />

              {nodes.map(node => (
                <motion.g key={`t-${node.id}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}>
                  <circle cx={node.gx} cy={node.gy} r="4.5" fill="#38bdf8" />
                  <circle cx={node.gx} cy={node.gy} r="14" fill="#a855f7" opacity="0.4" filter="url(#softGlow)" />
                  <text x={node.gx} y="100" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontWeight="600" letterSpacing="2">{node.label1}</text>
                </motion.g>
              ))}
            </motion.g>
          )}

         {/* FASE 1: Apenas o Nome e o Círculo Pulsante Aumentado */}
{phase === 1 && (
  <motion.g key="phase-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
    <motion.g initial={{ scale: 0.5 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.4 }}>
      
      {/* Brilho de Fundo Pulsante (Aumentado para r=130) */}
      <motion.circle 
        cx="0" cy="0" r="130" 
        fill="rgba(56, 189, 248, 0.1)" 
        filter="url(#softGlow)"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }} 
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} 
      />

      {/* Núcleo Central Principal (Aumentado para r=100) */}
      <circle 
        cx="0" cy="0" 
        r="100" 
        fill="#080614" 
        stroke="url(#softGrad)" 
        strokeWidth="2.5" 
        filter="url(#softGlow)"
      />
      
      {/* Onda de choque interna (Aumentada para r=100) */}
      <motion.circle 
        cx="0" cy="0" r="100" 
        fill="url(#softGrad)" 
        opacity="0.08" 
        animate={{ scale: [1, 1.15, 1], opacity: [0.1, 0.2, 0.1] }} 
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} 
      />

      {/* Texto Ajustado para o novo tamanho */}
      <text 
        x="0" 
        y="8" 
        textAnchor="middle" 
        fontSize="18" // Aumentei a fonte para acompanhar o círculo
        fontWeight="900" 
        fill="white" 
        letterSpacing="4"
        style={{ fontFamily: "'Orbitron', sans-serif" }}
      >
        ORIVATECH
      </text>
    </motion.g>
  </motion.g>
)}
        </AnimatePresence>
      </g>
    </svg>
  );
}