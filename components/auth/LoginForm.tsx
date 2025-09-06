'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Users, GraduationCap, Eye, EyeOff, Sparkles } from 'lucide-react';
import { SpaceButton } from '@/components/ui/SpaceButton';
import { SpaceCard, SpaceInput } from '@/components/ui/SpaceComponents';
import { AuthService, User } from '@/utils/auth';

interface LoginFormProps {
  onLoginSuccess: (user: User) => void;
}

/**
 * Interactive login form with role selection and sample users display
 * Features animations, form validation, and mock authentication
 */
export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [selectedRole, setSelectedRole] = useState<'student' | 'teacher'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Get sample users for demo
  const sampleUsers = AuthService.getSampleUsers();
  const roleUsers = sampleUsers.filter(user => user.role === selectedRole);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const user = await AuthService.login(email, password);
      onLoginSuccess(user);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const fillSampleUser = (user: User) => {
    setEmail(user.email);
    setPassword('demo123'); // Demo password
  };

  return (
    <div className="min-h-screen space-bg flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8">
        {/* Login Form */}
        <SpaceCard className="order-2 lg:order-1">
          <div className="text-center mb-8">
            <motion.div
              className="inline-block text-6xl mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Rocket className="h-16 w-16 text-neon-green mx-auto" />
            </motion.div>
            <h1 className="text-3xl font-bold text-star-white mb-2">
              Welcome to Space STEM!
            </h1>
            <p className="text-galaxy-gray">
              Choose your mission and blast off to learning!
            </p>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <p className="text-sm font-medium text-star-white mb-3">I am a...</p>
            <div className="grid grid-cols-2 gap-3">
              <motion.button
                onClick={() => setSelectedRole('student')}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  selectedRole === 'student'
                    ? 'border-neon-green bg-neon-green/10 text-neon-green'
                    : 'border-purple/30 text-galaxy-gray hover:border-purple/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Users className="h-6 w-6 mx-auto mb-2" />
                <span className="text-sm font-medium">Student</span>
              </motion.button>
              
              <motion.button
                onClick={() => setSelectedRole('teacher')}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  selectedRole === 'teacher'
                    ? 'border-neon-green bg-neon-green/10 text-neon-green'
                    : 'border-purple/30 text-galaxy-gray hover:border-purple/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <GraduationCap className="h-6 w-6 mx-auto mb-2" />
                <span className="text-sm font-medium">Teacher</span>
              </motion.button>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <SpaceInput
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="relative">
              <SpaceInput
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-galaxy-gray hover:text-neon-green transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {error && (
              <motion.div
                className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}

            <SpaceButton
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <motion.div
                    className="h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Launching...
                </div>
              ) : (
                'Launch Mission'
              )}
            </SpaceButton>
          </form>
        </SpaceCard>

        {/* Sample Users Demo */}
        <SpaceCard className="order-1 lg:order-2" hover={false}>
          <div className="text-center mb-6">
            <Sparkles className="h-8 w-8 text-cosmic-yellow mx-auto mb-3" />
            <h3 className="text-xl font-bold text-star-white mb-2">
              Try Demo {selectedRole === 'student' ? 'Students' : 'Teachers'}
            </h3>
            <p className="text-galaxy-gray text-sm">
              Click on any astronaut below to auto-fill the login form
            </p>
          </div>

          <div className="space-y-3">
            {roleUsers.map((user, index) => (
              <motion.div
                key={user.id}
                className="p-4 rounded-lg bg-space-deep-blue/50 border border-purple/20 cursor-pointer hover:border-neon-green/50 transition-all duration-300"
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(16, 242, 197, 0.05)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => fillSampleUser(user)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{user.avatar}</div>
                  <div className="flex-1">
                    <p className="font-medium text-star-white">{user.name}</p>
                    <p className="text-sm text-galaxy-gray">{user.email}</p>
                    <p className="text-xs text-neon-green">
                      {user.role === 'student' ? user.grade : user.subject}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-lg bg-cosmic-yellow/10 border border-cosmic-yellow/30">
            <p className="text-cosmic-yellow text-sm font-medium mb-1">
              🚀 Demo Info
            </p>
            <p className="text-galaxy-gray text-xs">
              Password for all demo accounts: <code className="text-neon-green">demo123</code>
            </p>
          </div>
        </SpaceCard>
      </div>
    </div>
  );
};
