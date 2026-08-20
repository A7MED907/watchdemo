import React, { useState } from 'react';
import { PRESET_BUILDS, formatPrice } from '../data/mockWatchData';
import { WatchPreview } from './watch-renderer/WatchPreview';
import { ArrowRight, Compass, Sliders } from 'lucide-react';
import { CustomWatchConfig } from '../types/watch';

interface HeroProps {
  onStartBuilding: (config?: CustomWatchConfig) => void;
  onExploreBuilds: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartBuilding,
  onExploreBuilds,
}) => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const currentPreset = PRESET_BUILDS[selectedPresetIndex];

  return (
    <section className="relative w-full bg-white pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-6 space-y-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5F5F2] border border-gray-200 text-xs text-gray-700">
              <span className="w-1.5 h-1.5 rounded-full bg-black" />
              <span className="font-mono uppercase tracking-widest text-[10px]">
                Bespoke Horology Atelier
              </span>
            </div>

            <div className="space-y-3.5">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1A1A1A] font-serif leading-[1.12]">
                Time, Crafted <br />
                To Your Exact Vision.
              </h1>
              <p className="text-sm sm:text-base text-gray-600 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0">
                You are the architect of your timepiece. Select your surgical steel case, sunburst dial, hand-finished handset, and tailored Italian strap in our real-time custom configurator.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1">
              <button
                id="hero-primary-cta"
                type="button"
                onClick={() => onStartBuilding(currentPreset.config)}
                className="w-full sm:w-auto px-8 py-3.5 bg-black hover:bg-neutral-800 text-white font-semibold text-xs uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <span>Build Your Watch</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-secondary-cta"
                type="button"
                onClick={onExploreBuilds}
                className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-gray-50 text-[#1A1A1A] font-semibold text-xs uppercase tracking-[0.2em] border border-gray-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Compass className="w-4 h-4 text-gray-700" />
                <span>Explore Builds</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-gray-200 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <span className="block text-lg sm:text-xl font-bold font-serif text-[#1A1A1A]">
                  316L
                </span>
                <span className="text-[11px] text-gray-500 font-mono uppercase">
                  Surgical Steel
                </span>
              </div>
              <div>
                <span className="block text-lg sm:text-xl font-bold font-serif text-[#1A1A1A]">
                  28,800
                </span>
                <span className="text-[11px] text-gray-500 font-mono uppercase">
                  VPH Automatic
                </span>
              </div>
              <div>
                <span className="block text-lg sm:text-xl font-bold font-serif text-[#1A1A1A]">
                  100%
                </span>
                <span className="text-[11px] text-gray-500 font-mono uppercase">
                  Hand-Regulated
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Luxury Watch Preview Showcase */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="w-full max-w-lg p-6 sm:p-7 bg-[#F9F9F8] border border-gray-200 relative shadow-xs">
              {/* Preset Switcher Pills */}
              <div className="flex items-center justify-between pb-3.5 mb-2 border-b border-gray-200 text-xs">
                <span className="font-mono text-gray-500 uppercase tracking-widest text-[10px]">
                  Featured Edition:
                </span>
                <span className="text-[10px] font-bold text-gray-800 bg-white px-2.5 py-0.5 border border-gray-200 uppercase tracking-wider font-mono">
                  {currentPreset.badge}
                </span>
              </div>

              {/* Large Live Vector Watch View */}
              <div className="py-2 flex items-center justify-center">
                <WatchPreview
                  config={currentPreset.config}
                  size="hero"
                  showControls={true}
                />
              </div>

              {/* Preset Information & Direct Customize Action */}
              <div className="mt-4 pt-3.5 border-t border-gray-200 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold font-serif text-[#1A1A1A]">
                    {currentPreset.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {currentPreset.subtitle}
                  </p>
                </div>
                <div className="text-right">
                  <span className="block font-mono text-sm sm:text-base font-bold text-black">
                    {formatPrice(currentPreset.calculatedPrice)}
                  </span>
                  <button
                    type="button"
                    onClick={() => onStartBuilding(currentPreset.config)}
                    className="text-[11px] font-semibold text-gray-800 hover:text-black underline underline-offset-2 flex items-center gap-1 justify-end mt-0.5 cursor-pointer"
                  >
                    <Sliders className="w-3 h-3" />
                    <span>Customize Base</span>
                  </button>
                </div>
              </div>

              {/* Quick Preset Selector Buttons */}
              <div className="mt-4 pt-3 border-t border-gray-200 flex items-center justify-center gap-2">
                {PRESET_BUILDS.slice(0, 4).map((preset, idx) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setSelectedPresetIndex(idx)}
                    className={`px-3 py-1 text-[11px] font-medium transition-colors cursor-pointer ${
                      selectedPresetIndex === idx
                        ? 'bg-black text-white font-semibold'
                        : 'bg-white text-gray-600 hover:text-black border border-gray-200'
                    }`}
                  >
                    {preset.name.replace('The ', '')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
