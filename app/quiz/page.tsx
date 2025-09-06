'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Quiz } from '@/components/ui/Quiz';
import { Question, QuestionResult, mockQuestions } from '@/utils/questionTypes';
import { SpaceButton } from '@/components/ui/SpaceButton';
import { useAuth } from '@/app/layout';
import {
  BookOpen,
  Play,
  Star,
  Trophy,
  Clock,
  Target,
  Rocket,
  ArrowLeft,
  Zap
} from 'lucide-react';

/**
 * Quiz Demo Page - showcases the question/lesson system
 * Features multiple quiz options and progress tracking
 */
export default function QuizDemoPage() {
  const { user } = useAuth();
  const [activeQuiz, setActiveQuiz] = useState<Question[] | null>(null);
  const [quizTitle, setQuizTitle] = useState<string>('');
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);

  // Sample quiz sets
  const quizSets = [
    {
      id: 'space-basics',
      title: 'Space Basics',
      description: 'Test your knowledge of planets, stars, and space exploration',
      difficulty: 'Beginner',
      questions: mockQuestions,
      estimatedTime: '8 min',
      maxXP: mockQuestions.reduce((sum, q) => sum + q.xpReward, 0),
      icon: '🌍',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'rocket-science',
      title: 'Rocket Science',
      description: 'Learn about propulsion, trajectories, and space missions',
      difficulty: 'Intermediate',
      questions: [
        {
          id: 101,
          type: 'multiple-choice' as const,
          prompt: "What is the main principle behind rocket propulsion?",
          options: ["Newton's Third Law", "Bernoulli's Principle", "Conservation of Energy", "Gravity"],
          correctAnswer: 0,
          xpReward: 30,
          difficulty: 'medium' as const,
          subject: 'engineering' as const,
          explanation: "Newton's Third Law states that for every action, there's an equal and opposite reaction!"
        },
        {
          id: 102,
          type: 'short-answer' as const,
          prompt: "What is the escape velocity from Earth in km/s? (Round to nearest whole number)",
          correctAnswers: ['11', 'eleven'],
          answerType: 'number' as const,
          placeholder: "Enter velocity in km/s",
          xpReward: 40,
          difficulty: 'hard' as const,
          subject: 'mathematics' as const,
          explanation: "Earth's escape velocity is approximately 11.2 km/s - that's really fast!"
        },
        {
          id: 103,
          type: 'drag-drop' as const,
          prompt: "Match rocket components to their functions:",
          items: [
            { id: 'engine', content: '🚀 Engine', correctTargetId: 'target-propulsion' },
            { id: 'fuel-tank', content: '⛽ Fuel Tank', correctTargetId: 'target-storage' },
            { id: 'guidance', content: '🧭 Guidance System', correctTargetId: 'target-navigation' }
          ],
          targets: [
            { id: 'target-propulsion', content: 'Provides thrust', description: 'Creates the force to move the rocket' },
            { id: 'target-storage', content: 'Stores propellant', description: 'Holds fuel and oxidizer' },
            { id: 'target-navigation', content: 'Controls direction', description: 'Steers the rocket to its destination' }
          ],
          xpReward: 35,
          difficulty: 'medium' as const,
          subject: 'engineering' as const,
          explanation: "Rockets need all these components working together to reach space!"
        }
      ],
      estimatedTime: '6 min',
      maxXP: 105,
      icon: '🚀',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'space-math',
      title: 'Space Mathematics',
      description: 'Calculate distances, velocities, and orbital mechanics',
      difficulty: 'Advanced',
      questions: [
        {
          id: 201,
          type: 'short-answer' as const,
          prompt: "If light travels 300,000 km per second, how many minutes does it take to reach Earth from the Sun? (150 million km away)",
          correctAnswers: ['8.33', '8', '8.3'],
          answerType: 'number' as const,
          placeholder: "Enter time in minutes",
          xpReward: 50,
          difficulty: 'hard' as const,
          subject: 'mathematics' as const,
          explanation: "Light from the Sun takes about 8.33 minutes to reach Earth - that's why we see the Sun as it was 8 minutes ago!"
        },
        {
          id: 202,
          type: 'multiple-choice' as const,
          prompt: "What happens to gravitational force when the distance between two objects doubles?",
          options: ["It doubles", "It halves", "It becomes 1/4", "It stays the same"],
          correctAnswer: 2,
          xpReward: 45,
          difficulty: 'hard' as const,
          subject: 'mathematics' as const,
          explanation: "Gravitational force follows an inverse square law - double the distance, quarter the force!"
        }
      ],
      estimatedTime: '4 min',
      maxXP: 95,
      icon: '🔢',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const handleQuizStart = (quiz: typeof quizSets[0]) => {
    setActiveQuiz(quiz.questions);
    setQuizTitle(quiz.title);
  };

  const handleQuizComplete = (results: QuestionResult[], finalScore: number) => {
    // Mark quiz as completed
    const currentQuiz = quizSets.find(q => q.title === quizTitle);
    if (currentQuiz && !completedQuizzes.includes(currentQuiz.id)) {
      setCompletedQuizzes(prev => [...prev, currentQuiz.id]);
    }

    // In a real app, you'd save this to a database
    console.log('Quiz completed:', { results, finalScore, totalXP: results.reduce((sum, r) => sum + r.xpEarned, 0) });
  };

  const handleQuizExit = () => {
    setActiveQuiz(null);
    setQuizTitle('');
  };

  // If a quiz is active, render the Quiz component
  if (activeQuiz) {
    return (
      <Quiz
        questions={activeQuiz}
        title={quizTitle}
        description="Test your knowledge and earn XP!"
        onComplete={handleQuizComplete}
        onExit={handleQuizExit}
      />
    );
  }

  // Quiz selection page
  return (
    <div className="min-h-screen bg-space-deep-blue p-4">
      {/* Background Stars */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(80)].map((_, i) => (
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

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Rocket className="h-16 w-16 text-cosmic-yellow mx-auto" />
          </motion.div>

          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-cosmic-yellow via-neon-green to-purple bg-clip-text text-transparent">
            Space Academy Quizzes
          </h1>
          <p className="text-galaxy-gray text-lg lg:text-xl max-w-3xl mx-auto">
            Test your knowledge, earn XP, and become a true space explorer! 
            Choose from different difficulty levels and subjects.
          </p>

          {user && (
            <motion.div
              className="mt-6 flex items-center justify-center space-x-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-center">
                <p className="text-sm text-galaxy-gray">Quizzes Completed</p>
                <p className="text-2xl font-bold text-neon-green">{completedQuizzes.length}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-galaxy-gray">Current Level</p>
                <p className="text-2xl font-bold text-cosmic-yellow">Explorer</p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Navigation */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <SpaceButton onClick={() => window.history.back()}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </SpaceButton>
          
          <div className="hidden md:flex items-center space-x-4 text-sm text-galaxy-gray">
            <div className="flex items-center space-x-1">
              <BookOpen className="h-4 w-4" />
              <span>Interactive Questions</span>
            </div>
            <div className="flex items-center space-x-1">
              <Zap className="h-4 w-4" />
              <span>Instant Feedback</span>
            </div>
            <div className="flex items-center space-x-1">
              <Trophy className="h-4 w-4" />
              <span>XP Rewards</span>
            </div>
          </div>
        </motion.div>

        {/* Quiz Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {quizSets.map((quiz, index) => {
            const isCompleted = completedQuizzes.includes(quiz.id);
            
            return (
              <motion.div
                key={quiz.id}
                className="bg-space-navy/50 backdrop-blur-sm border border-purple/30 rounded-2xl p-6 hover:border-cosmic-yellow/50 transition-all duration-300 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                {/* Completed Badge */}
                {isCompleted && (
                  <motion.div
                    className="absolute top-4 right-4 bg-neon-green text-space-deep-blue rounded-full p-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Trophy className="h-4 w-4" />
                  </motion.div>
                )}

                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${quiz.color} opacity-5`} />

                <div className="relative">
                  {/* Quiz Icon */}
                  <div className="text-4xl mb-4">{quiz.icon}</div>

                  {/* Quiz Info */}
                  <h3 className="text-xl font-bold text-star-white mb-2">
                    {quiz.title}
                  </h3>
                  <p className="text-galaxy-gray text-sm mb-4">
                    {quiz.description}
                  </p>

                  {/* Quiz Stats */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Target className="h-4 w-4 text-galaxy-gray" />
                        <span className="text-galaxy-gray">Difficulty</span>
                      </div>
                      <span className={`font-medium ${
                        quiz.difficulty === 'Beginner' ? 'text-green-400' :
                        quiz.difficulty === 'Intermediate' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {quiz.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-galaxy-gray" />
                        <span className="text-galaxy-gray">Time</span>
                      </div>
                      <span className="text-star-white">{quiz.estimatedTime}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-cosmic-yellow" />
                        <span className="text-galaxy-gray">Max XP</span>
                      </div>
                      <span className="text-cosmic-yellow font-medium">{quiz.maxXP}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <BookOpen className="h-4 w-4 text-galaxy-gray" />
                        <span className="text-galaxy-gray">Questions</span>
                      </div>
                      <span className="text-star-white">{quiz.questions.length}</span>
                    </div>
                  </div>

                  {/* Start Button */}
                  <motion.button
                    onClick={() => handleQuizStart(quiz)}
                    className={`
                      w-full py-3 px-4 rounded-xl font-medium transition-all duration-300
                      ${isCompleted 
                        ? 'bg-neon-green/20 text-neon-green border border-neon-green/30 hover:bg-neon-green hover:text-space-deep-blue' 
                        : 'bg-cosmic-yellow/20 text-cosmic-yellow border border-cosmic-yellow/30 hover:bg-cosmic-yellow hover:text-space-deep-blue'
                      }
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Play className="h-4 w-4" />
                      <span>{isCompleted ? 'Retake Quiz' : 'Start Quiz'}</span>
                    </div>
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Features Section */}
        <motion.div
          className="bg-space-navy/30 backdrop-blur-sm border border-purple/20 rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-star-white mb-6 text-center">
            Quiz Features
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-neon-green/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="h-6 w-6 text-neon-green" />
              </div>
              <h3 className="font-bold text-star-white mb-2">Multiple Question Types</h3>
              <p className="text-sm text-galaxy-gray">
                Multiple choice, drag-and-drop matching, and short answer questions
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-cosmic-yellow/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="h-6 w-6 text-cosmic-yellow" />
              </div>
              <h3 className="font-bold text-star-white mb-2">Instant Feedback</h3>
              <p className="text-sm text-galaxy-gray">
                Get immediate results with fun animations and detailed explanations
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Trophy className="h-6 w-6 text-purple" />
              </div>
              <h3 className="font-bold text-star-white mb-2">XP & Progress</h3>
              <p className="text-sm text-galaxy-gray">
                Earn experience points and track your learning journey
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
