// src/api/reportes.js

const MOCK_REPORTES = [
  {
    ID: 1,
    Titulo: 'Reporte Mensual de Rehabilitación',
    Descripcion: 'Evaluación del progreso en fisioterapia durante enero',
    FechaCreacion: '2024-01-14T10:00:00',
    UsuarioID: 4, // Ana Martínez
    ProfesionalID: 3, // Dr. Carlos Ruiz
    ProfesionalNombre: 'Dr. Carlos Ruiz',
    Tipo: 'Fisioterapia',
    Periodo: 'Enero 2024',
    Observaciones: 'La paciente muestra mejora significativa en la movilidad de extremidades superiores. Se recomienda continuar con la rutina actual y aumentar gradualmente la intensidad de los ejercicios.',
    Progreso: 75, // Porcentaje
    Objetivos: [
      {
        id: 1,
        descripcion: 'Mejorar movilidad de brazos',
        estado: 'completado',
        porcentaje: 90,
      },
      {
        id: 2,
        descripcion: 'Reducir dolor muscular',
        estado: 'en_progreso',
        porcentaje: 60,
      },
      {
        id: 3,
        descripcion: 'Incrementar fuerza',
        estado: 'pendiente',
        porcentaje: 30,
      },
    ],
    Adjuntos: [
      {
        id: 1,
        nombre: 'evaluacion_fisioterapia_enero.pdf',
        tipo: 'pdf',
        tamaño: '2.3 MB',
        fecha: '2024-01-14T10:00:00',
        url: 'mock://file1',
      },
      {
        id: 2,
        nombre: 'ejercicios_recomendados.jpg',
        tipo: 'image',
        tamaño: '1.1 MB',
        fecha: '2024-01-14T10:05:00',
        url: 'mock://file2',
      },
    ],
    RecomendacionesProximas: 'Continuar con sesiones 3 veces por semana. Agregar ejercicios de resistencia.',
  },
  {
    ID: 2,
    Titulo: 'Evaluación Psicológica Trimestral',
    Descripcion: 'Reporte de avance en terapia ocupacional',
    FechaCreacion: '2024-01-13T14:30:00',
    UsuarioID: 5, // Laura Fernández
    ProfesionalID: 7, // Sofía López
    ProfesionalNombre: 'Lic. Sofía López',
    Tipo: 'Psicología',
    Periodo: 'Enero 2024',
    Observaciones: 'Laura ha desarrollado excelentes habilidades sociales y muestra gran autonomía en actividades diarias. Su progreso es notable.',
    Progreso: 85,
    Objetivos: [
      {
        id: 1,
        descripcion: 'Mejorar habilidades sociales',
        estado: 'completado',
        porcentaje: 95,
      },
      {
        id: 2,
        descripcion: 'Desarrollar autonomía',
        estado: 'completado',
        porcentaje: 80,
      },
      {
        id: 3,
        descripcion: 'Fortalecer autoestima',
        estado: 'en_progreso',
        porcentaje: 70,
      },
    ],
    Adjuntos: [
      {
        id: 1,
        nombre: 'evaluacion_psicologica_trimestre1.pdf',
        tipo: 'pdf',
        tamaño: '1.8 MB',
        fecha: '2024-01-13T14:30:00',
        url: 'mock://file3',
      },
      {
        id: 2,
        nombre: 'actividades_realizadas.docx',
        tipo: 'document',
        tamaño: '850 KB',
        fecha: '2024-01-13T14:35:00',
        url: 'mock://file4',
      },
    ],
    RecomendacionesProximas: 'Continuar con el plan actual. Considerar incluir actividades grupales.',
  },
  {
    ID: 3,
    Titulo: 'Control Médico General',
    Descripcion: 'Chequeo médico mensual y análisis de resultados',
    FechaCreacion: '2024-01-12T11:00:00',
    UsuarioID: 4, // Ana Martínez
    ProfesionalID: 1, // Dr. Juan Pérez
    ProfesionalNombre: 'Dr. Juan Pérez',
    Tipo: 'Medicina General',
    Periodo: 'Enero 2024',
    Observaciones: 'Signos vitales normales. Análisis de sangre muestran mejora en valores inflamatorios. Tratamiento farmacológico funcionando correctamente.',
    Progreso: 80,
    Objetivos: [
      {
        id: 1,
        descripcion: 'Normalizar valores de laboratorio',
        estado: 'completado',
        porcentaje: 100,
      },
      {
        id: 2,
        descripcion: 'Reducir medicación',
        estado: 'en_progreso',
        porcentaje: 50,
      },
    ],
    Adjuntos: [
      {
        id: 1,
        nombre: 'analisis_sangre_enero.pdf',
        tipo: 'pdf',
        tamaño: '450 KB',
        fecha: '2024-01-12T11:00:00',
        url: 'mock://file5',
      },
      {
        id: 2,
        nombre: 'receta_medica.jpg',
        tipo: 'image',
        tamaño: '320 KB',
        fecha: '2024-01-12T11:10:00',
        url: 'mock://file6',
      },
      {
        id: 3,
        nombre: 'radiografia_control.jpg',
        tipo: 'image',
        tamaño: '2.5 MB',
        fecha: '2024-01-12T11:15:00',
        url: 'mock://file7',
      },
    ],
    RecomendacionesProximas: 'Mantener tratamiento actual. Próximo control en 30 días.',
  },
];

