import { createContext, useContext, useState } from 'react';
import { currentUser } from '../data/mockData';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    user: null,
    isAuthenticated: false,
    isLoading: false,
  });

  const login = async (email, password) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo: Accept any credentials with the demo email
    if (email === 'admin@magicroastqoffee.com' && password === 'admin123') {
      setAuthState({
        user: currentUser,
        isAuthenticated: true,
        isLoading: false,
      });
      return true;
    }
    
    setAuthState(prev => ({ ...prev, isLoading: false }));
    return false;
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}