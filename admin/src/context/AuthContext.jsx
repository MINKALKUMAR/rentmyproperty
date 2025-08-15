// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { login as apiLogin } from '../api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for token in localStorage when app loads
    const token = localStorage.getItem('token');
    if (token) {
      // You might want to verify the token here
      setUser({ email: 'admin@example.com' }); // Set user from token if needed
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await apiLogin(email, password);
      if (response.success && response.token) {
        localStorage.setItem('token', response.token);
        setUser({ email });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}