import React from 'react';
import { StrapOption } from '../../types/watch';

interface StrapLayerProps {
  strap: StrapOption;
  width?: number;
  height?: number;
}

export const StrapLayer: React.FC<StrapLayerProps> = ({ strap }) => {
  const { type, color, accentColor, stitchColor, texture } = strap;

  return (
    <g id="watch-layer-strap" className="transition-all duration-500 ease-out">
      <defs>
        {/* Steel Bracelet Gradient */}
        <linearGradient id="steel-link-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="25%" stopColor="#f1f5f9" />
          <stop offset="50%" stopColor="#cbd5e1" />
          <stop offset="75%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>

        <linearGradient id="steel-center-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>

        {/* Leather Gradients */}
        <linearGradient id="leather-depth-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.45" />
          <stop offset="15%" stopColor={accentColor} stopOpacity="0.2" />
          <stop offset="50%" stopColor={color} />
          <stop offset="85%" stopColor={accentColor} stopOpacity="0.2" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.55" />
        </linearGradient>

        {/* Shadow under lugs */}
        <linearGradient id="lug-strap-shadow-top" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lug-strap-shadow-bottom" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </linearGradient>

        {/* Alligator pattern */}
        <pattern id="alligator-pattern" width="24" height="24" patternUnits="userSpaceOnUse">
          <rect width="24" height="24" fill={color} />
          <path d="M0,12 Q12,6 24,12 M12,0 Q6,12 12,24 M0,24 Q12,18 24,24" stroke="#000000" strokeWidth="1.2" strokeOpacity="0.35" fill="none" />
          <circle cx="12" cy="12" r="3" fill="#ffffff" fillOpacity="0.03" />
        </pattern>

        {/* Rubber micro texture */}
        <pattern id="rubber-waffle" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill={color} />
          <circle cx="4" cy="4" r="1.5" fill="#000000" fillOpacity="0.4" />
          <circle cx="4" cy="4" r="0.8" fill="#ffffff" fillOpacity="0.08" />
        </pattern>
      </defs>

      {/* --- TOP STRAP / BRACELET --- */}
      {type === 'bracelet' ? (
        <g id="top-strap-bracelet">
          {/* Base Bracelet Shape */}
          <path
            d="M 125,140 L 132,15 L 268,15 L 275,140 Z"
            fill="url(#steel-link-grad)"
            filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))"
          />

          {/* Center Links */}
          <path
            d="M 170,140 L 173,15 L 227,15 L 230,140 Z"
            fill="url(#steel-center-grad)"
            stroke="#475569"
            strokeWidth="0.5"
          />

          {/* Link Dividers */}
          {[35, 55, 75, 95, 115].map((y, idx) => (
            <g key={`top-link-${idx}`}>
              <line x1="130" y1={y} x2="270" y2={y} stroke="#334155" strokeWidth="1.5" />
              <line x1="130" y1={y + 1} x2="270" y2={y + 1} stroke="#f8fafc" strokeWidth="0.75" strokeOpacity="0.6" />
              {/* Outer screw pins */}
              <circle cx="140" cy={y - 10} r="1.2" fill="#1e293b" />
              <circle cx="260" cy={y - 10} r="1.2" fill="#1e293b" />
            </g>
          ))}
        </g>
      ) : (
        <g id="top-strap-leather">
          {/* Top Leather Body */}
          <path
            d="M 126,140 L 134,10 Q 200,8 266,10 L 274,140 Z"
            fill={texture === 'alligator' ? 'url(#alligator-pattern)' : texture === 'perforated-rubber' ? 'url(#rubber-waffle)' : color}
            stroke="#09090b"
            strokeWidth="1.5"
            filter="drop-shadow(0 4px 8px rgba(0,0,0,0.6))"
          />
          {/* Leather Highlight / Shading Overlay */}
          <path
            d="M 126,140 L 134,10 Q 200,8 266,10 L 274,140 Z"
            fill="url(#leather-depth-grad)"
            style={{ mixBlendMode: 'multiply' }}
          />

          {/* Stitching Lines (if leather) */}
          {stitchColor && (
            <g id="top-stitching" stroke={stitchColor} strokeWidth="1.2" strokeDasharray="3,3" strokeOpacity="0.85">
              <path d="M 140,135 L 145,20 Q 200,18 255,20 L 260,135" fill="none" />
            </g>
          )}

          {/* Keeper Loops */}
          <rect x="131" y="45" width="138" height="14" rx="2" fill={color} stroke="#18181b" strokeWidth="1" />
          {stitchColor && (
            <line x1="133" y1="52" x2="267" y2="52" stroke={stitchColor} strokeWidth="0.8" strokeDasharray="2,2" strokeOpacity="0.8" />
          )}
        </g>
      )}

      {/* --- BOTTOM STRAP / BRACELET --- */}
      {type === 'bracelet' ? (
        <g id="bottom-strap-bracelet">
          {/* Base Bracelet Shape */}
          <path
            d="M 125,260 L 132,385 L 268,385 L 275,260 Z"
            fill="url(#steel-link-grad)"
            filter="drop-shadow(0 -4px 6px rgba(0,0,0,0.5))"
          />

          {/* Center Links */}
          <path
            d="M 170,260 L 173,385 L 227,385 L 230,260 Z"
            fill="url(#steel-center-grad)"
            stroke="#475569"
            strokeWidth="0.5"
          />

          {/* Link Dividers */}
          {[285, 305, 325, 345, 365].map((y, idx) => (
            <g key={`bot-link-${idx}`}>
              <line x1="130" y1={y} x2="270" y2={y} stroke="#334155" strokeWidth="1.5" />
              <line x1="130" y1={y + 1} x2="270" y2={y + 1} stroke="#f8fafc" strokeWidth="0.75" strokeOpacity="0.6" />
              {/* Outer screw pins */}
              <circle cx="140" cy={y + 10} r="1.2" fill="#1e293b" />
              <circle cx="260" cy={y + 10} r="1.2" fill="#1e293b" />
            </g>
          ))}
        </g>
      ) : (
        <g id="bottom-strap-leather">
          {/* Bottom Leather Body with tapered tip */}
          <path
            d="M 126,260 L 134,360 Q 140,390 200,396 Q 260,390 266,360 L 274,260 Z"
            fill={texture === 'alligator' ? 'url(#alligator-pattern)' : texture === 'perforated-rubber' ? 'url(#rubber-waffle)' : color}
            stroke="#09090b"
            strokeWidth="1.5"
            filter="drop-shadow(0 4px 8px rgba(0,0,0,0.6))"
          />
          {/* Shading Overlay */}
          <path
            d="M 126,260 L 134,360 Q 140,390 200,396 Q 260,390 266,360 L 274,260 Z"
            fill="url(#leather-depth-grad)"
            style={{ mixBlendMode: 'multiply' }}
          />

          {/* Strap Buckle Sizing Holes */}
          {[290, 310, 330, 350, 370].map((hy) => (
            <g key={`hole-${hy}`}>
              <ellipse cx="200" cy={hy} rx="2.5" ry="3.5" fill="#09090b" stroke="#3f3f46" strokeWidth="0.75" />
            </g>
          ))}

          {/* Stitching Lines */}
          {stitchColor && (
            <g id="bot-stitching" stroke={stitchColor} strokeWidth="1.2" strokeDasharray="3,3" strokeOpacity="0.85">
              <path d="M 140,265 L 145,355 Q 150,380 200,386 Q 250,380 255,355 L 260,265" fill="none" />
            </g>
          )}
        </g>
      )}
    </g>
  );
};
