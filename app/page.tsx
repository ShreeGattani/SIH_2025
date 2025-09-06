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
import './page.css';

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
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        {/* Animated background elements */}
        <div className="hero-background">
          {/* Floating planets */}
          <motion.div
            className="floating-planet floating-planet-1"
            animate={{ y: [0, -20, 0], rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="floating-planet floating-planet-2"
            animate={{ y: [0, 15, 0], x: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="floating-planet floating-planet-3"
            animate={{ y: [0, -10, 0], rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main rocket animation */}
          <motion.div
            className="rocket-container"
            variants={itemVariants}
          >
            <motion.div
              className="rocket-emoji"
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
            className="hero-title"
            variants={itemVariants}
          >
            <span className="hero-title-gradient">
              Space STEM
            </span>
            <br />
            <span className="hero-title-white">Adventure!</span>
          </motion.h1>

          <motion.p
            className="hero-description"
            variants={itemVariants}
          >
            Blast off into learning with fun space-themed STEM activities 
            designed for young explorers ages 6-12!
          </motion.p>

          <motion.div
            className="hero-buttons"
            variants={itemVariants}
          >
            {user ? (
              <Link href="/learn">
                <SpaceButton size="lg" className="text-lg px-10 py-5">
                  <BookOpen className="h-6 w-6 mr-3" />
                  Continue Mission
                </SpaceButton>
              </Link>
            ) : (
              <>
                <Link href="/auth/login">
                  <SpaceButton size="lg" className="text-lg px-10 py-5">
                    <Rocket className="h-6 w-6 mr-3" />
                    Start Learning
                  </SpaceButton>
                </Link>
                <Link href="/auth/login">
                  <SpaceButton variant="secondary" size="lg" className="text-lg px-10 py-5">
                    <GraduationCap className="h-6 w-6 mr-3" />
                    I'm a Teacher
                  </SpaceButton>
                </Link>
              </>
            )}
          </motion.div>
        </motion.div>

        {/* Floating stars */}
        <div className="floating-stars">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="star"
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
      <section className="stem-section">
        <div className="stem-container">
          <motion.div
            className="stem-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="stem-title">
              Explore the Universe of{' '}
              <span className="stem-title-gradient">
                STEM
              </span>
            </h2>
            <p className="stem-description">
              Discover science, technology, engineering, and math through exciting space adventures!
            </p>
          </motion.div>

          <div className="stem-grid">
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
                  <SpaceCard className="stem-card">
                    <div className={`stem-icon-container bg-gradient-to-r ${subject.color}`}>
                      <Icon className="stem-icon" />
                    </div>
                    <h3 className="stem-card-title">
                      {subject.title}
                    </h3>
                    <p className="stem-card-description">
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
      <section className="features-section">
        <div className="features-container">
          <motion.div
            className="features-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="features-title">
              Why Choose{' '}
              <span className="features-title-gradient">
                Space STEM?
              </span>
            </h2>
            <p className="features-description">
              Experience learning like never before with our innovative approach to STEM education
            </p>
          </motion.div>

          <div className="features-grid">
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
                  <SpaceCard className="feature-card">
                    <Icon className="feature-icon" />
                    <h3 className="feature-title">
                      {feature.title}
                    </h3>
                    <p className="feature-description">
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
      <section className="cta-section">
        <div className="cta-container">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SpaceCard className="cta-card">
              <div className="py-8">
                <motion.div
                  className="cta-emoji"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  🌟
                </motion.div>
                <h2 className="cta-title">
                  Ready for Your Space Mission?
                </h2>
                <p className="cta-description">
                  Join thousands of young explorers learning STEM through space adventures!
                </p>
                {!user && (
                  <Link href="/auth/login">
                    <SpaceButton size="lg" className="text-lg px-12 py-6">
                      <Stars className="h-6 w-6 mr-3" />
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
