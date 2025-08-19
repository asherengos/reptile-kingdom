import React, { useState, useEffect } from 'react';

// Collection of fun facts about reptiles and amphibians
const funFacts = [
  {
    id: 1,
    fact: "Did you know that some geckos can walk on ceilings? They have millions of tiny hair-like structures on their feet that create molecular forces strong enough to support their weight!",
    category: "gecko",
    emoji: "🦎",
    source: "Biology"
  },
  {
    id: 2,
    fact: "Bearded Dragons can change color based on their mood! When they're stressed, they might turn darker, and when they're happy and warm, they become brighter.",
    category: "bearded-dragon",
    emoji: "🐉",
    source: "Behavior"
  },
  {
    id: 3,
    fact: "Pacman Frogs are named after the video game character because of their round, Pac-Man-like body shape and their voracious appetite - they'll eat almost anything that fits in their mouth!",
    category: "frog",
    emoji: "🐸",
    source: "Naming"
  },
  {
    id: 4,
    fact: "Ball Pythons are called 'ball' pythons because when they're stressed or scared, they curl into a tight ball to protect their head and vital organs.",
    category: "snake",
    emoji: "🐍",
    source: "Behavior"
  },
  {
    id: 5,
    fact: "Corn Snakes are excellent escape artists! They can fit through surprisingly small openings and gaps, which is why it's crucial to secure their enclosures tightly.",
    category: "snake",
    emoji: "🐍",
    source: "Behavior"
  },
  {
    id: 6,
    fact: "Some reptiles can go months without eating! Ball Pythons, for example, can fast for several months during breeding season or when stressed, which helps them survive in the wild.",
    category: "general",
    emoji: "⏰",
    source: "Survival"
  },
  {
    id: 7,
    fact: "Reptiles are ectothermic, meaning they rely on external heat sources to regulate their body temperature. This is why proper heating and lighting is crucial for their health!",
    category: "general",
    emoji: "🌡️",
    source: "Biology"
  },
  {
    id: 8,
    fact: "Many reptiles can regenerate lost tails! While the new tail won't look exactly like the original, it's a fascinating survival adaptation that helps them escape predators.",
    category: "general",
    emoji: "🔄",
    source: "Biology"
  },
  {
    id: 9,
    fact: "Some geckos can make sounds! While most reptiles are silent, certain gecko species can vocalize to communicate with each other or defend their territory.",
    category: "gecko",
    emoji: "🔊",
    source: "Communication"
  },
  {
    id: 10,
    fact: "Bearded Dragons have a 'third eye' on top of their head! Called a parietal eye, it can detect light and helps them regulate their daily rhythms and seasonal behaviors.",
    category: "bearded-dragon",
    emoji: "👁️",
    source: "Biology"
  },
  {
    id: 11,
    fact: "Pacman Frogs can eat prey nearly their own size! Their mouths are incredibly stretchy, allowing them to consume surprisingly large food items in one gulp.",
    category: "frog",
    emoji: "🍽️",
    source: "Feeding"
  },
  {
    id: 12,
    fact: "Snakes don't have eyelids! Instead, they have transparent scales called spectacles that protect their eyes. This is why they can't blink like other animals.",
    category: "snake",
    emoji: "👀",
    source: "Biology"
  },
  {
    id: 13,
    fact: "Some reptiles can change their sex! Certain species of turtles and lizards can change from male to female or vice versa based on environmental conditions like temperature.",
    category: "general",
    emoji: "🔄",
    source: "Biology"
  },
  {
    id: 14,
    fact: "Reptiles have been around for over 300 million years! They're some of the oldest living creatures on Earth and have survived multiple mass extinction events.",
    category: "general",
    emoji: "🦕",
    source: "History"
  },
  {
    id: 15,
    fact: "Many reptiles can see in ultraviolet light! This helps them find food, mates, and navigate their environment in ways that humans can't even imagine.",
    category: "general",
    emoji: "🌈",
    source: "Biology"
  }
];

function DailyFunFacts({ isOpen, onClose, currentSpecies = null }) {
  const [currentFact, setCurrentFact] = useState(null);
  const [factIndex, setFactIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  // Get fact based on current species or random
  const getFact = () => {
    let availableFacts = funFacts;
    
    if (currentSpecies) {
      const speciesCategory = currentSpecies.name.toLowerCase().replace(' ', '-');
      availableFacts = funFacts.filter(fact => 
        fact.category === speciesCategory || fact.category === 'general'
      );
    }
    
    if (availableFacts.length === 0) {
      availableFacts = funFacts;
    }
    
    // Use date to ensure consistent daily fact
    const today = new Date().toDateString();
    const dayOfYear = Math.floor((new Date(today) - new Date(today.split(' ')[2], 0, 0)) / (1000 * 60 * 60 * 24));
    const factIndex = dayOfYear % availableFacts.length;
    
    return availableFacts[factIndex];
  };

  // Load fact when component mounts or species changes
  useEffect(() => {
    if (isOpen) {
      const fact = getFact();
      setCurrentFact(fact);
      setIsVisible(true);
    }
  }, [isOpen, currentSpecies]);

  // Auto-advance to next fact every 10 seconds
  useEffect(() => {
    if (!isOpen) return;
    
    const interval = setInterval(() => {
      const fact = getFact();
      setCurrentFact(fact);
      setFactIndex(prev => (prev + 1) % funFacts.length);
    }, 10000);
    
    return () => clearInterval(interval);
  }, [isOpen]);

  // Manual next fact
  const nextFact = () => {
    const fact = getFact();
    setCurrentFact(fact);
    setFactIndex(prev => (prev + 1) % funFacts.length);
  };

  // Previous fact
  const previousFact = () => {
    const fact = getFact();
    setCurrentFact(fact);
    setFactIndex(prev => (prev - 1 + funFacts.length) % funFacts.length);
  };

  if (!isOpen || !currentFact) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold font-display">💡 Daily Fun Fact</h2>
              <p className="text-yellow-100 mt-1">
                {currentSpecies ? `About ${currentSpecies.name}` : 'Amazing Reptile Facts'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-yellow-100 text-2xl font-bold p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-200"
            >
              ×
            </button>
          </div>
        </div>

        {/* Fact Content */}
        <div className="p-8">
          <div className={`text-center transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            {/* Fact Icon */}
            <div className="text-8xl mb-6 animate-bounce">
              {currentFact.emoji}
            </div>

            {/* Fact Text */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200 mb-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                {currentFact.fact}
              </p>
            </div>

            {/* Fact Metadata */}
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-6">
              <span className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                <span>{currentFact.source}</span>
              </span>
              <span>•</span>
              <span>Fact #{currentFact.id}</span>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={previousFact}
                className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-all duration-200 transform hover:scale-110"
              >
                ⬅️
              </button>
              
              <div className="text-sm text-gray-500">
                {factIndex + 1} of {funFacts.length}
              </div>
              
              <button
                onClick={nextFact}
                className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full transition-all duration-200 transform hover:scale-110"
              >
                ➡️
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-yellow-50 border-t border-yellow-200">
          <div className="text-center text-sm text-yellow-700">
            <p>🌟 New facts every day! Keep exploring to discover more amazing reptile secrets!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyFunFacts;
