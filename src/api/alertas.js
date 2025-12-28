// src/api/alertas.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { calcularDistancia } from './ubicaciones';

// Alertas mock
const ALERTAS_MOCK = [
  {
    ID: 1,
    UsuarioID: 1, // Ana Martínez
    NombreUsuario: 'Ana Martínez',
    Tipo: 'zona_segura',
    Severidad: 'critica',
    Mensaje: 'Ana Martínez ha salido de la zona segura',
    Latitud: -34.6080,
    Longitud: -58.3900,
    DistanciaKm: 0.52,
    Timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // Hace 2 horas
    Estado: 'activa', // activa, resuelta, falsa_alarma
    TutorID: 3,
    Resuelta: false,
  },
];

let alertasActuales = [...ALERTAS_MOCK];

// Configuración de zonas seguras por usuario
const ZONAS_SEGURAS = {
  1: { // Ana Martínez
    latitud: -34.6037,
    longitud: -58.3816,
    radio: 500, // metros
    nombre: 'Casa de Ana'
  },
  2: { // Laura Fernández
    latitud: -34.6040,
    longitud: -58.3820,
    radio: 500,
    nombre: 'Centro de día'
  },
};

// Obtener todas las alertas
export const obtenerAlertas = async () => {
  console.log('Obteniendo alertas MOCK');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(alertasActuales);
    }, 300);
  });
};

// Obtener alertas activas (no resueltas)
export const obtenerAlertasActivas = async () => {
  console.log('Obteniendo alertas activas');
  return new Promise((resolve) => {
    setTimeout(() => {
      const activas = alertasActuales.filter(a => a.Estado === 'activa');
      resolve(activas);
    }, 300);
  });
};

// Obtener alertas de un tutor específico
export const obtenerAlertasPorTutor = async (tutorID) => {
  console.log('Obteniendo alertas del tutor:', tutorID);
  return new Promise((resolve) => {
    setTimeout(() => {
      const alertasTutor = alertasActuales.filter(a => a.TutorID === tutorID);
      resolve(alertasTutor);
    }, 300);
  });
};

// Obtener alertas activas de un tutor
export const obtenerAlertasActivasPorTutor = async (tutorID) => {
  console.log('Obteniendo alertas activas del tutor:', tutorID);
  return new Promise((resolve) => {
    setTimeout(() => {
      const alertasActivas = alertasActuales.filter(
        a => a.TutorID === tutorID && a.Estado === 'activa'
      );
      resolve(alertasActivas);
    }, 300);
  });
};

// Verificar si un usuario está fuera de zona segura
export const verificarZonaSegura = async (usuarioID, latitud, longitud) => {
  console.log('Verificando zona segura para usuario:', usuarioID);

  const zonaSegura = ZONAS_SEGURAS[usuarioID];
  if (!zonaSegura) {
    return { dentroDeLaZona: true, distancia: 0 };
  }

  const distanciaKm = calcularDistancia(
    zonaSegura.latitud,
    zonaSegura.longitud,
    latitud,
    longitud
  );

  const distanciaMetros = distanciaKm * 1000;
  const dentroDeLaZona = distanciaMetros <= zonaSegura.radio;

  return {
    dentroDeLaZona,
    distancia: distanciaKm,
    distanciaMetros,
    zonaSegura,
  };
};

