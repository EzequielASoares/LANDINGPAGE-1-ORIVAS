'use client';

import { motion } from 'framer-motion';

export default function OrivatechLogoMini({ className = "w-32 h-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 160" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="softGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>

        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Centralizado no viewBox de 160x160 */}
      <g transform="translate(80, 80)">
        {/* Círculo Principal Estático */}
        <circle 
          cx="0" 
          cy="0" 
          r="60" 
          fill="#080614" 
          stroke="url(#softGrad)" 
          strokeWidth="2" 
          filter="url(#softGlow)"
        />
        
        <text 
          x="0" 
          y="5" 
          textAnchor="middle" 
          fontSize="15" 
          fontWeight="900" 
          fill="white" 
          letterSpacing="1"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          ORIVATECH
        </text>
      </g>
    </svg>
  );
}