// 🌀 Quest 11: Automated Insights Engine
// This service analyzes user feedback and automatically generates insights for continuous evolution

class InsightEngine {
  constructor() {
    this.feedbackHistory = [];
    this.insightPatterns = new Map();
    this.evolutionMetrics = {
      userSatisfactionTrend: [],
      featureAdoptionRates: {},
      issueResolutionSpeed: {},
      userBehaviorPatterns: {}
    };
  }

  // Collect and store feedback for analysis
  addFeedback(feedback) {
    const enrichedFeedback = {
      ...feedback,
      timestamp: new Date().toISOString(),
      sessionId: this.generateSessionId(),
      metadata: this.extractMetadata(feedback)
    };

    this.feedbackHistory.push(enrichedFeedback);
    this.analyzePatterns(enrichedFeedback);
    this.updateEvolutionMetrics(enrichedFeedback);
    
    // Store in localStorage for persistence
    this.persistFeedback();
    
    return enrichedFeedback;
  }

  // Extract metadata from feedback for pattern analysis
  extractMetadata(feedback) {
    const metadata = {
      timeOfDay: new Date().getHours(),
      dayOfWeek: new Date().getDay(),
      deviceCategory: this.categorizeDevice(feedback.deviceType),
      userSegment: this.segmentUser(feedback),
      featureInteraction: this.analyzeFeatureInteraction(feedback),
      sentimentScore: this.calculateSentiment(feedback)
    };

    return metadata;
  }

  // Categorize device types for pattern analysis
  categorizeDevice(deviceType) {
    const mobileDevices = ['Mobile Phone', 'Tablet'];
    const desktopDevices = ['Desktop', 'Laptop'];
    
    if (mobileDevices.includes(deviceType)) return 'mobile';
    if (desktopDevices.includes(deviceType)) return 'desktop';
    return 'unknown';
  }

  // Segment users based on demographics and behavior
  segmentUser(feedback) {
    const segments = [];
    
    // Age-based segmentation
    if (feedback.ageGroup === 'Under 18') segments.push('youth');
    else if (feedback.ageGroup === 'Over 50') segments.push('senior');
    else segments.push('adult');
    
    // Experience-based segmentation
    if (feedback.easeOfUse === 'Very Easy') segments.push('expert');
    else if (feedback.easeOfUse === 'Very Difficult') segments.push('novice');
    else segments.push('intermediate');
    
    // Engagement-based segmentation
    if (feedback.wouldRecommend === 'Definitely Yes') segments.push('advocate');
    else if (feedback.wouldRecommend === 'Definitely Not') segments.push('critic');
    else segments.push('neutral');
    
    return segments;
  }

  // Analyze feature interaction patterns
  analyzeFeatureInteraction(feedback) {
    const interactions = [];
    
    if (feedback.featureLiked) interactions.push({ feature: feedback.featureLiked, sentiment: 'positive' });
    if (feedback.featureConfusing) interactions.push({ feature: feedback.featureConfusing, sentiment: 'negative' });
    
    return interactions;
  }

  // Calculate sentiment score from feedback
  calculateSentiment(feedback) {
    let score = 0;
    
    // Overall experience scoring
    const experienceScores = { 'Poor': 1, 'Fair': 2, 'Good': 3, 'Very Good': 4, 'Excellent': 5 };
    score += experienceScores[feedback.overallExperience] || 0;
    
    // Ease of use scoring
    const easeScores = { 'Very Difficult': 1, 'Difficult': 2, 'Neutral': 3, 'Easy': 4, 'Very Easy': 5 };
    score += easeScores[feedback.easeOfUse] || 0;
    
    // Recommendation scoring
    const recScores = { 'Definitely Not': 1, 'Probably Not': 2, 'Maybe': 3, 'Probably Yes': 4, 'Definitely Yes': 5 };
    score += recScores[feedback.wouldRecommend] || 0;
    
    // Normalize to 0-100 scale
    return Math.round((score / 15) * 100);
  }

