import React from 'react';

interface GlassLayerProps {
  enabled: boolean;
}

export const GlassLayer: React.FC<GlassLayerProps> = ({ enabled }) => {
  if (!enabled) return null;

  return (
    <g id="watch-layer-glass" pointerEvents="none" className="transition-opacity duration-300">
      <defs>
        {/* Anti-Reflective (AR) Sheen Gradient */}
        <linearGradient id="sapphire-reflection-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.18" />
          <stop offset="25%" stopColor="#818cf8" stopOpacity="0.12" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.08" />
        </linearGradient>

        {/* Domed Edge Specular Highlight */}
        <linearGradient id="crystal-edge-specular" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="20%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="80%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* Domed Sapphire Reflection Curved Slash */}
      <path
        d="M 130,130 Q 200,90 270,130 Q 210,145 130,130 Z"
        fill="url(#sapphire-reflection-grad)"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Subtle Full Crystal Coating Filter */}
      <circle
        cx="200"
        cy="200"
        r="95"
        fill="url(#sapphire-reflection-grad)"
        style={{ mixBlendMode: 'screen' }}
      />

      {/* Crystal Rim Highlight */}
      <circle
        cx="200"
        cy="200"
        r="94.5"
        fill="none"
        stroke="url(#crystal-edge-specular)"
        strokeWidth="1.2"
      />
    </g>
  );
};
