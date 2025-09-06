'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Play, 
  Star, 
  Trophy, 
  Clock,
  Microscope,
  Calculator,
  Cpu,
  Zap,
  ChevronRight,
  Lock
} from 'lucide-react';
import { SpaceButton } from '@/components/ui/SpaceButton';
import { SpaceCard } from '@/components/ui/SpaceComponents';
import { useAuth } from '@/app/layout';

/**
 * Main learning dashboard for students
 * Features course selection, progress tracking, and interactive lessons
 */
export default function LearnPage() {
  const { user } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

  // Mock learning data
  const subjects = [
    {
      id: 'science',
      title: 'Space Science',
      description: 'Explore planets, stars, and cosmic phenomena',
      icon: Microscope,
      color: 'from-purple to-light-purple',
      progress: 65,
      lessons: 12,
      completed: 8,
      difficulty: 'Beginner',
      nextLesson: 'The Solar System'
    },
    {
      id: 'technology',
      title: 'Space Tech',
      description: 'Learn about rockets, satellites, and space missions',
      icon: Cpu,
      color: 'from-neon-green to-bright-green',
      progress: 40,
      lessons: 10,
      completed: 4,
      difficulty: 'Beginner',
      nextLesson: 'How Rockets Work'
    },
    {
      id: 'engineering',
      title: 'Space Engineering',
      description: 'Design and build spacecraft and space stations',
      icon: Zap,
      color: 'from-cosmic-yellow to-neon-green',
      progress: 25,
      lessons: 15,
      completed: 4,
      difficulty: 'Intermediate',
      nextLesson: 'Building Space Stations'
    },
    {
      id: 'mathematics',
      title: 'Space Math',
      description: 'Calculate distances, orbits, and space trajectories',
      icon: Calculator,
      color: 'from-light-purple to-neon-green',
      progress: 80,
      lessons: 8,
      completed: 6,
      difficulty: 'Beginner',
      nextLesson: 'Orbital Mechanics'
    }
  ];

  const achievements = [
    { title: 'First Steps', description: 'Completed your first lesson', icon: '🚀', earned: true },
    { title: 'Science Explorer', description: 'Completed 5 science lessons', icon: '🔬', earned: true },
    { title: 'Math Master', description: 'Solved 10 math problems', icon: '🧮', earned: true },
    { title: 'Engineer', description: 'Built your first spacecraft', icon: '🛸', earned: false },
    { title: 'Astronaut', description: 'Complete all beginner courses', icon: '👨‍🚀', earned: false }
  ];

  const recentLessons = [
    { title: 'The Life Cycle of Stars', subject: 'Science', duration: '15 min', completed: true },
    { title: 'Adding with Alien Numbers', subject: 'Math', duration: '12 min', completed: true },
    { title: 'Programming Mars Rovers', subject: 'Technology', duration: '20 min', completed: false }
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <SpaceCard>
          <div className="text-center py-8">
            <Lock className="h-16 w-16 text-galaxy-gray mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-star-white mb-2">
              Access Required
            </h2>
            <p className="text-galaxy-gray mb-6">
              Please log in to access your learning dashboard
            </p>
            <SpaceButton onClick={() => window.location.href = '/auth/login'}>
              Go to Login
            </SpaceButton>
          </div>
        </SpaceCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold text-star-white mb-2">
                Welcome back, {user.name}! 🚀
              </h1>
              <p className="text-galaxy-gray text-lg">
                Ready to explore the universe of learning?
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <SpaceButton 
                onClick={() => window.location.href = '/space-map'}
                className="bg-gradient-to-r from-cosmic-yellow to-neon-green hover:from-neon-green hover:to-cosmic-yellow"
              >
                🗺️ Space Map
              </SpaceButton>
              <SpaceButton 
                onClick={() => window.location.href = '/quiz'}
                variant="outline"
                className="border-purple/30 text-purple hover:bg-purple/20"
              >
                🧠 Take Quiz
              </SpaceButton>
              <div className="hidden md:block">
                <SpaceCard className="text-center min-w-[150px]">
                  <div className="text-2xl mb-2">⭐</div>
                  <p className="text-sm text-galaxy-gray">Total XP</p>
                  <p className="text-2xl font-bold text-neon-green">2,450</p>
                </SpaceCard>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Subjects Grid */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-star-white mb-6">Your Courses</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {subjects.map((subject, index) => {
                  const Icon = subject.icon;
                  return (
                    <motion.div
                      key={subject.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <SpaceCard 
                        className="cursor-pointer h-full"
                        onClick={() => setSelectedSubject(subject.id)}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className={`p-3 rounded-lg bg-gradient-to-r ${subject.color}`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <span className="text-xs px-2 py-1 bg-galaxy-gray/20 rounded-full text-galaxy-gray">
                            {subject.difficulty}
                          </span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-star-white mb-2">
                          {subject.title}
                        </h3>
                        <p className="text-galaxy-gray text-sm mb-4">
                          {subject.description}
                        </p>
                        
                        {/* Progress Bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-galaxy-gray">Progress</span>
                            <span className="text-neon-green">{subject.progress}%</span>
                          </div>
                          <div className="w-full bg-space-deep-blue rounded-full h-2">
                            <motion.div
                              className="bg-gradient-to-r from-neon-green to-cosmic-yellow h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${subject.progress}%` }}
                              transition={{ duration: 1, delay: index * 0.2 }}
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-galaxy-gray">
                            {subject.completed}/{subject.lessons} lessons
                          </div>
                          <div className="flex items-center text-neon-green">
                            <span className="text-sm mr-1">Continue</span>
                            <ChevronRight className="h-4 w-4" />
                          </div>
                        </div>
                      </SpaceCard>
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>

            {/* Recent Lessons */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-star-white mb-6">Continue Learning</h2>
              <div className="space-y-4">
                {recentLessons.map((lesson, index) => (
                  <SpaceCard key={index} className="cursor-pointer">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-2 rounded-lg ${
                          lesson.completed 
                            ? 'bg-neon-green/20 text-neon-green' 
                            : 'bg-cosmic-yellow/20 text-cosmic-yellow'
                        }`}>
                          {lesson.completed ? '✓' : <Play className="h-4 w-4" />}
                        </div>
                        <div>
                          <h3 className="font-semibold text-star-white">{lesson.title}</h3>
                          <div className="flex items-center space-x-3 text-sm text-galaxy-gray">
                            <span>{lesson.subject}</span>
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{lesson.duration}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <SpaceButton size="sm" variant={lesson.completed ? "outline" : "primary"}>
                        {lesson.completed ? 'Review' : 'Start'}
                      </SpaceButton>
                    </div>
                  </SpaceCard>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <SpaceCard>
                <h3 className="text-xl font-bold text-star-white mb-4 flex items-center">
                  <Trophy className="h-5 w-5 text-cosmic-yellow mr-2" />
                  Achievements
                </h3>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index}
                      className={`flex items-center space-x-3 p-2 rounded-lg ${
                        achievement.earned 
                          ? 'bg-neon-green/10 border border-neon-green/30' 
                          : 'bg-galaxy-gray/10 border border-galaxy-gray/30'
                      }`}
                    >
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <p className={`font-medium ${
                          achievement.earned ? 'text-neon-green' : 'text-galaxy-gray'
                        }`}>
                          {achievement.title}
                        </p>
                        <p className="text-xs text-galaxy-gray">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </SpaceCard>
            </motion.section>

            {/* Quick Stats */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <SpaceCard>
                <h3 className="text-xl font-bold text-star-white mb-4 flex items-center">
                  <Star className="h-5 w-5 text-cosmic-yellow mr-2" />
                  Your Stats
                </h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-neon-green">18</p>
                    <p className="text-sm text-galaxy-gray">Lessons Completed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-cosmic-yellow">5</p>
                    <p className="text-sm text-galaxy-gray">Achievements</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-light-purple">7</p>
                    <p className="text-sm text-galaxy-gray">Day Streak</p>
                  </div>
                </div>
              </SpaceCard>
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  );
}
