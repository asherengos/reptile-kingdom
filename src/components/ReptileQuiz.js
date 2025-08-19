import React, { useState, useEffect } from 'react';
import { getSpeciesQuiz, getRandomQuiz } from '../data/quizData';
import achievementService from '../services/achievementService';

function ReptileQuiz({ species, onClose }) {
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [quizHistory, setQuizHistory] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);

  // Load quiz when component mounts or species changes
  useEffect(() => {
    if (species && showQuiz) {
      loadNewQuiz();
    }
  }, [species, showQuiz]);

  // Load a new quiz question
  const loadNewQuiz = () => {
    const quiz = species ? getRandomQuiz(species.name) : getRandomQuiz();
    setCurrentQuiz(quiz);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  // Handle answer selection
  const handleAnswerSelect = (answerIndex) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    const isCorrect = answerIndex === currentQuiz.correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setTotalQuestions(totalQuestions + 1);
    
    // Add to quiz history
    setQuizHistory([...quizHistory, {
      question: currentQuiz.question,
      userAnswer: answerIndex,
      correctAnswer: currentQuiz.correctAnswer,
      isCorrect: isCorrect,
      timestamp: new Date().toISOString()
    }]);
    
    // Update achievement progress
    achievementService.updateProgress({
      totalQuizzes: 1,
      perfectQuizzes: isCorrect ? 1 : 0
    });
  };

  // Start a new quiz
  const startQuiz = () => {
    setShowQuiz(true);
    setScore(0);
    setTotalQuestions(0);
    setQuizHistory([]);
    loadNewQuiz();
  };

  // Next question
  const nextQuestion = () => {
    if (totalQuestions >= 5) {
      setShowResults(true);
    } else {
      loadNewQuiz();
    }
  };

  // Restart quiz
  const restartQuiz = () => {
    setShowQuiz(false);
    setShowResults(false);
    setScore(0);
    setTotalQuestions(0);
    setQuizHistory([]);
    setCurrentQuiz(null);
  };

  // Get score percentage
  const getScorePercentage = () => {
    return totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
  };

  // Get score message
  const getScoreMessage = () => {
    const percentage = getScorePercentage();
    if (percentage === 100) return { message: 'Perfect Score! 🏆', color: 'text-green-600' };
    if (percentage >= 80) return { message: 'Excellent! 🌟', color: 'text-blue-600' };
    if (percentage >= 60) return { message: 'Good Job! 👍', color: 'text-yellow-600' };
    if (percentage >= 40) return { message: 'Keep Learning! 📚', color: 'text-orange-600' };
    return { message: 'More Practice Needed! 💪', color: 'text-red-600' };
  };

  // Get score emoji
  const getScoreEmoji = () => {
    const percentage = getScorePercentage();
    if (percentage === 100) return '🏆';
    if (percentage >= 80) return '🌟';
    if (percentage >= 60) return '👍';
    if (percentage >= 40) return '📚';
    return '💪';
  };

  const toggleQuiz = () => {
    setShowQuiz(!showQuiz);
    if (!showQuiz) {
      startQuiz();
    }
  };

  if (!showQuiz) {
    return (
      <div className="mt-8">
        <div className="text-center mb-6">
          <button
            onClick={toggleQuiz}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 
                       text-white font-bold text-xl rounded-2xl transition-all duration-300 transform hover:scale-105 
                       shadow-lg hover:shadow-xl border-2 border-purple-400"
          >
            🧠 Take the {species ? species.name : 'Reptile'} Quiz!
          </button>
          <p className="text-gray-600 mt-2">
            Test your knowledge and earn badges!
          </p>
        </div>
      </div>
    );
  }

  if (showResults) {
    const scoreInfo = getScoreMessage();
    
    return (
      <div className="mt-8">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
          <div className="text-center mb-8">
            <div className="text-8xl mb-4">{getScoreEmoji()}</div>
            <h3 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h3>
            <p className={`text-2xl font-semibold ${scoreInfo.color} mb-4`}>
              {scoreInfo.message}
            </p>
            
            <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
              <div className="text-6xl font-bold text-purple-600 mb-2">
                {score}/{totalQuestions}
              </div>
              <div className="text-xl text-gray-600">
                {getScorePercentage()}% Correct
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-1000"
                style={{ width: `${getScorePercentage()}%` }}
              ></div>
            </div>
            
            {/* Quiz History */}
            <div className="text-left bg-white rounded-xl p-4 shadow-lg mb-6">
              <h4 className="font-semibold text-gray-800 mb-3">Question Review:</h4>
              <div className="space-y-2">
                {quizHistory.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <span className={`text-lg ${item.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                      {item.isCorrect ? '✅' : '❌'}
                    </span>
                    <span className="text-sm text-gray-600 flex-1">
                      {item.question.length > 50 ? item.question.substring(0, 50) + '...' : item.question}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={restartQuiz}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl 
                         hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
            >
              🔄 Try Again
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-xl 
                         hover:bg-gray-700 transition-all duration-200 transform hover:scale-105"
            >
              🚪 Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuiz) {
    return (
      <div className="mt-8 text-center">
        <div className="animate-spin text-4xl mb-4">🔄</div>
        <p>Loading quiz...</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
        {/* Quiz Header */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            🧠 {species ? species.name : 'Reptile'} Knowledge Quiz
          </h3>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
            <span>Question {totalQuestions + 1} of 5</span>
            <span>•</span>
            <span>Score: {score}</span>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">
            {currentQuiz.question}
          </h4>
          
          {/* Answer Options */}
          <div className="space-y-3">
            {currentQuiz.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={isAnswered}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  isAnswered
                    ? index === currentQuiz.correctAnswer
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : index === selectedAnswer && index !== currentQuiz.correctAnswer
                      ? 'border-red-500 bg-red-50 text-red-800'
                      : 'border-gray-200 bg-gray-50 text-gray-600'
                    : selectedAnswer === index
                    ? 'border-purple-500 bg-purple-50 text-purple-800'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300 hover:bg-purple-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg font-semibold">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <span>{option}</span>
                  {isAnswered && index === currentQuiz.correctAnswer && (
                    <span className="text-green-500 text-xl">✅</span>
                  )}
                  {isAnswered && index === selectedAnswer && index !== currentQuiz.correctAnswer && (
                    <span className="text-red-500 text-xl">❌</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Answer Feedback */}
        {isAnswered && (
          <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
            <div className={`text-center p-4 rounded-lg ${
              selectedAnswer === currentQuiz.correctAnswer
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}>
              <h4 className={`font-semibold text-lg mb-2 ${
                selectedAnswer === currentQuiz.correctAnswer ? 'text-green-800' : 'text-red-800'
              }`}>
                {selectedAnswer === currentQuiz.correctAnswer ? 'Correct! 🎉' : 'Incorrect! 💡'}
              </h4>
              <p className="text-gray-700 mb-3">{currentQuiz.explanation}</p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-yellow-800 text-sm">{currentQuiz.funFact}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-center">
          {isAnswered ? (
            <button
              onClick={nextQuestion}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl 
                         hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
            >
              {totalQuestions >= 4 ? '🏁 See Results' : '➡️ Next Question'}
            </button>
          ) : (
            <div className="text-gray-500 text-center">
              <p>Select an answer to continue</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReptileQuiz;
