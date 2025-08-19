import React, { useState, useEffect } from 'react';
import ReptileQA from './ReptileQA';
import ReptileQuiz from './ReptileQuiz';
import DailyFunFacts from './DailyFunFacts';
import CareChecklist from './CareChecklist';
import achievementService from '../services/achievementService';

function SpeciesDetailModal({ species, onClose }) {
  const [showFunFacts, setShowFunFacts] = useState(false);
  const [showCareChecklist, setShowCareChecklist] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedFact, setExpandedFact] = useState(null);
  const [showAIInsights, setShowAIInsights] = useState(false);

  // Update achievement progress when species is viewed
  useEffect(() => {
    if (species) {
      achievementService.updateProgress({
        speciesViewed: [species.name]
      });
    }
  }, [species]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Generate habitat-themed background images for each species
  const getHabitatBackground = () => {
    const backgrounds = {
      'Leopard Gecko': 'bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50',
      'Bearded Dragon': 'bg-gradient-to-br from-amber-50 via-orange-50 to-red-50',
      'Pacman Frog': 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50',
      'Ball Python': 'bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50',
      'Corn Snake': 'bg-gradient-to-br from-red-50 via-orange-50 to-amber-50'
    };
    return backgrounds[species.name] || 'bg-gradient-to-br from-green-50 to-emerald-50';
  };

  // Generate species-specific images (placeholder for now, would be real images in production)
  const getSpeciesImages = () => {
    const baseImages = [
      { id: 1, type: 'portrait', emoji: species.emoji, description: 'Portrait View' },
      { id: 2, type: 'habitat', emoji: '🏠', description: 'Natural Habitat' },
      { id: 3, type: 'behavior', emoji: '🎭', description: 'Behavior' },
      { id: 4, type: 'care', emoji: '💚', description: 'Care Guide' }
    ];
    return baseImages;
  };

  const images = getSpeciesImages();

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const toggleFactExpansion = (factIndex) => {
    setExpandedFact(expandedFact === factIndex ? null : factIndex);
  };

  const handleKeyDown = (event, action) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  return (
    <div 
      className="detail-modal" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="species-modal-title"
      aria-describedby="species-modal-description"
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className={`p-4 md:p-8 ${getHabitatBackground()}`}>
          {/* 🎨 ENHANCED HEADER WITH IMMERSIVE DESIGN */}
          <div className="relative mb-6 md:mb-8">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="w-full h-full" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
            </div>
            
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-4 md:space-x-6">
                <div className="relative group">
                  <span 
                    className="text-6xl md:text-8xl drop-shadow-2xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3"
                    role="img"
                    aria-label={`${species.name} emoji`}
                  >
                    {species.emoji}
                  </span>
                  <div className="absolute -bottom-2 -right-2 bg-coral-accent text-white text-xs px-2 md:px-3 py-1 rounded-full font-bold shadow-lg">
                    {species.type}
                  </div>
                  {/* Floating particles effect */}
                  <div className="absolute -top-2 -left-2 w-3 md:w-4 h-3 md:h-4 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
                  <div className="absolute -bottom-3 md:-bottom-4 -right-3 md:-right-4 w-2 md:w-3 h-2 md:h-3 bg-blue-400 rounded-full animate-pulse"></div>
                </div>
                <div className="space-y-2 md:space-y-3">
                  <h2 
                    id="species-modal-title"
                    className="text-3xl md:text-5xl font-bold text-gray-800 font-display mb-2 drop-shadow-lg"
                  >
                    {species.name}
                  </h2>
                  <div className="flex items-center space-x-4 md:space-x-6 text-sm">
                    <span className="flex items-center bg-white bg-opacity-80 px-2 md:px-3 py-1 rounded-full shadow-md">
                      <span className="w-2 md:w-3 h-2 md:h-3 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                      <span className="font-semibold text-gray-700 text-xs md:text-sm">{species.habitat.temperature.split(' ')[0]}</span>
                    </span>
                    <span className="flex items-center bg-white bg-opacity-80 px-2 md:px-3 py-1 rounded-full shadow-md">
                      <span className="w-2 md:w-3 h-2 md:h-3 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
                      <span className="font-semibold text-gray-700 text-xs md:text-sm">{species.habitat.humidity}</span>
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                onKeyDown={(e) => handleKeyDown(e, onClose)}
                className="text-gray-400 hover:text-gray-600 text-2xl md:text-3xl font-bold p-2 md:p-3 hover:bg-white hover:bg-opacity-80 rounded-full transition-all duration-200 hover:scale-110 shadow-lg focus-visible"
                aria-label="Close species details"
                title="Close"
              >
                ×
              </button>
            </div>
          </div>

          {/* 🖼️ IMMERSIVE IMAGE GALLERY */}
          <div className="mb-6 md:mb-8 relative">
            <div className="bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
              <div className="relative h-48 md:h-64 bg-gradient-to-br from-gray-100 to-gray-200">
                {/* Current Image Display */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span 
                      className="text-7xl md:text-9xl drop-shadow-lg"
                      role="img"
                      aria-label={images[currentImageIndex].description}
                    >
                      {images[currentImageIndex].emoji}
                    </span>
                    <p className="text-base md:text-lg font-semibold text-gray-600 mt-2">{images[currentImageIndex].description}</p>
                  </div>
                </div>
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  onKeyDown={(e) => handleKeyDown(e, prevImage)}
                  className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-700 p-2 md:p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 focus-visible"
                  aria-label="Previous image"
                  title="Previous"
                >
                  ←
                </button>
                <button
                  onClick={nextImage}
                  onKeyDown={(e) => handleKeyDown(e, nextImage)}
                  className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-700 p-2 md:p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 focus-visible"
                  aria-label="Next image"
                  title="Next"
                >
                  →
                </button>
                
                {/* Image Indicators */}
                <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      onKeyDown={(e) => handleKeyDown(e, () => setCurrentImageIndex(index))}
                      className={`w-2 md:w-3 h-2 md:h-3 rounded-full transition-all duration-200 focus-visible ${
                        index === currentImageIndex ? 'bg-coral-accent' : 'bg-gray-300'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                      aria-current={index === currentImageIndex ? 'true' : 'false'}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 🎮 ENHANCED INTERACTIVE LEARNING ZONE */}
          <div className="mb-6 md:mb-8 p-4 md:p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl md:rounded-3xl border border-purple-200 shadow-xl">
            <h3 className="text-xl md:text-2xl font-bold text-purple-800 mb-4 text-center flex items-center justify-center">
              <span className="mr-2">🎮</span>
              Interactive Learning Zone
              <span className="ml-2">🎮</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              <button
                onClick={() => setShowFunFacts(true)}
                onKeyDown={(e) => handleKeyDown(e, () => setShowFunFacts(true))}
                className="p-3 md:p-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl font-semibold 
                         hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 transform hover:scale-105 shadow-lg
                         flex flex-col items-center space-y-2 focus-visible"
                aria-label="Open daily fun facts"
                title="Daily Fun Facts"
              >
                <span className="text-xl md:text-2xl">💡</span>
                <span className="text-sm md:text-base">Daily Fun Facts</span>
              </button>
              <div className="p-3 md:p-4 bg-gradient-to-r from-blue-400 to-cyan-500 text-white rounded-xl font-semibold 
                            flex flex-col items-center justify-center text-center space-y-2">
                <span className="text-xl md:text-2xl">🧠</span>
                <span className="text-sm md:text-base">Quiz Available Below</span>
              </div>
              <button
                onClick={() => setShowCareChecklist(!showCareChecklist)}
                onKeyDown={(e) => handleKeyDown(e, () => setShowCareChecklist(!showCareChecklist))}
                className={`p-3 md:p-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg
                         flex flex-col items-center space-y-2 focus-visible ${
                           showCareChecklist 
                             ? 'bg-gradient-to-r from-green-600 to-emerald-700 text-white' 
                             : 'bg-gradient-to-r from-green-400 to-emerald-500 text-white hover:from-green-500 hover:to-emerald-600'
                         }`}
                aria-label={showCareChecklist ? 'Hide care checklist' : 'Show care checklist'}
                title={showCareChecklist ? 'Hide Checklist' : 'Care Checklist'}
              >
                <span className="text-xl md:text-2xl">🛒</span>
                <span className="text-sm md:text-base">{showCareChecklist ? 'Hide Checklist' : 'Care Checklist'}</span>
              </button>
              <button
                onClick={() => setShowAIInsights(!showAIInsights)}
                onKeyDown={(e) => handleKeyDown(e, () => setShowAIInsights(!showAIInsights))}
                className={`p-3 md:p-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg
                         flex flex-col items-center space-y-2 focus-visible ${
                           showAIInsights 
                             ? 'bg-gradient-to-r from-purple-600 to-pink-700 text-white' 
                             : 'bg-gradient-to-r from-purple-400 to-pink-500 text-white hover:from-purple-500 hover:to-pink-600'
                         }`}
                aria-label={showAIInsights ? 'Hide AI insights' : 'Show AI insights'}
                title={showAIInsights ? 'Hide AI' : 'AI Insights'}
              >
                <span className="text-xl md:text-2xl">🤖</span>
                <span className="text-sm md:text-base">{showAIInsights ? 'Hide AI' : 'AI Insights'}</span>
              </button>
            </div>
            <p className="text-center text-purple-700 mt-3 md:mt-4 text-sm">
              Explore, learn, shop, and earn achievements as you discover the Reptile Kingdom!
            </p>
          </div>

          {/* 🛒 EMBEDDED CARE CHECKLIST PANEL */}
          {showCareChecklist && (
            <div className="mb-6 md:mb-8 bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border-2 border-green-200">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 md:p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl md:text-2xl font-bold font-display">🛒 Care Checklist</h3>
                  <button
                    onClick={() => setShowCareChecklist(false)}
                    onKeyDown={(e) => handleKeyDown(e, () => setShowCareChecklist(false))}
                    className="text-white hover:text-green-100 text-xl md:text-2xl font-bold p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-200 focus-visible"
                    aria-label="Hide care checklist"
                    title="Hide"
                  >
                    ×
                  </button>
                </div>
                <p className="text-green-100 mt-2 text-sm md:text-base">
                  {species.emoji} {species.name} - Everything you need to get started
                </p>
              </div>
              <div className="p-4 md:p-6">
                <CareChecklist 
                  species={species} 
                  onClose={() => setShowCareChecklist(false)}
                  isEmbedded={true}
                />
              </div>
            </div>
          )}

          {/* 🤖 AI INSIGHTS SECTION */}
          {showAIInsights && (
            <div className="mb-6 md:mb-8 p-4 md:p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl md:rounded-3xl border border-indigo-200 shadow-xl">
              <h3 className="text-lg md:text-xl font-bold text-indigo-800 mb-4 flex items-center">
                <span className="mr-2">🤖</span>
                AI-Powered Insights for {species.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-3 md:p-4 rounded-xl shadow-md">
                  <h4 className="font-semibold text-indigo-700 mb-2">💡 Care Enhancement</h4>
                  <p className="text-sm text-gray-600">AI suggests: Consider adding {species.name === 'Leopard Gecko' ? 'UVB lighting for vitamin D synthesis' : species.name === 'Bearded Dragon' ? 'climbing branches for exercise' : 'live plants for natural enrichment'} to enhance your {species.name}'s habitat.</p>
                </div>
                <div className="bg-white p-3 md:p-4 rounded-xl shadow-md">
                  <h4 className="font-semibold text-indigo-700 mb-2">🎯 Behavior Tips</h4>
                  <p className="text-sm text-gray-600">AI observes: {species.name === 'Leopard Gecko' ? 'Your gecko may enjoy gentle handling in the evening when most active' : species.name === 'Bearded Dragon' ? 'Your dragon might wave its arms to communicate with you' : 'Your frog prefers to stay buried during the day'}.</p>
                </div>
              </div>
            </div>
          )}

          {/* 🎯 ENHANCED CONTENT GRID WITH BETTER VISUAL HIERARCHY */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            {/* Habitat Card with Enhanced Visuals */}
            <div className="reptile-card bg-gradient-to-br from-green-50 to-emerald-50 border-l-4 border-green-400 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
              <h3 className="text-lg md:text-xl font-bold text-reptile-green mb-4 flex items-center">
                <span className="mr-2">🏠</span>
                Habitat Requirements
              </h3>
              <div className="space-y-3 md:space-y-4 text-gray-700">
                <div className="flex items-center space-x-3 p-2 md:p-3 bg-white bg-opacity-50 rounded-lg">
                  <span className="text-green-500 text-lg md:text-xl">🌡️</span>
                  <div>
                    <p className="font-semibold text-sm md:text-base">Temperature</p>
                    <p className="text-xs md:text-sm">{species.habitat.temperature}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 md:p-3 bg-white bg-opacity-50 rounded-lg">
                  <span className="text-blue-500 text-lg md:text-xl">💧</span>
                  <div>
                    <p className="font-semibold text-sm md:text-base">Humidity</p>
                    <p className="text-xs md:text-sm">{species.habitat.humidity}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 md:p-3 bg-white bg-opacity-50 rounded-lg">
                  <span className="text-purple-500 text-lg md:text-xl">📦</span>
                  <div>
                    <p className="font-semibold text-sm md:text-base">Enclosure Size</p>
                    <p className="text-xs md:text-sm">{species.habitat.enclosureSize}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 md:p-3 bg-white bg-opacity-50 rounded-lg">
                  <span className="text-yellow-500 text-lg md:text-xl">🌱</span>
                  <div>
                    <p className="font-semibold text-sm md:text-base">Substrate</p>
                    <p className="text-xs md:text-sm">{species.habitat.substrate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Diet Card with Enhanced Visuals */}
            <div className="reptile-card bg-gradient-to-br from-orange-50 to-amber-50 border-l-4 border-orange-400 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
              <h3 className="text-lg md:text-xl font-bold text-reptile-green mb-4 flex items-center">
                <span className="mr-2">🍽️</span>
                Diet & Feeding
              </h3>
              <div className="space-y-3 md:space-y-4 text-gray-700">
                <div className="flex items-center space-x-3 p-2 md:p-3 bg-white bg-opacity-50 rounded-lg">
                  <span className="text-orange-500 text-lg md:text-xl">🦗</span>
                  <div>
                    <p className="font-semibold text-sm md:text-base">Primary Food</p>
                    <p className="text-xs md:text-sm">{species.diet.primary}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 md:p-3 bg-white bg-opacity-50 rounded-lg">
                  <span className="text-red-500 text-lg md:text-xl">⏰</span>
                  <div>
                    <p className="font-semibold text-sm md:text-base">Frequency</p>
                    <p className="text-xs md:text-sm">{species.diet.frequency}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 md:p-3 bg-white bg-opacity-50 rounded-lg">
                  <span className="text-yellow-500 text-lg md:text-xl">💊</span>
                  <div>
                    <p className="font-semibold text-sm md:text-base">Supplements</p>
                    <p className="text-xs md:text-sm">{species.diet.supplements}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-2 md:p-3 bg-white bg-opacity-50 rounded-lg">
                  <span className="text-blue-500 text-lg md:text-xl">💧</span>
                  <div>
                    <p className="font-semibold text-sm md:text-base">Water</p>
                    <p className="text-xs md:text-sm">{species.diet.water}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Care Tips Card with Enhanced Visuals */}
            <div className="reptile-card bg-gradient-to-br from-blue-50 to-cyan-50 border-l-4 border-blue-400 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
              <h3 className="text-lg md:text-xl font-bold text-reptile-green mb-4 flex items-center">
                <span className="mr-2">💡</span>
                Care Tips
              </h3>
              <ul className="space-y-3 text-gray-700">
                 {species.careTips.map((tip, index) => (
                   <li key={index} className="flex items-start space-x-3 p-2 md:p-3 bg-white bg-opacity-50 rounded-lg">
                     <span className="text-coral-accent text-lg mt-1">✨</span>
                     <span className="text-xs md:text-sm leading-relaxed">{tip}</span>
                   </li>
                 ))}
               </ul>
            </div>

            {/* Interactive Fun Facts Card */}
            <div className="reptile-card bg-gradient-to-br from-purple-50 to-pink-50 border-l-4 border-purple-400 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
              <h3 className="text-lg md:text-xl font-bold text-reptile-green mb-4 flex items-center">
                <span className="mr-2">🎯</span>
                Interactive Fun Facts
              </h3>
              <ul className="space-y-3 text-gray-700">
                 {species.funFacts.map((fact, index) => (
                   <li key={index} className="cursor-pointer">
                     <button
                       onClick={() => toggleFactExpansion(index)}
                       onKeyDown={(e) => handleKeyDown(e, () => toggleFactExpansion(index))}
                       className="w-full text-left flex items-start space-x-3 p-2 md:p-3 bg-white bg-opacity-50 rounded-lg hover:bg-opacity-70 transition-all duration-200 focus-visible"
                       aria-label={expandedFact === index ? 'Collapse fun fact' : 'Expand fun fact'}
                       aria-expanded={expandedFact === index}
                     >
                       <span className="text-coral-accent text-lg mt-1">🌟</span>
                       <span className="text-xs md:text-sm leading-relaxed">
                         {expandedFact === index ? fact : fact.substring(0, 60) + '...'}
                       </span>
                       <span className="ml-auto text-xs text-purple-500">
                         {expandedFact === index ? '👆 Click to collapse' : '👇 Click to expand'}
                       </span>
                     </button>
                     {expandedFact === index && (
                       <div className="mt-2 p-2 md:p-3 bg-purple-100 rounded-lg border-l-4 border-purple-400">
                         <p className="text-xs md:text-sm text-purple-800 font-medium">{fact}</p>
                         <p className="text-xs text-purple-600 mt-1">💡 This fact is part of what makes {species.name} so special!</p>
                       </div>
                     )}
                   </li>
                 ))}
               </ul>
            </div>
          </div>

          {/* Enhanced Warnings Section */}
          {species.warnings && species.warnings.length > 0 && (
            <div className="mb-6 md:mb-8 p-4 md:p-6 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl md:rounded-3xl shadow-xl">
              <h3 className="text-lg md:text-xl font-bold text-red-700 mb-4 flex items-center">
                 <span className="mr-2">⚠️</span>
                 Important Warnings
              </h3>
              <ul className="space-y-2 md:space-y-3 text-red-600">
                 {species.warnings.map((warning, index) => (
                   <li key={index} className="flex items-start space-x-3 p-2 md:p-3 bg-white bg-opacity-50 rounded-lg">
                     <span className="text-red-500 text-lg mt-1">🚨</span>
                     <span className="text-xs md:text-sm leading-relaxed">{warning}</span>
                   </li>
                 ))}
               </ul>
            </div>
          )}

          {/* Interactive Quiz Section */}
          <ReptileQuiz species={species} onClose={onClose} />

          {/* AI Q&A Section */}
          <ReptileQA species={species} />

          {/* Enhanced Close Button */}
          <div className="text-center mt-6 md:mt-8">
            <button
              onClick={onClose}
              onKeyDown={(e) => handleKeyDown(e, onClose)}
              className="bg-gradient-to-r from-reptile-green to-jungle-dark hover:from-jungle-dark hover:to-reptile-green
                         text-white font-semibold py-3 md:py-4 px-8 md:px-10 rounded-xl transition-all duration-300 transform
                         hover:scale-105 shadow-lg hover:shadow-xl focus-visible"
              aria-label="Close habitat guide"
              title="Close Habitat Guide"
            >
              🚪 Close Habitat Guide
            </button>
          </div>
        </div>
      </div>

      {/* Daily Fun Facts Modal */}
      <DailyFunFacts
        isOpen={showFunFacts}
        onClose={() => setShowFunFacts(false)}
        currentSpecies={species}
      />
    </div>
  );
}

export default SpeciesDetailModal;
