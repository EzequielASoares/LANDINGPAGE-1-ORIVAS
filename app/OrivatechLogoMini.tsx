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

      {/* Centralizado no novo viewBox de 160x160 */}
      <g transform="translate(80, 80)">
        <circle cx="0" cy="0" r="55" fill="#080614" stroke="url(#softGrad)" strokeWidth="2" filter="url(#softGlow)"/>
        
        <motion.circle 
          cx="0" cy="0" r="55" 
          fill="url(#softGrad)" 
          opacity="0.1" 
          animate={{ scale: [1, 1.25, 1], opacity: [0.1, 0.3, 0.1] }} 
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} 
        />
        
        <text x="0" y="4" textAnchor="middle" fontSize="13" fontWeight="800" fill="white" letterSpacing="2">
          ORIVATECH
        </text>
      </g>
    </svg>
  );
}