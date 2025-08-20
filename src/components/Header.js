import React, { useState, useEffect } from 'react';
import knowledgeService from '../services/knowledgeService';

function Header({ onOpenKnowledgeLog, onOpenAchievements }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [savedCount, setSavedCount] = useState(0);
  const [showFirstHelp, setShowFirstHelp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load saved tips count and listen for updates
  useEffect(() => {
    const loadCount = () => {
      const log = knowledgeService.getKnowledgeLog();
      setSavedCount(Array.isArray(log) ? log.length : 0);
    };
    loadCount();
    const onUpdated = () => loadCount();
    window.addEventListener('knowledgeUpdated', onUpdated);
    return () => window.removeEventListener('knowledgeUpdated', onUpdated);
  }, []);

  // First-load help tooltip logic
  useEffect(() => {
    try {
      const seen = localStorage.getItem('helpSeen');
      if (!seen) {
        setShowFirstHelp(true);
        const timer = setTimeout(() => {
          setShowFirstHelp(false);
          localStorage.setItem('helpSeen', 'true');
        }, 7000);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      // Ignore storage errors and avoid blocking UI
    }
  }, []);

  const dismissHelp = () => {
    setShowFirstHelp(false);
    try { localStorage.setItem('helpSeen', 'true'); } catch {}
  };

  const handleKeyDown = (event, action) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  return (
    <>
      {/* Sticky Navigation Bar */}
      <nav 
        className={`sticky-nav ${isScrolled ? 'py-3' : 'py-4'}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl md:text-2xl" role="img" aria-label="Reptile emoji">🦎</span>
              <span className="text-lg md:text-xl font-bold text-green-600">Reptile Kingdom</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-1">
              <a 
                href="#creatures" 
                className="nav-link"
                aria-label="Navigate to creatures section"
              >
                🐍 Creatures
              </a>
              <a 
                href="#care" 
                className="nav-link"
                aria-label="Navigate to care guide section"
              >
                💚 Care Guide
              </a>
              <a 
                href="#quiz" 
                className="nav-link"
                aria-label="Navigate to quiz section"
              >
                🧠 Quiz
              </a>
              <a 
                href="#achievements" 
                className="nav-link"
                aria-label="Navigate to achievements section"
              >
                🏆 Achievements
              </a>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="relative">
                <button
                  onClick={onOpenKnowledgeLog}
                  onKeyDown={(e) => handleKeyDown(e, onOpenKnowledgeLog)}
                  className="text-sm secondary-cta px-3 md:px-4 py-2"
                  aria-label="Open Knowledge Log"
                  title="Open Knowledge Log (saved tips & Q&A)"
                >
                  📚 Saved Tips
                  {savedCount > 0 && (
                    <span className="ml-2 inline-flex items-center justify-center text-xs font-semibold bg-white/80 text-green-700 rounded-full px-2 py-0.5" aria-label={`${savedCount} saved tips`}>{savedCount}</span>
                  )}
                </button>
                {showFirstHelp && (
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 z-50" onClick={dismissHelp} role="dialog" aria-label="Saved Tips help">
                    <div className="relative bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg max-w-[200px]">
                      Save care advice and Q&A here to revisit later.
                      <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  </div>
                )}
              </div>
              {/* Achievements temporarily hidden */}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Header */}
      <header 
        className="relative hero-banner min-h-[60vh] flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('/images/hero.jpg')`
        }}
        role="banner"
      >
        {/* Dark gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Content with enhanced visual hierarchy */}
        <div className="container mx-auto px-4 md:px-6 py-8 md:py-12 relative z-10">
          <div className="text-center">
            <div className="mb-6 md:mb-8">
              <h1 
                className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-4 md:mb-6 font-display text-shadow-lg tracking-tight"
                id="main-title"
              >
                🦎 Reptile Kingdom 🐍
              </h1>
              <p className="text-2xl md:text-3xl text-white font-light mb-3 md:mb-4 leading-relaxed">
                Discover the fascinating world of reptiles & amphibians
              </p>
              <p className="text-lg md:text-xl text-white/90 font-normal leading-relaxed">
                Your interactive guide to scaly friends and slimy companions!
              </p>
            </div>
            
            {/* Fun interactive element with enhanced styling */}
            <div className="inline-flex items-center space-x-4 md:space-x-6 bg-white/20 backdrop-blur-md rounded-full px-6 md:px-8 py-3 md:py-4 border border-white/40 shadow-2xl mb-6 md:mb-8">
              <span className="text-2xl md:text-3xl animate-pulse" role="img" aria-label="Sparkle">🌟</span>
              <span className="text-white font-medium text-base md:text-lg">Touch-friendly • Offline-ready • Expert-approved</span>
              <span className="text-2xl md:text-3xl animate-pulse" role="img" aria-label="Sparkle">🌟</span>
            </div>

            {/* Interactive Buttons with enhanced styling */}
            <div className="mt-6 md:mt-8 flex flex-wrap justify-center gap-4 md:gap-6">
              <button
                onClick={onOpenKnowledgeLog}
                onKeyDown={(e) => handleKeyDown(e, onOpenKnowledgeLog)}
                className="secondary-cta text-base md:text-lg px-6 md:px-8 py-3 md:py-4 shadow-2xl"
                aria-label="Open knowledge log to track your learning progress"
                title="Open knowledge log"
              >
                📚 Saved Tips
              </button>
              
              {/* Achievements CTA removed for now */}
            </div>
            
            <p className="text-sm md:text-base text-white/90 mt-4 md:mt-6 font-light">
              Track your progress and earn badges as you explore the Reptile Kingdom!
            </p>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
