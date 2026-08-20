import React from 'react';
import { Shield, MapPin, Phone, Mail, Clock } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'home' | 'builder' | 'gallery' | 'craftsmanship') => void;
  onOpenBuilder: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBuilder }) => {
  return (
    <footer className="bg-[#F9F9F8] border-t border-gray-200 text-gray-600 text-xs">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <span className="text-xl tracking-[0.22em] font-serif font-bold text-[#1A1A1A]">
                HORA
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-gray-400 font-sans border-l border-gray-300 pl-2.5">
                Atelier
              </span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed max-w-sm">
              Handcrafted bespoke mechanical timepieces. Custom designed, assembled, and chronometer-regulated in our specialized bespoke watch atelier.
            </p>
            <div className="pt-1 flex items-center gap-4 text-gray-700">
              <span className="flex items-center gap-1.5 text-[11px] font-mono">
                <Shield className="w-3.5 h-3.5 text-black" />
                24-Month International Guarantee
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-[11px] uppercase tracking-widest text-[#1A1A1A] font-bold">
              Bespoke Configurator
            </h4>
            <ul className="space-y-2 text-gray-500">
              <li>
                <button
                  type="button"
                  onClick={onOpenBuilder}
                  className="hover:text-black transition-colors cursor-pointer"
                >
                  Custom Watch Builder
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-black transition-colors cursor-pointer"
                >
                  Archive & Curated Builds
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('craftsmanship')}
                  className="hover:text-black transition-colors cursor-pointer"
                >
                  Calibre & Material Specifications
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenBuilder}
                  className="hover:text-black transition-colors cursor-pointer"
                >
                  Laser Engraving Personalizer
                </button>
              </li>
            </ul>
          </div>

          {/* Atelier Contact & Concierge */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-[11px] uppercase tracking-widest text-[#1A1A1A] font-bold">
              Artisan Concierge
            </h4>
            <div className="space-y-2 text-gray-500">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-black shrink-0 mt-0.5" />
                <span>Bespoke Horology Showroom & Workshop, Cairo & Geneva</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-black shrink-0" />
                <span>Direct Concierge: +20 (100) 123-4567</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-black shrink-0" />
                <span>concierge@atelier-horlogerie.com</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-black shrink-0" />
                <span>Private Consultations by Appointment</span>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright & Disclaimer Bar */}
        <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-gray-500 font-mono uppercase tracking-wider">
          <div>
            © {new Date().getFullYear()} HORA ATELIER BESPOKE. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-4">
            <span>
              Crafted by{' '}
              <a
                href="https://ahmedcodes.online"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black font-semibold underline underline-offset-4 hover:opacity-75 transition-opacity"
              >
                ahmedcodes
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
