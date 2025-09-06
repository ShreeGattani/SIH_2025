'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Rocket, 
  Stars, 
  BookOpen, 
  Users, 
  GraduationCap, 
  Zap,
  Globe,
  Calculator,
  Microscope,
  Cpu
} from 'lucide-react';
import { SpaceButton } from '@/components/ui/SpaceButton';
import { SpaceCard } from '@/components/ui/SpaceComponents';
import { useAuth } from './layout';

/**
 * Main landing page component with space-themed hero section and features
 * Features animations, responsive design, and call-to-action buttons
 */
export default function HomePage() {
  const { user } = useAuth();

  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // STEM subjects data
  const stemSubjects = [
    {
      icon: Microscope,
      title: 'Science',
      description: 'Explore the universe, from atoms to galaxies!',
      color: 'from-purple to-light-purple'
    },
    {
      icon: Cpu,
      title: 'Technology',
      description: 'Build robots and learn coding with space missions!',
      color: 'from-neon-green to-bright-green'
    },
    {
      icon: Zap,
      title: 'Engineering',
      description: 'Design rockets and space stations!',
      color: 'from-cosmic-yellow to-neon-green'
    },
    {
      icon: Calculator,
      title: 'Mathematics',
      description: 'Calculate orbital paths and cosmic distances!',
      color: 'from-light-purple to-neon-green'
    }
  ];

  const features = [
    {
      icon: BookOpen,
      title: 'Interactive Lessons',
      description: 'Fun, engaging content designed for young minds'
    },
    {
      icon: Users,
      title: 'Safe Environment',
      description: 'Kid-friendly platform with teacher oversight'
    },
    {
      icon: Globe,
      title: 'Works Offline',
      description: 'Continue learning even without internet!'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {/* Floating planets */}
          <motion.div
            className="absolute top-20 left-10 w-16 h-16 bg-purple rounded-full opacity-20"
            animate={{ y: [0, -20, 0], rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-32 right-20 w-12 h-12 bg-cosmic-yellow rounded-full opacity-30"
            animate={{ y: [0, 15, 0], x: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-8 h-8 bg-neon-green rounded-full opacity-25"
            animate={{ y: [0, -10, 0], rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <motion.div
          className="relative z-10 text-center max-w-4xl mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main rocket animation */}
          <motion.div
            className="mb-8"
            variants={itemVariants}
          >
            <motion.div
              className="inline-block text-8xl mb-4"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              🚀
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-neon-green via-cosmic-yellow to-light-purple bg-clip-text text-transparent">
              Space STEM
            </span>
            <br />
            <span className="text-star-white">Adventure!</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-galaxy-gray mb-8 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Blast off into learning with fun space-themed STEM activities 
            designed for young explorers ages 6-12!
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={itemVariants}
          >
            {user ? (
              <Link href="/learn">
                <SpaceButton size="lg" className="text-lg px-8 py-4">
                  <BookOpen className="h-6 w-6 mr-2" />
                  Continue Mission
                </SpaceButton>
              </Link>
            ) : (
              <>
                <Link href="/auth/login">
                  <SpaceButton size="lg" className="text-lg px-8 py-4">
                    <Rocket className="h-6 w-6 mr-2" />
                    Start Learning
                  </SpaceButton>
                </Link>
                <Link href="/auth/login">
                  <SpaceButton variant="secondary" size="lg" className="text-lg px-8 py-4">
                    <GraduationCap className="h-6 w-6 mr-2" />
                    I'm a Teacher
                  </SpaceButton>
                </Link>
              </>
            )}
          </motion.div>
        </motion.div>

        {/* Floating stars */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-star-white"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{ 
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            >
              ⭐
            </motion.div>
          ))}
        </div>
      </section>

      {/* STEM Subjects Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-star-white mb-4">
              Explore the Universe of{' '}
              <span className="bg-gradient-to-r from-neon-green to-cosmic-yellow bg-clip-text text-transparent">
                STEM
              </span>
            </h2>
            <p className="text-xl text-galaxy-gray max-w-2xl mx-auto">
              Discover science, technology, engineering, and math through exciting space adventures!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stemSubjects.map((subject, index) => {
              const Icon = subject.icon;
              return (
                <motion.div
                  key={subject.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <SpaceCard className="text-center h-full">
                    <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${subject.color} mb-4`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-star-white mb-2">
                      {subject.title}
                    </h3>
                    <p className="text-galaxy-gray">
                      {subject.description}
                    </p>
                  </SpaceCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-star-white mb-4">
              Why Choose{' '}
              <span className="bg-gradient-to-r from-purple to-neon-green bg-clip-text text-transparent">
                Space STEM?
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <SpaceCard className="text-center">
                    <Icon className="h-12 w-12 text-neon-green mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-star-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-galaxy-gray">
                      {feature.description}
                    </p>
                  </SpaceCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SpaceCard>
              <div className="py-8">
                <motion.div
                  className="text-6xl mb-6"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  🌟
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold text-star-white mb-4">
                  Ready for Your Space Mission?
                </h2>
                <p className="text-xl text-galaxy-gray mb-8">
                  Join thousands of young explorers learning STEM through space adventures!
                </p>
                {!user && (
                  <Link href="/auth/login">
                    <SpaceButton size="lg" className="text-lg px-8 py-4">
                      <Stars className="h-6 w-6 mr-2" />
                      Launch Your Journey
                    </SpaceButton>
                  </Link>
                )}
              </div>
            </SpaceCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
