import React from 'react';
import { Shield, CircleDot, Clock, Layers, ArrowRight } from 'lucide-react';

interface ProcessSectionProps {
  onStartConfiguring: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onStartConfiguring }) => {
  const steps = [
    {
      num: '01',
      title: 'Architectural Casing',
      subtitle: 'Precision Solid 316L Billets',
      desc: 'Select from mirror-chamfered silver steel, micro-brushed tool steel, stealth DLC carbon, or warm 18K / Sedna rose gold alloy.',
      icon: Shield,
    },
    {
      num: '02',
      title: 'Dial & Chapter Texture',
      subtitle: 'Sunburst & Engine-Turned Guilloché',
      desc: 'Choose your galvanic dial shade: abyssal blue, midnight obsidian, arctic white porcelain, or British racing green with applied rhodium indices.',
      icon: CircleDot,
    },
    {
      num: '03',
      title: 'Handset & Counterweight',
      subtitle: 'Super-LumiNova & Diamond Facets',
      desc: 'Pair your watch with 3D faceted Dauphine hands, Bauhaus baton needles, or skeletonized Haute Horlogerie handsets.',
      icon: Clock,
    },
    {
      num: '04',
      title: 'Artisan Strap Integration',
      subtitle: 'Tuscan Leather & Solid Screw Links',
      desc: 'Complete your timepiece with Italian vegetable-tanned leather, solid 3-link steel bracelets, or vulcanized sports rubber.',
      icon: Layers,
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#F9F9F8] border-t border-b border-gray-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gray-500 font-semibold font-mono">
            The Bespoke Method
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#1A1A1A] font-serif">
            How Your Custom Timepiece Comes To Life
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed">
            Every watch is an individualized mechanical creation assembled by hand in our atelier, tailored to your exact horological preferences.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.num}
                className="relative p-6 sm:p-7 bg-white border border-gray-200 hover:border-black transition-colors group flex flex-col justify-between"
              >
                {/* Step Watermark Number */}
                <div className="absolute top-4 right-5 text-3xl font-bold font-serif text-gray-100 group-hover:text-gray-200 transition-colors pointer-events-none">
                  {s.num}
                </div>

                <div className="space-y-4">
                  <div className="w-10 h-10 bg-[#F5F5F2] border border-gray-200 flex items-center justify-center text-black">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase text-gray-400 tracking-widest block">
                      Phase {s.num}
                    </span>
                    <h3 className="text-base font-bold text-[#1A1A1A] font-serif mt-1">
                      {s.title}
                    </h3>
                    <p className="text-[11px] text-gray-500 font-mono mt-0.5">
                      {s.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-gray-600 font-normal leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                {/* Subtle bottom indicator */}
                <div className="mt-6 pt-3.5 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400 font-mono">
                  <span>Step 0{idx + 1} of 04</span>
                  <span className="text-black font-semibold">
                    Configurable →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner with CTA */}
        <div className="mt-12 p-7 sm:p-8 bg-white border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-bold text-[#1A1A1A] font-serif">
              Ready to create your one-of-a-kind timepiece?
            </h4>
            <p className="text-xs text-gray-500 font-normal">
              Interactive live visualizer updates instantly with calculated component pricing.
            </p>
          </div>

          <button
            type="button"
            onClick={onStartConfiguring}
            className="px-6 py-3 bg-black hover:bg-neutral-800 text-white font-semibold text-xs uppercase tracking-[0.2em] transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Launch Configurator</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
