import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios'; // Importar axios
import { registerUser as register, loginUser as login } from '../api/apiClient';

const AuthContext = createContext(null);

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_URL || 'http://localhost:3000'; // Obtener URL del backend

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      setUser(userInfo);
    }
    setLoading(false);

    // Función para verificar el estado del backend
    const checkBackendStatus = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/health`);
        console.log('Backend Status:', response.data);
      } catch (error) {
        console.error('Error al conectar con el backend:', error);
      }
    };

    checkBackendStatus(); // Llamar a la función al cargar el componente
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