  // Analyze patterns in feedback data
  analyzePatterns(feedback) {
    // Time-based patterns
    this.analyzeTimePatterns(feedback);
    
    // Device-based patterns
    this.analyzeDevicePatterns(feedback);
    
    // User segment patterns
    this.analyzeUserSegmentPatterns(feedback);
    
    // Feature interaction patterns
    this.analyzeFeaturePatterns(feedback);
    
    // Sentiment trends
    this.analyzeSentimentTrends(feedback);
  }

  // Analyze time-based usage patterns
  analyzeTimePatterns(feedback) {
    const timeKey = `${feedback.metadata.dayOfWeek}-${Math.floor(feedback.metadata.timeOfDay / 6)}`;
    
    if (!this.insightPatterns.has('timePatterns')) {
      this.insightPatterns.set('timePatterns', new Map());
    }
    
    const timePatterns = this.insightPatterns.get('timePatterns');
    const currentCount = timePatterns.get(timeKey) || 0;
    timePatterns.set(timeKey, currentCount + 1);
  }

  // Analyze device-specific patterns
  analyzeDevicePatterns(feedback) {
    const deviceKey = feedback.metadata.deviceCategory;
    
    if (!this.insightPatterns.has('devicePatterns')) {
      this.insightPatterns.set('devicePatterns', new Map());
    }
    
    const devicePatterns = this.insightPatterns.get('devicePatterns');
    
    if (!devicePatterns.has(deviceKey)) {
      devicePatterns.set(deviceKey, {
        totalFeedback: 0,
        averageSentiment: 0,
        commonIssues: new Map(),
        featurePreferences: new Map()
      });
    }
    
    const deviceData = devicePatterns.get(deviceKey);
    deviceData.totalFeedback++;
    
    // Update average sentiment
    const totalSentiment = deviceData.averageSentiment * (deviceData.totalFeedback - 1) + feedback.metadata.sentimentScore;
    deviceData.averageSentiment = totalSentiment / deviceData.totalFeedback;
    
    // Track common issues
    if (feedback.featureConfusing) {
      const currentCount = deviceData.commonIssues.get(feedback.featureConfusing) || 0;
      deviceData.commonIssues.set(feedback.featureConfusing, currentCount + 1);
    }
    
    // Track feature preferences
    if (feedback.featureLiked) {
      const currentCount = deviceData.featurePreferences.get(feedback.featureLiked) || 0;
      deviceData.featurePreferences.set(feedback.featureLiked, currentCount + 1);
    }
  }

  // Analyze user segment patterns
  analyzeUserSegmentPatterns(feedback) {
    feedback.metadata.userSegment.forEach(segment => {
      if (!this.insightPatterns.has('userSegmentPatterns')) {
        this.insightPatterns.set('userSegmentPatterns', new Map());
      }
      
      const segmentPatterns = this.insightPatterns.get('userSegmentPatterns');
      
      if (!segmentPatterns.has(segment)) {
        segmentPatterns.set(segment, {
          totalFeedback: 0,
          averageSentiment: 0,
          commonIssues: new Map(),
          featurePreferences: new Map(),
          timePreferences: new Map()
        });
      }
      
      const segmentData = segmentPatterns.get(segment);
      segmentData.totalFeedback++;
      
      // Update average sentiment
      const totalSentiment = segmentData.averageSentiment * (segmentData.totalFeedback - 1) + feedback.metadata.sentimentScore;
      segmentData.averageSentiment = totalSentiment / segmentData.totalFeedback;
      
      // Track time preferences
      const timeSlot = Math.floor(feedback.metadata.timeOfDay / 6);
      const currentCount = segmentData.timePreferences.get(timeSlot) || 0;
      segmentData.timePreferences.set(timeSlot, currentCount + 1);
    });
  }

