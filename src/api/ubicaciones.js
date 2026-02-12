// src/api/ubicaciones.js
import AsyncStorage from '@react-native-async-storage/async-storage';

// Ubicaciones mock de usuarios (coordenadas en Tucumán)
const UBICACIONES_MOCK = [
  {
    ID: 1,
    UsuarioID: 4, // Ana Martínez (PCD)
    Nombre: 'Ana Martínez',
    Latitud: -26.7554,
    Longitud: -65.0650,
    Timestamp: new Date().toISOString(),
    Direccion: 'En casa',
    Precision: 10,
    Estado: 'online',
  },
  {
    ID: 2,
    UsuarioID: 5, // Laura Fernández (PCD)
    Nombre: 'Laura Fernández',
    Latitud: -26.7594,
    Longitud: -65.0690,
    Timestamp: new Date().toISOString(),
    Direccion: 'Centro de día',
    Precision: 15,
    Estado: 'online',
  },
];

let ubicacionesActuales = [...UBICACIONES_MOCK];

// Obtener todas las ubicaciones
export const obtenerUbicaciones = async () => {
  console.log('Obteniendo ubicaciones MOCK');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(ubicacionesActuales);
    }, 300);
  });
};

// Obtener ubicación de un usuario específico
export const obtenerUbicacionUsuario = async (usuarioID) => {
  console.log('Obteniendo ubicación del usuario:', usuarioID);
  return new Promise((resolve) => {
    setTimeout(() => {
      const ubicacion = ubicacionesActuales.find((u) => u.UsuarioID === usuarioID);
      resolve(ubicacion || null);
    }, 300);
  });
};

// Actualizar ubicación de un usuario
export const actualizarUbicacion = async (usuarioID, latitud, longitud, direccion = null) => {
  console.log('Actualizando ubicación:', { usuarioID, latitud, longitud });
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = ubicacionesActuales.findIndex((u) => u.UsuarioID === usuarioID);

      const nuevaUbicacion = {
        ID: index !== -1 ? ubicacionesActuales[index].ID : ubicacionesActuales.length + 1,
        UsuarioID: usuarioID,
        Latitud: latitud,
        Longitud: longitud,
        Timestamp: new Date().toISOString(),
        Direccion: direccion || `${latitud.toFixed(4)}, ${longitud.toFixed(4)}`,
        Precision: 10,
        Estado: 'online',
      };

      if (index !== -1) {
        ubicacionesActuales[index] = nuevaUbicacion;
      } else {
        ubicacionesActuales.push(nuevaUbicacion);
      }

      // Guardar en AsyncStorage para persistencia
      AsyncStorage.setItem(
        `@ubicacion_${usuarioID}`,
        JSON.stringify(nuevaUbicacion)
      );

      resolve(nuevaUbicacion);
    }, 500);
  });
};

// Obtener historial de ubicaciones de un usuario
export const obtenerHistorialUbicaciones = async (usuarioID) => {
  console.log('Obteniendo historial de ubicaciones del usuario:', usuarioID);

  try {
    const historialGuardado = await AsyncStorage.getItem(`@historial_${usuarioID}`);
    if (historialGuardado) {
      return JSON.parse(historialGuardado);
    }
    return [];
  } catch (error) {
    console.error('Error al obtener historial:', error);
    return [];
  }
};

// Guardar ubicación en historial
export const guardarEnHistorial = async (usuarioID, ubicacion) => {
  try {
    const historial = await obtenerHistorialUbicaciones(usuarioID);
    historial.unshift(ubicacion); // Agregar al inicio

    // Mantener solo las últimas 50 ubicaciones
    const historialLimitado = historial.slice(0, 50);

    await AsyncStorage.setItem(
      `@historial_${usuarioID}`,
      JSON.stringify(historialLimitado)
    );

    return historialLimitado;
  } catch (error) {
    console.error('Error al guardar en historial:', error);
    return [];
  }
};

// Calcular distancia entre dos puntos (fórmula Haversine)
export const calcularDistancia = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radio de la Tierra en km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distancia = R * c;

  return distancia; // en kilómetros
};

// Verificar si un usuario está dentro de una zona segura
export const verificarZonaSegura = (latitud, longitud, zonaLat, zonaLon, radio = 0.5) => {
  const distancia = calcularDistancia(latitud, longitud, zonaLat, zonaLon);
  return {
    dentroDeZona: distancia <= radio,
    distancia: distancia,
  };
};
