import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('userInfo');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/api/auth/me');
        setUser(data);
        localStorage.setItem('userInfo', JSON.stringify(data));
      } catch (error) {
        setUser(null);
        localStorage.removeItem('userInfo');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, []);

  const login = async (email, password) => {
    const { data } = await axios.post('/api/auth/login', { email, password });
    setUser(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
  };

  const register = async (firstName, lastName, location, email, password) => {
    const { data } = await axios.post('/api/auth/register', { firstName, lastName, location, email, password });
    setUser(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
  };

  const logout = async () => {
    await axios.post('/api/auth/logout');
    setUser(null);
    localStorage.removeItem('userInfo');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
