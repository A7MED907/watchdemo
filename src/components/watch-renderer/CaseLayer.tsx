import React from 'react';
import { CaseOption } from '../../types/watch';

interface CaseLayerProps {
  caseOption: CaseOption;
}

export const CaseLayer: React.FC<CaseLayerProps> = ({ caseOption }) => {
  const { id, color, bezelColor, accentColor } = caseOption;

  const isGold = id.includes('gold') && !id.includes('rose');
  const isRoseGold = id.includes('rose-gold');
  const isBlackDlc = id.includes('black');
  const isBrushed = id.includes('brushed');

  // Gradient configurations based on material
  let gradStops = {
    stop1: '#94a3b8',
    stop2: '#f8fafc',
    stop3: '#cbd5e1',
    stop4: '#64748b',
    stop5: '#e2e8f0',
    bezelOuter: '#e2e8f0',
    bezelInner: '#cbd5e1',
    crownBase: '#94a3b8',
  };

  if (isGold) {
    gradStops = {
      stop1: '#ca8a04',
      stop2: '#fef08a',
      stop3: '#eab308',
      stop4: '#a16207',
      stop5: '#fde047',
      bezelOuter: '#fef08a',
      bezelInner: '#ca8a04',
      crownBase: '#a16207',
    };
  } else if (isRoseGold) {
    gradStops = {
      stop1: '#be123c',
      stop2: '#fecdd3',
      stop3: '#fb7185',
      stop4: '#9f1239',
      stop5: '#fda4af',
      bezelOuter: '#fecdd3',
      bezelInner: '#e11d48',
      crownBase: '#9f1239',
    };
  } else if (isBlackDlc) {
    gradStops = {
      stop1: '#18181b',
      stop2: '#3f3f46',
      stop3: '#27272a',
      stop4: '#09090b',
      stop5: '#52525b',
      bezelOuter: '#3f3f46',
      bezelInner: '#18181b',
      crownBase: '#18181b',
    };
  } else if (isBrushed) {
    gradStops = {
      stop1: '#64748b',
      stop2: '#cbd5e1',
      stop3: '#94a3b8',
      stop4: '#475569',
      stop5: '#cbd5e1',
      bezelOuter: '#94a3b8',
      bezelInner: '#475569',
      crownBase: '#475569',
    };
  }

  return (
    <g id="watch-layer-case" className="transition-all duration-500 ease-out">
      <defs>
        {/* Lugs & Case Body Radial Gradient */}
        <radialGradient id="case-body-metal" cx="35%" cy="35%" r="70%">
          <stop offset="0%" stopColor={gradStops.stop2} />
          <stop offset="40%" stopColor={gradStops.stop3} />
          <stop offset="70%" stopColor={gradStops.stop1} />
          <stop offset="100%" stopColor={gradStops.stop4} />
        </radialGradient>

        {/* Angular metallic reflection for bezel */}
        <linearGradient id="bezel-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gradStops.stop2} />
          <stop offset="25%" stopColor={gradStops.stop4} />
          <stop offset="50%" stopColor={gradStops.stop5} />
          <stop offset="75%" stopColor={gradStops.stop1} />
          <stop offset="100%" stopColor={gradStops.stop2} />
        </linearGradient>

        {/* Inner Bezel Groove */}
        <linearGradient id="inner-bezel-groove" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#000000" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
        </linearGradient>

        {/* Crown Gradients */}
        <linearGradient id="crown-ridges" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={gradStops.stop2} />
          <stop offset="30%" stopColor={gradStops.stop1} />
          <stop offset="70%" stopColor={gradStops.stop4} />
          <stop offset="100%" stopColor={gradStops.stop2} />
        </linearGradient>

        {/* Case Shadow for depth on surface */}
        <filter id="case-outer-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#000000" floodOpacity="0.75" />
        </filter>
      </defs>

      {/* --- CROWN & GUARDS (At 3 o'clock / Right side) --- */}
      <g id="case-crown" filter="drop-shadow(2px 2px 4px rgba(0,0,0,0.6))">
        {/* Crown Guards */}
        <path
          d="M 310,180 L 324,188 L 324,212 L 310,220 Z"
          fill="url(#case-body-metal)"
          stroke="#000000"
          strokeWidth="0.5"
        />
        {/* Main Knurled Crown Body */}
        <rect
          x="324"
          y="186"
          width="15"
          height="28"
          rx="3"
          fill="url(#crown-ridges)"
          stroke="#09090b"
          strokeWidth="0.75"
        />
        {/* Crown Knurling Ridges */}
        {[189, 193, 197, 201, 205, 209].map((ry) => (
          <line
            key={`ridge-${ry}`}
            x1="324"
            y1={ry}
            x2="339"
            y2={ry}
            stroke="#000000"
            strokeWidth="0.75"
            strokeOpacity="0.6"
          />
        ))}
        {/* Crown Tip Embossed Atelier Logo Ring */}
        <ellipse cx="338" cy="200" rx="1.5" ry="5" fill={gradStops.stop2} />
      </g>

      {/* --- MAIN 4 LUGS (Top-Left, Top-Right, Bottom-Left, Bottom-Right) --- */}
      <g id="case-lugs" filter="url(#case-outer-shadow)">
        {/* Top Left Lug */}
        <path
          d="M 125,135 L 122,125 Q 120,70 148,80 L 170,125 Z"
          fill="url(#case-body-metal)"
          stroke="#0f172a"
          strokeWidth="0.5"
        />
        {/* Top Right Lug */}
        <path
          d="M 275,135 L 278,125 Q 280,70 252,80 L 230,125 Z"
          fill="url(#case-body-metal)"
          stroke="#0f172a"
          strokeWidth="0.5"
        />
        {/* Bottom Left Lug */}
        <path
          d="M 125,265 L 122,275 Q 120,330 148,320 L 170,275 Z"
          fill="url(#case-body-metal)"
          stroke="#0f172a"
          strokeWidth="0.5"
        />
        {/* Bottom Right Lug */}
        <path
          d="M 275,265 L 278,275 Q 280,330 252,320 L 230,275 Z"
          fill="url(#case-body-metal)"
          stroke="#0f172a"
          strokeWidth="0.5"
        />

        {/* Polished Lug Chamfer Highlights */}
        <path d="M 122,125 L 148,80" stroke={gradStops.stop2} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 278,125 L 252,80" stroke={gradStops.stop2} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 122,275 L 148,320" stroke={gradStops.stop2} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 278,275 L 252,320" stroke={gradStops.stop2} strokeWidth="1.5" strokeLinecap="round" />
      </g>

      {/* --- CIRCULAR CASE MAIN HOUSING --- */}
      <circle
        cx="200"
        cy="200"
        r="118"
        fill="url(#case-body-metal)"
        stroke="#0f172a"
        strokeWidth="1"
      />

      {/* --- POLISHED BEZEL RING --- */}
      {/* Outer Step */}
      <circle
        cx="200"
        cy="200"
        r="110"
        fill="url(#bezel-ring-grad)"
        stroke="#000000"
        strokeWidth="1"
      />

      {/* Inner Sloped Bezel Chamfer */}
      <circle
        cx="200"
        cy="200"
        r="100"
        fill="none"
        stroke="url(#case-body-metal)"
        strokeWidth="6"
      />

      {/* Deep Shadow Groove leading into dial */}
      <circle
        cx="200"
        cy="200"
        r="96"
        fill="none"
        stroke="url(#inner-bezel-groove)"
        strokeWidth="2.5"
      />

      {/* Bezel 12 O'clock Pearl / Triangle Marker (Subtle luxury detail) */}
      <circle cx="200" cy="94" r="2.5" fill="#f8fafc" stroke="#334155" strokeWidth="0.75" />
      <circle cx="200" cy="94" r="1.5" fill={gradStops.stop2} />
    </g>
  );
};
