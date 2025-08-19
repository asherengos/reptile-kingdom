import React, { useState } from 'react';
import insightEngine from '../services/insightEngine';
import livingRoadmap from '../services/livingRoadmap';

function UserFeedbackModal({ isOpen, onClose, currentSpecies = null }) {
  const [feedback, setFeedback] = useState({
    overallExperience: '',
    easeOfUse: '',
    featureLiked: '',
    featureConfusing: '',
    suggestions: '',
    timeToFindInfo: '',
    wouldRecommend: '',
    ageGroup: '',
    deviceType: ''
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field, value) => {
    setFeedback(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Process feedback through Quest 11 systems
      const enrichedFeedback = insightEngine.addFeedback(feedback);
      
      // Update roadmap with feature suggestions if provided
      if (feedback.suggestions && feedback.suggestions.trim()) {
        const suggestion = {
          title: `User Suggestion: ${feedback.suggestions.substring(0, 50)}...`,
          description: feedback.suggestions,
          estimatedEffort: 'Unknown',
          estimatedImpact: 'Medium',
          dependencies: []
        };
        livingRoadmap.addFeatureSuggestion(suggestion, 60);
      }
      
      // Update roadmap with feature feedback
      if (feedback.featureLiked) {
        livingRoadmap.updateFeatureFromFeedback(feedback.featureLiked, {
          sentiment: 'positive',
          suggestion: feedback.suggestions
        });
      }
      
      if (feedback.featureConfusing) {
        livingRoadmap.updateFeatureFromFeedback(feedback.featureConfusing, {
          sentiment: 'negative',
          suggestion: feedback.suggestions
        });
      }
      
      // Log the enriched feedback for analysis
      console.log('🌱 Quest 11: Feedback processed through Insight Engine:', enrichedFeedback);
      console.log('🌱 Quest 11: Roadmap updated with user insights');
      
      // Simulate API call to save feedback
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error('Failed to process feedback through Quest 11 systems:', error);
    } finally {
      setIsSubmitting(false);
      setFeedback({
        overallExperience: '',
        easeOfUse: '',
        featureLiked: '',
        featureConfusing: '',
        suggestions: '',
        timeToFindInfo: '',
        wouldRecommend: '',
        ageGroup: '',
        deviceType: ''
      });
      setCurrentStep(0);
      onClose();
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              🎯 Quick Experience Check
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How would you rate your overall experience?
                </label>
                <div className="flex space-x-4">
                  {['Poor', 'Fair', 'Good', 'Very Good', 'Excellent'].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => handleInputChange('overallExperience', rating)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                        feedback.overallExperience === rating
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {rating}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How easy was it to find information about {currentSpecies?.name || 'reptiles'}?
                </label>
                <div className="flex space-x-4">
                  {['Very Difficult', 'Difficult', 'Neutral', 'Easy', 'Very Easy'].map((ease) => (
                    <button
                      key={ease}
                      onClick={() => handleInputChange('easeOfUse', ease)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                        feedback.easeOfUse === ease
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {ease}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How long did it take to find the information you needed?
                </label>
                <select
                  value={feedback.timeToFindInfo}
                  onChange={(e) => handleInputChange('timeToFindInfo', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select time range</option>
                  <option value="Under 10 seconds">Under 10 seconds</option>
                  <option value="10-30 seconds">10-30 seconds</option>
                  <option value="30 seconds - 1 minute">30 seconds - 1 minute</option>
                  <option value="1-2 minutes">1-2 minutes</option>
                  <option value="Over 2 minutes">Over 2 minutes</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              🌟 What Did You Love?
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What feature did you like the most?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Species Gallery',
                    'Care Checklists',
                    'Interactive Quiz',
                    'Fun Facts',
                    'AI Insights',
                    'Achievement System',
                    'Visual Design',
                    'Easy Navigation'
                  ].map((feature) => (
                    <button
                      key={feature}
                      onClick={() => handleInputChange('featureLiked', feature)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm ${
                        feedback.featureLiked === feature
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {feature}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Would you recommend this to other reptile enthusiasts?
                </label>
                <div className="flex space-x-4">
                  {['Definitely Not', 'Probably Not', 'Maybe', 'Probably Yes', 'Definitely Yes'].map((rec) => (
                    <button
                      key={rec}
                      onClick={() => handleInputChange('wouldRecommend', rec)}
                      className={`px-3 py-2 rounded-lg border-2 transition-all duration-200 text-sm ${
                        feedback.wouldRecommend === rec
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {rec}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              🔍 What Could Be Better?
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What was confusing or difficult to use?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    'Navigation',
                    'Finding Species',
                    'Understanding Care Info',
                    'Using Checklists',
                    'Quiz Interface',
                    'Mobile Layout',
                    'Text Readability',
                    'Nothing - All Clear'
                  ].map((issue) => (
                    <button
                      key={issue}
                      onClick={() => handleInputChange('featureConfusing', issue)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm ${
                        feedback.featureConfusing === issue
                          ? 'border-red-500 bg-red-50 text-red-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {issue}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Any suggestions for improvement?
                </label>
                <textarea
                  value={feedback.suggestions}
                  onChange={(e) => handleInputChange('suggestions', e.target.value)}
                  placeholder="Tell us what would make this even better... (This will be analyzed by our AI-powered insight engine!)"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent h-24 resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  💡 Your suggestions will be automatically analyzed and may influence our development roadmap!
                </p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              👤 Quick Demographics
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What age group are you in?
                </label>
                <select
                  value={feedback.ageGroup}
                  onChange={(e) => handleInputChange('ageGroup', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select age group</option>
                  <option value="Under 18">Under 18</option>
                  <option value="18-25">18-25</option>
                  <option value="26-35">26-35</option>
                  <option value="36-50">36-50</option>
                  <option value="Over 50">Over 50</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What device are you using?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['Mobile Phone', 'Tablet', 'Desktop', 'Laptop'].map((device) => (
                    <button
                      key={device}
                      onClick={() => handleInputChange('deviceType', device)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 text-sm ${
                        feedback.deviceType === device
                          ? 'border-green-500 bg-green-50 text-green-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {device}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm">
                  🌱 <span className="font-bold">Quest 11 Active:</span> Your feedback will be automatically analyzed by our AI-powered insight engine, 
                  uncovering patterns and driving continuous evolution of the Reptile Kingdom!
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">🧪 User Feedback + 🌱 Quest 11</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-green-100 text-2xl font-bold p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-200"
            >
              ×
            </button>
          </div>
          <p className="text-green-100 mt-2">
            Help us improve the Reptile Kingdom - now with AI-powered insights!
          </p>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="flex space-x-2 mb-6">
            {[0, 1, 2, 3].map((step) => (
              <div
                key={step}
                className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                  step <= currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="px-6 pb-6 flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              currentStep === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            ← Previous
          </button>

          {currentStep < 3 ? (
            <button
              onClick={nextStep}
              className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-all duration-200"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                isSubmitting
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600'
              }`}
            >
              {isSubmitting ? '🌱 Processing...' : '🌱 Submit & Analyze'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserFeedbackModal;
