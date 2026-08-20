import React, { useState, useEffect, useMemo } from 'react';
import { CustomWatchConfig } from '../../types/watch';
import { CASE_OPTIONS, DIAL_OPTIONS, HANDS_OPTIONS, STRAP_OPTIONS } from '../../data/mockWatchData';
import { StrapLayer } from './StrapLayer';
import { CaseLayer } from './CaseLayer';
import { DialLayer } from './DialLayer';
import { HandsLayer } from './HandsLayer';
import { GlassLayer } from './GlassLayer';
import { CasebackView } from './CasebackView';
import { RotateCw, Eye, Sparkles, ZoomIn, ZoomOut, Play, Pause } from 'lucide-react';

interface WatchPreviewProps {
  config: CustomWatchConfig;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showControls?: boolean;
  className?: string;
}

export const WatchPreview: React.FC<WatchPreviewProps> = ({
  config,
  size = 'lg',
  showControls = true,
  className = '',
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLiveTime, setIsLiveTime] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [glassReflection, setGlassReflection] = useState(config.glassReflection ?? true);

  // Time state for live hands
  const [timeAngles, setTimeAngles] = useState({
    hourAngle: 305, // 10:10 pose default
    minuteAngle: 60,
    secondAngle: 210,
  });

  // Find components
  const selectedCase = useMemo(
    () => CASE_OPTIONS.find((c) => c.id === config.caseId) || CASE_OPTIONS[0],
    [config.caseId]
  );
  const selectedDial = useMemo(
    () => DIAL_OPTIONS.find((d) => d.id === config.dialId) || DIAL_OPTIONS[0],
    [config.dialId]
  );
  const selectedHands = useMemo(
    () => HANDS_OPTIONS.find((h) => h.id === config.handsId) || HANDS_OPTIONS[0],
    [config.handsId]
  );
  const selectedStrap = useMemo(
    () => STRAP_OPTIONS.find((s) => s.id === config.strapId) || STRAP_OPTIONS[0],
    [config.strapId]
  );

  // Live sweeping mechanical clock movement loop (28,800 vph / smooth 60fps simulation)
  useEffect(() => {
    if (!isLiveTime) {
      // Classic 10:10:35 Luxury Exhibition Catalog angle
      setTimeAngles({
        hourAngle: 305.5,
        minuteAngle: 62,
        secondAngle: 210,
      });
      return;
    }

    let animationFrameId: number;

    const updateClock = () => {
      const now = new Date();
      const ms = now.getMilliseconds();
      const seconds = now.getSeconds() + ms / 1000;
      const minutes = now.getMinutes() + seconds / 60;
      const hours = (now.getHours() % 12) + minutes / 60;

      setTimeAngles({
        hourAngle: hours * 30,
        minuteAngle: minutes * 6,
        secondAngle: seconds * 6,
      });

      animationFrameId = requestAnimationFrame(updateClock);
    };

    animationFrameId = requestAnimationFrame(updateClock);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isLiveTime]);

  const sizeClasses = {
    sm: 'w-48 h-48 max-w-[200px]',
    md: 'w-72 h-72 max-w-[300px]',
    lg: 'w-full max-w-[420px] aspect-square',
    hero: 'w-full max-w-[460px] aspect-square',
  }[size];

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* Main Watch Container */}
      <div
        className={`relative ${sizeClasses} flex items-center justify-center transition-transform duration-500`}
        style={{
          transform: `scale(${zoomLevel})`,
        }}
      >
        {!isFlipped ? (
          /* FRONT DIAL VIEW (Stacked Layers) */
          <svg
            id="watch-svg-canvas"
            viewBox="0 0 400 400"
            className="w-full h-full drop-shadow-2xl overflow-visible transition-all duration-300"
          >
            {/* Layer 1: Strap (Bottom & Top) */}
            <StrapLayer strap={selectedStrap} />

            {/* Layer 2: Case (Lugs, Bezel, Crown) */}
            <CaseLayer caseOption={selectedCase} />

            {/* Layer 3: Dial (Face, Texture, Indices, Date, Inscriptions) */}
            <DialLayer dial={selectedDial} customEngraving={config.customEngraving} />

            {/* Layer 4: Hands (Hour, Minute, Sweeping Second Hand) */}
            <HandsLayer
              hands={selectedHands}
              hourAngle={timeAngles.hourAngle}
              minuteAngle={timeAngles.minuteAngle}
              secondAngle={timeAngles.secondAngle}
            />

            {/* Layer 5: Sapphire Crystal Glass & AR Coating */}
            <GlassLayer enabled={glassReflection} />
          </svg>
        ) : (
          /* BACK EXHIBITION CASEBACK VIEW */
          <CasebackView
            caseOption={selectedCase}
            strap={selectedStrap}
            customEngraving={config.customEngraving}
          />
        )}
      </div>

      {/* Interactive Controls Bar */}
      {showControls && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#EAEAEA] shadow-sm z-10 text-xs text-gray-700">
          {/* Flip to Caseback Button */}
          <button
            type="button"
            onClick={() => setIsFlipped(!isFlipped)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all duration-200 text-[11px] font-medium cursor-pointer ${
              isFlipped
                ? 'bg-black text-white'
                : 'hover:bg-gray-100 text-gray-700'
            }`}
            title="Flip to Exhibition Caseback"
          >
            <RotateCw className={`w-3 h-3 ${isFlipped ? 'rotate-180' : ''} transition-transform duration-300`} />
            <span>{isFlipped ? 'Show Dial' : 'Caseback'}</span>
          </button>

          {/* Live Caliber Movement vs Exhibition 10:10 Toggle */}
          {!isFlipped && (
            <button
              type="button"
              onClick={() => setIsLiveTime(!isLiveTime)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all duration-200 text-[11px] font-medium cursor-pointer ${
                isLiveTime
                  ? 'bg-gray-100 text-black'
                  : 'text-gray-500 hover:text-black hover:bg-gray-100'
              }`}
              title={isLiveTime ? 'Pause on 10:10 Exhibition Pose' : 'Start Live Mechanical Sweep'}
            >
              {isLiveTime ? <Pause className="w-3 h-3 text-black" /> : <Play className="w-3 h-3" />}
              <span>{isLiveTime ? 'Live Sweep' : '10:10 Pose'}</span>
            </button>
          )}

          {/* Glass AR Coating toggle */}
          {!isFlipped && (
            <button
              type="button"
              onClick={() => setGlassReflection(!glassReflection)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all duration-200 text-[11px] font-medium cursor-pointer ${
                glassReflection
                  ? 'bg-gray-100 text-black'
                  : 'text-gray-400 hover:text-black hover:bg-gray-100'
              }`}
              title="Toggle Sapphire Anti-Reflective Glass Reflection"
            >
              <Sparkles className="w-3 h-3" />
              <span>AR Glass</span>
            </button>
          )}

          {/* Zoom In/Out Loupe */}
          <div className="flex items-center border-l border-gray-200 pl-2 gap-0.5">
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(0.85, z - 0.15))}
              disabled={zoomLevel <= 0.85}
              className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-30 transition-colors cursor-pointer"
              title="Zoom Out"
            >
              <ZoomOut className="w-3 h-3 text-gray-700" />
            </button>
            <span className="font-mono text-[10px] text-gray-500 min-w-[28px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(1.3, z + 0.15))}
              disabled={zoomLevel >= 1.3}
              className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-30 transition-colors cursor-pointer"
              title="Zoom In"
            >
              <ZoomIn className="w-3 h-3 text-gray-700" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
