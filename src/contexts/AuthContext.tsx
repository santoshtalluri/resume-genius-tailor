
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '@/lib/types';
import { 
  verifyCredentials, 
  registerUser, 
  getUserById,
  getEmergencyAuthenticatedUser
} from '@/lib/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  emergencyAuth: () => void; // Development only
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Get saved authentication from session storage
const getSavedAuth = (): { user: User | null; token: string | null } => {
  const savedUser = sessionStorage.getItem('user');
  const savedToken = sessionStorage.getItem('token');
  
  return {
    user: savedUser ? JSON.parse(savedUser) : null,
    token: savedToken
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });
  
  // On mount, check for saved authentication
  useEffect(() => {
    const { user, token } = getSavedAuth();
    
    if (user && token) {
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);
  
  const login = async (email: string, password: string) => {
    try {
      const user = await verifyCredentials(email, password);
      
      // Create a simple token (would use JWT in production)
      const token = btoa(`${user.id}:${user.email}:${Date.now()}`);
      
      // Save to session storage
      sessionStorage.setItem('user', JSON.stringify(user));
      sessionStorage.setItem('token', token);
      
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      throw error;
    }
  };
  
  const register = async (username: string, email: string, password: string) => {
    try {
      await registerUser(username, email, password);
      // Don't auto-login since admin approval is required
    } catch (error) {
      throw error;
    }
  };
  
  const logout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  };
  
  // Development only - Emergency authentication
  const emergencyAuth = () => {
    try {
      const user = getEmergencyAuthenticatedUser();
      
      // Create a simple token
      const token = btoa(`${user.id}:${user.email}:${Date.now()}`);
      
      // Save to session storage
      sessionStorage.setItem('user', JSON.stringify(user));
      sessionStorage.setItem('token', token);
      
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      console.error('Emergency auth failed:', error);
    }
  };
  
  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
        emergencyAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
