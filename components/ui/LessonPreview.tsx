'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Play, Star, Clock, Zap, CheckCircle, 
  Lock, BookOpen, Target, Award, Users, TrendingUp 
} from 'lucide-react';
import { Planet, Lesson } from '@/utils/mockData';

interface LessonPreviewProps {
  planet: Planet;
  onBack: () => void;
  onStartLesson?: (lesson: Lesson) => void;
}

/**
 * Lesson preview page component
 * Shows detailed lesson content, progress, and start options
 */
export const LessonPreview: React.FC<LessonPreviewProps> = ({
  planet,
  onBack,
  onStartLesson
}) => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // Calculate planet statistics
  const completedLessons = planet.lessons.filter(l => l.completed).length;
  const totalStarsEarned = planet.lessons.reduce((sum, l) => sum + l.starsEarned, 0);
  const totalXP = planet.lessons.reduce((sum, l) => sum + (l.completed ? l.xpReward : 0), 0);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getSubjectGradient = () => {
    switch (planet.subject) {
      case 'science': return 'from-blue-500 to-cyan-500';
      case 'technology': return 'from-green-500 to-teal-500';
      case 'engineering': return 'from-purple-500 to-pink-500';
      case 'mathematics': return 'from-yellow-500 to-orange-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-space-deep-blue text-star-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-galaxy-gray hover:text-star-white transition-colors duration-300"
          >
            <ArrowLeft className="h-6 w-6" />
            <span>Back to Space Map</span>
          </button>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-galaxy-gray">Current XP</p>
              <p className="text-xl font-bold text-cosmic-yellow">{totalXP}</p>
            </div>
          </div>
        </motion.div>

        {/* Planet Header */}
        <motion.div
          className="bg-space-navy/50 backdrop-blur-sm border border-purple/30 rounded-2xl p-8 mb-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              {/* Planet Icon */}
              <motion.div
                className={`w-24 h-24 rounded-full bg-gradient-to-br ${getSubjectGradient()} flex items-center justify-center text-4xl border-4 border-cosmic-yellow/50 shadow-lg`}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {planet.icon}
              </motion.div>

              {/* Planet Info */}
              <div>
                <h1 className="text-4xl font-bold mb-2">{planet.name}</h1>
                <p className="text-galaxy-gray mb-4 max-w-md">{planet.description}</p>
                
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(planet.difficulty)}`}>
                    {planet.difficulty}
                  </span>
                  <span className="text-cosmic-yellow font-medium capitalize">{planet.subject}</span>
                </div>
              </div>
            </div>

            {/* Planet Stats */}
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-space-deep-blue/50 p-4 rounded-xl">
                <Star className="h-6 w-6 text-cosmic-yellow mx-auto mb-2" />
                <p className="text-2xl font-bold">{totalStarsEarned}</p>
                <p className="text-sm text-galaxy-gray">Stars Earned</p>
              </div>
              <div className="bg-space-deep-blue/50 p-4 rounded-xl">
                <BookOpen className="h-6 w-6 text-neon-green mx-auto mb-2" />
                <p className="text-2xl font-bold">{completedLessons}/{planet.lessons.length}</p>
                <p className="text-sm text-galaxy-gray">Lessons</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Lessons Grid */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {planet.lessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              className={`
                bg-space-navy/50 backdrop-blur-sm border rounded-xl p-6 cursor-pointer transition-all duration-300
                ${lesson.unlocked 
                  ? 'border-purple/30 hover:border-cosmic-yellow/50 hover:shadow-lg hover:shadow-cosmic-yellow/20' 
                  : 'border-gray-600/30 opacity-60 cursor-not-allowed'
                }
                ${lesson.completed ? 'ring-2 ring-neon-green/50' : ''}
              `}
              whileHover={lesson.unlocked ? { scale: 1.02, y: -5 } : {}}
              whileTap={lesson.unlocked ? { scale: 0.98 } : {}}
              onClick={() => lesson.unlocked && setSelectedLesson(lesson)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              {/* Lesson Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center text-xl
                    ${lesson.completed 
                      ? 'bg-neon-green text-space-deep-blue' 
                      : lesson.unlocked 
                      ? 'bg-cosmic-yellow text-space-deep-blue' 
                      : 'bg-gray-600 text-gray-400'
                    }
                  `}>
                    {lesson.completed ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : lesson.unlocked ? (
                      <Play className="h-6 w-6" />
                    ) : (
                      <Lock className="h-6 w-6" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{lesson.title}</h3>
                    <p className="text-sm text-galaxy-gray">Lesson {index + 1}</p>
                  </div>
                </div>

                {/* Lesson Status */}
                {lesson.completed && (
                  <div className="flex items-center space-x-1 text-neon-green">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">Complete</span>
                  </div>
                )}
              </div>

              {/* Lesson Description */}
              <p className="text-galaxy-gray text-sm mb-4 line-clamp-2">
                {lesson.description}
              </p>

              {/* Lesson Stats */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-galaxy-gray" />
                    <span className="text-galaxy-gray">Duration</span>
                  </div>
                  <span className="text-star-white">{lesson.duration} min</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-cosmic-yellow" />
                    <span className="text-galaxy-gray">Stars</span>
                  </div>
                  <span className="text-cosmic-yellow font-medium">
                    {lesson.starsEarned}/{lesson.maxStars}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Zap className="h-4 w-4 text-cosmic-yellow" />
                    <span className="text-galaxy-gray">XP Reward</span>
                  </div>
                  <span className="text-cosmic-yellow font-medium">+{lesson.xpReward}</span>
                </div>
              </div>

              {/* Progress Bar */}
              {lesson.unlocked && (
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-galaxy-gray mb-1">
                    <span>Progress</span>
                    <span>{lesson.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${
                        lesson.completed ? 'bg-neon-green' : 'bg-cosmic-yellow'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${lesson.progress}%` }}
                      transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                    />
                  </div>
                </div>
              )}

              {/* Action Button */}
              {lesson.unlocked && (
                <motion.button
                  className={`
                    w-full mt-4 py-2 px-4 rounded-lg font-medium transition-all duration-300
                    ${lesson.completed 
                      ? 'bg-neon-green/20 text-neon-green border border-neon-green/30 hover:bg-neon-green hover:text-space-deep-blue' 
                      : 'bg-cosmic-yellow/20 text-cosmic-yellow border border-cosmic-yellow/30 hover:bg-cosmic-yellow hover:text-space-deep-blue'
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onStartLesson?.(lesson);
                  }}
                >
                  {lesson.completed ? 'Review Lesson' : lesson.progress > 0 ? 'Continue' : 'Start Lesson'}
                </motion.button>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          className="mt-12 bg-space-navy/50 backdrop-blur-sm border border-purple/30 rounded-2xl p-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
            <Award className="h-6 w-6 text-cosmic-yellow" />
            <span>Planet Achievements</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Completion Achievement */}
            <div className={`
              p-4 rounded-xl border transition-all duration-300
              ${planet.completed 
                ? 'bg-neon-green/20 border-neon-green/50 text-neon-green' 
                : 'bg-gray-800/50 border-gray-600/30 text-gray-400'
              }
            `}>
              <div className="flex items-center space-x-3 mb-2">
                <Target className="h-6 w-6" />
                <span className="font-medium">Planet Master</span>
              </div>
              <p className="text-sm">Complete all lessons on this planet</p>
              <p className="text-xs mt-2">{completedLessons}/{planet.lessons.length} lessons completed</p>
            </div>

            {/* Star Achievement */}
            <div className={`
              p-4 rounded-xl border transition-all duration-300
              ${totalStarsEarned >= planet.totalStars 
                ? 'bg-cosmic-yellow/20 border-cosmic-yellow/50 text-cosmic-yellow' 
                : 'bg-gray-800/50 border-gray-600/30 text-gray-400'
              }
            `}>
              <div className="flex items-center space-x-3 mb-2">
                <Star className="h-6 w-6" />
                <span className="font-medium">Star Collector</span>
              </div>
              <p className="text-sm">Earn all stars on this planet</p>
              <p className="text-xs mt-2">{totalStarsEarned}/{planet.totalStars} stars earned</p>
            </div>

            {/* Speed Achievement */}
            <div className={`
              p-4 rounded-xl border transition-all duration-300
              ${planet.completed 
                ? 'bg-purple/20 border-purple/50 text-purple' 
                : 'bg-gray-800/50 border-gray-600/30 text-gray-400'
              }
            `}>
              <div className="flex items-center space-x-3 mb-2">
                <TrendingUp className="h-6 w-6" />
                <span className="font-medium">Speed Explorer</span>
              </div>
              <p className="text-sm">Complete planet within time limit</p>
              <p className="text-xs mt-2">Unlock faster navigation</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lesson Detail Modal */}
      {selectedLesson && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedLesson(null)}
        >
          <motion.div
            className="bg-space-navy border border-purple/30 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">{selectedLesson.title}</h3>
                <p className="text-galaxy-gray">{selectedLesson.description}</p>
              </div>
              <button
                onClick={() => setSelectedLesson(null)}
                className="text-galaxy-gray hover:text-star-white transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Lesson Content Preview */}
            <div className="space-y-4 mb-6">
              <h4 className="font-medium text-lg">What you'll learn:</h4>
              <ul className="space-y-2 text-galaxy-gray">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-neon-green flex-shrink-0 mt-0.5" />
                  <span>Interactive {planet.subject} concepts</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-neon-green flex-shrink-0 mt-0.5" />
                  <span>Hands-on activities and experiments</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-neon-green flex-shrink-0 mt-0.5" />
                  <span>Real-world applications</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-neon-green flex-shrink-0 mt-0.5" />
                  <span>Fun quizzes and challenges</span>
                </li>
              </ul>
            </div>

            <motion.button
              className="w-full py-3 px-6 bg-cosmic-yellow text-space-deep-blue font-bold rounded-lg hover:bg-cosmic-yellow/90 transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedLesson(null);
                onStartLesson?.(selectedLesson);
              }}
            >
              {selectedLesson.completed ? 'Review Lesson' : selectedLesson.progress > 0 ? 'Continue Lesson' : 'Start Lesson'}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};