  // Analyze feature-specific patterns
  analyzeFeaturePatterns(feedback) {
    feedback.metadata.featureInteraction.forEach(interaction => {
      if (!this.insightPatterns.has('featurePatterns')) {
        this.insightPatterns.set('featurePatterns', new Map());
      }
      
      const featurePatterns = this.insightPatterns.get('featurePatterns');
      
      if (!featurePatterns.has(interaction.feature)) {
        featurePatterns.set(interaction.feature, {
          totalInteractions: 0,
          positiveInteractions: 0,
          negativeInteractions: 0,
          userSegments: new Map(),
          deviceTypes: new Map()
        });
      }
      
      const featureData = featurePatterns.get(interaction.feature);
      featureData.totalInteractions++;
      
      if (interaction.sentiment === 'positive') {
        featureData.positiveInteractions++;
      } else {
        featureData.negativeInteractions++;
      }
      
      // Track user segment usage
      feedback.metadata.userSegment.forEach(segment => {
        const currentCount = featureData.userSegments.get(segment) || 0;
        featureData.userSegments.set(segment, currentCount + 1);
      });
      
      // Track device type usage
      const currentCount = featureData.deviceTypes.get(feedback.metadata.deviceCategory) || 0;
      featureData.deviceTypes.set(feedback.metadata.deviceCategory, currentCount + 1);
    });
  }

  // Analyze sentiment trends over time
  analyzeSentimentTrends(feedback) {
    if (!this.insightPatterns.has('sentimentTrends')) {
      this.insightPatterns.set('sentimentTrends', []);
    }
    
    const sentimentTrends = this.insightPatterns.get('sentimentTrends');
    sentimentTrends.push({
      timestamp: feedback.timestamp,
      sentiment: feedback.metadata.sentimentScore,
      userSegment: feedback.metadata.userSegment[0], // Primary segment
      deviceType: feedback.metadata.deviceCategory
    });
    
    // Keep only last 100 sentiment points for trend analysis
    if (sentimentTrends.length > 100) {
      sentimentTrends.shift();
    }
  }

  // Update evolution metrics for continuous improvement
  updateEvolutionMetrics(feedback) {
    // Update user satisfaction trend
    this.evolutionMetrics.userSatisfactionTrend.push({
      timestamp: feedback.timestamp,
      score: feedback.metadata.sentimentScore
    });
    
    // Keep only last 50 satisfaction scores
    if (this.evolutionMetrics.userSatisfactionTrend.length > 50) {
      this.evolutionMetrics.userSatisfactionTrend.shift();
    }
    
    // Update feature adoption rates
    if (feedback.featureLiked) {
      if (!this.evolutionMetrics.featureAdoptionRates[feedback.featureLiked]) {
        this.evolutionMetrics.featureAdoptionRates[feedback.featureLiked] = 0;
      }
      this.evolutionMetrics.featureAdoptionRates[feedback.featureLiked]++;
    }
    
    // Update issue resolution tracking
    if (feedback.featureConfusing) {
      if (!this.evolutionMetrics.issueResolutionSpeed[feedback.featureConfusing]) {
        this.evolutionMetrics.issueResolutionSpeed[feedback.featureConfusing] = {
          firstReported: feedback.timestamp,
          totalReports: 0,
          lastReported: feedback.timestamp
        };
      }
      
      const issueData = this.evolutionMetrics.issueResolutionSpeed[feedback.featureConfusing];
      issueData.totalReports++;
      issueData.lastReported = feedback.timestamp;
    }
  }

  // Generate automated insights for continuous evolution
  generateInsights() {
    const insights = {
      userSatisfaction: this.analyzeUserSatisfaction(),
      featurePerformance: this.analyzeFeaturePerformance(),
      userSegments: this.analyzeUserSegmentInsights(),
      deviceInsights: this.analyzeDeviceInsights(),
      timeInsights: this.analyzeTimeInsights(),
      evolutionRecommendations: this.generateEvolutionRecommendations()
    };
    
    return insights;
  }

