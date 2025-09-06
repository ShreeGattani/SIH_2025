'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '@/components/ui/Question';
import { 
  Question as QuestionType, 
  QuestionResult, 
  QuizState,
  mockQuestions 
} from '@/utils/questionTypes';
import { 
  Trophy, 
  Star, 
  Clock, 
  Target, 
  Rocket, 
  RotateCcw,
  Home,
  ChevronRight
} from 'lucide-react';

interface QuizProps {
  questions?: QuestionType[];
  title?: string;
  description?: string;
  onComplete?: (results: QuestionResult[], finalScore: number) => void;
  onExit?: () => void;
}

/**
 * Quiz component that manages a series of questions
 * Tracks progress, scores, and provides completion summary
 */
export const Quiz: React.FC<QuizProps> = ({
  questions = mockQuestions,
  title = "Space Explorer Quiz",
  description = "Test your knowledge of the cosmos!",
  onComplete,
  onExit
}) => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    totalQuestions: questions.length,
    score: 0,
    totalXP: 0,
    results: [],
    isComplete: false,
    startTime: Date.now()
  });

  const [showResults, setShowResults] = useState(false);

  const currentQuestion = questions[quizState.currentQuestionIndex];

  // Handle answer submission
  const handleAnswer = (result: QuestionResult) => {
    const newResults = [...quizState.results, result];
    const newScore = result.isCorrect ? quizState.score + 1 : quizState.score;
    const newTotalXP = quizState.totalXP + result.xpEarned;

    setQuizState(prev => ({
      ...prev,
      score: newScore,
      totalXP: newTotalXP,
      results: newResults
    }));

    // Move to next question or complete quiz
    setTimeout(() => {
      if (quizState.currentQuestionIndex + 1 >= questions.length) {
        setQuizState(prev => ({ ...prev, isComplete: true }));
        setShowResults(true);
        onComplete?.(newResults, newScore);
      } else {
        setQuizState(prev => ({
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1
        }));
      }
    }, 100);
  };

  // Calculate quiz statistics
  const getQuizStats = () => {
    const totalTime = Math.round((Date.now() - quizState.startTime) / 1000);
    const accuracy = Math.round((quizState.score / questions.length) * 100);
    const averageTime = Math.round(totalTime / questions.length);
    
    return { totalTime, accuracy, averageTime };
  };

  const getPerformanceMessage = () => {
    const accuracy = (quizState.score / questions.length) * 100;
    if (accuracy >= 90) return { message: "Outstanding! You're a true space explorer! 🚀", color: "text-neon-green" };
    if (accuracy >= 70) return { message: "Great job! You know your way around the cosmos! ⭐", color: "text-cosmic-yellow" };
    if (accuracy >= 50) return { message: "Not bad! Keep exploring to learn more! 🌟", color: "text-purple" };
    return { message: "Keep learning! Every explorer starts somewhere! 💫", color: "text-galaxy-gray" };
  };

  const restartQuiz = () => {
    setQuizState({
      currentQuestionIndex: 0,
      totalQuestions: questions.length,
      score: 0,
      totalXP: 0,
      results: [],
      isComplete: false,
      startTime: Date.now()
    });
    setShowResults(false);
  };

  // Quiz Introduction
  if (quizState.currentQuestionIndex === 0 && quizState.results.length === 0) {
    return (
      <div className="min-h-screen bg-space-deep-blue flex items-center justify-center p-4">
        {/* Background Stars */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-star-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <motion.div
          className="bg-space-navy/80 backdrop-blur-sm border border-purple/30 rounded-2xl p-8 max-w-2xl w-full text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <Rocket className="h-16 w-16 text-cosmic-yellow mx-auto" />
          </motion.div>

          <h1 className="text-4xl font-bold text-star-white mb-4 bg-gradient-to-r from-cosmic-yellow via-neon-green to-purple bg-clip-text text-transparent">
            {title}
          </h1>
          
          <p className="text-galaxy-gray text-lg mb-8">
            {description}
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-space-deep-blue/50 p-4 rounded-xl">
              <Target className="h-6 w-6 text-neon-green mx-auto mb-2" />
              <p className="text-sm text-galaxy-gray">Questions</p>
              <p className="text-xl font-bold text-star-white">{questions.length}</p>
            </div>
            <div className="bg-space-deep-blue/50 p-4 rounded-xl">
              <Star className="h-6 w-6 text-cosmic-yellow mx-auto mb-2" />
              <p className="text-sm text-galaxy-gray">Max XP</p>
              <p className="text-xl font-bold text-star-white">
                {questions.reduce((sum, q) => sum + q.xpReward, 0)}
              </p>
            </div>
            <div className="bg-space-deep-blue/50 p-4 rounded-xl">
              <Clock className="h-6 w-6 text-purple mx-auto mb-2" />
              <p className="text-sm text-galaxy-gray">Est. Time</p>
              <p className="text-xl font-bold text-star-white">{questions.length * 2} min</p>
            </div>
          </div>

          <motion.button
            onClick={() => setQuizState(prev => ({ ...prev, currentQuestionIndex: 0, startTime: Date.now() }))}
            className="w-full py-3 px-6 bg-gradient-to-r from-cosmic-yellow to-neon-green text-space-deep-blue font-bold rounded-xl hover:from-neon-green hover:to-cosmic-yellow transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Quiz 🚀
          </motion.button>

          {onExit && (
            <motion.button
              onClick={onExit}
              className="w-full mt-4 py-2 px-6 text-galaxy-gray hover:text-star-white transition-colors"
              whileHover={{ scale: 1.02 }}
            >
              ← Back to Dashboard
            </motion.button>
          )}
        </motion.div>
      </div>
    );
  }

  // Quiz Results
  if (showResults) {
    const stats = getQuizStats();
    const performance = getPerformanceMessage();

    return (
      <div className="min-h-screen bg-space-deep-blue p-4">
        {/* Background Stars */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-star-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 2 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Results Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="mb-6"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Trophy className="h-20 w-20 text-cosmic-yellow mx-auto" />
            </motion.div>

            <h1 className="text-4xl font-bold text-star-white mb-4">
              Quiz Complete! 🎉
            </h1>
            <p className={`text-xl ${performance.color} font-medium`}>
              {performance.message}
            </p>
          </motion.div>

          {/* Score Summary */}
          <motion.div
            className="grid md:grid-cols-4 gap-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-space-navy/50 backdrop-blur-sm border border-purple/30 rounded-xl p-6 text-center">
              <Target className="h-8 w-8 text-neon-green mx-auto mb-3" />
              <p className="text-2xl font-bold text-star-white">{quizState.score}/{questions.length}</p>
              <p className="text-sm text-galaxy-gray">Correct</p>
            </div>

            <div className="bg-space-navy/50 backdrop-blur-sm border border-purple/30 rounded-xl p-6 text-center">
              <Star className="h-8 w-8 text-cosmic-yellow mx-auto mb-3" />
              <p className="text-2xl font-bold text-star-white">{quizState.totalXP}</p>
              <p className="text-sm text-galaxy-gray">XP Earned</p>
            </div>

            <div className="bg-space-navy/50 backdrop-blur-sm border border-purple/30 rounded-xl p-6 text-center">
              <Trophy className="h-8 w-8 text-purple mx-auto mb-3" />
              <p className="text-2xl font-bold text-star-white">{stats.accuracy}%</p>
              <p className="text-sm text-galaxy-gray">Accuracy</p>
            </div>

            <div className="bg-space-navy/50 backdrop-blur-sm border border-purple/30 rounded-xl p-6 text-center">
              <Clock className="h-8 w-8 text-galaxy-gray mx-auto mb-3" />
              <p className="text-2xl font-bold text-star-white">{Math.floor(stats.totalTime / 60)}:{(stats.totalTime % 60).toString().padStart(2, '0')}</p>
              <p className="text-sm text-galaxy-gray">Total Time</p>
            </div>
          </motion.div>

          {/* Question Results */}
          <motion.div
            className="bg-space-navy/50 backdrop-blur-sm border border-purple/30 rounded-2xl p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-xl font-bold text-star-white mb-4">Question Results</h2>
            <div className="space-y-3">
              {quizState.results.map((result, index) => {
                const question = questions.find(q => q.id === result.questionId);
                return (
                  <div key={result.questionId} className="flex items-center justify-between p-3 bg-space-deep-blue/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        result.isCorrect ? 'bg-neon-green' : 'bg-red-400'
                      }`}>
                        {result.isCorrect ? '✓' : '✗'}
                      </div>
                      <div>
                        <p className="text-star-white font-medium">Question {index + 1}</p>
                        <p className="text-sm text-galaxy-gray truncate max-w-md">{question?.prompt}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className={result.isCorrect ? 'text-neon-green' : 'text-red-400'}>
                        +{result.xpEarned} XP
                      </span>
                      <span className="text-galaxy-gray">{result.timeSpent}s</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.button
              onClick={restartQuiz}
              className="flex items-center justify-center space-x-2 py-3 px-6 bg-gradient-to-r from-cosmic-yellow to-neon-green text-space-deep-blue font-bold rounded-xl hover:from-neon-green hover:to-cosmic-yellow transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RotateCcw className="h-5 w-5" />
              <span>Take Again</span>
            </motion.button>

            {onExit && (
              <motion.button
                onClick={onExit}
                className="flex items-center justify-center space-x-2 py-3 px-6 bg-space-navy/50 border border-purple/30 text-star-white rounded-xl hover:bg-purple/20 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Home className="h-5 w-5" />
                <span>Back to Dashboard</span>
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>
    );
  }

  // Active Quiz
  return (
    <div className="min-h-screen bg-space-deep-blue p-4">
      {/* Background Stars */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-star-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Quiz Header */}
      <motion.div
        className="max-w-4xl mx-auto mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-star-white">{title}</h1>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-galaxy-gray">Score</p>
              <p className="text-lg font-bold text-neon-green">{quizState.score}/{quizState.currentQuestionIndex}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-galaxy-gray">XP</p>
              <p className="text-lg font-bold text-cosmic-yellow">{quizState.totalXP}</p>
            </div>
            {onExit && (
              <motion.button
                onClick={onExit}
                className="text-galaxy-gray hover:text-star-white transition-colors"
                whileHover={{ scale: 1.1 }}
              >
                ✕
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Current Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={quizState.currentQuestionIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
        >
          <Question
            question={currentQuestion}
            onAnswer={handleAnswer}
            questionNumber={quizState.currentQuestionIndex + 1}
            totalQuestions={questions.length}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
