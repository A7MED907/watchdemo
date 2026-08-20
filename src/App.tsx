import React, { useState, useEffect } from 'react';
import { CustomWatchConfig } from './types/watch';
import { DEFAULT_CONFIG } from './data/mockWatchData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProcessSection } from './components/ProcessSection';
import { FeaturedBuilds } from './components/FeaturedBuilds';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { Footer } from './components/Footer';
import { WatchBuilder } from './components/builder/WatchBuilder';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'builder' | 'gallery' | 'craftsmanship'>('home');
  const [activeBuilderConfig, setActiveBuilderConfig] = useState<CustomWatchConfig>(DEFAULT_CONFIG);

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleStartBuilding = (config?: CustomWatchConfig) => {
    if (config) {
      setActiveBuilderConfig(config);
    }
    setCurrentView('builder');
  };

  const handleExploreBuilds = () => {
    setCurrentView('gallery');
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] flex flex-col selection:bg-black selection:text-white">
      {/* Brand Header Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        onOpenQuickBuilder={() => handleStartBuilding()}
      />

      {/* VIEW 1: WATCH BUILDER / CONFIGURATOR */}
      {currentView === 'builder' && (
        <WatchBuilder
          initialConfig={activeBuilderConfig}
          onBackToHome={() => setCurrentView('home')}
        />
      )}

      {/* VIEW 2: HOMEPAGE */}
      {currentView === 'home' && (
        <main className="flex-1 bg-white">
          {/* Hero Section with interactive live watch preview */}
          <Hero
            onStartBuilding={handleStartBuilding}
            onExploreBuilds={handleExploreBuilds}
          />

          {/* Process Section explaining the 4-step artisan journey */}
          <ProcessSection
            onStartConfiguring={() => handleStartBuilding()}
          />

          {/* Featured Custom Builds Showcase */}
          <FeaturedBuilds
            onCustomizeBuild={(config) => handleStartBuilding(config)}
          />

          {/* Craftsmanship & Horological Engineering Specs */}
          <CraftsmanshipSection />

          {/* Brand Footer */}
          <Footer
            onNavigate={(view) => setCurrentView(view)}
            onOpenBuilder={() => handleStartBuilding()}
          />
        </main>
      )}

      {/* VIEW 3: DEDICATED GALLERY / CUSTOM BUILDS VIEW */}
      {currentView === 'gallery' && (
        <main className="flex-1 bg-white">
          <div className="pt-12 pb-8 bg-[#F9F9F8] border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-gray-500 font-semibold font-mono">
                Atelier Portfolio
              </span>
              <h1 className="text-3xl sm:text-5xl font-bold font-serif text-[#1A1A1A]">
                Bespoke Timepiece Gallery
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto">
                Discover bespoke configurations designed for collectors worldwide. Select any build to inspect detailed components or load directly into the builder.
              </p>
            </div>
          </div>

          <FeaturedBuilds
            onCustomizeBuild={(config) => handleStartBuilding(config)}
          />

          <Footer
            onNavigate={(view) => setCurrentView(view)}
            onOpenBuilder={() => handleStartBuilding()}
          />
        </main>
      )}

      {/* VIEW 4: DEDICATED CRAFTSMANSHIP & CALIBRE SPEC VIEW */}
      {currentView === 'craftsmanship' && (
        <main className="flex-1 bg-white">
          <div className="pt-12 pb-8 bg-[#F9F9F8] border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-gray-500 font-semibold font-mono">
                Horological Standards
              </span>
              <h1 className="text-3xl sm:text-5xl font-bold font-serif text-[#1A1A1A]">
                Materials & Master Craftsmanship
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto">
                Our timepieces are forged using aerospace 316L stainless steel, diamond-like carbon, domed sapphire crystals, and high-beat automatic calibres.
              </p>
            </div>
          </div>

          <CraftsmanshipSection />

          <Footer
            onNavigate={(view) => setCurrentView(view)}
            onOpenBuilder={() => handleStartBuilding()}
          />
        </main>
      )}
    </div>
  );
}
