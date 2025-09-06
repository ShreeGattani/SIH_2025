'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Lock, Play, Trophy, Clock, Zap } from 'lucide-react';
import { Planet } from '@/utils/mockData';

interface PlanetCardProps {
  planet: Planet;
  onClick?: (planet: Planet) => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Interactive planet card component for the space map
 * Shows planet info, completion status, and handles click interactions
 */
export const PlanetCard: React.FC<PlanetCardProps> = ({
  planet,
  onClick,
  className = '',
  style
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate completion percentage
  const completedLessons = planet.lessons.filter(lesson => lesson.completed).length;
  const completionPercentage = (completedLessons / planet.lessons.length) * 100;

  // Determine card state and styling
  const isClickable = planet.unlocked;
  const isCompleted = planet.completed;
  const isLocked = !planet.unlocked;

  const handleClick = () => {
    if (isClickable && onClick) {
      onClick(planet);
    }
  };

  // Animation variants
  const cardVariants = {
    idle: { 
      scale: 1, 
      y: 0,
      rotate: 0 
    },
    hover: { 
      scale: isClickable ? 1.1 : 1,
      y: isClickable ? -10 : 0,
      rotate: isClickable ? Math.random() * 4 - 2 : 0 // Slight random rotation
    },
    tap: { 
      scale: isClickable ? 0.95 : 1 
    }
  };

  const getSubjectColor = () => {
    switch (planet.subject) {
      case 'science': return 'from-blue-500 to-cyan-500';
      case 'technology': return 'from-green-500 to-teal-500';
      case 'engineering': return 'from-purple-500 to-pink-500';
      case 'mathematics': return 'from-yellow-500 to-orange-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getDifficultyColor = () => {
    switch (planet.difficulty) {
      case 'beginner': return 'text-green-400 bg-green-400/20';
      case 'intermediate': return 'text-yellow-400 bg-yellow-400/20';
      case 'advanced': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <motion.div
      className={`absolute ${className}`}
      style={style}
      variants={cardVariants}
      initial="idle"
      whileHover="hover"
      whileTap="tap"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Planet Orbit Ring */}
      <motion.div
        className={`absolute inset-0 rounded-full border-2 ${
          isLocked 
            ? 'border-gray-600/30' 
            : isCompleted 
            ? 'border-neon-green/50' 
            : 'border-cosmic-yellow/50'
        }`}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ width: '120%', height: '120%', left: '-10%', top: '-10%' }}
      />

      {/* Main Planet Card */}
      <motion.div
        className={`
          relative w-32 h-32 rounded-full border-4 overflow-hidden cursor-pointer transition-all duration-300
          ${isLocked 
            ? 'border-gray-600 bg-gray-800 grayscale cursor-not-allowed' 
            : isCompleted 
            ? 'border-neon-green bg-gradient-to-br shadow-lg shadow-neon-green/20' 
            : 'border-cosmic-yellow bg-gradient-to-br shadow-lg shadow-cosmic-yellow/20'
          }
        `}
        style={{
          backgroundImage: isLocked 
            ? 'linear-gradient(135deg, #374151, #1f2937)' 
            : `linear-gradient(135deg, var(--tw-gradient-stops))`,
        }}
      >
        {/* Planet Surface Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%),
                               radial-gradient(circle at 70% 70%, rgba(0,0,0,0.2) 0%, transparent 30%)`
            }}
          />
        </div>

        {/* Planet Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className={`text-4xl ${isLocked ? 'opacity-50' : ''}`}
            animate={isHovered && !isLocked ? { 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            } : {}}
            transition={{ duration: 0.5 }}
          >
            {isLocked ? <Lock className="h-8 w-8 text-gray-400" /> : planet.icon}
          </motion.div>
        </div>

        {/* Completion Status */}
        {isCompleted && (
          <motion.div
            className="absolute top-2 right-2 bg-neon-green text-space-deep-blue rounded-full p-1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Trophy className="h-4 w-4" />
          </motion.div>
        )}

        {/* Lock Overlay */}
        {isLocked && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <Lock className="h-8 w-8 text-gray-400" />
          </div>
        )}

        {/* Progress Ring */}
        {!isLocked && (
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="3"
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke={isCompleted ? "#10F2C5" : "#FFD700"}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45}`}
              initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
              animate={{ 
                strokeDashoffset: 2 * Math.PI * 45 * (1 - completionPercentage / 100)
              }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </svg>
        )}
      </motion.div>

      {/* Planet Info Card (appears on hover) */}
      <motion.div
        className={`
          absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-64 p-4 
          bg-space-navy/95 backdrop-blur-sm border border-purple/30 rounded-xl 
          shadow-xl transition-all duration-300 z-10
          ${isHovered && !isLocked ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
        initial={{ opacity: 0, y: -10 }}
        animate={{ 
          opacity: isHovered && !isLocked ? 1 : 0, 
          y: isHovered && !isLocked ? 0 : -10 
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Arrow pointing to planet */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-space-navy/95 border-l border-t border-purple/30 rotate-45" />
        
        <div className="relative">
          {/* Planet Name & Subject */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold text-star-white text-lg">{planet.name}</h3>
              <p className="text-sm text-galaxy-gray capitalize">{planet.subject}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor()}`}>
              {planet.difficulty}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-galaxy-gray mb-3">{planet.description}</p>

          {/* Stats */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-cosmic-yellow" />
                <span className="text-galaxy-gray">Stars</span>
              </div>
              <span className="text-star-white font-medium">
                {planet.starsEarned}/{planet.totalStars}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-1">
                <Play className="h-4 w-4 text-neon-green" />
                <span className="text-galaxy-gray">Lessons</span>
              </div>
              <span className="text-star-white font-medium">
                {completedLessons}/{planet.lessons.length}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-1">
                <Zap className="h-4 w-4 text-cosmic-yellow" />
                <span className="text-galaxy-gray">XP Reward</span>
              </div>
              <span className="text-cosmic-yellow font-medium">+{planet.xpReward}</span>
            </div>
          </div>

          {/* Action Button */}
          <motion.button
            className={`
              w-full mt-3 py-2 px-4 rounded-lg font-medium transition-all duration-300
              ${isCompleted 
                ? 'bg-neon-green/20 text-neon-green border border-neon-green/30 hover:bg-neon-green hover:text-space-deep-blue' 
                : 'bg-cosmic-yellow/20 text-cosmic-yellow border border-cosmic-yellow/30 hover:bg-cosmic-yellow hover:text-space-deep-blue'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isCompleted ? 'Review Planet' : 'Explore Planet'}
          </motion.button>
        </div>
      </motion.div>

      {/* Floating Stars Animation */}
      {!isLocked && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-cosmic-yellow text-xs"
              style={{
                left: `${20 + i * 30}%`,
                top: `${10 + i * 20}%`,
              }}
              animate={isHovered ? {
                y: [0, -20, 0],
                opacity: [0.5, 1, 0.5],
                scale: [0.8, 1.2, 0.8]
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            >
              ⭐
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};
