// src/api/notificaciones.js
import { obtenerAlertasActivasPorTutor } from './alertas';

const MOCK_NOTIFICACIONES = [
  {
    ID: 1,
    Titulo: 'Recordatorio: Tomar Medicamento',
    Mensaje: 'Es hora de tomar Ibuprofeno 400mg',
    Tipo: 'reminder',
    Estado: 'no_leida',
    FechaCreacion: '2024-01-15T08:45:00',
    UsuarioID: 4,
    ActividadID: 1,
    Prioridad: 'alta',
  },
  {
    ID: 2,
    Titulo: 'Actividad Completada',
    Mensaje: 'Has completado: Ejercicios de Estiramiento',
    Tipo: 'success',
    Estado: 'leida',
    FechaCreacion: '2024-01-15T07:15:00',
    UsuarioID: 4,
    ActividadID: 3,
    Prioridad: 'normal',
  },
  {
    ID: 3,
    Titulo: 'Actividad Perdida',
    Mensaje: 'No tomaste Vitamina D ayer a las 08:00',
    Tipo: 'warning',
    Estado: 'no_leida',
    FechaCreacion: '2024-01-15T09:00:00',
    UsuarioID: 5,
    ActividadID: 7,
    Prioridad: 'media',
  },
  {
    ID: 4,
    Titulo: 'Próxima Cita Médica',
    Mensaje: 'Tienes consulta médica mañana a las 11:00',
    Tipo: 'info',
    Estado: 'no_leida',
    FechaCreacion: '2024-01-15T10:00:00',
    UsuarioID: 4,
    ActividadID: 5,
    Prioridad: 'alta',
  },
  {
    ID: 5,
    Titulo: 'Nueva Actividad Asignada',
    Mensaje: 'Dr. Carlos Ruiz te asignó: Sesión de Fisioterapia',
    Tipo: 'info',
    Estado: 'leida',
    FechaCreacion: '2024-01-14T16:30:00',
    UsuarioID: 4,
    ActividadID: 2,
    Prioridad: 'normal',
  },
  {
    ID: 6,
    Titulo: 'Reporte de Progreso Disponible',
    Mensaje: 'Dr. Juan Pérez creó un nuevo reporte sobre tu tratamiento',
    Tipo: 'success',
    Estado: 'no_leida',
    FechaCreacion: '2024-01-15T11:30:00',
    UsuarioID: 4,
    ReporteID: 1,
    Prioridad: 'media',
  },
  {
    ID: 7,
    Titulo: 'Recordatorio: Terapia Ocupacional',
    Mensaje: 'Tu sesión comienza en 20 minutos',
    Tipo: 'reminder',
    Estado: 'no_leida',
    FechaCreacion: '2024-01-15T09:40:00',
    UsuarioID: 5,
    ActividadID: 4,
    Prioridad: 'alta',
  },
  {
    ID: 8,
    Titulo: 'Cambio en Actividad',
    Mensaje: 'La caminata en el parque se reprogramó para las 16:00',
    Tipo: 'info',
    Estado: 'leida',
    FechaCreacion: '2024-01-14T14:00:00',
    UsuarioID: 5,
    ActividadID: 6,
    Prioridad: 'normal',
  },
];

export const obtenerNotificaciones = async () => {
  console.log('Obteniendo notificaciones MOCK');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_NOTIFICACIONES);
    }, 500);
  });
};

export const obtenerNotificacionesPorUsuario = async (usuarioID) => {
  console.log('Obteniendo notificaciones del usuario:', usuarioID);

  // Obtener notificaciones base
  let notificaciones = MOCK_NOTIFICACIONES.filter(
    (n) => n.UsuarioID === usuarioID
  );

  // Si es tutor (ID 3), agregar alertas de zona segura como notificaciones
  if (usuarioID === 3) {
    try {
      const alertas = await obtenerAlertasActivasPorTutor(usuarioID);

      // Convertir alertas a notificaciones
      const notificacionesAlertas = alertas.map((alerta) => ({
        ID: `alerta_${alerta.ID}`,
        Titulo: '🚨 Alerta de Zona Segura',
        Mensaje: alerta.Mensaje,
        Tipo: 'warning',
        Estado: 'no_leida',
        FechaCreacion: alerta.Timestamp,
        UsuarioID: usuarioID,
        AlertaID: alerta.ID,
        Prioridad: 'critica',
        EsAlerta: true,
      }));

      // Combinar notificaciones normales con alertas
      notificaciones = [...notificacionesAlertas, ...notificaciones];
    } catch (error) {
      console.error('Error obteniendo alertas:', error);
    }
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(notificaciones);
    }, 300);
  });
};

export const obtenerNotificacionesNoLeidas = async (usuarioID) => {
  console.log('Obteniendo notificaciones no leídas del usuario:', usuarioID);
  return new Promise((resolve) => {
    setTimeout(() => {
      const notificaciones = MOCK_NOTIFICACIONES.filter(
        (n) => n.UsuarioID === usuarioID && n.Estado === 'no_leida'
      );
      resolve(notificaciones);
    }, 300);
  });
};

export const marcarComoLeida = async (id) => {
  console.log('Marcando notificación como leída:', id);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = MOCK_NOTIFICACIONES.findIndex((n) => n.ID === id);
      if (index !== -1) {
        MOCK_NOTIFICACIONES[index].Estado = 'leida';
        resolve(MOCK_NOTIFICACIONES[index]);
      } else {
        reject(new Error('Notificación no encontrada'));
      }
    }, 300);
  });
};

export const marcarTodasComoLeidas = async (usuarioID) => {
  console.log('Marcando todas las notificaciones como leídas para usuario:', usuarioID);
  return new Promise((resolve) => {
    setTimeout(() => {
      MOCK_NOTIFICACIONES.forEach((notif) => {
        if (notif.UsuarioID === usuarioID) {
          notif.Estado = 'leida';
        }
      });
      resolve({ success: true });
    }, 500);
  });
};

export const eliminarNotificacion = async (id) => {
  console.log('Eliminando notificación:', id);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = MOCK_NOTIFICACIONES.findIndex((n) => n.ID === id);
      if (index !== -1) {
        const eliminada = MOCK_NOTIFICACIONES.splice(index, 1)[0];
        resolve(eliminada);
      } else {
        reject(new Error('Notificación no encontrada'));
      }
    }, 300);
  });
};

export const crearNotificacion = async (nuevaNotificacion) => {
  console.log('Creando nueva notificación:', nuevaNotificacion);
  return new Promise((resolve) => {
    setTimeout(() => {
      const nuevoID = Math.max(...MOCK_NOTIFICACIONES.map((n) => n.ID)) + 1;
      const notificacion = {
        ...nuevaNotificacion,
        ID: nuevoID,
        Estado: 'no_leida',
        FechaCreacion: new Date().toISOString(),
      };
      MOCK_NOTIFICACIONES.push(notificacion);
      resolve(notificacion);
    }, 300);
  });
};
