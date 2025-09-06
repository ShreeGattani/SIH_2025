'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/components/auth/LoginForm';
import { useAuth } from '@/app/layout';
import { User } from '@/utils/auth';

/**
 * Login page component
 * Handles user authentication and redirects after successful login
 */
export default function LoginPage() {
  const router = useRouter();
  const { handleLoginSuccess } = useAuth();

  const onLoginSuccess = (user: User) => {
    handleLoginSuccess(user);
    
    // Redirect based on user role
    if (user.role === 'teacher') {
      router.push('/teacher');
    } else {
      router.push('/learn');
    }
  };

  return <LoginForm onLoginSuccess={onLoginSuccess} />;
}
