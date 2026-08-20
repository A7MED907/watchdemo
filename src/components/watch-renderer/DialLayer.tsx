import React from 'react';
import { DialOption } from '../../types/watch';

interface DialLayerProps {
  dial: DialOption;
  customEngraving?: string;
}

export const DialLayer: React.FC<DialLayerProps> = ({ dial, customEngraving }) => {
  const { id, dialColor, textureType, markersColor, accentTone, hasDateWindow } = dial;

  // Generate 60 minute track tick marks
  const minuteTicks = Array.from({ length: 60 }).map((_, i) => {
    const angle = (i * 6) * (Math.PI / 180);
    const isHour = i % 5 === 0;
    const r1 = 92;
    const r2 = isHour ? 84 : 88;
    const x1 = 200 + r1 * Math.sin(angle);
    const y1 = 200 - r1 * Math.cos(angle);
    const x2 = 200 + r2 * Math.sin(angle);
    const y2 = 200 - r2 * Math.cos(angle);
    return { i, isHour, x1, y1, x2, y2, angleDeg: i * 6 };
  });

  // Generate 12 applied hour markers
  const hourMarkers = [1, 2, 4, 5, 7, 8, 10, 11].map((h) => {
    const angle = (h * 30) * (Math.PI / 180);
    const r = 74;
    const x = 200 + r * Math.sin(angle);
    const y = 200 - r * Math.cos(angle);
    return { h, x, y, angleDeg: h * 30 };
  });

  const isWhite = id.includes('white');
  const isSilver = id.includes('silver');
  const textColor = isWhite ? '#1e293b' : '#f1f5f9';
  const subtextColor = isWhite ? '#64748b' : '#94a3b8';
  const trackColor = isWhite ? '#334155' : '#cbd5e1';

  return (
    <g id="watch-layer-dial" className="transition-all duration-500 ease-out">
      <defs>
        {/* Sunburst Dial Texture Gradient */}
        <radialGradient id="dial-sunburst-grad" cx="48%" cy="48%" r="65%">
          <stop offset="0%" stopColor={accentTone} stopOpacity="0.45" />
          <stop offset="40%" stopColor={dialColor} />
          <stop offset="85%" stopColor={dialColor} />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.75" />
        </radialGradient>

        {/* Guilloche pattern for silver dial */}
        <pattern id="dial-guilloche" width="6" height="6" patternUnits="userSpaceOnUse">
          <rect width="6" height="6" fill={dialColor} />
          <path d="M 0,3 L 3,0 L 6,3 L 3,6 Z" fill="none" stroke="#64748b" strokeWidth="0.5" strokeOpacity="0.35" />
          <circle cx="3" cy="3" r="0.8" fill="#cbd5e1" fillOpacity="0.2" />
        </pattern>

        {/* Applied Hour Marker 3D Gradient */}
        <linearGradient id="marker-facet-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor={markersColor} />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>

        {/* Dial Inner Shadow Mask for deep rehaut appearance */}
        <radialGradient id="dial-rehaut-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="85%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.6" />
        </radialGradient>
      </defs>

      {/* --- DIAL BASE DISC --- */}
      <circle
        cx="200"
        cy="200"
        r="95"
        fill={textureType === 'guilloche' ? 'url(#dial-guilloche)' : 'url(#dial-sunburst-grad)'}
      />

      {/* Outer Rehaut Depth Overlay */}
      <circle cx="200" cy="200" r="95" fill="url(#dial-rehaut-shadow)" pointerEvents="none" />

      {/* --- CHAPTER RING / MINUTE TRACK --- */}
      <g id="minute-track" opacity={isWhite ? 0.9 : 0.75}>
        <circle cx="200" cy="200" r="92" fill="none" stroke={trackColor} strokeWidth="0.5" strokeOpacity="0.4" />
        <circle cx="200" cy="200" r="88" fill="none" stroke={trackColor} strokeWidth="0.5" strokeOpacity="0.3" />
        {minuteTicks.map((tick) => (
          <line
            key={`tick-${tick.i}`}
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            stroke={trackColor}
            strokeWidth={tick.isHour ? 1.5 : 0.75}
            strokeLinecap="square"
          />
        ))}
      </g>

      {/* --- APPLIED 3D HOUR INDICES --- */}
      {/* 12 o'clock Dual Applied Baton with Lume Pip */}
      <g id="marker-12">
        <rect x="194" y="112" width="4" height="15" rx="0.5" fill="url(#marker-facet-grad)" stroke="#1e293b" strokeWidth="0.4" />
        <rect x="202" y="112" width="4" height="15" rx="0.5" fill="url(#marker-facet-grad)" stroke="#1e293b" strokeWidth="0.4" />
        <rect x="195" y="114" width="2" height="11" fill="#6ee7b7" fillOpacity="0.8" />
        <rect x="203" y="114" width="2" height="11" fill="#6ee7b7" fillOpacity="0.8" />
      </g>

      {/* 6 o'clock Applied Baton */}
      <g id="marker-6">
        <rect x="197" y="258" width="6" height="15" rx="0.5" fill="url(#marker-facet-grad)" stroke="#1e293b" strokeWidth="0.4" />
        <rect x="198.5" y="260" width="3" height="11" fill="#6ee7b7" fillOpacity="0.8" />
      </g>

      {/* 9 o'clock Applied Baton */}
      <g id="marker-9">
        <rect x="112" y="197" width="15" height="6" rx="0.5" fill="url(#marker-facet-grad)" stroke="#1e293b" strokeWidth="0.4" />
        <rect x="114" y="198.5" width="11" height="3" fill="#6ee7b7" fillOpacity="0.8" />
      </g>

      {/* 3 o'clock (if no date window, or truncated marker) */}
      {!hasDateWindow && (
        <g id="marker-3">
          <rect x="258" y="197" width="15" height="6" rx="0.5" fill="url(#marker-facet-grad)" stroke="#1e293b" strokeWidth="0.4" />
          <rect x="260" y="198.5" width="11" height="3" fill="#6ee7b7" fillOpacity="0.8" />
        </g>
      )}

      {/* Remaining Hour Markers rotated around dial */}
      {hourMarkers.map((m) => (
        <g key={`hour-${m.h}`} transform={`rotate(${m.angleDeg}, 200, 200)`}>
          <rect x="197.5" y="114" width="5" height="13" rx="0.5" fill="url(#marker-facet-grad)" stroke="#1e293b" strokeWidth="0.3" />
          <rect x="199" y="116" width="2" height="9" fill="#6ee7b7" fillOpacity="0.75" />
        </g>
      ))}

      {/* --- DATE WINDOW AT 3 O'CLOCK --- */}
      {hasDateWindow && (
        <g id="date-window">
          {/* Beveled Metallic Border */}
          <rect
            x="246"
            y="190"
            width="24"
            height="20"
            rx="1.5"
            fill="url(#marker-facet-grad)"
            stroke="#000000"
            strokeWidth="0.5"
          />
          {/* White / Cream Date Disc */}
          <rect x="248" y="192" width="20" height="16" rx="0.5" fill="#f8fafc" />
          {/* Crisp Black Date Numeral */}
          <text
            x="258"
            y="204.5"
            textAnchor="middle"
            fontSize="10"
            fontWeight="700"
            fontFamily="monospace"
            fill="#09090b"
            letterSpacing="-0.5"
          >
            28
          </text>
        </g>
      )}

      {/* --- LUXURY BRAND TYPOGRAPHY --- */}
      <g id="dial-branding" pointerEvents="none">
        {/* Brand Emblem / Crest */}
        <polygon points="200,140 203,144 200,148 197,144" fill={textColor} opacity="0.9" />

        {/* Brand Name */}
        <text
          x="200"
          y="156"
          textAnchor="middle"
          fontSize="7.5"
          fontWeight="700"
          fontFamily="var(--font-serif)"
          letterSpacing="2.2"
          fill={textColor}
        >
          ATELIER
        </text>
        <text
          x="200"
          y="164"
          textAnchor="middle"
          fontSize="5.5"
          fontWeight="600"
          fontFamily="var(--font-sans)"
          letterSpacing="2.8"
          fill={subtextColor}
        >
          HORLOGERIE
        </text>

        {/* Lower Dial Caliber Specs */}
        <text
          x="200"
          y="235"
          textAnchor="middle"
          fontSize="4.5"
          fontWeight="600"
          fontFamily="var(--font-sans)"
          letterSpacing="1.8"
          fill={textColor}
          opacity="0.85"
        >
          AUTOMATIC
        </text>
        <text
          x="200"
          y="242"
          textAnchor="middle"
          fontSize="3.8"
          fontWeight="500"
          fontFamily="var(--font-sans)"
          letterSpacing="1.2"
          fill={accentTone}
        >
          200m / 660ft
        </text>

        {/* Custom Dial Engraving Text (if provided) */}
        {customEngraving && customEngraving.trim() && (
          <text
            x="200"
            y="250"
            textAnchor="middle"
            fontSize="4"
            fontWeight="600"
            fontFamily="monospace"
            letterSpacing="1.5"
            fill={textColor}
            opacity="0.75"
          >
            {customEngraving.slice(0, 18).toUpperCase()}
          </text>
        )}

        {/* Swiss Made Footnote at 6 o'clock */}
        <text
          x="184"
          y="288"
          textAnchor="middle"
          fontSize="3"
          fontWeight="600"
          fontFamily="var(--font-sans)"
          letterSpacing="0.8"
          fill={subtextColor}
        >
          SWISS
        </text>
        <text
          x="216"
          y="288"
          textAnchor="middle"
          fontSize="3"
          fontWeight="600"
          fontFamily="var(--font-sans)"
          letterSpacing="0.8"
          fill={subtextColor}
        >
          CRAFT
        </text>
      </g>
    </g>
  );
};
