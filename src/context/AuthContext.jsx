import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../api/database';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await db.initializeDatabase();
        setLoading(false);
      } catch (error) {
        console.error('Error initializing:', error);
        setLoading(false);
      }
    };
    
    initializeApp();
  }, []);

  const login = async (idNumber, password) => {
    try {
      const userData = await db.login(idNumber, password);
      setUser(userData);
      return userData;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
