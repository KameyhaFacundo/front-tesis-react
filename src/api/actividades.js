// src/api/actividades.js

// Datos MOCK de actividades
const MOCK_ACTIVIDADES = [
  {
    ID: 1,
    Titulo: 'Tomar Ibuprofeno 400mg',
    Descripcion: 'Tomar después del desayuno con abundante agua',
    Tipo: 'medicine',
    Estado: 'pending',
    FechaInicio: '2024-01-15T09:00:00',
    FechaFin: '2024-01-15T09:30:00',
    UsuarioID: 4, // Ana Martínez
    AsignadoPorID: 3, // Dr. Carlos Ruiz
    AsignadoPor: 'Dr. Carlos Ruiz',
    Notas: 'Medicamento para el dolor muscular',
    Recordatorio: true,
    MinutosAntes: 15,
    // Datos específicos de medicamento
    NombreMedicamento: 'Ibuprofeno',
    Dosis: '400mg',
    Via: 'Oral',
    Frecuencia: 'Cada 8 horas',
  },
  {
    ID: 2,
    Titulo: 'Sesión de Fisioterapia',
    Descripcion: 'Ejercicios de rehabilitación motora con Lic. Martínez',
    Tipo: 'therapy',
    Estado: 'inProgress',
    FechaInicio: '2024-01-15T14:00:00',
    FechaFin: '2024-01-15T15:00:00',
    UsuarioID: 4, // Ana Martínez
    AsignadoPorID: 3, // Dr. Carlos Ruiz
    AsignadoPor: 'Dr. Carlos Ruiz',
    Notas: 'Enfocarse en movilidad de extremidades superiores',
    Recordatorio: true,
    MinutosAntes: 30,
    // Datos específicos de terapia
    TipoTerapia: 'Fisioterapia',
    Profesional: 'Lic. Martínez',
    Lugar: 'Centro de Rehabilitación Norte',
  },
  {
    ID: 3,
    Titulo: 'Ejercicios de Estiramiento',
    Descripcion: 'Rutina matutina de estiramiento de 15 minutos',
    Tipo: 'exercise',
    Estado: 'completed',
    FechaInicio: '2024-01-15T07:00:00',
    FechaFin: '2024-01-15T07:15:00',
    UsuarioID: 4, // Ana Martínez
    AsignadoPorID: 2, // María González (Tutor)
    AsignadoPor: 'María González',
    Notas: 'Completado exitosamente',
    Recordatorio: true,
    MinutosAntes: 10,
    // Datos específicos de ejercicio
    TipoEjercicio: 'Estiramiento',
    Duracion: '15 minutos',
    Intensidad: 'Baja',
  },
  {
    ID: 4,
    Titulo: 'Terapia Ocupacional',
    Descripcion: 'Actividades de desarrollo cognitivo',
    Tipo: 'therapy',
    Estado: 'pending',
    FechaInicio: '2024-01-15T10:00:00',
    FechaFin: '2024-01-15T11:00:00',
    UsuarioID: 5, // Laura Fernández
    AsignadoPorID: 7, // Sofía López (Psicóloga)
    AsignadoPor: 'Lic. Sofía López',
    Notas: 'Trabajar en habilidades de vida diaria',
    Recordatorio: true,
    MinutosAntes: 20,
    TipoTerapia: 'Terapia Ocupacional',
    Profesional: 'Lic. Sofía López',
    Lugar: 'Consultorio Privado',
  },
  {
    ID: 5,
    Titulo: 'Consulta Médica',
    Descripcion: 'Control mensual con médico de cabecera',
    Tipo: 'appointment',
    Estado: 'pending',
    FechaInicio: '2024-01-16T11:00:00',
    FechaFin: '2024-01-16T11:30:00',
    UsuarioID: 4, // Ana Martínez
    AsignadoPorID: 1, // Dr. Juan Pérez
    AsignadoPor: 'Dr. Juan Pérez',
    Notas: 'Traer últimos análisis de sangre',
    Recordatorio: true,
    MinutosAntes: 60,
    Profesional: 'Dr. Juan Pérez',
    Lugar: 'Hospital Central',
    Especialidad: 'Medicina General',
  },
  {
    ID: 6,
    Titulo: 'Caminata en el parque',
    Descripcion: 'Actividad física al aire libre',
    Tipo: 'exercise',
    Estado: 'pending',
    FechaInicio: '2024-01-15T16:00:00',
    FechaFin: '2024-01-15T16:30:00',
    UsuarioID: 5, // Laura Fernández
    AsignadoPorID: 6, // Roberto Sánchez (Tutor)
    AsignadoPor: 'Roberto Sánchez',
    Notas: 'Llevar agua y protector solar',
    Recordatorio: true,
    MinutosAntes: 15,
    TipoEjercicio: 'Caminata',
    Duracion: '30 minutos',
    Intensidad: 'Moderada',
  },
  {
    ID: 7,
    Titulo: 'Tomar Vitamina D',
    Descripcion: 'Suplemento vitamínico diario',
    Tipo: 'medicine',
    Estado: 'missed',
    FechaInicio: '2024-01-14T08:00:00',
    FechaFin: '2024-01-14T08:15:00',
    UsuarioID: 5, // Laura Fernández
    AsignadoPorID: 1, // Dr. Juan Pérez
    AsignadoPor: 'Dr. Juan Pérez',
    Notas: 'No se tomó ayer',
    Recordatorio: true,
    MinutosAntes: 10,
    NombreMedicamento: 'Vitamina D3',
    Dosis: '1000 UI',
    Via: 'Oral',
    Frecuencia: 'Diaria',
  },
];

