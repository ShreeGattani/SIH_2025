'use client';

import React from 'react';
import { motion } from 'framer-motion';
import './SpaceButton.css';

interface SpaceButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Animated space-themed button component
 * Features hover effects, multiple variants, and accessibility support
 */
export const SpaceButton: React.FC<SpaceButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  type = 'button'
}) => {
  const buttonClasses = [
    'space-button',
    `space-button-${size}`,
    `space-button-${variant}`,
    disabled ? 'disabled' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};