export const obtenerReportes = async () => {
  console.log('Obteniendo reportes MOCK');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_REPORTES);
    }, 500);
  });
};

export const obtenerReportesPorUsuario = async (usuarioID) => {
  console.log('Obteniendo reportes del usuario:', usuarioID);
  return new Promise((resolve) => {
    setTimeout(() => {
      const reportes = MOCK_REPORTES.filter((r) => r.UsuarioID === usuarioID);
      resolve(reportes);
    }, 300);
  });
};

export const obtenerReportePorId = async (id) => {
  console.log('Obteniendo reporte por ID:', id);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const reporte = MOCK_REPORTES.find((r) => r.ID === id);
      if (reporte) {
        resolve(reporte);
      } else {
        reject(new Error('Reporte no encontrado'));
      }
    }, 300);
  });
};

export const crearReporte = async (nuevoReporte) => {
  console.log('Creando nuevo reporte:', nuevoReporte);
  return new Promise((resolve) => {
    setTimeout(() => {
      const nuevoID = Math.max(...MOCK_REPORTES.map((r) => r.ID)) + 1;
      const reporte = {
        ...nuevoReporte,
        ID: nuevoID,
        FechaCreacion: new Date().toISOString(),
        Adjuntos: nuevoReporte.Adjuntos || [],
      };
      MOCK_REPORTES.push(reporte);
      console.log('Reporte creado:', reporte);
      resolve(reporte);
    }, 500);
  });
};

export const actualizarReporte = async (id, datosActualizados) => {
  console.log('Actualizando reporte:', id, datosActualizados);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = MOCK_REPORTES.findIndex((r) => r.ID === id);
      if (index !== -1) {
        MOCK_REPORTES[index] = {
          ...MOCK_REPORTES[index],
          ...datosActualizados,
        };
        console.log('Reporte actualizado:', MOCK_REPORTES[index]);
        resolve(MOCK_REPORTES[index]);
      } else {
        reject(new Error('Reporte no encontrado'));
      }
    }, 500);
  });
};

export const eliminarReporte = async (id) => {
  console.log('Eliminando reporte:', id);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = MOCK_REPORTES.findIndex((r) => r.ID === id);
      if (index !== -1) {
        const reporteEliminado = MOCK_REPORTES.splice(index, 1)[0];
        console.log('Reporte eliminado:', reporteEliminado);
        resolve(reporteEliminado);
      } else {
        reject(new Error('Reporte no encontrado'));
      }
    }, 500);
  });
};

// Función mock para simular descarga de adjunto
export const descargarAdjunto = async (adjunto) => {
  console.log('Simulando descarga de adjunto:', adjunto.nombre);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: `Archivo "${adjunto.nombre}" descargado (simulado)`,
      });
    }, 1000);
  });
};
