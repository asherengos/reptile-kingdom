import React, { useState, useEffect } from 'react';

function TestingDashboard({ isOpen, onClose }) {
  const [metrics, setMetrics] = useState({
    totalSessions: 0,
    averageSessionTime: 0,
    speciesViewed: {},
    featuresUsed: {},
    commonIssues: {},
    userSatisfaction: 0,
    completionRates: {}
  });

  const [recentFeedback, setRecentFeedback] = useState([]);
  const [isCollecting, setIsCollecting] = useState(false);

  // Simulate collecting metrics from localStorage and other sources
  useEffect(() => {
    if (isOpen) {
      loadMetrics();
    }
  }, [isOpen]);

  const loadMetrics = () => {
    // In production, this would fetch from a real analytics service
    const mockMetrics = {
      totalSessions: 47,
      averageSessionTime: 3.2, // minutes
      speciesViewed: {
        'Leopard Gecko': 23,
        'Bearded Dragon': 18,
        'Pacman Frog': 15,
        'Ball Python': 12,
        'Corn Snake': 9
      },
      featuresUsed: {
        'Species Gallery': 47,
        'Care Checklists': 34,
        'Interactive Quiz': 28,
        'Fun Facts': 41,
        'AI Insights': 19,
        'Achievement System': 22
      },
      commonIssues: {
        'Navigation': 3,
        'Finding Species': 1,
        'Understanding Care Info': 2,
        'Using Checklists': 0,
        'Quiz Interface': 1,
        'Mobile Layout': 0,
        'Text Readability': 0,
        'Nothing - All Clear': 40
      },
      userSatisfaction: 4.6, // out of 5
      completionRates: {
        'Species Selection': 100,
        'Care Info Reading': 87,
        'Checklist Generation': 72,
        'Quiz Completion': 60,
        'Feedback Submission': 45
      }
    };

    setMetrics(mockMetrics);
  };

  const startDataCollection = () => {
    setIsCollecting(true);
    // In production, this would start real-time analytics collection
    console.log('🔄 Starting real-time data collection for Quest 10...');
  };

  const stopDataCollection = () => {
    setIsCollecting(false);
    console.log('⏹️ Stopping data collection');
  };

  const exportTestData = () => {
    const data = {
      metrics,
      recentFeedback,
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      quest: 'Quest 10 - The Great Playtest'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reptile-kingdom-test-data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getSatisfactionColor = (rating) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-blue-600';
    if (rating >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getCompletionColor = (rate) => {
    if (rate >= 90) return 'text-green-600';
    if (rate >= 70) return 'text-blue-600';
    if (rate >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">🧪 Quest 10 Testing Dashboard</h2>
              <p className="text-purple-100 mt-2">
                The Great Playtest of Real Adventurers - Track user interactions and performance
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-purple-100 text-2xl font-bold p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-200"
            >
              ×
            </button>
          </div>
        </div>

        {/* Control Panel */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={startDataCollection}
                disabled={isCollecting}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  isCollecting
                    ? 'bg-green-500 text-white cursor-not-allowed'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                {isCollecting ? '🔄 Collecting...' : '🟢 Start Collection'}
              </button>
              <button
                onClick={stopDataCollection}
                disabled={!isCollecting}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  !isCollecting
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                ⏹️ Stop Collection
              </button>
            </div>
            <button
              onClick={exportTestData}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all duration-200"
            >
              📊 Export Test Data
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Key Metrics */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">📈 Key Performance Indicators</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">{metrics.totalSessions}</div>
                  <div className="text-sm text-blue-700">Total Sessions</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                  <div className="text-2xl font-bold text-green-600">{metrics.averageSessionTime}m</div>
                  <div className="text-sm text-green-700">Avg Session Time</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                  <div className={`text-2xl font-bold ${getSatisfactionColor(metrics.userSatisfaction)}`}>
                    {metrics.userSatisfaction}/5
                  </div>
                  <div className="text-sm text-purple-700">User Satisfaction</div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                  <div className="text-2xl font-bold text-orange-600">
                    {Math.round((metrics.completionRates['Species Selection'] || 0))}%
                  </div>
                  <div className="text-sm text-orange-700">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Species Popularity */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">🦎 Species Popularity</h3>
              
              <div className="space-y-3">
                {Object.entries(metrics.speciesViewed)
                  .sort(([,a], [,b]) => b - a)
                  .map(([species, views]) => (
                    <div key={species} className="flex items-center justify-between">
                      <span className="font-medium text-gray-700">{species}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(views / Math.max(...Object.values(metrics.speciesViewed))) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-8 text-right">{views}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Feature Usage */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">🎮 Feature Usage</h3>
              
              <div className="space-y-3">
                {Object.entries(metrics.featuresUsed)
                  .sort(([,a], [,b]) => b - a)
                  .map(([feature, usage]) => (
                    <div key={feature} className="flex items-center justify-between">
                      <span className="font-medium text-gray-700">{feature}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${(usage / Math.max(...Object.values(metrics.featuresUsed))) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-8 text-right">{usage}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Completion Rates */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-800">✅ Completion Rates</h3>
              
              <div className="space-y-3">
                {Object.entries(metrics.completionRates).map(([task, rate]) => (
                  <div key={task} className="flex items-center justify-between">
                    <span className="font-medium text-gray-700">{task}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${getCompletionColor(rate).replace('text-', 'bg-')}`}
                          style={{ width: `${rate}%` }}
                        />
                      </div>
                      <span className={`text-sm font-medium w-12 text-right ${getCompletionColor(rate)}`}>
                        {rate}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Issues & Insights */}
          <div className="mt-8 space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">🔍 Issues & Insights</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Common Issues */}
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h4 className="text-lg font-bold text-red-800 mb-4">🚨 Common Issues</h4>
                <div className="space-y-3">
                  {Object.entries(metrics.commonIssues)
                    .filter(([, count]) => count > 0)
                    .sort(([,a], [,b]) => b - a)
                    .map(([issue, count]) => (
                      <div key={issue} className="flex items-center justify-between">
                        <span className="text-red-700">{issue}</span>
                        <span className="text-red-600 font-medium">{count} users</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Quick Insights */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h4 className="text-lg font-bold text-green-800 mb-4">💡 Quick Insights</h4>
                <div className="space-y-3 text-green-700">
                  <div className="flex items-center space-x-2">
                    <span>✅</span>
                    <span>Navigation is intuitive (97% success rate)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>✅</span>
                    <span>Care checklists are highly valued</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>✅</span>
                    <span>Visual design receives high praise</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>⚠️</span>
                    <span>Quiz completion could be improved</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quest 10 Status */}
          <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-purple-800 mb-4">🏰 Quest 10 Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl mb-2">🧪</div>
                <div className="font-semibold text-purple-700">Field Trials</div>
                <div className="text-sm text-purple-600">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">📊</div>
                <div className="font-semibold text-purple-700">Feedback Crystals</div>
                <div className="text-sm text-purple-600">Collecting Data</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🔧</div>
                <div className="font-semibold text-purple-700">Rapid Refinements</div>
                <div className="text-sm text-purple-600">Ready to Deploy</div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-purple-700 font-medium">
                🎯 Ready for real Petco adventurers to test the magical artifact!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestingDashboard;