export const obtenerActividades = async () => {
  console.log('Usando datos MOCK de actividades');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Actividades MOCK:', MOCK_ACTIVIDADES);
      resolve(MOCK_ACTIVIDADES);
    }, 500);
  });
};

export const obtenerActividadPorId = async (id) => {
  console.log('Obteniendo actividad por ID:', id);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const actividad = MOCK_ACTIVIDADES.find((a) => a.ID === id);
      if (actividad) {
        resolve(actividad);
      } else {
        reject(new Error('Actividad no encontrada'));
      }
    }, 300);
  });
};

export const obtenerActividadesPorUsuario = async (usuarioID) => {
  console.log('Obteniendo actividades del usuario:', usuarioID);
  return new Promise((resolve) => {
    setTimeout(() => {
      const actividades = MOCK_ACTIVIDADES.filter(
        (a) => a.UsuarioID === usuarioID
      );
      resolve(actividades);
    }, 300);
  });
};

export const obtenerActividadesPorFecha = async (fecha) => {
  console.log('Obteniendo actividades para la fecha:', fecha);
  return new Promise((resolve) => {
    setTimeout(() => {
      const actividades = MOCK_ACTIVIDADES.filter((a) => {
        const actividadFecha = new Date(a.FechaInicio).toISOString().split('T')[0];
        return actividadFecha === fecha;
      });
      resolve(actividades);
    }, 300);
  });
};

export const crearActividad = async (nuevaActividad) => {
  console.log('Creando nueva actividad:', nuevaActividad);
  return new Promise((resolve) => {
    setTimeout(() => {
      const nuevoID = Math.max(...MOCK_ACTIVIDADES.map((a) => a.ID)) + 1;
      const actividadConID = { ...nuevaActividad, ID: nuevoID };
      MOCK_ACTIVIDADES.push(actividadConID);
      console.log('Actividad creada:', actividadConID);
      resolve(actividadConID);
    }, 500);
  });
};

export const actualizarActividad = async (id, datosActualizados) => {
  console.log('Actualizando actividad:', id, datosActualizados);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = MOCK_ACTIVIDADES.findIndex((a) => a.ID === id);
      if (index !== -1) {
        MOCK_ACTIVIDADES[index] = {
          ...MOCK_ACTIVIDADES[index],
          ...datosActualizados,
        };
        console.log('Actividad actualizada:', MOCK_ACTIVIDADES[index]);
        resolve(MOCK_ACTIVIDADES[index]);
      } else {
        reject(new Error('Actividad no encontrada'));
      }
    }, 500);
  });
};

export const eliminarActividad = async (id) => {
  console.log('Eliminando actividad:', id);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = MOCK_ACTIVIDADES.findIndex((a) => a.ID === id);
      if (index !== -1) {
        const actividadEliminada = MOCK_ACTIVIDADES.splice(index, 1)[0];
        console.log('Actividad eliminada:', actividadEliminada);
        resolve(actividadEliminada);
      } else {
        reject(new Error('Actividad no encontrada'));
      }
    }, 500);
  });
};

export const marcarActividadCompletada = async (id) => {
  console.log('Marcando actividad como completada:', id);
  return actualizarActividad(id, { Estado: 'completed' });
};

export const marcarActividadPerdida = async (id) => {
  console.log('Marcando actividad como perdida:', id);
  return actualizarActividad(id, { Estado: 'missed' });
};

export const cambiarEstadoActividad = async (id, nuevoEstado) => {
  console.log('Cambiando estado de actividad:', id, 'a', nuevoEstado);
  return actualizarActividad(id, { Estado: nuevoEstado });
};
