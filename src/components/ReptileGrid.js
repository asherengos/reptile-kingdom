import React from 'react';
import { reptileData } from '../data/reptileData';

function ReptileGrid({ onSpeciesSelect }) {
  const handleKeyDown = (event, species) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSpeciesSelect(species);
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Account for sticky nav height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6">
      {/* Creatures Section */}
      <section 
        id="creatures" 
        className="text-center mb-12 md:mb-16"
        aria-labelledby="creatures-title"
      >
        <div className="mb-6 md:mb-8">
          <h2 
            id="creatures-title"
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 md:mb-6 font-display text-shadow-lg tracking-tight"
          >
            🦎 Choose Your Creature! 🐍
          </h2>
          <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed max-w-3xl mx-auto">
            Tap on any reptile or amphibian to learn more about their care and habitat
          </p>
        </div>
        
        <div className="bg-white/15 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/30 shadow-2xl max-w-4xl mx-auto">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4 text-shadow">
            🎯 Discover Amazing Reptiles & Amphibians
          </h3>
          <p className="text-lg md:text-xl text-white/90 font-normal leading-relaxed">
            From scaly friends to slimy companions, each has unique needs and fascinating stories!
          </p>
        </div>
      </section>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-16 md:mb-20">
        {reptileData.map((species, index) => (
          <button
            key={species.id}
            onClick={() => onSpeciesSelect(species)}
            onKeyDown={(e) => handleKeyDown(e, species)}
            className="species-button group relative overflow-hidden focus-visible p-6 md:p-8"
            aria-label={`Learn about ${species.name}, a ${species.type.toLowerCase()}`}
            title={`Click to learn about ${species.name}`}
            tabIndex={0}
          >
            {/* Background pattern for visual interest */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
            
            <div className="text-center relative z-10">
              {/* Species Image with Emoji Badge */}
              <div className="relative mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-500">
                <img
                  src={`/images/${species.name.toLowerCase().replace(/\s+/g, '-')}.jpg`}
                  alt={`${species.name} - ${species.type}`}
                  className="w-24 h-24 md:w-32 md:h-32 mx-auto object-cover rounded-2xl image-card-shadow border-2 border-white/30 creature-image"
                  onError={(e) => {
                    // Try numbered fallback, then SVG, then emoji
                    const img = e.target;
                    if (img.dataset.fallbackTried === '1') {
                      img.dataset.fallbackTried = '2';
                      img.src = `/images/${species.id}.svg`;
                    } else if (img.dataset.fallbackTried === '2') {
                      img.style.display = 'none';
                      img.nextSibling.nextSibling.style.display = 'block';
                    } else {
                      img.dataset.fallbackTried = '1';
                      img.src = `/images/${species.id}.jpg`;
                    }
                  }}
                />
                {/* Emoji badge in corner */}
                <div className="absolute -top-2 -right-2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg border border-white/50 emoji-badge">
                  <span 
                    className="text-lg md:text-xl"
                    role="img"
                    aria-label={`${species.name} emoji badge`}
                  >
                    {species.emoji}
                  </span>
                </div>
                {/* Fallback emoji */}
                <div 
                  className="text-5xl md:text-6xl drop-shadow-lg hidden"
                  role="img"
                  aria-label={`${species.name} emoji`}
                >
                  {species.emoji}
                </div>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-shadow">{species.name}</h3>
              <p className="text-sm md:text-base opacity-90 mb-3 md:mb-4 font-medium">{species.type}</p>
              
              {/* Quick habitat preview */}
              <div className="text-xs md:text-sm opacity-80 text-left bg-white/15 rounded-lg md:rounded-xl p-2 md:p-3 backdrop-blur-sm border border-white/20">
                <p className="mb-1"><span className="font-semibold">Habitat:</span> {species.habitat.temperature.split(' ')[0]}</p>
                <p><span className="font-semibold">Diet:</span> {species.diet.primary.split(' ')[0]}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
      
      {/* Care Guide Section */}
      <section 
        id="care" 
        className="text-center mb-8 md:mb-12"
        aria-labelledby="care-title"
      >
        <div className="bg-white/15 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/30 shadow-xl inline-block max-w-2xl">
          <p className="text-white/90 text-sm md:text-base font-medium leading-relaxed">
            💡 <span className="font-bold">Pro Tip:</span> Each species has unique care requirements. 
            Always research thoroughly before bringing a new reptile friend home!
          </p>
        </div>
      </section>

      {/* Back to Top Button */}
      <div className="text-center mb-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="bg-white/20 hover:bg-white/30 text-white font-medium px-6 py-3 rounded-full 
                     transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/30
                     focus-visible"
          aria-label="Back to top"
          title="Back to top"
          tabIndex={0}
        >
          ⬆️ Back to Top
        </button>
      </div>
    </div>
  );
}

export default ReptileGrid;
