'use client';

import React from 'react';
import { motion } from 'framer-motion';
import './SpaceComponents.css';

interface SpaceCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
  onClick?: () => void;
}

/**
 * Reusable space-themed card component
 * Features glassmorphism effect, animations, and responsive design
 */
export const SpaceCard: React.FC<SpaceCardProps> = ({
  children,
  className = '',
  hover = true,
  delay = 0,
  onClick
}) => {
  const cardClasses = [
    'space-card',
    hover ? 'hover' : '',
    onClick ? 'clickable' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <motion.div
      className={cardClasses}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { scale: 1.02 } : {}}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

interface SpaceInputProps {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number';
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  error?: string;
}

/**
 * Space-themed input component with floating label effect
 */
export const SpaceInput: React.FC<SpaceInputProps> = ({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  required = false,
  disabled = false,
  className = '',
  error
}) => {
  const inputClasses = [
    'space-input',
    error ? 'error' : '',
    disabled ? 'disabled' : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={`space-input-container ${className}`}>
      {label && (
        <label className={`space-input-label ${required ? 'required' : ''}`}>
          {label}
        </label>
      )}
      <motion.input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={inputClasses}
        whileFocus={{ scale: 1.02 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      />
      {error && (
        <motion.p
          className="space-input-error"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};
