import React, { useState } from 'react';
import aiService from '../services/aiService';
import knowledgeService from '../services/knowledgeService';
import achievementService from '../services/achievementService';

function ReptileQA({ species, onClose }) {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [showQA, setShowQA] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);
    setAiResponse(null);
    setIsSaved(false);
    setSaveStatus('');

    try {
      const response = await aiService.generateResponse(question, species);
      setAiResponse(response);
      
      // Check if this response is already saved
      const alreadySaved = knowledgeService.isDuplicate(species.name, question);
      setIsSaved(alreadySaved);

      // Update achievement progress for asking a question
      achievementService.updateProgress({
        totalQuestions: 1
      });
    } catch (error) {
      console.error('Error getting AI response:', error);
      setAiResponse({
        answer: 'Sorry, I encountered an error. Please try again or consult the care information above.',
        funFact: '💡 Pro Tip: Always double-check care information from multiple sources!',
        source: 'System'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveResponse = async () => {
    if (!aiResponse) return;

    try {
      const success = knowledgeService.saveResponse(species, question, aiResponse);
      if (success) {
        setIsSaved(true);
        setSaveStatus('✅ Saved to knowledge log!');
        
        // Update achievement progress for saving
        achievementService.updateProgress({
          totalSaves: 1
        });
        
        // Clear status after 3 seconds
        setTimeout(() => setSaveStatus(''), 3000);
      } else {
        setSaveStatus('❌ Failed to save. Please try again.');
        setTimeout(() => setSaveStatus(''), 3000);
      }
    } catch (error) {
      console.error('Error saving response:', error);
      setSaveStatus('❌ Error saving. Please try again.');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleNewQuestion = () => {
    setQuestion('');
    setAiResponse(null);
    setIsSaved(false);
    setSaveStatus('');
  };

  const toggleQA = () => {
    setShowQA(!showQA);
    if (!showQA) {
      setQuestion('');
      setAiResponse(null);
      setIsSaved(false);
      setSaveStatus('');
    }
  };

  return (
    <div className="mt-8">
      {/* Q&A Toggle Button */}
      <div className="text-center mb-6">
        <button
          onClick={toggleQA}
          className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
            showQA 
              ? 'bg-coral-accent text-white shadow-lg' 
              : 'bg-gradient-to-r from-reptile-green to-jungle-dark text-white shadow-lg hover:shadow-xl'
          }`}
        >
          {showQA ? '🤖 Hide AI Assistant' : '🤖 Ask AI Expert'}
        </button>
      </div>

      {showQA && (
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border border-blue-200">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-reptile-green mb-2">
              🧠 AI Reptile Expert
            </h3>
            <p className="text-gray-600">
              Ask me anything about {species.name} care, habitat, or behavior!
            </p>
            
            {/* AI Status Indicator */}
            <div className="inline-flex items-center space-x-2 mt-3 px-3 py-1 bg-white rounded-full border border-blue-200">
              <span className={`w-2 h-2 rounded-full ${aiService.getStatus().connected ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
              <span className="text-xs text-gray-600">
                {aiService.getStatus().connected ? 'AI Connected' : 'Offline Mode'}
              </span>
            </div>
          </div>

          {/* Question Form */}
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex space-x-3">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={`Ask about ${species.name} care, feeding, habitat...`}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-reptile-green focus:border-transparent outline-none transition-all duration-200"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !question.trim()}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  isLoading || !question.trim()
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-reptile-green to-jungle-dark text-white hover:scale-105 shadow-lg'
                }`}
              >
                {isLoading ? '🤔 Thinking...' : 'Ask'}
              </button>
            </div>
          </form>

          {/* AI Response */}
          {aiResponse && (
            <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🤖</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">AI Expert Response</h4>
                    <p className="text-xs text-gray-500">Source: {aiResponse.source}</p>
                  </div>
                </div>
                
                {/* Save Button */}
                <button
                  onClick={handleSaveResponse}
                  disabled={isSaved}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    isSaved
                      ? 'bg-green-100 text-green-700 cursor-not-allowed'
                      : 'bg-reptile-green text-white hover:bg-jungle-dark hover:scale-105 shadow-lg'
                  }`}
                >
                  {isSaved ? '💾 Saved' : '💾 Save Tip'}
                </button>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-700 leading-relaxed">{aiResponse.answer}</p>
              </div>

              {aiResponse.funFact && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
                  <div className="flex items-start space-x-3">
                    <span className="text-yellow-500 text-lg mt-1">💡</span>
                    <div>
                      <p className="font-semibold text-yellow-800 mb-1">Did You Know?</p>
                      <p className="text-yellow-700 text-sm">{aiResponse.funFact}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Status */}
              {saveStatus && (
                <div className={`mt-4 p-3 rounded-lg text-center font-medium ${
                  saveStatus.includes('✅') 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-red-100 text-red-700 border border-red-200'
                }`}>
                  {saveStatus}
                </div>
              )}

              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={handleNewQuestion}
                  className="text-sm text-reptile-green hover:text-jungle-dark font-medium transition-colors duration-200"
                >
                  Ask Another Question
                </button>
                
                <div className="text-xs text-gray-400">
                  💡 AI responses are based on reptile care best practices
                </div>
              </div>
            </div>
          )}

          {/* Sample Questions */}
          {!aiResponse && !isLoading && (
            <div className="bg-white rounded-xl p-4 border border-blue-100">
              <h4 className="font-semibold text-gray-800 mb-3">💭 Sample Questions:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  `How often should I feed ${species.name}?`,
                  `What's the best temperature for ${species.name}?`,
                  `Can ${species.name} live with other reptiles?`,
                  `How do I know if ${species.name} is healthy?`
                ].map((sampleQ, index) => (
                  <button
                    key={index}
                    onClick={() => setQuestion(sampleQ)}
                    className="text-left text-sm text-gray-600 hover:text-reptile-green p-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                  >
                    {sampleQ}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ReptileQA;
