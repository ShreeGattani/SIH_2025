'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Settings, 
  Trophy, 
  BookOpen, 
  Clock,
  Star,
  Edit,
  Save,
  Mail,
  Calendar,
  Award,
  Target,
  Zap
} from 'lucide-react';
import { SpaceButton } from '@/components/ui/SpaceButton';
import { SpaceCard, SpaceInput } from '@/components/ui/SpaceComponents';
import { useAuth } from '@/app/layout';

/**
 * User profile page component
 * Features profile editing, achievements, and learning statistics
 */
export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    grade: user?.grade || user?.subject || '',
    favoriteSubject: 'Science'
  });

  // Mock profile statistics
  const stats = {
    totalLessons: 25,
    completedLessons: 18,
    totalXP: 2450,
    streak: 7,
    achievements: 8,
    rank: 'Space Cadet'
  };

  const achievements = [
    { 
      id: 1, 
      title: 'First Steps', 
      description: 'Completed your first lesson', 
      icon: '🚀', 
      earned: true, 
      date: '2024-01-15',
      xp: 50
    },
    { 
      id: 2, 
      title: 'Science Explorer', 
      description: 'Completed 5 science lessons', 
      icon: '🔬', 
      earned: true, 
      date: '2024-01-20',
      xp: 100
    },
    { 
      id: 3, 
      title: 'Math Master', 
      description: 'Solved 10 math problems correctly', 
      icon: '🧮', 
      earned: true, 
      date: '2024-01-25',
      xp: 150
    },
    { 
      id: 4, 
      title: 'Tech Wizard', 
      description: 'Completed 3 technology lessons', 
      icon: '💻', 
      earned: true, 
      date: '2024-02-01',
      xp: 120
    },
    { 
      id: 5, 
      title: 'Engineer', 
      description: 'Built your first spacecraft', 
      icon: '🛸', 
      earned: false, 
      date: null,
      xp: 200
    },
    { 
      id: 6, 
      title: 'Astronaut', 
      description: 'Complete all beginner courses', 
      icon: '👨‍🚀', 
      earned: false, 
      date: null,
      xp: 500
    }
  ];

  const recentActivity = [
    { activity: 'Completed "The Solar System" lesson', time: '2 hours ago', xp: 25 },
    { activity: 'Earned "Math Master" achievement', time: '1 day ago', xp: 150 },
    { activity: 'Started "Rocket Physics" course', time: '2 days ago', xp: 0 },
    { activity: 'Completed daily challenge', time: '3 days ago', xp: 50 }
  ];

  const handleSave = () => {
    // In a real app, you would save to backend
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      grade: user?.grade || user?.subject || '',
      favoriteSubject: 'Science'
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <SpaceCard>
          <div className="text-center py-8">
            <User className="h-16 w-16 text-galaxy-gray mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-star-white mb-2">
              Please Log In
            </h2>
            <p className="text-galaxy-gray mb-6">
              You need to be logged in to view your profile
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-star-white mb-2">
            My Profile 👤
          </h1>
          <p className="text-galaxy-gray text-lg">
            Manage your space explorer profile and view your achievements
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <SpaceCard>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-star-white">Profile Information</h2>
                  {!isEditing ? (
                    <SpaceButton 
                      variant="outline" 
                      size="sm"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </SpaceButton>
                  ) : (
                    <div className="flex space-x-2">
                      <SpaceButton 
                        variant="outline" 
                        size="sm"
                        onClick={handleCancel}
                      >
                        Cancel
                      </SpaceButton>
                      <SpaceButton 
                        size="sm"
                        onClick={handleSave}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </SpaceButton>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-6 mb-6">
                  <div className="text-6xl">{user.avatar}</div>
                  <div>
                    <h3 className="text-2xl font-bold text-star-white">{user.name}</h3>
                    <p className="text-neon-green">{stats.rank}</p>
                    <p className="text-galaxy-gray">{user.role === 'student' ? user.grade : user.subject}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <SpaceInput
                    label="Name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    disabled={!isEditing}
                  />
                  <SpaceInput
                    label="Email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    disabled={!isEditing}
                  />
                  <SpaceInput
                    label={user.role === 'student' ? 'Grade' : 'Subject'}
                    value={profileData.grade}
                    onChange={(e) => setProfileData({ ...profileData, grade: e.target.value })}
                    disabled={!isEditing}
                  />
                  <SpaceInput
                    label="Favorite Subject"
                    value={profileData.favoriteSubject}
                    onChange={(e) => setProfileData({ ...profileData, favoriteSubject: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </SpaceCard>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <SpaceCard>
                <h2 className="text-2xl font-bold text-star-white mb-6 flex items-center">
                  <Trophy className="h-6 w-6 text-cosmic-yellow mr-2" />
                  Achievements
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                        achievement.earned
                          ? 'bg-neon-green/10 border-neon-green/30'
                          : 'bg-galaxy-gray/10 border-galaxy-gray/30 grayscale'
                      }`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="text-3xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h4 className={`font-bold ${
                            achievement.earned ? 'text-neon-green' : 'text-galaxy-gray'
                          }`}>
                            {achievement.title}
                          </h4>
                          <p className="text-sm text-galaxy-gray mb-2">
                            {achievement.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              achievement.earned
                                ? 'bg-cosmic-yellow/20 text-cosmic-yellow'
                                : 'bg-galaxy-gray/20 text-galaxy-gray'
                            }`}>
                              {achievement.xp} XP
                            </span>
                            {achievement.earned && achievement.date && (
                              <span className="text-xs text-galaxy-gray">
                                {new Date(achievement.date).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </SpaceCard>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <SpaceCard>
                <h2 className="text-2xl font-bold text-star-white mb-6 flex items-center">
                  <Clock className="h-6 w-6 text-light-purple mr-2" />
                  Recent Activity
                </h2>
                <div className="space-y-3">
                  {recentActivity.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-space-deep-blue/50">
                      <div>
                        <p className="text-star-white">{item.activity}</p>
                        <p className="text-sm text-galaxy-gray">{item.time}</p>
                      </div>
                      {item.xp > 0 && (
                        <div className="text-cosmic-yellow font-bold">
                          +{item.xp} XP
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </SpaceCard>
            </motion.div>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <SpaceCard>
                <h3 className="text-xl font-bold text-star-white mb-4 flex items-center">
                  <Star className="h-5 w-5 text-cosmic-yellow mr-2" />
                  Your Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-cosmic-yellow" />
                      <span className="text-galaxy-gray">Total XP</span>
                    </div>
                    <span className="text-cosmic-yellow font-bold">{stats.totalXP}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <BookOpen className="h-4 w-4 text-neon-green" />
                      <span className="text-galaxy-gray">Lessons</span>
                    </div>
                    <span className="text-neon-green font-bold">
                      {stats.completedLessons}/{stats.totalLessons}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-light-purple" />
                      <span className="text-galaxy-gray">Streak</span>
                    </div>
                    <span className="text-light-purple font-bold">{stats.streak} days</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Award className="h-4 w-4 text-cosmic-yellow" />
                      <span className="text-galaxy-gray">Achievements</span>
                    </div>
                    <span className="text-cosmic-yellow font-bold">{stats.achievements}</span>
                  </div>
                </div>
              </SpaceCard>
            </motion.div>

            {/* Progress Ring */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <SpaceCard>
                <h3 className="text-xl font-bold text-star-white mb-4 text-center">
                  Course Progress
                </h3>
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32 mb-4">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#1E2A4A"
                        strokeWidth="3"
                      />
                      <motion.path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="3"
                        strokeDasharray={`${(stats.completedLessons / stats.totalLessons) * 100}, 100`}
                        initial={{ strokeDasharray: "0, 100" }}
                        animate={{ strokeDasharray: `${(stats.completedLessons / stats.totalLessons) * 100}, 100` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#10F2C5" />
                          <stop offset="100%" stopColor="#FFD700" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-neon-green">
                          {Math.round((stats.completedLessons / stats.totalLessons) * 100)}%
                        </div>
                        <div className="text-xs text-galaxy-gray">Complete</div>
                      </div>
                    </div>
                  </div>
                  <p className="text-center text-galaxy-gray">
                    {stats.completedLessons} of {stats.totalLessons} lessons completed
                  </p>
                </div>
              </SpaceCard>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
