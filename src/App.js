import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ReptileGrid from './components/ReptileGrid';
import SpeciesDetailModal from './components/SpeciesDetailModal';
import KnowledgeLog from './components/KnowledgeLog';
// Achievements temporarily disabled
// import AchievementsDisplay from './components/AchievementsDisplay';
import UserFeedbackModal from './components/UserFeedbackModal';
import TestingDashboard from './components/TestingDashboard';
import EternalGrowthDashboard from './components/EternalGrowthDashboard';
import AdopterQuiz from './components/AdopterQuiz';
import insightEngine from './services/insightEngine';
import livingRoadmap from './services/livingRoadmap';
import sustainabilitySpells from './services/sustainabilitySpells';

function App() {
  const [selectedSpecies, setSelectedSpecies] = useState(null);
  const [showKnowledgeLog, setShowKnowledgeLog] = useState(false);
  // const [showAchievements, setShowAchievements] = useState(false);
  const [showUserFeedback, setShowUserFeedback] = useState(false);
  const [showTestingDashboard, setShowTestingDashboard] = useState(false);
  const [showEternalGrowth, setShowEternalGrowth] = useState(false);
  const [showAdopterQuiz, setShowAdopterQuiz] = useState(false);

  // Initialize Quest 11 systems on app load
  useEffect(() => {
    insightEngine.init();
    livingRoadmap.init();
    sustainabilitySpells.init();
    console.log('🌱 Quest 11 systems initialized - The Rite of Eternal Growth is active!');
  }, []);

  const handleSpeciesSelect = (species) => {
    setSelectedSpecies(species);
  };

  const handleCloseModal = () => {
    setSelectedSpecies(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 via-green-600 to-green-500 relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      <Header 
        onOpenKnowledgeLog={() => setShowKnowledgeLog(true)}
        onOpenAchievements={() => {}}
      />
      
      <main className="py-8">
        <ReptileGrid onSpeciesSelect={handleSpeciesSelect} />
        {/* CTA for adopter quiz */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 mt-4">
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/30 text-center">
            <button onClick={()=>setShowAdopterQuiz(true)} className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700">Find your best match</button>
          </div>
        </div>
        {/* Admin controls hidden by default. Enable for internal builds only. */}
        {process.env.REACT_APP_SHOW_ADMIN === 'true' && (
          <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8">
            <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-4 text-center">
                Admin: Testing, Growth & Image Enchantment
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setShowUserFeedback(true)}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold px-6 py-3 rounded-xl"
                >
                  📝 Collect User Feedback
                </button>
                <button
                  onClick={() => setShowTestingDashboard(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-6 py-3 rounded-xl"
                >
                  📊 View Testing Dashboard
                </button>
                <button
                  onClick={() => setShowEternalGrowth(true)}
                  className="bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold px-6 py-3 rounded-xl"
                >
                  🌱 Eternal Growth Dashboard
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      {selectedSpecies && (
        <SpeciesDetailModal 
          species={selectedSpecies} 
          onClose={handleCloseModal} 
        />
      )}

      {showKnowledgeLog && (
        <KnowledgeLog 
          isOpen={showKnowledgeLog}
          onClose={() => setShowKnowledgeLog(false)}
        />
      )}

      {/* Achievements modal disabled */}

      {showUserFeedback && (
        <UserFeedbackModal 
          isOpen={showUserFeedback}
          onClose={() => setShowUserFeedback(false)}
          currentSpecies={selectedSpecies}
        />
      )}

      {showTestingDashboard && (
        <TestingDashboard 
          isOpen={showTestingDashboard}
          onClose={() => setShowTestingDashboard(false)}
        />
      )}

      {showEternalGrowth && (
        <EternalGrowthDashboard 
          isOpen={showEternalGrowth}
          onClose={() => setShowEternalGrowth(false)}
        />
      )}

      {showAdopterQuiz && (
        <AdopterQuiz isOpen={showAdopterQuiz} onClose={()=>setShowAdopterQuiz(false)} />
      )}
    </div>
  );
}

export default App;
