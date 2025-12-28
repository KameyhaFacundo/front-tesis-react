export const COLORS = {
  // Colores principales
  primary: '#4A90E2',      // Azul confiable
  primaryDark: '#2E5C8A',  // Azul oscuro
  primaryLight: '#E3F2FD', // Azul muy claro
  
  secondary: '#66BB6A',    // Verde progreso
  secondaryDark: '#43A047',
  secondaryLight: '#E8F5E9',
  
  accent: '#FF9800',       // Naranja cálido
  accentLight: '#FFF3E0',
  
  // Estados y alertas
  success: '#66BB6A',      // Verde éxito
  successLight: '#E8F5E9', // Verde claro
  warning: '#FFC107',      // Amarillo advertencia
  error: '#EF5350',        // Rojo error
  errorLight: '#FFEBEE',   // Rojo claro
  info: '#42A5F5',         // Azul información
  
  // Estados de actividades
  completed: '#66BB6A',    // Completada
  pending: '#FFC107',      // Pendiente
  inProgress: '#42A5F5',   // En progreso
  cancelled: '#9E9E9E',    // Cancelada
  
  // Roles de usuario
  tutor: '#9C27B0',        // Morado para tutores
  professional: '#00897B', // Verde azulado para profesionales
  user: '#5C6BC0',         // Índigo para usuarios con discapacidad
  
  // Neutrales
  white: '#FFFFFF',
  background: '#F5F7FA',
  card: '#FFFFFF',
  border: '#E0E0E0',
  divider: '#EEEEEE',
  
  // Textos
  text: '#212121',
  textSecondary: '#757575',
  textLight: '#9E9E9E',
  textDisabled: '#BDBDBD',
  
  // Sombras y overlays
  shadow: 'rgba(0, 0, 0, 0.1)',
  overlay: 'rgba(0, 0, 0, 0.5)',
  
  // Tipos de actividades
  medicine: '#E91E63',     // Medicamentos
  therapy: '#673AB7',      // Terapia
  exercise: '#FF5722',     // Ejercicio
  other: '#607D8B',        // Otras
};

export const SIZES = {
  // Espaciado
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  
  // Tamaños de fuente
  h1: 32,
  h2: 28,
  h3: 24,
  h4: 20,
  h5: 18,
  body: 16,
  caption: 14,
  small: 12,
  
  // Border radius
  radiusSmall: 4,
  radius: 8,
  radiusMedium: 12,
  radiusLarge: 16,
  radiusRound: 999,
  
  // Iconos
  icon: 24,
  iconSmall: 20,
  iconLarge: 32,
  iconXLarge: 48,
  
  // Input
  inputHeight: 48,
  buttonHeight: 48,
};

export const FONTS = {
  // Pesos
  thin: '100',
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
  
  // Estilos de texto
  h1: {
    fontSize: SIZES.h1,
    fontWeight: '700',
    lineHeight: 40,
    color: COLORS.text,
  },
  h2: {
    fontSize: SIZES.h2,
    fontWeight: '700',
    lineHeight: 36,
    color: COLORS.text,
  },
  h3: {
    fontSize: SIZES.h3,
    fontWeight: '600',
    lineHeight: 32,
    color: COLORS.text,
  },
  h4: {
    fontSize: SIZES.h4,
    fontWeight: '600',
    lineHeight: 28,
    color: COLORS.text,
  },
  h5: {
    fontSize: SIZES.h5,
    fontWeight: '500',
    lineHeight: 24,
    color: COLORS.text,
  },
  body: {
    fontSize: SIZES.body,
    fontWeight: '400',
    lineHeight: 24,
    color: COLORS.text,
  },
  bodyBold: {
    fontSize: SIZES.body,
    fontWeight: '600',
    lineHeight: 24,
    color: COLORS.text,
  },
  caption: {
    fontSize: SIZES.caption,
    fontWeight: '400',
    lineHeight: 20,
    color: COLORS.textSecondary,
  },
  small: {
    fontSize: SIZES.small,
    fontWeight: '400',
    lineHeight: 16,
    color: COLORS.textLight,
  },
};

export const SHADOWS = {
  light: {
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  heavy: {
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

// Tipos de actividades
export const ACTIVITY_TYPES = {
  MEDICINE: 'medicine',
  THERAPY: 'therapy',
  EXERCISE: 'exercise',
  OTHER: 'other',
};

// Tipos de usuario
export const USER_TYPES = {
  USER: 'user',          // Persona con discapacidad
  TUTOR: 'tutor',        // Tutor/Familiar
  PROFESSIONAL: 'professional', // Profesional/Médico
};

// Estados de actividad
export const ACTIVITY_STATUS = {
  COMPLETED: 'completed',
  PENDING: 'pending',
  IN_PROGRESS: 'inProgress',
  CANCELLED: 'cancelled',
};

// Estados de reporte
export const REPORT_STATUS = {
  STARTED: 'started',
  IN_PROGRESS: 'inProgress',
  FINISHED: 'finished',
};

export default {
  COLORS,
  SIZES,
  FONTS,
  SHADOWS,
  ACTIVITY_TYPES,
  USER_TYPES,
  ACTIVITY_STATUS,
  REPORT_STATUS,
};
