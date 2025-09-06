// Authentication utility functions for mock authentication system
// In a real app, you'd replace this with proper authentication like Auth0, Firebase, etc.

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher';
  avatar?: string;
  grade?: string; // For students
  subject?: string; // For teachers
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alex Space Explorer',
    email: 'alex@spacestem.com',
    role: 'student',
    grade: '3rd Grade',
    avatar: '🚀'
  },
  {
    id: '2',
    name: 'Luna Star Student',
    email: 'luna@spacestem.com',
    role: 'student',
    grade: '4th Grade',
    avatar: '🌟'
  },
  {
    id: '3',
    name: 'Ms. Galaxy Teacher',
    email: 'galaxy@spacestem.com',
    role: 'teacher',
    subject: 'Science & Math',
    avatar: '👩‍🚀'
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class AuthService {
  // Mock login function
  static async login(email: string, password: string): Promise<User> {
    await delay(1000); // Simulate network delay
    
    const user = mockUsers.find(u => u.email === email);
    
    if (!user) {
      throw new Error('User not found');
    }
    
    // In a real app, you'd verify the password
    if (password.length < 3) {
      throw new Error('Invalid password');
    }
    
    // Store user in localStorage for persistence
    localStorage.setItem('space_stem_user', JSON.stringify(user));
    
    return user;
  }
  
  // Get current user from storage
  static getCurrentUser(): User | null {
    try {
      const stored = localStorage.getItem('space_stem_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }
  
  // Logout function
  static logout(): void {
    localStorage.removeItem('space_stem_user');
  }
  
  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
  
  // Get sample users for demo
  static getSampleUsers(): User[] {
    return mockUsers;
  }
}

// Role-based access control
export const requireAuth = (allowedRoles?: ('student' | 'teacher')[]): boolean => {
  const user = AuthService.getCurrentUser();
  
  if (!user) {
    return false;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return false;
  }
  
  return true;
};

// Format user display name
export const formatUserName = (user: User): string => {
  return `${user.avatar} ${user.name}`;
};
