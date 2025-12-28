// src/api/usuarios.js
const API_URL = 'http://172.20.10.2:3000/api/users/users';

// Datos MOCK para desarrollo (comentar cuando tengas el backend listo)
const MOCK_USUARIOS = [
  {
    ID: 1,
    Nombre: 'Juan',
    Apellido: 'Pérez',
    FechaNacimiento: '1990-05-15',
    DNI: '12345678',
    CorreoElectronico: 'admin@test.com',
    Password: '1234',
    Telefono: '1234567890',
    Direccion: 'Av. Principal 123, Buenos Aires',
    Rol: 'Administrador',
    // Datos adicionales de Profesional
    Matricula: 'MP-12345',
    Especialidad: 'Medicina General',
    Establecimiento: 'Hospital Central',
    Descripcion: 'Médico de cabecera con 15 años de experiencia'
  },
  {
    ID: 2,
    Nombre: 'María',
    Apellido: 'González',
    FechaNacimiento: '1985-08-20',
    DNI: '23456789',
    CorreoElectronico: 'tutor@test.com',
    Password: '1234',
    Telefono: '0987654321',
    Direccion: 'Calle Secundaria 456, Buenos Aires',
    Rol: 'Tutor'
  },
  {
    ID: 3,
    Nombre: 'Carlos',
    Apellido: 'Ruiz',
    FechaNacimiento: '1978-03-10',
    DNI: '34567890',
    CorreoElectronico: 'profesional@test.com',
    Password: '1234',
    Telefono: '1122334455',
    Direccion: 'Av. Medicina 789, Buenos Aires',
    Rol: 'Profesional',
    // Datos adicionales de Profesional
    Matricula: 'MN-67890',
    Especialidad: 'Fisioterapia',
    Establecimiento: 'Centro de Rehabilitación Norte',
    Descripcion: 'Especialista en rehabilitación motora'
  },
  {
    ID: 4,
    Nombre: 'Ana',
    Apellido: 'Martínez',
    FechaNacimiento: '1995-12-05',
    DNI: '45678901',
    CorreoElectronico: 'usuario@test.com',
    Password: '1234',
    Telefono: '5544332211',
    Direccion: 'Barrio Sur 321, Buenos Aires',
    Rol: 'PCD',
    // Datos adicionales de PCD
    TipoDiscapacidad: 'Motora',
    Grado: 'Moderado',
    Diagnostico: 'Parálisis cerebral leve'
  },
  {
    ID: 5,
    Nombre: 'Laura',
    Apellido: 'Fernández',
    FechaNacimiento: '1992-06-18',
    DNI: '56789012',
    CorreoElectronico: 'pcd2@test.com',
    Password: '1234',
    Telefono: '6655443322',
    Direccion: 'Centro 555, Buenos Aires',
    Rol: 'PCD',
    // Datos adicionales de PCD
    TipoDiscapacidad: 'Intelectual',
    Grado: 'Leve',
    Diagnostico: 'Síndrome de Down'
  },
  {
    ID: 6,
    Nombre: 'Roberto',
    Apellido: 'Sánchez',
    FechaNacimiento: '1980-11-30',
    DNI: '67890123',
    CorreoElectronico: 'tutor2@test.com',
    Password: '1234',
    Telefono: '7766554433',
    Direccion: 'Zona Norte 888, Buenos Aires',
    Rol: 'Tutor'
  },
  {
    ID: 7,
    Nombre: 'Sofía',
    Apellido: 'López',
    FechaNacimiento: '1988-02-14',
    DNI: '78901234',
    CorreoElectronico: 'psicologa@test.com',
    Password: '1234',
    Telefono: '8877665544',
    Direccion: 'Av. Psicología 999, Buenos Aires',
    Rol: 'Profesional',
    // Datos adicionales de Profesional
    Matricula: 'PSI-11111',
    Especialidad: 'Psicología Clínica',
    Establecimiento: 'Consultorio Privado',
    Descripcion: 'Psicóloga especializada en discapacidad'
  }
];

export const obtenerUsuarios = async () => {
  // MODO MOCK: Devuelve datos de prueba
  console.log('Usando datos MOCK de usuarios');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Datos de usuarios MOCK:', MOCK_USUARIOS);
      resolve(MOCK_USUARIOS);
    }, 500); // Simula delay de red
  });

  // MODO REAL: Descomentar cuando tengas el backend funcionando
  /*
  const response = await fetch(API_URL);
  console.log('Datos obtenidos de usuarios:', response);
  if (!response.ok) throw new Error('Error al obtener usuarios');
  const data = await response.json();
  console.log('Datos de usuarios:', data);
  return data;
  */
};

export const obtenerUsuarioPorId = async (id) => {
  console.log('Obteniendo usuario por ID:', id);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const usuario = MOCK_USUARIOS.find(u => u.ID === id);
      if (usuario) {
        resolve(usuario);
      } else {
        reject(new Error('Usuario no encontrado'));
      }
    }, 300);
  });
};

export const crearUsuario = async (nuevoUsuario) => {
  console.log('Creando nuevo usuario:', nuevoUsuario);
  return new Promise((resolve) => {
    setTimeout(() => {
      const nuevoID = Math.max(...MOCK_USUARIOS.map(u => u.ID)) + 1;
      const usuarioConID = { ...nuevoUsuario, ID: nuevoID };
      MOCK_USUARIOS.push(usuarioConID);
      console.log('Usuario creado:', usuarioConID);
      resolve(usuarioConID);
    }, 500);
  });
};

export const actualizarUsuario = async (id, datosActualizados) => {
  console.log('Actualizando usuario:', id, datosActualizados);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = MOCK_USUARIOS.findIndex(u => u.ID === id);
      if (index !== -1) {
        MOCK_USUARIOS[index] = { ...MOCK_USUARIOS[index], ...datosActualizados };
        console.log('Usuario actualizado:', MOCK_USUARIOS[index]);
        resolve(MOCK_USUARIOS[index]);
      } else {
        reject(new Error('Usuario no encontrado'));
      }
    }, 500);
  });
};

export const eliminarUsuario = async (id) => {
  console.log('Eliminando usuario:', id);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = MOCK_USUARIOS.findIndex(u => u.ID === id);
      if (index !== -1) {
        const usuarioEliminado = MOCK_USUARIOS.splice(index, 1)[0];
        console.log('Usuario eliminado:', usuarioEliminado);
        resolve(usuarioEliminado);
      } else {
        reject(new Error('Usuario no encontrado'));
      }
    }, 500);
  });
};
