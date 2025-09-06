'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Home, User, Settings, Menu, X } from 'lucide-react';
import { mockPlanets, mockStudentProgress, Planet, Lesson } from '@/utils/mockData';
import { PlanetCard } from '@/components/ui/PlanetCard';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { LessonPreview } from '@/components/ui/LessonPreview';

/**
 * Main space map dashboard for students
 * Shows gamified learning journey with planets as levels
 */
export default function SpaceMapDashboard() {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const handlePlanetClick = (planet: Planet) => {
    if (planet.unlocked) {
      setSelectedPlanet(planet);
    }
  };

  const handleBackToMap = () => {
    setSelectedPlanet(null);
  };

  const handleStartLesson = (lesson: Lesson) => {
    // In a real app, this would navigate to the lesson
    console.log('Starting lesson:', lesson.title);
    alert(`Starting lesson: ${lesson.title}`);
  };

  // Don't render the main map if a planet is selected
  if (selectedPlanet) {
    return (
      <LessonPreview
        planet={selectedPlanet}
        onBack={handleBackToMap}
        onStartLesson={handleStartLesson}
      />
    );
  }

  return (
    <div className="min-h-screen bg-space-deep-blue text-star-white overflow-hidden">
      {/* Animated Background Stars */}
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

      {/* Mobile Menu Button */}
      <motion.button
        className="fixed top-4 left-4 z-50 lg:hidden bg-space-navy/80 backdrop-blur-sm border border-purple/30 rounded-lg p-3"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </motion.button>

      {/* Sidebar */}
      <motion.div
        className={`fixed top-0 left-0 h-full w-80 bg-space-navy/90 backdrop-blur-sm border-r border-purple/30 z-40 transform transition-transform duration-300 ${
          showSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        initial={{ x: -320 }}
        animate={{ x: showSidebar ? 0 : -320 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cosmic-yellow to-neon-green rounded-full flex items-center justify-center">
                <Rocket className="h-6 w-6 text-space-deep-blue" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Space Explorer</h1>
                <p className="text-sm text-galaxy-gray">Level {mockStudentProgress.currentLevel}</p>
              </div>
            </div>

            {/* Progress Overview */}
            <ProgressBar 
              currentXP={mockStudentProgress.totalXP}
              xpToNextLevel={mockStudentProgress.xpToNextLevel}
              currentLevel={mockStudentProgress.currentLevel}
              totalPlanetsCompleted={mockStudentProgress.planetsCompleted}
              totalPlanets={mockStudentProgress.totalPlanets}
            />
          </div>

          {/* Mission Stats */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Mission Progress</h2>
            <div className="space-y-4">
              <div className="bg-space-deep-blue/50 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-galaxy-gray">Planets Explored</span>
                  <span className="text-neon-green font-bold">
                    {mockStudentProgress.planetsCompleted}/{mockStudentProgress.totalPlanets}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-neon-green h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(mockStudentProgress.planetsCompleted / mockStudentProgress.totalPlanets) * 100}%` }}
                  />
                </div>
              </div>

              <div className="bg-space-deep-blue/50 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-galaxy-gray">Total Stars</span>
                  <span className="text-cosmic-yellow font-bold">
                    {mockPlanets.reduce((sum, planet) => sum + planet.starsEarned, 0)}
                  </span>
                </div>
              </div>

              <div className="bg-space-deep-blue/50 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-galaxy-gray">Experience Points</span>
                  <span className="text-purple font-bold">{mockStudentProgress.totalXP} XP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Achievements */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Recent Achievements</h2>
            <div className="space-y-2">
              {mockStudentProgress.achievements
                .filter(a => a.earned)
                .slice(-3)
                .map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    className="flex items-center space-x-3 p-3 bg-space-deep-blue/50 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <p className="font-medium text-sm">{achievement.title}</p>
                      <p className="text-xs text-galaxy-gray">{achievement.earnedDate}</p>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-auto space-y-2">
            <motion.button
              className="w-full flex items-center space-x-3 p-3 rounded-lg text-left hover:bg-space-deep-blue/50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </motion.button>
            <motion.button
              className="w-full flex items-center space-x-3 p-3 rounded-lg text-left hover:bg-space-deep-blue/50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <User className="h-5 w-5" />
              <span>Profile</span>
            </motion.button>
            <motion.button
              className="w-full flex items-center space-x-3 p-3 rounded-lg text-left hover:bg-space-deep-blue/50 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Main Space Map */}
      <div className="lg:ml-80 relative">
        {/* Header */}
        <motion.div
          className="relative z-10 p-6 lg:p-8"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-cosmic-yellow via-neon-green to-purple bg-clip-text text-transparent">
              Your Space Journey
            </h1>
            <p className="text-galaxy-gray text-lg lg:text-xl max-w-2xl mx-auto">
              Explore planets, complete lessons, and become a space master! 
              Click on unlocked planets to start your adventure.
            </p>
          </div>
        </motion.div>

        {/* Space Map Container */}
        <div className="relative min-h-screen p-6 lg:p-8">
          {/* Planetary Orbit Paths */}
          <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
            <defs>
              <radialGradient id="orbitGradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255,215,0,0.1)" />
                <stop offset="100%" stopColor="rgba(255,215,0,0.05)" />
              </radialGradient>
            </defs>
            {[300, 450, 600, 750, 900].map((radius, i) => (
              <circle
                key={i}
                cx="50%"
                cy="50%"
                r={radius}
                fill="none"
                stroke="rgba(255,215,0,0.1)"
                strokeWidth="1"
                strokeDasharray="5,10"
              />
            ))}
          </svg>

          {/* Central Sun/Star */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full shadow-2xl"
            animate={{ 
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 30px rgba(255,215,0,0.5)",
                "0 0 50px rgba(255,215,0,0.8)",
                "0 0 30px rgba(255,215,0,0.5)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-300 to-transparent opacity-60" />
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white to-transparent opacity-30" />
          </motion.div>

          {/* Planet Cards */}
          {mockPlanets.map((planet, index) => (
            <PlanetCard
              key={planet.id}
              planet={planet}
              onClick={handlePlanetClick}
              style={{
                left: `${planet.position.x}%`,
                top: `${planet.position.y}%`,
              }}
              className="transform -translate-x-1/2 -translate-y-1/2"
            />
          ))}

          {/* Floating Learning Tips */}
          <motion.div
            className="absolute bottom-8 right-8 bg-space-navy/80 backdrop-blur-sm border border-purple/30 rounded-xl p-6 max-w-sm"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <h3 className="font-bold mb-2 text-cosmic-yellow">🚀 Explorer Tip</h3>
            <p className="text-sm text-galaxy-gray">
              Complete all lessons on a planet to unlock the next one! 
              Earn stars by doing well in each lesson.
            </p>
          </motion.div>

          {/* Progress Indicator */}
          <motion.div
            className="absolute top-8 right-8 bg-space-navy/80 backdrop-blur-sm border border-purple/30 rounded-xl p-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-center">
              <p className="text-sm text-galaxy-gray mb-1">Journey Progress</p>
              <p className="text-2xl font-bold text-neon-green">
                {Math.round((mockStudentProgress.planetsCompleted / mockStudentProgress.totalPlanets) * 100)}%
              </p>
            </div>
          </motion.div>

          {/* Shooting Stars Animation */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-star-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, 300],
                y: [0, 100],
                opacity: [0, 1, 0],
                scale: [0, 2, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 4 + Math.random() * 2,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Mobile overlay */}
      {showSidebar && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowSidebar(false)}
        />
      )}
    </div>
  );
}
