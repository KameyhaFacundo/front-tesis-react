import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { obtenerUsuarios } from '../api/usuarios';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar sesión al iniciar la app
  useEffect(() => {
    loadUserFromStorage();
  }, []);

  const loadUserFromStorage = async () => {
    try {
      const userData = await AsyncStorage.getItem('@user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error al cargar usuario:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Obtener usuarios del mock
      const usuarios = await obtenerUsuarios();

      // Buscar usuario
      const foundUser = usuarios.find(
        (u) => u.CorreoElectronico?.toLowerCase() === email.toLowerCase() &&
               u.Password === password
      );

      if (foundUser) {
        // Guardar en AsyncStorage
        await AsyncStorage.setItem('@user', JSON.stringify(foundUser));
        setUser(foundUser);
        return { success: true, user: foundUser };
      } else {
        return {
          success: false,
          error: 'Correo electrónico o contraseña incorrectos'
        };
      }
    } catch (error) {
      console.error('Error en login:', error);
      return {
        success: false,
        error: 'Error al intentar iniciar sesión'
      };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@user');
      setUser(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const updateUser = async (userData) => {
    try {
      await AsyncStorage.setItem('@user', JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
    }
  };

  // Helpers para verificar roles
  const isPCD = () => user?.Rol === 'Usuario' || user?.Rol === 'PCD';
  const isTutor = () => user?.Rol === 'Tutor';
  const isProfesional = () => user?.Rol === 'Profesional' || user?.Rol === 'Administrador';
  const isAdmin = () => user?.Rol === 'Administrador';

  const value = {
    user,
    loading,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
    isPCD,
    isTutor,
    isProfesional,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
};

export default AuthContext;
