'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, BookOpen, GraduationCap, User, Rocket, LogOut } from 'lucide-react';
import { AuthService, User as UserType } from '@/utils/auth';
import './Navbar.css';

interface NavbarProps {
  user?: UserType | null;
  onLogout?: () => void;
}

/**
 * Main navigation component with space theme
 * Features responsive design, animations, and role-based navigation
 */
export const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const pathname = usePathname();

  // Navigation items based on user role
  const getNavItems = () => {
    const baseItems = [
      { href: '/', label: 'Home', icon: Home },
      { href: '/learn', label: 'Learn', icon: BookOpen },
    ];

    if (user?.role === 'teacher') {
      baseItems.push({ href: '/teacher', label: 'Teacher', icon: GraduationCap });
    }

    if (user) {
      baseItems.push({ href: '/profile', label: 'Profile', icon: User });
    }

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="navbar"
    >
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <Link href="/" className="navbar-logo">
            <motion.div
              className="navbar-logo-icon"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <Rocket className="h-10 w-10 text-neon-green" />
            </motion.div>
            <span className="navbar-logo-text">
              Space STEM
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="navbar-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    className={`navbar-nav-item ${isActive ? 'active' : ''}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="navbar-nav-icon" />
                    <span>{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* User Actions */}
          <div className="navbar-user-actions">
            {user ? (
              <div className="navbar-user-info">
                {/* User Avatar */}
                <div className="navbar-user-avatar">
                  <div className="text-3xl">{user.avatar}</div>
                  <div className="navbar-user-details">
                    <p className="navbar-user-name">{user.name}</p>
                    <p className="navbar-user-role">
                      {user.role === 'student' ? user.grade : user.subject}
                    </p>
                  </div>
                </div>
                
                {/* Logout Button */}
                <motion.button
                  onClick={onLogout}
                  className="navbar-logout-button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Logout"
                >
                  <LogOut className="navbar-logout-icon" />
                </motion.button>
              </div>
            ) : (
              <Link href="/auth/login">
                <motion.button
                  className="navbar-login-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login
                </motion.button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="navbar-mobile">
          <div className="navbar-mobile-nav">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    className={`navbar-mobile-nav-item ${isActive ? 'active' : ''}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="navbar-mobile-nav-icon" />
                    <span>{item.label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