// Crear una alerta de zona segura
export const crearAlertaZonaSegura = async (
  usuarioID,
  nombreUsuario,
  latitud,
  longitud,
  distanciaKm,
  tutorID
) => {
  console.log('Creando alerta de zona segura para:', nombreUsuario);

  return new Promise((resolve) => {
    setTimeout(() => {
      // Verificar si ya existe una alerta activa para este usuario
      const alertaExistente = alertasActuales.find(
        a => a.UsuarioID === usuarioID && a.Estado === 'activa' && a.Tipo === 'zona_segura'
      );

      if (alertaExistente) {
        // Actualizar la alerta existente
        alertaExistente.Latitud = latitud;
        alertaExistente.Longitud = longitud;
        alertaExistente.DistanciaKm = distanciaKm;
        alertaExistente.Timestamp = new Date().toISOString();
        resolve(alertaExistente);
      } else {
        // Crear nueva alerta
        const nuevaAlerta = {
          ID: Math.max(...alertasActuales.map(a => a.ID), 0) + 1,
          UsuarioID: usuarioID,
          NombreUsuario: nombreUsuario,
          Tipo: 'zona_segura',
          Severidad: 'critica',
          Mensaje: `${nombreUsuario} ha salido de la zona segura`,
          Latitud: latitud,
          Longitud: longitud,
          DistanciaKm: distanciaKm,
          Timestamp: new Date().toISOString(),
          Estado: 'activa',
          TutorID: tutorID,
          Resuelta: false,
        };
        alertasActuales.push(nuevaAlerta);
        resolve(nuevaAlerta);
      }
    }, 300);
  });
};

// Resolver una alerta (usuario volvió a zona segura)
export const resolverAlerta = async (alertaID) => {
  console.log('Resolviendo alerta:', alertaID);

  return new Promise((resolve) => {
    setTimeout(() => {
      const alerta = alertasActuales.find(a => a.ID === alertaID);
      if (alerta) {
        alerta.Estado = 'resuelta';
        alerta.Resuelta = true;
        alerta.FechaResolucion = new Date().toISOString();
      }
      resolve(alerta);
    }, 300);
  });
};

// Marcar alerta como falsa alarma
export const marcarFalsaAlarma = async (alertaID) => {
  console.log('Marcando como falsa alarma:', alertaID);

  return new Promise((resolve) => {
    setTimeout(() => {
      const alerta = alertasActuales.find(a => a.ID === alertaID);
      if (alerta) {
        alerta.Estado = 'falsa_alarma';
        alerta.Resuelta = true;
        alerta.FechaResolucion = new Date().toISOString();
      }
      resolve(alerta);
    }, 300);
  });
};

// Obtener configuración de zona segura de un usuario
export const obtenerZonaSegura = async (usuarioID) => {
  console.log('Obteniendo zona segura del usuario:', usuarioID);
  return new Promise((resolve) => {
    setTimeout(() => {
      const zona = ZONAS_SEGURAS[usuarioID] || null;
      resolve(zona);
    }, 200);
  });
};

// Actualizar configuración de zona segura
export const actualizarZonaSegura = async (usuarioID, latitud, longitud, radio, nombre) => {
  console.log('Actualizando zona segura del usuario:', usuarioID);
  return new Promise((resolve) => {
    setTimeout(() => {
      ZONAS_SEGURAS[usuarioID] = {
        latitud,
        longitud,
        radio,
        nombre,
      };
      resolve(ZONAS_SEGURAS[usuarioID]);
    }, 300);
  });
};

// Resolver automáticamente alertas cuando el usuario vuelve a zona segura
export const verificarYResolverAlertas = async (usuarioID, latitud, longitud) => {
  const verificacion = await verificarZonaSegura(usuarioID, latitud, longitud);

  if (verificacion.dentroDeLaZona) {
    // Resolver todas las alertas activas de zona segura para este usuario
    const alertasActivas = alertasActuales.filter(
      a => a.UsuarioID === usuarioID && a.Estado === 'activa' && a.Tipo === 'zona_segura'
    );

    for (const alerta of alertasActivas) {
      await resolverAlerta(alerta.ID);
    }

    return { resueltas: alertasActivas.length };
  }

  return { resueltas: 0 };
};

export default {
  obtenerAlertas,
  obtenerAlertasActivas,
  obtenerAlertasPorTutor,
  obtenerAlertasActivasPorTutor,
  verificarZonaSegura,
  crearAlertaZonaSegura,
  resolverAlerta,
  marcarFalsaAlarma,
  obtenerZonaSegura,
  actualizarZonaSegura,
  verificarYResolverAlertas,
};
