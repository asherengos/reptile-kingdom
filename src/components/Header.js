import React, { useState, useEffect } from 'react';

function Header({ onOpenKnowledgeLog, onOpenAchievements }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
              <button
                onClick={onOpenKnowledgeLog}
                onKeyDown={(e) => handleKeyDown(e, onOpenKnowledgeLog)}
                className="text-sm secondary-cta px-3 md:px-4 py-2"
                aria-label="Open Knowledge Log"
                title="Open Knowledge Log (saved tips & Q&A)"
              >
                📚 Saved Tips
              </button>
              <button
                onClick={onOpenAchievements}
                onKeyDown={(e) => handleKeyDown(e, onOpenAchievements)}
                className="text-sm accent-cta px-3 md:px-4 py-2"
                aria-label="Open achievements"
                title="Open achievements"
              >
                🏆 Badges
              </button>
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
              
              <button
                onClick={onOpenAchievements}
                onKeyDown={(e) => handleKeyDown(e, onOpenAchievements)}
                className="accent-cta text-base md:text-lg px-6 md:px-8 py-3 md:py-4 shadow-2xl"
                aria-label="View your achievements and earned badges"
                title="View achievements"
              >
                🏆 Achievements
              </button>
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
