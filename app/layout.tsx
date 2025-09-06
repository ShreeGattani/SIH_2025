'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/ui/Navbar';
import { AuthService, User } from '@/utils/auth';
import { registerServiceWorker } from '@/utils/pwa';
import './globals.css';

// Initialize Google Fonts
const inter = Inter({ subsets: ['latin'] });

// Create QueryClient for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Auth Context
interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  handleLogout: () => void;
  handleLoginSuccess: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize authentication state and PWA on mount
  useEffect(() => {
    // Check for existing user session
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);
    setIsLoading(false);

    // Register service worker for PWA functionality
    registerServiceWorker();

    // Add manifest link for PWA
    const link = document.createElement('link');
    link.rel = 'manifest';
    link.href = '/manifest.json';
    document.head.appendChild(link);

    // Add theme color meta tag
    const themeColor = document.createElement('meta');
    themeColor.name = 'theme-color';
    themeColor.content = '#6B46C1';
    document.head.appendChild(themeColor);

    // Cleanup function
    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
      if (document.head.contains(themeColor)) document.head.removeChild(themeColor);
    };
  }, []);

  // Handle user logout
  const handleLogout = () => {
    AuthService.logout();
    setUser(null);
    window.location.href = '/'; // Redirect to home
  };

  // Update user state when login occurs
  const handleLoginSuccess = (newUser: User) => {
    setUser(newUser);
  };

  if (isLoading) {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Space STEM Learning - A fun educational app for kids ages 6-12" />
          <title>Space STEM Learning</title>
        </head>
        <body className={inter.className}>
          <div className="min-h-screen space-bg flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4 animate-bounce">🚀</div>
              <p className="text-star-white text-lg">Launching Space STEM...</p>
            </div>
          </div>
        </body>
      </html>
    );
  }

  const authContextValue: AuthContextType = {
    user,
    setUser,
    handleLogout,
    handleLoginSuccess,
  };

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Space STEM Learning - A fun educational app for kids ages 6-12" />
        <meta name="keywords" content="education, kids, science, technology, engineering, math, space, learning" />
        <meta name="author" content="Space STEM Team" />
        
        {/* PWA Meta Tags */}
        <meta name="application-name" content="Space STEM" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Space STEM" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#6B46C1" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* Icons */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        <title>Space STEM Learning</title>
      </head>
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <AuthContext.Provider value={authContextValue}>
            <div className="min-h-screen space-bg">
              <Navbar user={user} onLogout={handleLogout} />
              <main>
                {children}
              </main>
            </div>
          </AuthContext.Provider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
