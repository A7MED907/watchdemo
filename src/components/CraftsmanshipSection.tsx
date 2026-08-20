import React from 'react';
import { Shield, Sparkles, Gem, Gauge, Anchor, Award } from 'lucide-react';

export const CraftsmanshipSection: React.FC = () => {
  const features = [
    {
      title: 'Monolithic 316L Stainless Steel',
      desc: 'Forged from low-carbon austenitic marine grade steel, milled with CNC five-axis machining to sub-micron tolerances, and hand-finished with dual satin and mirror polishing.',
      icon: Shield,
    },
    {
      title: 'Domed Sapphire with Triple Anti-Reflective',
      desc: 'Mohs hardness 9 synthetic corundum sapphire crystal, double-domed to eliminate optical distortion, coated with internal triple-layer anti-reflective purplish-blue sheen.',
      icon: Gem,
    },
    {
      title: 'High-Beat 28,800 VPH Automatic Calibre',
      desc: 'Smooth 4Hz 8-ticks-per-second mechanical sweep, 41-hour power reserve, bi-directional self-winding rotor with Côtes de Genève stripes and 25 ruby jewel bearings.',
      icon: Gauge,
    },
    {
      title: 'Hermetic Seal 100M–200M Water Resistance',
      desc: 'Dual Viton high-compression O-ring gaskets, screw-down crown with engraved emblem, and individual wet chamber hydrostatic pressure testing.',
      icon: Anchor,
    },
    {
      title: 'Grade A Super-LumiNova BGW9',
      desc: 'Swiss photoluminescent pigment charged by natural daylight emitting an intense, long-lasting ice-blue luminescence in low-light environments.',
      icon: Sparkles,
    },
    {
      title: 'Full-Grain Tuscan Leathers & Solid Links',
      desc: 'Vegetable-tanned saddle leathers handcrafted in Florence with wax edge-stitching, alongside solid link screw-pin bracelets with milled push-button clasps.',
      icon: Award,
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-[#F9F9F8] border-t border-gray-200 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gray-500 font-semibold font-mono">
            Horological Standards
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#1A1A1A] font-serif">
            Uncompromising Materials & Engineering
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed">
            Every component in our configurator has been rigorously tested to ensure lifetime durability and heirloom-grade precision.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="p-6 sm:p-7 bg-white border border-gray-200 hover:border-black transition-colors space-y-3"
              >
                <div className="w-10 h-10 bg-[#F5F5F2] border border-gray-200 flex items-center justify-center text-black">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[#1A1A1A] font-serif">
                  {f.title}
                </h3>
                <p className="text-xs text-gray-600 font-normal leading-relaxed">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
