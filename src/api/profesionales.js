// src/api/profesionales.js

// Datos mock de profesionales
const MOCK_PROFESIONALES = [
  {
    ID: 1,
    Nombre: 'Dr. Carlos',
    Apellido: 'García',
    Especialidad: 'Fisioterapia',
    CorreoElectronico: 'carlos.garcia@hospital.com',
    Telefono: '11-2345-6789',
    Matricula: 'FT-12345',
    Domicilio: 'Av. Corrientes 1234',
    FechaNacimiento: '1980-05-15',
    Estado: 'activo',
  },
  {
    ID: 2,
    Nombre: 'Dra. María',
    Apellido: 'López',
    Especialidad: 'Terapia Ocupacional',
    CorreoElectronico: 'maria.lopez@centro.com',
    Telefono: '11-3456-7890',
    Matricula: 'TO-54321',
    Domicilio: 'Av. Santa Fe 5678',
    FechaNacimiento: '1985-08-22',
    Estado: 'activo',
  },
  {
    ID: 3,
    Nombre: 'Lic. Juan',
    Apellido: 'Martínez',
    Especialidad: 'Psicología',
    CorreoElectronico: 'juan.martinez@clinica.com',
    Telefono: '11-4567-8901',
    Matricula: 'PS-98765',
    Domicilio: 'Av. Cabildo 9012',
    FechaNacimiento: '1978-03-10',
    Estado: 'activo',
  },
  {
    ID: 4,
    Nombre: 'Dra. Ana',
    Apellido: 'Fernández',
    Especialidad: 'Fonoaudiología',
    CorreoElectronico: 'ana.fernandez@centro.com',
    Telefono: '11-5678-9012',
    Matricula: 'FO-11223',
    Domicilio: 'Av. Rivadavia 3456',
    FechaNacimiento: '1990-11-30',
    Estado: 'activo',
  },
  {
    ID: 5,
    Nombre: 'Dr. Pedro',
    Apellido: 'Rodríguez',
    Especialidad: 'Medicina General',
    CorreoElectronico: 'pedro.rodriguez@hospital.com',
    Telefono: '11-6789-0123',
    Matricula: 'MG-33445',
    Domicilio: 'Av. Belgrano 7890',
    FechaNacimiento: '1975-07-18',
    Estado: 'inactivo',
  },
];

let profesionalesActuales = [...MOCK_PROFESIONALES];

// Obtener todos los profesionales
export const obtenerProfesionales = async () => {
  console.log('Obteniendo profesionales MOCK');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(profesionalesActuales);
    }, 500);
  });
};

// Obtener profesional por ID
export const obtenerProfesionalPorId = async (id) => {
  console.log('Obteniendo profesional por ID:', id);
  return new Promise((resolve) => {
    setTimeout(() => {
      const profesional = profesionalesActuales.find((p) => p.ID === id);
      resolve(profesional || null);
    }, 300);
  });
};

// Crear nuevo profesional
export const crearProfesional = async (nuevoProfesional) => {
  console.log('Creando profesional:', nuevoProfesional);
  return new Promise((resolve) => {
    setTimeout(() => {
      const nuevoID = Math.max(...profesionalesActuales.map((p) => p.ID)) + 1;
      const profesionalConID = {
        ...nuevoProfesional,
        ID: nuevoID,
        Estado: nuevoProfesional.Estado || 'activo',
      };
      profesionalesActuales.push(profesionalConID);
      resolve(profesionalConID);
    }, 500);
  });
};

// Actualizar profesional existente
export const actualizarProfesional = async (id, datosActualizados) => {
  console.log('Actualizando profesional:', id, datosActualizados);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = profesionalesActuales.findIndex((p) => p.ID === id);
      if (index !== -1) {
        profesionalesActuales[index] = {
          ...profesionalesActuales[index],
          ...datosActualizados,
        };
        resolve(profesionalesActuales[index]);
      } else {
        reject(new Error('Profesional no encontrado'));
      }
    }, 500);
  });
};

// Eliminar profesional
export const eliminarProfesional = async (id) => {
  console.log('Eliminando profesional:', id);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = profesionalesActuales.findIndex((p) => p.ID === id);
      if (index !== -1) {
        const eliminado = profesionalesActuales.splice(index, 1)[0];
        resolve(eliminado);
      } else {
        reject(new Error('Profesional no encontrado'));
      }
    }, 500);
  });
};

// Obtener profesionales por especialidad
export const obtenerProfesionalesPorEspecialidad = async (especialidad) => {
  console.log('Obteniendo profesionales por especialidad:', especialidad);
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtrados = profesionalesActuales.filter(
        (p) => p.Especialidad.toLowerCase() === especialidad.toLowerCase()
      );
      resolve(filtrados);
    }, 300);
  });
};

// Obtener especialidades únicas
export const obtenerEspecialidades = async () => {
  console.log('Obteniendo especialidades');
  return new Promise((resolve) => {
    setTimeout(() => {
      const especialidades = [
        ...new Set(profesionalesActuales.map((p) => p.Especialidad)),
      ];
      resolve(especialidades.sort());
    }, 200);
  });
};

export default {
  obtenerProfesionales,
  obtenerProfesionalPorId,
  crearProfesional,
  actualizarProfesional,
  eliminarProfesional,
  obtenerProfesionalesPorEspecialidad,
  obtenerEspecialidades,
};
