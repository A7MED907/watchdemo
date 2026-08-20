import React from 'react';
import { HandsOption } from '../../types/watch';

interface HandsLayerProps {
  hands: HandsOption;
  hourAngle?: number; // degrees (default 10:10 = ~305 deg hour)
  minuteAngle?: number; // degrees (default 10:10 = 60 deg minute)
  secondAngle?: number; // degrees (default = 210 deg second)
}

export const HandsLayer: React.FC<HandsLayerProps> = ({
  hands,
  hourAngle = 305,
  minuteAngle = 60,
  secondAngle = 210,
}) => {
  const { style, mainColor, lumeColor, secondHandColor } = hands;

  const isGold = mainColor.includes('#d4') || mainColor.includes('gold');

  // Gradient definitions for 3D metallic facets
  const lightFacet = isGold ? '#fef08a' : '#ffffff';
  const midFacet = mainColor;
  const darkFacet = isGold ? '#a16207' : '#64748b';

  return (
    <g id="watch-layer-hands" className="transition-transform duration-300 ease-out">
      <defs>
        {/* Hand Facet Gradients */}
        <linearGradient id="hand-light-facet" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={midFacet} />
          <stop offset="100%" stopColor={lightFacet} />
        </linearGradient>

        <linearGradient id="hand-dark-facet" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={darkFacet} />
          <stop offset="100%" stopColor={midFacet} />
        </linearGradient>

        {/* Central Pinion Cap Radial Gradient */}
        <radialGradient id="center-pinion-grad" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor={mainColor} />
          <stop offset="80%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#000000" />
        </radialGradient>

        {/* Hand Drop Shadow for realistic depth over dial */}
        <filter id="hand-drop-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="1.5" dy="3" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.65" />
        </filter>

        <filter id="second-hand-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="2" dy="4" stdDeviation="1.8" floodColor="#000000" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* --- HOUR HAND --- */}
      <g
        id="hand-hour"
        transform={`rotate(${hourAngle}, 200, 200)`}
        filter="url(#hand-drop-shadow)"
      >
        {style === 'classic-dauphine' && (
          <g>
            {/* Left faceted blade */}
            <path d="M 200,208 L 194.5,190 L 199.5,145 L 200,140 Z" fill="url(#hand-light-facet)" />
            {/* Right faceted blade */}
            <path d="M 200,208 L 205.5,190 L 200.5,145 L 200,140 Z" fill="url(#hand-dark-facet)" />
            {/* Center Lume Infill strip */}
            <rect x="199" y="152" width="2" height="28" rx="0.5" fill={lumeColor} />
          </g>
        )}

        {style === 'slim-baton' && (
          <g>
            {/* Minimalist needle */}
            <rect x="198" y="145" width="4" height="60" rx="1" fill={mainColor} stroke="#09090b" strokeWidth="0.5" />
            <rect x="198" y="145" width="2" height="60" fill="#ffffff" fillOpacity="0.4" />
          </g>
        )}

        {style === 'sword-lume' && (
          <g>
            {/* Sword outer frame */}
            <path d="M 197,208 L 195,190 L 194,152 L 200,140 L 206,152 L 205,190 L 203,208 Z" fill={mainColor} stroke="#09090b" strokeWidth="0.5" />
            {/* Large Super-LumiNova Infill */}
            <path d="M 197,185 L 196,155 L 200,145 L 204,155 L 203,185 Z" fill={lumeColor} />
          </g>
        )}

        {style === 'skeleton-haute' && (
          <g>
            {/* Openworked skeleton architecture */}
            <path d="M 196,208 L 194,188 L 193,148 L 200,138 L 207,148 L 206,188 L 204,208 Z" fill={mainColor} />
            <path d="M 197,185 L 196,152 L 200,144 L 204,152 L 203,185 Z" fill="#121316" />
            <circle cx="200" cy="168" r="3" fill="none" stroke={mainColor} strokeWidth="1" />
          </g>
        )}
      </g>

      {/* --- MINUTE HAND --- */}
      <g
        id="hand-minute"
        transform={`rotate(${minuteAngle}, 200, 200)`}
        filter="url(#hand-drop-shadow)"
      >
        {style === 'classic-dauphine' && (
          <g>
            {/* Left faceted blade */}
            <path d="M 200,210 L 195,188 L 199.5,120 L 200,115 Z" fill="url(#hand-light-facet)" />
            {/* Right faceted blade */}
            <path d="M 200,210 L 205,188 L 200.5,120 L 200,115 Z" fill="url(#hand-dark-facet)" />
            {/* Center Lume Infill strip */}
            <rect x="199" y="128" width="2" height="48" rx="0.5" fill={lumeColor} />
          </g>
        )}

        {style === 'slim-baton' && (
          <g>
            {/* Longer minimalist needle */}
            <rect x="198.5" y="118" width="3" height="88" rx="1" fill={mainColor} stroke="#09090b" strokeWidth="0.5" />
            <rect x="198.5" y="118" width="1.5" height="88" fill="#ffffff" fillOpacity="0.4" />
          </g>
        )}

        {style === 'sword-lume' && (
          <g>
            {/* Longer sword frame */}
            <path d="M 197.5,210 L 195,188 L 194,126 L 200,115 L 206,126 L 205,188 L 202.5,210 Z" fill={mainColor} stroke="#09090b" strokeWidth="0.5" />
            {/* Super-LumiNova Infill */}
            <path d="M 197,185 L 196,130 L 200,120 L 204,130 L 203,185 Z" fill={lumeColor} />
          </g>
        )}

        {style === 'skeleton-haute' && (
          <g>
            {/* Openworked skeleton longer architecture */}
            <path d="M 196.5,210 L 194,188 L 193,125 L 200,114 L 207,125 L 206,188 L 203.5,210 Z" fill={mainColor} />
            <path d="M 197,185 L 195.5,128 L 200,120 L 204.5,128 L 203,185 Z" fill="#121316" />
            <circle cx="200" cy="150" r="3.5" fill="none" stroke={mainColor} strokeWidth="1" />
          </g>
        )}
      </g>

      {/* --- CENTRAL PINION COLLAR --- */}
      <circle cx="200" cy="200" r="7" fill="url(#center-pinion-grad)" stroke="#09090b" strokeWidth="0.5" />

      {/* --- SECONDS HAND (Super-fine high precision needle) --- */}
      <g
        id="hand-seconds"
        transform={`rotate(${secondAngle}, 200, 200)`}
        filter="url(#second-hand-shadow)"
      >
        {/* Counterweight Extension (towards bottom) */}
        <line x1="200" y1="200" x2="200" y2="228" stroke={secondHandColor} strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="200" cy="222" r="3" fill={secondHandColor} stroke="#09090b" strokeWidth="0.5" />

        {/* Main Needle to Edge of Dial */}
        <line x1="200" y1="200" x2="200" y2="110" stroke={secondHandColor} strokeWidth="0.9" />

        {/* Accent Tip (e.g. luminous arrow or red tip) */}
        <polygon
          points="200,108 197.5,116 202.5,116"
          fill={secondHandColor}
          stroke="#09090b"
          strokeWidth="0.3"
        />

        {/* Super-LumiNova Dot on Second Hand tip */}
        <circle cx="200" cy="122" r="2.2" fill="#6ee7b7" stroke={secondHandColor} strokeWidth="0.6" />
      </g>

      {/* --- CENTRAL PINION TOP JEWEL CAP --- */}
      <circle cx="200" cy="200" r="3.2" fill={secondHandColor} stroke="#000000" strokeWidth="0.5" />
      <circle cx="200" cy="200" r="1.5" fill="#ef4444" />
      <circle cx="199.5" cy="199.5" r="0.6" fill="#ffffff" />
    </g>
  );
};
