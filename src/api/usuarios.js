// src/api/profesionales.js
const API_URL = 'http://172.20.10.2:3000/api/users/users';

export const obtenerUsuarios = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Error al obtener usuarios');
  const data = await response.json();
  return data;
};
