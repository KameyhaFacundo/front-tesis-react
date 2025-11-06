// src/api/profesionales.js
const API_URL = 'http://172.20.10.2:3000/api/users/users';

export const obtenerUsuarios = async () => {
  const response = await fetch(API_URL);
  console.log('Datos obtenidos de usuarios:', response);  
  if (!response.ok) throw new Error('Error al obtener usuarios');
  const data = await response.json();
  console.log('Datos de usuarios:', data);
  return data;
};
