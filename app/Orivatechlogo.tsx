'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const nodes = [
  { id: 'ai',   label1: 'IDEIA',   stacks: ['AI ENGINE', 'PYTORCH', 'OPENAI'], gx: -120, gy: 50, r: 85, dur: 12, startAngle: 0 },
  { id: 'data', label1: 'SOLUÇÃO', stacks: ['DATA CLOUD', 'POSTGRES', 'AWS'], gx: 0, gy: -40, r: 115, dur: 16, startAngle: 72 },
  { id: 'bi',   label1: 'MERCADO', stacks: ['BI INSIGHTS', 'PYTHON', 'POWER BI'], gx: 120, gy: -110, r: 145, dur: 20, startAngle: 144 },
  { id: 'api',  label1: '',        stacks: ['API REST', 'FASTAPI', 'NEXT.JS'], gx: 0, gy: 0, r: 175, dur: 24, startAngle: 216 },
  { id: 'auto', label1: '',        stacks: ['AUTOMATION', 'LANGCHAIN', 'DOCKER'], gx: 0, gy: 0, r: 205, dur: 28, startAngle: 288 }
];

export default function OrivatechLogo({ onPhaseComplete }: { onPhaseComplete?: () => void }) {
  const [phase, setPhase] = useState(0);
  const [stackIndex, setStackIndex] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => {
      setPhase(1);
      if (onPhaseComplete) onPhaseComplete();
    }, 5500); 
    return () => clearTimeout(t);
  }, [onPhaseComplete]);

  useEffect(() => {
    if (phase === 1) {
      const interval = setInterval(() => setStackIndex(p => p + 1), 2500);
      return () => clearInterval(interval);
    }
  }, [phase]);

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
        <circle cx="0" cy="0" r="230" fill="#020205" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
        <circle cx="0" cy="0" r="160" fill="rgba(56, 189, 248, 0.02)" filter="url(#softGlow)" />

        <AnimatePresence mode="wait">
          {phase === 0 && (
            <motion.g key="phase-1" initial={{ opacity: 1, filter: "blur(0px)", scale: 1 }} exit={{ opacity: 0, filter: "blur(5px)", scale: 0.9 }} transition={{ duration: 1 }}>
              <motion.line x1="-150" y1="80" x2="150" y2="80" stroke="rgba(255,255,255,0.1)" strokeDasharray="2 4" />
              {nodes.map(node => node.label1 && <motion.line key={`l-${node.id}`} x1={node.gx} y1={node.gy} x2={node.gx} y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="2 4" />)}

              <motion.path
                d="M -120 50 Q -60 -20 0 -40 T 120 -110"
                fill="none" stroke="url(#softGrad)" strokeWidth="3" filter="url(#softGlow)"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 4, ease: "easeInOut" }}
              />

              {nodes.map(node => node.label1 && (
                <motion.g key={`t-${node.id}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }}>
                  <circle cx={node.gx} cy={node.gy} r="4.5" fill="#38bdf8" />
                  <circle cx={node.gx} cy={node.gy} r="14" fill="#a855f7" opacity="0.4" filter="url(#softGlow)" />
                  <text x={node.gx} y="100" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontWeight="600" letterSpacing="2">{node.label1}</text>
                </motion.g>
              ))}
            </motion.g>
          )}

          {phase === 1 && (
            <motion.g key="phase-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
              <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.4, delay: 0.2 }}>
                <circle cx="0" cy="0" r="60" fill="#080614" stroke="url(#softGrad)" strokeWidth="2" filter="url(#softGlow)"/>
                <motion.circle cx="0" cy="0" r="60" fill="url(#softGrad)" opacity="0.1" animate={{ scale: [1, 1.25, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
                <text 
  x="0" 
  y="5" 
  textAnchor="middle" 
  fontSize="13" 
  fontWeight="800" 
  fill="white" 
  letterSpacing="2"
  style={{ fontFamily: "'Orbitron', sans-serif" }}
>
  ORIVATECH
</text>
              </motion.g>

              {nodes.map((node, index) => (
                <motion.g key={`sys-${node.id}`}>
                  <motion.circle cx="0" cy="0" r={node.r} stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 1.5, type: "spring", bounce: 0.2, delay: 0.3 + index * 0.1 }} />
                  
                  {/* TRAVA DE EIXO ABOSLUTA COM FILL TRANSPARENT */}
                  <motion.g style={{ transformOrigin: "0px 0px" }} initial={{ rotate: node.startAngle }} animate={{ rotate: node.startAngle + 360 }} transition={{ repeat: Infinity, duration: node.dur, ease: "linear" }}>
                    <circle cx="0" cy="0" r="250" fill="transparent" stroke="none" />
                    
                    <motion.g initial={{ y: 0, scale: 0 }} animate={{ y: -node.r, scale: 1 }} transition={{ type: "spring", bounce: 0.4, duration: 1.5, delay: 0.5 }}>
                      <circle cx="0" cy="0" r="4.5" fill="#38bdf8" />
                      <circle cx="0" cy="0" r="14" fill="#a855f7" opacity="0.4" filter="url(#softGlow)" />
                      
                      {/* TRAVA DE EIXO DO TEXTO */}
                      <motion.g style={{ transformOrigin: "0px 0px" }} initial={{ rotate: -node.startAngle }} animate={{ rotate: -(node.startAngle + 360) }} transition={{ repeat: Infinity, duration: node.dur, ease: "linear" }}>
                        <circle cx="0" cy="0" r="30" fill="transparent" stroke="none" />
                        
                        <AnimatePresence mode="wait">
                          <motion.text
                            key={node.stacks[stackIndex % node.stacks.length]}
                            x="0" y="-15" textAnchor="middle" fill="white" fontSize="9" fontWeight="700" letterSpacing="1"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
                          >
                            {node.stacks[stackIndex % node.stacks.length]}
                          </motion.text>
                        </AnimatePresence>

                      </motion.g>
                    </motion.g>
                  </motion.g>
                </motion.g>
              ))}
            </motion.g>
          )}
        </AnimatePresence>
      </g>
    </svg>
  );
}