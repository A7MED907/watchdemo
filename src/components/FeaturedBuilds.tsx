import React, { useState } from 'react';
import { PRESET_BUILDS, formatPrice } from '../data/mockWatchData';
import { PresetBuild, CustomWatchConfig } from '../types/watch';
import { WatchPreview } from './watch-renderer/WatchPreview';
import { BuildInspectorModal } from './gallery/BuildInspectorModal';
import { Eye, Sliders } from 'lucide-react';

interface FeaturedBuildsProps {
  onCustomizeBuild: (config: CustomWatchConfig) => void;
}

export const FeaturedBuilds: React.FC<FeaturedBuildsProps> = ({ onCustomizeBuild }) => {
  const [selectedBuild, setSelectedBuild] = useState<PresetBuild | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'steel' | 'gold' | 'stealth'>('all');

  const filteredBuilds = PRESET_BUILDS.filter((b) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'steel') return b.config.caseId.includes('silver') || b.config.caseId.includes('brushed');
    if (activeFilter === 'gold') return b.config.caseId.includes('gold');
    if (activeFilter === 'stealth') return b.config.caseId.includes('black');
    return true;
  });

  const handleInspect = (build: PresetBuild) => {
    setSelectedBuild(build);
    setIsModalOpen(true);
  };

  return (
    <section id="gallery-section" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-200">
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-[0.25em] text-gray-500 font-semibold font-mono">
              Atelier Gallery
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#1A1A1A] font-serif">
              Curated Bespoke Editions
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 font-normal max-w-xl">
              Explore bespoke combinations handcrafted for our discerning collectors. Use any piece as your foundation to customize further.
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {[
              { id: 'all' as const, label: 'All Editions' },
              { id: 'steel' as const, label: '316L Steel' },
              { id: 'gold' as const, label: 'Gold & Rose Gold' },
              { id: 'stealth' as const, label: 'Black DLC Stealth' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-black text-white font-semibold'
                    : 'bg-[#F5F5F2] text-gray-700 hover:text-black border border-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredBuilds.map((build) => (
            <div
              key={build.id}
              className="group bg-white border border-gray-200 hover:border-black transition-colors flex flex-col justify-between"
            >
              {/* Card Image Area with Watch Canvas */}
              <div className="relative p-6 flex flex-col items-center justify-center bg-[#F9F9F8] border-b border-gray-100">
                {build.badge && (
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-gray-800 px-2 py-0.5 bg-white border border-gray-200 font-mono">
                      {build.badge}
                    </span>
                  </div>
                )}

                <div className="py-2 transform group-hover:scale-102 transition-transform duration-300">
                  <WatchPreview config={build.config} size="md" showControls={false} />
                </div>
              </div>

              {/* Card Content & Details */}
              <div className="p-5 space-y-3.5 bg-white flex-1 flex flex-col justify-between">
                <div className="space-y-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-base font-bold text-[#1A1A1A] font-serif group-hover:opacity-80 transition-opacity">
                      {build.name}
                    </h3>
                    <span className="font-mono text-sm font-bold text-black shrink-0">
                      {formatPrice(build.calculatedPrice)}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-gray-400">
                    {build.subtitle}
                  </p>
                  <p className="text-xs text-gray-600 font-normal leading-relaxed line-clamp-2 pt-0.5">
                    {build.story}
                  </p>
                </div>

                {/* Card Actions: View Build & Customize */}
                <div className="pt-3 border-t border-gray-100 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleInspect(build)}
                    className="flex-1 py-2 px-3 bg-[#F5F5F2] hover:bg-gray-200 text-gray-800 text-xs font-semibold flex items-center justify-center gap-1.5 border border-gray-200 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Build</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onCustomizeBuild(build.config)}
                    className="flex-1 py-2 px-3 bg-black hover:bg-neutral-800 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Customize</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Build Inspector Modal */}
      <BuildInspectorModal
        build={selectedBuild}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCustomizeThisBuild={(build) => onCustomizeBuild(build.config)}
      />
    </section>
  );
};
