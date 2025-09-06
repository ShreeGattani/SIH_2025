'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Award,
  Clock,
  MessageSquare,
  Plus,
  Eye,
  Edit,
  BarChart3,
  Calendar,
  Star
} from 'lucide-react';
import { SpaceButton } from '@/components/ui/SpaceButton';
import { SpaceCard } from '@/components/ui/SpaceComponents';
import { useAuth } from '@/app/layout';

/**
 * Teacher dashboard component
 * Features student management, progress tracking, and lesson creation
 */
export default function TeacherPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'lessons' | 'analytics'>('overview');

  // Mock teacher data
  const classroomStats = {
    totalStudents: 24,
    activeStudents: 18,
    completedLessons: 156,
    averageProgress: 67
  };

  const recentStudents = [
    { name: 'Alex Explorer', avatar: '🚀', progress: 85, lastActive: '2 hours ago', status: 'active' },
    { name: 'Luna Star', avatar: '🌟', progress: 72, lastActive: '1 day ago', status: 'active' },
    { name: 'Max Rocket', avatar: '🛸', progress: 45, lastActive: '3 days ago', status: 'inactive' },
    { name: 'Zoe Galaxy', avatar: '🌌', progress: 90, lastActive: '30 min ago', status: 'active' },
    { name: 'Sam Comet', avatar: '☄️', progress: 58, lastActive: '5 hours ago', status: 'active' }
  ];

  const lessons = [
    { 
      title: 'Solar System Basics', 
      subject: 'Science', 
      students: 24, 
      completed: 18, 
      avgScore: 87,
      status: 'published'
    },
    { 
      title: 'Rocket Physics', 
      subject: 'Physics', 
      students: 22, 
      completed: 15, 
      avgScore: 82,
      status: 'published'
    },
    { 
      title: 'Mars Mission Planning', 
      subject: 'Engineering', 
      students: 20, 
      completed: 8, 
      avgScore: 75,
      status: 'draft'
    }
  ];

  const announcements = [
    { message: 'New Space Science module available!', time: '2 hours ago', type: 'info' },
    { message: 'Alex Explorer completed all beginner lessons!', time: '1 day ago', type: 'achievement' },
    { message: 'Weekly progress report ready', time: '2 days ago', type: 'report' }
  ];

  if (!user || user.role !== 'teacher') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <SpaceCard>
          <div className="text-center py-8">
            <Users className="h-16 w-16 text-galaxy-gray mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-star-white mb-2">
              Teacher Access Required
            </h2>
            <p className="text-galaxy-gray mb-6">
              This area is for teachers only
            </p>
            <SpaceButton onClick={() => window.location.href = '/auth/login'}>
              Go to Login
            </SpaceButton>
          </div>
        </SpaceCard>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SpaceCard>
          <div className="text-center">
            <Users className="h-8 w-8 text-neon-green mx-auto mb-2" />
            <p className="text-2xl font-bold text-star-white">{classroomStats.totalStudents}</p>
            <p className="text-sm text-galaxy-gray">Total Students</p>
          </div>
        </SpaceCard>
        <SpaceCard>
          <div className="text-center">
            <TrendingUp className="h-8 w-8 text-cosmic-yellow mx-auto mb-2" />
            <p className="text-2xl font-bold text-star-white">{classroomStats.activeStudents}</p>
            <p className="text-sm text-galaxy-gray">Active Today</p>
          </div>
        </SpaceCard>
        <SpaceCard>
          <div className="text-center">
            <BookOpen className="h-8 w-8 text-light-purple mx-auto mb-2" />
            <p className="text-2xl font-bold text-star-white">{classroomStats.completedLessons}</p>
            <p className="text-sm text-galaxy-gray">Lessons Completed</p>
          </div>
        </SpaceCard>
        <SpaceCard>
          <div className="text-center">
            <Award className="h-8 w-8 text-neon-green mx-auto mb-2" />
            <p className="text-2xl font-bold text-star-white">{classroomStats.averageProgress}%</p>
            <p className="text-sm text-galaxy-gray">Avg Progress</p>
          </div>
        </SpaceCard>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Student Activity */}
        <SpaceCard>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-star-white">Recent Student Activity</h3>
            <SpaceButton size="sm" variant="outline">View All</SpaceButton>
          </div>
          <div className="space-y-3">
            {recentStudents.slice(0, 5).map((student, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-space-deep-blue/50">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{student.avatar}</div>
                  <div>
                    <p className="font-medium text-star-white">{student.name}</p>
                    <p className="text-sm text-galaxy-gray">{student.lastActive}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-neon-green font-medium">{student.progress}%</p>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    student.status === 'active' 
                      ? 'bg-neon-green/20 text-neon-green' 
                      : 'bg-galaxy-gray/20 text-galaxy-gray'
                  }`}>
                    {student.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SpaceCard>

        {/* Announcements */}
        <SpaceCard>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-star-white">Announcements</h3>
            <SpaceButton size="sm">
              <Plus className="h-4 w-4 mr-1" />
              New
            </SpaceButton>
          </div>
          <div className="space-y-3">
            {announcements.map((announcement, index) => (
              <div key={index} className="p-3 rounded-lg bg-space-deep-blue/50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-star-white text-sm">{announcement.message}</p>
                    <p className="text-xs text-galaxy-gray mt-1">{announcement.time}</p>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ml-2 ${
                    announcement.type === 'achievement' 
                      ? 'bg-cosmic-yellow/20 text-cosmic-yellow'
                      : announcement.type === 'report'
                      ? 'bg-light-purple/20 text-light-purple'
                      : 'bg-neon-green/20 text-neon-green'
                  }`}>
                    {announcement.type}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SpaceCard>
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-star-white">Student Management</h3>
        <div className="flex space-x-3">
          <SpaceButton variant="outline">Export Data</SpaceButton>
          <SpaceButton>
            <Plus className="h-4 w-4 mr-2" />
            Add Student
          </SpaceButton>
        </div>
      </div>

      <div className="grid gap-4">
        {recentStudents.map((student, index) => (
          <SpaceCard key={index}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{student.avatar}</div>
                <div>
                  <h4 className="font-bold text-star-white">{student.name}</h4>
                  <p className="text-sm text-galaxy-gray">Last active: {student.lastActive}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <p className="text-lg font-bold text-neon-green">{student.progress}%</p>
                  <p className="text-xs text-galaxy-gray">Progress</p>
                </div>
                
                <div className="flex space-x-2">
                  <SpaceButton size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </SpaceButton>
                  <SpaceButton size="sm" variant="outline">
                    <MessageSquare className="h-4 w-4" />
                  </SpaceButton>
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-space-deep-blue rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-neon-green to-cosmic-yellow h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${student.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
            </div>
          </SpaceCard>
        ))}
      </div>
    </div>
  );

  const renderLessons = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-star-white">Lesson Management</h3>
        <SpaceButton>
          <Plus className="h-4 w-4 mr-2" />
          Create Lesson
        </SpaceButton>
      </div>

      <div className="grid gap-4">
        {lessons.map((lesson, index) => (
          <SpaceCard key={index}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-bold text-star-white text-lg">{lesson.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    lesson.status === 'published' 
                      ? 'bg-neon-green/20 text-neon-green' 
                      : 'bg-cosmic-yellow/20 text-cosmic-yellow'
                  }`}>
                    {lesson.status}
                  </span>
                </div>
                <p className="text-galaxy-gray mb-3">{lesson.subject}</p>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-galaxy-gray">Students</p>
                    <p className="text-star-white font-medium">{lesson.students}</p>
                  </div>
                  <div>
                    <p className="text-galaxy-gray">Completed</p>
                    <p className="text-neon-green font-medium">{lesson.completed}/{lesson.students}</p>
                  </div>
                  <div>
                    <p className="text-galaxy-gray">Avg Score</p>
                    <p className="text-cosmic-yellow font-medium">{lesson.avgScore}%</p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2 ml-4">
                <SpaceButton size="sm" variant="outline">
                  <BarChart3 className="h-4 w-4" />
                </SpaceButton>
                <SpaceButton size="sm" variant="outline">
                  <Edit className="h-4 w-4" />
                </SpaceButton>
                <SpaceButton size="sm">
                  <Eye className="h-4 w-4" />
                </SpaceButton>
              </div>
            </div>
          </SpaceCard>
        ))}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-star-white">Analytics Dashboard</h3>
      
      <div className="grid lg:grid-cols-2 gap-6">
        <SpaceCard>
          <h4 className="text-xl font-bold text-star-white mb-4">Class Performance</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-galaxy-gray">Science</span>
              <span className="text-neon-green font-bold">85%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-galaxy-gray">Mathematics</span>
              <span className="text-cosmic-yellow font-bold">78%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-galaxy-gray">Technology</span>
              <span className="text-light-purple font-bold">72%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-galaxy-gray">Engineering</span>
              <span className="text-neon-green font-bold">80%</span>
            </div>
          </div>
        </SpaceCard>

        <SpaceCard>
          <h4 className="text-xl font-bold text-star-white mb-4">Recent Achievements</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Star className="h-5 w-5 text-cosmic-yellow" />
              <span className="text-star-white">5 students earned "Science Explorer"</span>
            </div>
            <div className="flex items-center space-x-3">
              <Star className="h-5 w-5 text-neon-green" />
              <span className="text-star-white">Class average improved by 12%</span>
            </div>
            <div className="flex items-center space-x-3">
              <Star className="h-5 w-5 text-light-purple" />
              <span className="text-star-white">3 new lesson completions today</span>
            </div>
          </div>
        </SpaceCard>
      </div>
    </div>
  );

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
          <h1 className="text-3xl md:text-4xl font-bold text-star-white mb-2">
            Teacher Dashboard 👩‍🚀
          </h1>
          <p className="text-galaxy-gray text-lg">
            Welcome back, {user.name}! Manage your space classroom.
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex space-x-1 bg-space-navy/50 p-1 rounded-lg">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'students', label: 'Students', icon: Users },
              { id: 'lessons', label: 'Lessons', icon: BookOpen },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple to-light-purple text-white'
                      : 'text-galaxy-gray hover:text-star-white hover:bg-purple/20'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'students' && renderStudents()}
          {activeTab === 'lessons' && renderLessons()}
          {activeTab === 'analytics' && renderAnalytics()}
        </motion.div>
      </div>
    </div>
  );
}
