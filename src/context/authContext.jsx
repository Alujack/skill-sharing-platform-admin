// context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { User, login, logout, register, getCurrentUser } from '../services/authService';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
 useEffect(() => {
  // This code only runs on the client side
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const userString = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const user_local = userString ? JSON.parse(userString) : null;
  
  if (token && user_local) {
    setUser(user_local);
  }
  setLoading(false);
}, []);

  const loginUser = async (email, password) => {
    const data = await login(email, password);
    localStorage.setItem('token', data.data.token);
    setUser(data.data.user);
    localStorage.setItem('user',JSON.stringify(data.data.user))
  };

  const registerUser = async ( email, password) => {
    const data = await register(email, password);
    setUser(data.data.user);
  };

  const logoutUser = async () => {
    await logout();
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, registerUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for easier use
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
