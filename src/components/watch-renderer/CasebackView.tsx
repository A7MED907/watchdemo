import React from 'react';
import { CaseOption, StrapOption } from '../../types/watch';
import { StrapLayer } from './StrapLayer';

interface CasebackViewProps {
  caseOption: CaseOption;
  strap: StrapOption;
  customEngraving?: string;
}

export const CasebackView: React.FC<CasebackViewProps> = ({
  caseOption,
  strap,
  customEngraving,
}) => {
  const { color } = caseOption;
  const isGold = caseOption.id.includes('gold');
  const isBlack = caseOption.id.includes('black');

  const metalColor = isGold ? '#eab308' : isBlack ? '#27272a' : '#cbd5e1';
  const rotorColor = isGold ? '#ca8a04' : '#94a3b8';

  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full h-full max-w-[440px] max-h-[440px] mx-auto select-none"
    >
      <defs>
        <radialGradient id="caseback-metal" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="50%" stopColor={metalColor} />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>

        <linearGradient id="cotes-de-geneve" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="25%" stopColor="#94a3b8" />
          <stop offset="50%" stopColor="#475569" />
          <stop offset="75%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>

        {/* Circular text path for engraved caseback ring */}
        <path
          id="caseback-engraving-path"
          d="M 200,80 A 120,120 0 1,1 199.9,80"
          fill="none"
        />
      </defs>

      {/* Strap in background */}
      <StrapLayer strap={strap} />

      {/* Case Outer Housing from Back */}
      <circle cx="200" cy="200" r="118" fill="url(#caseback-metal)" stroke="#09090b" strokeWidth="1" />

      {/* Screwed Caseback Rim with Notches */}
      <circle cx="200" cy="200" r="105" fill="#18181b" stroke="#3f3f46" strokeWidth="2" />
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <rect
          key={`notch-${deg}`}
          x="196"
          y="93"
          width="8"
          height="5"
          rx="1"
          fill="#52525b"
          transform={`rotate(${deg}, 200, 200)`}
        />
      ))}

      {/* Engraved Caseback Ring Text */}
      <text fill="#a1a1aa" fontSize="7" fontWeight="600" letterSpacing="2" fontFamily="monospace">
        <textPath href="#caseback-engraving-path" startOffset="5%">
          ATELIER HORLOGERIE • 316L STEEL • SAPPHIRE CRYSTAL • 200M WATER RESISTANT •
        </textPath>
      </text>

      {/* Sapphire Exhibition Window */}
      <circle cx="200" cy="200" r="82" fill="#09090b" stroke="#27272a" strokeWidth="2" />

      {/* Mechanical Movement Caliber Details */}
      {/* Base Plate with Perlage */}
      <circle cx="200" cy="200" r="78" fill="#1e293b" />

      {/* Balance Wheel */}
      <g transform="translate(160, 170)">
        <circle cx="0" cy="0" r="18" fill="none" stroke="#facc15" strokeWidth="1.5" />
        <line x1="-18" y1="0" x2="18" y2="0" stroke="#facc15" strokeWidth="1" />
        <line x1="0" y1="-18" x2="0" y2="18" stroke="#facc15" strokeWidth="1" />
        <circle cx="0" cy="0" r="4" fill="#ef4444" stroke="#991b1b" strokeWidth="0.5" />
      </g>

      {/* Ruby Jewel Bearings */}
      {[
        { x: 230, y: 160 },
        { x: 210, y: 225 },
        { x: 175, y: 235 },
        { x: 240, y: 200 },
      ].map((j, i) => (
        <g key={`jewel-${i}`}>
          <circle cx={j.x} cy={j.y} r="4" fill="#eab308" stroke="#a16207" strokeWidth="0.5" />
          <circle cx={j.x} cy={j.y} r="2.2" fill="#ef4444" />
          <circle cx={j.x - 0.5} cy={j.y - 0.5} r="0.8" fill="#ffffff" />
        </g>
      ))}

      {/* Automatic Winding Rotor (Oscillating Weight) */}
      <g transform="rotate(35, 200, 200)">
        <path
          d="M 125,200 A 75,75 0 0,0 275,200 L 225,200 A 25,25 0 0,1 175,200 Z"
          fill="url(#cotes-de-geneve)"
          stroke={rotorColor}
          strokeWidth="1"
          filter="drop-shadow(0 4px 6px rgba(0,0,0,0.7))"
        />
        {/* Rotor Cutouts */}
        <path
          d="M 140,215 A 60,60 0 0,0 260,215 L 245,215 A 45,45 0 0,1 155,215 Z"
          fill="#09090b"
          opacity="0.6"
        />
        {/* Rotor Gold Inscribed Text */}
        <text
          x="200"
          y="255"
          textAnchor="middle"
          fontSize="5.5"
          fontWeight="700"
          fontFamily="var(--font-serif)"
          fill="#fef08a"
          letterSpacing="1.5"
        >
          CALIBRE 2824-2
        </text>
        <text
          x="200"
          y="263"
          textAnchor="middle"
          fontSize="4"
          fontWeight="600"
          fontFamily="var(--font-sans)"
          fill="#cbd5e1"
          letterSpacing="1"
        >
          25 JEWELS • GENÈVE STRIPES
        </text>
      </g>

      {/* Central Rotor Ball Bearing Core */}
      <circle cx="200" cy="200" r="14" fill="url(#caseback-metal)" stroke="#334155" strokeWidth="1" />
      <circle cx="200" cy="200" r="6" fill="#09090b" />
      <circle cx="200" cy="200" r="3" fill="#ef4444" />

      {/* Custom Caseback Engraving (Prominently displayed) */}
      {customEngraving && customEngraving.trim() && (
        <g>
          <rect x="130" y="278" width="140" height="20" rx="3" fill="#09090b" fillOpacity="0.8" stroke="#3f3f46" strokeWidth="0.8" />
          <text
            x="200"
            y="291"
            textAnchor="middle"
            fontSize="6"
            fontWeight="700"
            fontFamily="monospace"
            letterSpacing="1.5"
            fill="#facc15"
          >
            {`“${customEngraving.slice(0, 24)}”`}
          </text>
        </g>
      )}
    </svg>
  );
};
