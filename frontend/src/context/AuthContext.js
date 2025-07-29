import React, { createContext, useState, useEffect, useContext } from 'react';
import { registerUser as register, loginUser as login } from '../api/apiClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      setUser(userInfo);
    }
    setLoading(false);
  }, []);

  const loginUser = async (email, password) => {
    const { data } = await login({ email, password });
    localStorage.setItem('userInfo', JSON.stringify(data));
    setUser(data);
  };

  const registerUser = async (name, email, password) => {
    const { data } = await register({ name, email, password });
    localStorage.setItem('userInfo', JSON.stringify(data));
    setUser(data);
  };

  const logoutUser = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logoutUser, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
