/**
 * @file auth_controller.js
 * @description React Context for authentication state management.
 * Provides global authentication state and methods to child components.
 * @author Claudia Wormley, Nathan Donat-Filliod, Daniel Cervantes, Davis Rosenstein, Fatimah Abdolcader
 * @version 1.0.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { checkLoginStatus, logout as performLogout } from './auth';

/**
 * Authentication context
 */
const AuthContext = createContext();

/**
 * AuthProvider component
 * Wraps application with authentication context
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /**
   * Check login status on component mount
   */
  useEffect(() => {
    const fetchStatus = async () => {
      const loggedIn = await checkLoginStatus();
      setIsLoggedIn(loggedIn);
    };

    fetchStatus();
  }, []);

  /**
   * Sets user to logged in state
   */
  const login = () => setIsLoggedIn(true);

  /**
   * Logs out user and clears authentication state
   */
  const logout = async () => {
    await performLogout();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to use authentication context
 * @returns {Object} Authentication context value
 */
export const useAuth = () => useContext(AuthContext);