  // Analyze user satisfaction trends
  analyzeUserSatisfaction() {
    const trends = this.evolutionMetrics.userSatisfactionTrend;
    if (trends.length < 2) return { trend: 'insufficient_data', message: 'Need more feedback for trend analysis' };
    
    const recentScores = trends.slice(-10).map(t => t.score);
    const olderScores = trends.slice(0, 10).map(t => t.score);
    
    const recentAvg = recentScores.reduce((a, b) => a + b, 0) / recentScores.length;
    const olderAvg = olderScores.reduce((a, b) => a + b, 0) / olderScores.length;
    
    const change = recentAvg - olderAvg;
    
    if (change > 5) return { trend: 'improving', change: Math.round(change), message: 'User satisfaction is improving!' };
    if (change < -5) return { trend: 'declining', change: Math.round(change), message: 'User satisfaction is declining - action needed!' };
    return { trend: 'stable', change: Math.round(change), message: 'User satisfaction is stable' };
  }

  // Analyze feature performance insights
  analyzeFeaturePerformance() {
    const featurePatterns = this.insightPatterns.get('featurePatterns');
    if (!featurePatterns) return [];
    
    const insights = [];
    
    featurePatterns.forEach((data, feature) => {
      const satisfactionRate = (data.positiveInteractions / data.totalInteractions) * 100;
      
      insights.push({
        feature,
        satisfactionRate: Math.round(satisfactionRate),
        totalInteractions: data.totalInteractions,
        status: satisfactionRate >= 80 ? 'excellent' : satisfactionRate >= 60 ? 'good' : 'needs_improvement',
        recommendation: this.generateFeatureRecommendation(feature, satisfactionRate, data)
      });
    });
    
    return insights.sort((a, b) => b.totalInteractions - a.totalInteractions);
  }

  // Generate feature-specific recommendations
  generateFeatureRecommendation(feature, satisfactionRate, data) {
    if (satisfactionRate >= 80) {
      return `Keep ${feature} as is - users love it!`;
    } else if (satisfactionRate >= 60) {
      return `Consider minor improvements to ${feature} for better user experience`;
    } else {
      return `Prioritize improvements to ${feature} - significant user dissatisfaction detected`;
    }
  }

  // Analyze user segment insights
  analyzeUserSegmentInsights() {
    const segmentPatterns = this.insightPatterns.get('userSegmentPatterns');
    if (!segmentPatterns) return [];
    
    const insights = [];
    
    segmentPatterns.forEach((data, segment) => {
      insights.push({
        segment,
        averageSentiment: Math.round(data.averageSentiment),
        totalFeedback: data.totalFeedback,
        topIssues: Array.from(data.commonIssues.entries())
          .sort(([,a], [,b]) => b - a)
          .slice(0, 3)
          .map(([issue, count]) => ({ issue, count })),
        topFeatures: Array.from(data.featurePreferences.entries())
          .sort(([,a], [,b]) => b - a)
          .slice(0, 3)
          .map(([feature, count]) => ({ feature, count }))
      });
    });
    
    return insights.sort((a, b) => b.totalFeedback - a.totalFeedback);
  }

  // Analyze device-specific insights
  analyzeDeviceInsights() {
    const devicePatterns = this.insightPatterns.get('devicePatterns');
    if (!devicePatterns) return [];
    
    const insights = [];
    
    devicePatterns.forEach((data, device) => {
      insights.push({
        device,
        averageSentiment: Math.round(data.averageSentiment),
        totalFeedback: data.totalFeedback,
        topIssues: Array.from(data.commonIssues.entries())
          .sort(([,a], [,b]) => b - a)
          .slice(0, 3)
          .map(([issue, count]) => ({ issue, count })),
        topFeatures: Array.from(data.featurePreferences.entries())
          .sort(([,a], [,b]) => b - a)
          .slice(0, 3)
          .map(([feature, count]) => ({ feature, count }))
      });
    });
    
    return insights.sort((a, b) => b.totalFeedback - a.totalFeedback);
  }

