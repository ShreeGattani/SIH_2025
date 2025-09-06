'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Trophy, Target } from 'lucide-react';

interface ProgressBarProps {
  currentXP: number;
  xpToNextLevel: number;
  currentLevel: number;
  totalPlanetsCompleted: number;
  totalPlanets: number;
  className?: string;
}

/**
 * Rocket fuel gauge style progress bar component
 * Shows XP progress, level, and completion stats with space theme
 */
export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentXP,
  xpToNextLevel,
  currentLevel,
  totalPlanetsCompleted,
  totalPlanets,
  className = ''
}) => {
  const progressPercentage = ((currentXP % 1000) / 1000) * 100; // Assuming 1000 XP per level
  const nextLevelXP = (currentLevel * 1000);
  const currentLevelXP = ((currentLevel - 1) * 1000);
  const xpInCurrentLevel = currentXP - currentLevelXP;
  
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header Stats */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-star-white flex items-center">
            <Zap className="h-6 w-6 text-cosmic-yellow mr-2" />
            Space Explorer Level {currentLevel}
          </h2>
          <p className="text-galaxy-gray">
            {totalPlanetsCompleted} of {totalPlanets} planets explored
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-cosmic-yellow">{currentXP.toLocaleString()}</p>
          <p className="text-sm text-galaxy-gray">Total XP</p>
        </div>
      </div>

      {/* Rocket Fuel Gauge */}
      <div className="relative">
        {/* Fuel Tank Container */}
        <div className="relative bg-space-navy/80 rounded-2xl p-6 border-2 border-purple/30">
          {/* Fuel Tank Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <motion.div
                className="text-2xl"
                animate={{ 
                  y: [0, -5, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                🚀
              </motion.div>
              <span className="text-lg font-bold text-star-white">Rocket Fuel</span>
            </div>
            <div className="text-sm text-galaxy-gray">
              {xpInCurrentLevel} / 1000 XP
            </div>
          </div>

          {/* Fuel Gauge */}
          <div className="relative h-8 bg-space-deep-blue rounded-full overflow-hidden border border-purple/20">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="h-full w-full" style={{
                backgroundImage: `repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 10px,
                  rgba(255,255,255,0.1) 10px,
                  rgba(255,255,255,0.1) 11px
                )`
              }} />
            </div>

            {/* Fuel Level */}
            <motion.div
              className="h-full bg-gradient-to-r from-neon-green via-cosmic-yellow to-neon-green relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              {/* Animated Fuel Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              />
              
              {/* Bubbles Effect */}
              <div className="absolute inset-0">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white/40 rounded-full"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: '50%',
                    }}
                    animate={{ 
                      y: [0, -10, 0],
                      opacity: [0.4, 0.8, 0.4],
                      scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{ 
                      duration: 1.5 + i * 0.2, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: i * 0.2
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Level Markers */}
            <div className="absolute inset-0 flex items-center">
              {[25, 50, 75].map((marker) => (
                <div 
                  key={marker}
                  className="absolute w-0.5 h-full bg-galaxy-gray/50"
                  style={{ left: `${marker}%` }}
                />
              ))}
            </div>
          </div>

          {/* XP to Next Level */}
          <div className="mt-3 flex items-center justify-between text-sm">
            <span className="text-galaxy-gray">Current Level Progress</span>
            <span className="text-neon-green font-medium">
              {xpToNextLevel} XP to Level {currentLevel + 1}
            </span>
          </div>
        </div>

        {/* Level Badge */}
        <motion.div
          className="absolute -top-3 -right-3 bg-gradient-to-r from-purple to-light-purple text-white px-4 py-2 rounded-full border-2 border-space-navy shadow-lg"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center space-x-1">
            <Trophy className="h-4 w-4" />
            <span className="font-bold">LVL {currentLevel}</span>
          </div>
        </motion.div>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div 
          className="text-center p-4 bg-space-navy/50 rounded-lg border border-purple/20"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-2xl mb-2">🌍</div>
          <p className="text-xl font-bold text-neon-green">{totalPlanetsCompleted}</p>
          <p className="text-xs text-galaxy-gray">Planets Explored</p>
        </motion.div>

        <motion.div 
          className="text-center p-4 bg-space-navy/50 rounded-lg border border-purple/20"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-2xl mb-2">⭐</div>
          <p className="text-xl font-bold text-cosmic-yellow">{Math.round(progressPercentage)}%</p>
          <p className="text-xs text-galaxy-gray">Level Progress</p>
        </motion.div>

        <motion.div 
          className="text-center p-4 bg-space-navy/50 rounded-lg border border-purple/20"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-2xl mb-2">🎯</div>
          <p className="text-xl font-bold text-light-purple">{totalPlanets - totalPlanetsCompleted}</p>
          <p className="text-xs text-galaxy-gray">Planets Left</p>
        </motion.div>
      </div>
    </div>
  );
};
