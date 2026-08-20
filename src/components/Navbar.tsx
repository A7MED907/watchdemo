import React, { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'builder' | 'gallery' | 'craftsmanship';
  onNavigate: (view: 'home' | 'builder' | 'gallery' | 'craftsmanship') => void;
  onOpenQuickBuilder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenQuickBuilder,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks: { id: 'home' | 'builder' | 'gallery' | 'craftsmanship'; label: string }[] = [
    { id: 'home', label: 'Collection' },
    { id: 'builder', label: 'Configurator' },
    { id: 'gallery', label: 'Archive' },
    { id: 'craftsmanship', label: 'Heritage' },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-8">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 text-left cursor-pointer group"
          >
            <span className="text-xl tracking-[0.22em] font-serif font-bold text-[#1A1A1A] group-hover:opacity-75 transition-opacity">
              HORA
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-gray-400 font-sans border-l border-gray-200 pl-2.5 hidden sm:inline">
              Atelier
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-7 text-[11px] uppercase tracking-widest text-gray-500">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => onNavigate(link.id)}
                className={`transition-colors cursor-pointer py-1 ${
                  currentView === link.id
                    ? 'text-black font-bold border-b-2 border-black'
                    : 'hover:text-black'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center space-x-4">
          <button
            id="nav-build-cta"
            type="button"
            onClick={onOpenQuickBuilder}
            className="px-5 py-2 bg-black text-white text-[11px] uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors cursor-pointer font-semibold"
          >
            Build Watch
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-[#1A1A1A] hover:bg-gray-100 cursor-pointer"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-6 py-5 space-y-4">
          <div className="flex flex-col space-y-3 text-xs uppercase tracking-widest">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => {
                  onNavigate(link.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left py-2 transition-colors ${
                  currentView === link.id
                    ? 'text-black font-bold'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              onOpenQuickBuilder();
              setIsMobileMenuOpen(false);
            }}
            className="w-full py-3 bg-black text-white text-[11px] uppercase tracking-[0.2em] font-semibold text-center cursor-pointer"
          >
            Build Custom Watch
          </button>
        </div>
      )}
    </nav>
  );
};