  // Analyze time-based insights
  analyzeTimeInsights() {
    const timePatterns = this.insightPatterns.get('timePatterns');
    if (!timePatterns) return [];
    
    const timeSlots = [
      'Early Morning (6AM-12PM)',
      'Afternoon (12PM-6PM)',
      'Evening (6PM-12AM)',
      'Late Night (12AM-6AM)'
    ];
    
    const insights = [];
    
    timePatterns.forEach((count, timeKey) => {
      const [day, slot] = timeKey.split('-');
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      
      insights.push({
        day: dayNames[parseInt(day)],
        timeSlot: timeSlots[parseInt(slot)],
        usageCount: count,
        recommendation: count > 10 ? 'High usage period - ensure optimal performance' : 'Low usage period - good time for maintenance'
      });
    });
    
    return insights.sort((a, b) => b.usageCount - a.usageCount);
  }

  // Generate evolution recommendations for continuous improvement
  generateEvolutionRecommendations() {
    const recommendations = [];
    
    // Analyze feature performance for recommendations
    const featureInsights = this.analyzeFeaturePerformance();
    featureInsights.forEach(insight => {
      if (insight.status === 'needs_improvement') {
        recommendations.push({
          priority: 'high',
          category: 'feature_improvement',
          title: `Improve ${insight.feature}`,
          description: insight.recommendation,
          impact: 'High - affects user satisfaction directly',
          effort: 'Medium - requires UX/UI updates'
        });
      }
    });
    
    // Analyze device-specific issues
    const deviceInsights = this.analyzeDeviceInsights();
    deviceInsights.forEach(insight => {
      if (insight.averageSentiment < 70) {
        recommendations.push({
          priority: 'medium',
          category: 'device_optimization',
          title: `Optimize for ${insight.device}`,
          description: `Users on ${insight.device} report lower satisfaction`,
          impact: 'Medium - affects specific user segment',
          effort: 'Low - responsive design improvements'
        });
      }
    });
    
    // Analyze user segment needs
    const segmentInsights = this.analyzeUserSegmentInsights();
    segmentInsights.forEach(insight => {
      if (insight.averageSentiment < 70 && insight.totalFeedback > 5) {
        recommendations.push({
          priority: 'medium',
          category: 'user_experience',
          title: `Improve experience for ${insight.segment} users`,
          description: `${insight.segment} users report lower satisfaction`,
          impact: 'Medium - affects specific user group',
          effort: 'Medium - targeted UX improvements'
        });
      }
    });
    
    return recommendations.sort((a, b) => {
      const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  // Generate session ID for tracking
  generateSessionId() {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Persist feedback to localStorage
  persistFeedback() {
    try {
      localStorage.setItem('reptileKingdom_feedback', JSON.stringify(this.feedbackHistory));
      localStorage.setItem('reptileKingdom_insights', JSON.stringify(Array.from(this.insightPatterns.entries())));
      localStorage.setItem('reptileKingdom_metrics', JSON.stringify(this.evolutionMetrics));
    } catch (error) {
      console.warn('Could not persist feedback data:', error);
    }
  }

  // Load persisted data from localStorage
  loadPersistedData() {
    try {
      const feedback = localStorage.getItem('reptileKingdom_feedback');
      const insights = localStorage.getItem('reptileKingdom_insights');
      const metrics = localStorage.getItem('reptileKingdom_metrics');
      
      if (feedback) this.feedbackHistory = JSON.parse(feedback);
      if (insights) this.insightPatterns = new Map(JSON.parse(insights));
      if (metrics) this.evolutionMetrics = JSON.parse(metrics);
    } catch (error) {
      console.warn('Could not load persisted data:', error);
    }
  }

  // Export insights for external analysis
  exportInsights() {
    return {
      feedbackHistory: this.feedbackHistory,
      insightPatterns: Array.from(this.insightPatterns.entries()),
      evolutionMetrics: this.evolutionMetrics,
      generatedInsights: this.generateInsights(),
      exportTimestamp: new Date().toISOString(),
      version: '1.0.0',
      quest: 'Quest 11 - The Rite of Eternal Growth'
    };
  }

  // Initialize the insight engine
  init() {
    this.loadPersistedData();
    console.log('🌀 Insight Engine initialized - Ready for eternal growth!');
  }
}

// Create and export singleton instance
const insightEngine = new InsightEngine();
export default insightEngine;
