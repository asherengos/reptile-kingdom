import React, { useState, useEffect } from 'react';
import achievementService from '../services/achievementService';

function AchievementsDisplay({ isOpen, onClose }) {
  const [achievements, setAchievements] = useState({});
  const [stats, setStats] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showUnlockedOnly, setShowUnlockedOnly] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadAchievements();
      loadStats();
    }
  }, [isOpen]);

  // Listen for achievement updates
  useEffect(() => {
    const handleAchievementUpdate = () => {
      loadAchievements();
      loadStats();
    };

    window.addEventListener('achievementUnlocked', handleAchievementUpdate);
    return () => window.removeEventListener('achievementUnlocked', handleAchievementUpdate);
  }, []);

  const loadAchievements = () => {
    const allAchievements = achievementService.getAchievements();
    setAchievements(allAchievements);
  };

  const loadStats = () => {
    const achievementStats = achievementService.getAchievementStats();
    setStats(achievementStats);
  };

  const getFilteredAchievements = () => {
    let filtered = Object.values(achievements);
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(a => a.category === selectedCategory);
    }
    
    if (showUnlockedOnly) {
      filtered = filtered.filter(a => a.unlocked);
    }
    
    return filtered;
  };

  const getCategoryColor = (category) => {
    const colors = {
      'engagement': 'from-blue-500 to-cyan-500',
      'knowledge': 'from-green-500 to-emerald-500',
      'learning': 'from-purple-500 to-pink-500',
      'exploration': 'from-orange-500 to-red-500'
    };
    return colors[category] || 'from-gray-500 to-gray-600';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'engagement': '🎯',
      'knowledge': '📚',
      'learning': '🧠',
      'exploration': '🗺️'
    };
    return icons[category] || '🏆';
  };

  const getCategories = () => {
    const categories = new Set(Object.values(achievements).map(a => a.category));
    return ['all', ...Array.from(categories)];
  };

  const resetAchievements = () => {
    if (window.confirm('Are you sure you want to reset all achievements? This action cannot be undone.')) {
      achievementService.resetAll();
      loadAchievements();
      loadStats();
    }
  };

  const filteredAchievements = getFilteredAchievements();
  const categories = getCategories();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold font-display">🏆 Achievements</h2>
              <p className="text-purple-100 mt-1">Track your progress through the Reptile Kingdom</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-purple-100 text-2xl font-bold p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-200"
            >
              ×
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        {stats && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 border-b">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-purple-600">{stats.unlocked}</div>
                <div className="text-sm text-gray-600">Unlocked</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-gray-600">{stats.locked}</div>
                <div className="text-sm text-gray-600">Locked</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-green-600">{stats.completionRate}%</div>
                <div className="text-sm text-gray-600">Complete</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-lg">
                <div className="text-2xl font-bold text-blue-600">{stats.progress.currentStreak}</div>
                <div className="text-sm text-gray-600">Day Streak</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress to completion</span>
                <span>{stats.completionRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${stats.completionRate}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="p-6 border-b bg-white">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>

            {/* Show Unlocked Only */}
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showUnlockedOnly}
                onChange={(e) => setShowUnlockedOnly(e.target.checked)}
                className="rounded text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm text-gray-600">Show unlocked only</span>
            </label>

            {/* Reset Button */}
            <button
              onClick={resetAchievements}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              🔄 Reset All
            </button>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="p-6 overflow-y-auto max-h-[500px] scrollbar-thin">
          {filteredAchievements.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold mb-2">No Achievements Found</h3>
              <p>Try changing your filters or start earning achievements!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAchievements.map(achievement => (
                <div
                  key={achievement.id}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    achievement.unlocked
                      ? 'border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg'
                      : 'border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 opacity-75'
                  }`}
                >
                  <div className="text-center">
                    {/* Achievement Icon */}
                    <div className={`text-6xl mb-4 ${
                      achievement.unlocked ? 'animate-bounce' : 'grayscale opacity-50'
                    }`}>
                      {achievement.unlocked ? achievement.icon : '🔒'}
                    </div>

                    {/* Achievement Info */}
                    <h3 className={`text-lg font-bold mb-2 ${
                      achievement.unlocked ? 'text-gray-800' : 'text-gray-500'
                    }`}>
                      {achievement.name}
                    </h3>
                    
                    <p className={`text-sm mb-3 ${
                      achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {achievement.description}
                    </p>

                    {/* Category Badge */}
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${
                      achievement.unlocked
                        ? `bg-gradient-to-r ${getCategoryColor(achievement.category)} text-white`
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      <span>{getCategoryIcon(achievement.category)}</span>
                      <span>{achievement.category}</span>
                    </div>

                    {/* Progress Bar for Progress-based Achievements */}
                    {achievement.progress !== undefined && (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Progress</span>
                          <span>{achievement.progress}/{achievement.target}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              achievement.unlocked 
                                ? 'bg-green-500' 
                                : 'bg-gradient-to-r from-purple-400 to-pink-400'
                            }`}
                            style={{ width: `${Math.min((achievement.progress / achievement.target) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Unlock Date */}
                    {achievement.unlocked && achievement.unlockedAt && (
                      <div className="mt-3 text-xs text-gray-400">
                        Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t">
          <div className="text-center text-sm text-gray-600">
            <p>🎯 Keep learning and exploring to unlock more achievements!</p>
            <p className="mt-1">Every interaction brings you closer to becoming a Reptile Kingdom Master</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AchievementsDisplay;
