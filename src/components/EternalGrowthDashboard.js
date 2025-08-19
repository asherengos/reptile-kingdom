import React, { useState, useEffect } from 'react';
import insightEngine from '../services/insightEngine';
import livingRoadmap from '../services/livingRoadmap';
import sustainabilitySpells from '../services/sustainabilitySpells';

function EternalGrowthDashboard({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('insights');
  const [insights, setInsights] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [sustainability, setSustainability] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadEternalGrowthData();
    }
  }, [isOpen]);

  const loadEternalGrowthData = async () => {
    setIsLoading(true);
    
    try {
      // Load insights
      const generatedInsights = insightEngine.generateInsights();
      setInsights(generatedInsights);
      
      // Load roadmap
      const roadmapData = livingRoadmap.getRoadmapStats();
      const nextFeatures = livingRoadmap.getNextRecommendedFeatures(10);
      setRoadmap({ stats: roadmapData, nextFeatures });
      
      // Load sustainability
      const sustainabilityReport = sustainabilitySpells.getSustainabilityReport();
      setSustainability(sustainabilityReport);
      
    } catch (error) {
      console.error('Failed to load eternal growth data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const exportEternalGrowthData = () => {
    const data = {
      insights: insightEngine.exportInsights(),
      roadmap: livingRoadmap.exportRoadmap(),
      sustainability: sustainabilitySpells.exportSustainabilityData(),
      exportTimestamp: new Date().toISOString(),
      version: '1.0.0',
      quest: 'Quest 11 - The Rite of Eternal Growth'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reptile-kingdom-eternal-growth.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'healthy': return 'text-blue-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'excellent': return 'bg-green-100';
      case 'healthy': return 'bg-blue-100';
      case 'warning': return 'bg-yellow-100';
      case 'critical': return 'bg-red-100';
      default: return 'bg-gray-100';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">🌱 Quest 11: The Rite of Eternal Growth</h2>
              <p className="text-green-100 mt-2">
                Automated insights, living roadmap, and sustainability spells for continuous evolution
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-green-100 text-2xl font-bold p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-200"
            >
              ×
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex space-x-1">
            {[
              { id: 'insights', label: '🌀 Automated Insights', icon: '🌀' },
              { id: 'roadmap', label: '📜 Living Roadmap', icon: '📜' },
              { id: 'sustainability', label: '🛡️ Sustainability Spells', icon: '🛡️' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin text-4xl mb-4">🌱</div>
              <p className="text-gray-600">Loading eternal growth systems...</p>
            </div>
          ) : (
            <>
              {/* Automated Insights Tab */}
              {activeTab === 'insights' && insights && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800">🌀 Automated Insights Dashboard</h3>
                  
                  {/* User Satisfaction */}
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                    <h4 className="text-lg font-bold text-blue-800 mb-4">📈 User Satisfaction Trends</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{insights.userSatisfaction.trend}</div>
                        <div className="text-sm text-blue-700">Trend</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{insights.userSatisfaction.change || 0}</div>
                        <div className="text-sm text-blue-700">Change</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-blue-700">{insights.userSatisfaction.message}</div>
                      </div>
                    </div>
                  </div>

                  {/* Feature Performance */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h4 className="text-lg font-bold text-gray-800 mb-4">🎮 Feature Performance</h4>
                      <div className="space-y-3">
                        {insights.featurePerformance.slice(0, 5).map((feature, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="font-medium text-gray-700">{feature.feature}</span>
                            <div className="flex items-center space-x-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full transition-all duration-500 ${
                                    feature.status === 'excellent' ? 'bg-green-500' :
                                    feature.status === 'good' ? 'bg-blue-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${feature.satisfactionRate}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-600 w-12 text-right">{feature.satisfactionRate}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h4 className="text-lg font-bold text-gray-800 mb-4">🔍 Evolution Recommendations</h4>
                      <div className="space-y-3">
                        {insights.evolutionRecommendations.slice(0, 5).map((rec, index) => (
                          <div key={index} className="p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-gray-800">{rec.title}</span>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                rec.priority === 'high' ? 'bg-red-100 text-red-700' :
                                rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                              }`}>
                                {rec.priority}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">{rec.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Living Roadmap Tab */}
              {activeTab === 'roadmap' && roadmap && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800">📜 Living Roadmap Dashboard</h3>
                  
                  {/* Roadmap Statistics */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                      <div className="text-2xl font-bold text-green-600">{roadmap.stats.totalFeatures}</div>
                      <div className="text-sm text-green-700">Total Features</div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                      <div className="text-2xl font-bold text-blue-600">{roadmap.stats.averageUserDemand}%</div>
                      <div className="text-sm text-blue-700">Avg User Demand</div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                      <div className="text-2xl font-bold text-purple-600">{roadmap.stats.evolutionProgress}%</div>
                      <div className="text-sm text-purple-700">Evolution Progress</div>
                    </div>
                    <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-xl border border-orange-200">
                      <div className="text-2xl font-bold text-orange-600">{roadmap.stats.averageTechnicalDebt}%</div>
                      <div className="text-sm text-orange-700">Tech Debt</div>
                    </div>
                  </div>

                  {/* Next Recommended Features */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-4">🎯 Next Recommended Features</h4>
                    <div className="space-y-4">
                      {roadmap.nextFeatures.map((feature, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg border-l-4 border-green-500">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-semibold text-gray-800">{feature.name}</h5>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              feature.priority === 'critical' ? 'bg-red-100 text-red-700' :
                              feature.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                              feature.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                              {feature.priority}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{feature.description}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Stage: {feature.stage}</span>
                            <span>Score: {feature.evolutionScore}</span>
                            <span>Demand: {feature.userDemand}%</span>
                          </div>
                          <p className="text-sm text-green-700 mt-2 font-medium">{feature.recommendation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Sustainability Spells Tab */}
              {activeTab === 'sustainability' && sustainability && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800">🛡️ Sustainability Spells Dashboard</h3>
                  
                  {/* Overall Health Status */}
                  <div className={`p-6 rounded-xl border-2 ${
                    sustainability.overallHealth.status === 'critical' ? 'border-red-300 bg-red-50' :
                    sustainability.overallHealth.status === 'warning' ? 'border-yellow-300 bg-yellow-50' :
                    'border-green-300 bg-green-50'
                  }`}>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">🏥 Overall System Health</h4>
                    <div className="flex items-center space-x-4">
                      <div className={`text-2xl font-bold ${getStatusColor(sustainability.overallHealth.status)}`}>
                        {sustainability.overallHealth.status.toUpperCase()}
                      </div>
                      <div className="text-gray-700">{sustainability.overallHealth.message}</div>
                    </div>
                  </div>

                  {/* Health Checks Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {Object.entries(sustainability).filter(([key]) => key !== 'overallHealth' && key !== 'recommendations' && key !== 'timestamp').map(([key, data]) => (
                      <div key={key} className="bg-white border border-gray-200 rounded-xl p-6">
                        <h4 className="text-lg font-bold text-gray-800 mb-4">{data.health?.name || key}</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Status:</span>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBgColor(data.health?.status)} ${getStatusColor(data.health?.status)}`}>
                              {data.health?.status || 'unknown'}
                            </span>
                          </div>
                          {data.health?.metrics && Object.entries(data.health.metrics).map(([metric, value]) => (
                            <div key={metric} className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">{metric}:</span>
                              <span className="text-sm font-medium text-gray-800">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Optimization Strategies */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-gray-800 mb-4">⚡ Active Optimization Strategies</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {sustainability.performance?.optimizations?.map((strategy, index) => (
                        <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-green-800">{strategy.name}</span>
                            <span className="px-2 py-1 bg-green-200 text-green-700 rounded text-xs font-medium">
                              {strategy.status}
                            </span>
                          </div>
                          <p className="text-sm text-green-700">{strategy.description}</p>
                          <div className="flex items-center space-x-4 mt-2 text-xs text-green-600">
                            <span>Impact: {strategy.impact}</span>
                            <span>Effort: {strategy.effort}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-3xl">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              🌱 Quest 11: The Rite of Eternal Growth - Continuous evolution through automated insights
            </div>
            <button
              onClick={exportEternalGrowthData}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-200"
            >
              📊 Export Eternal Growth Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EternalGrowthDashboard;
