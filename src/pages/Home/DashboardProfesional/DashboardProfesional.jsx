import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../../contexts/AuthContext';
import { Avatar, ActivityCard, CustomDrawer, Card } from '../../../components';
import { COLORS, SIZES } from '../../../constants/theme';
import styles from './DashboardProfesional.styles';

export default function DashboardProfesional({ navigation }) {
  const { user } = useAuth();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Pacientes asignados (simulado)
  const pacientesAsignados = [
    {
      id: 1,
      nombre: 'Ana Martínez',
      tipoDiscapacidad: 'Motora',
      grado: 'Moderado',
      proximaConsulta: '2024-01-15',
      ultimoReporte: '2024-01-10',
      estado: 'online',
      actividadesActivas: 5,
    },
    {
      id: 2,
      nombre: 'Carlos Gómez',
      tipoDiscapacidad: 'Visual',
      grado: 'Severo',
      proximaConsulta: '2024-01-18',
      ultimoReporte: '2024-01-12',
      estado: 'offline',
      actividadesActivas: 3,
    },
    {
      id: 3,
      nombre: 'Laura Fernández',
      tipoDiscapacidad: 'Intelectual',
      grado: 'Leve',
      proximaConsulta: '2024-01-20',
      ultimoReporte: '2024-01-13',
      estado: 'online',
      actividadesActivas: 4,
    },
  ];

  // Actividades pendientes de revisión
  const actividadesPendientes = [
    {
      id: 1,
      title: 'Revisar Progreso - Ana',
      description: 'Sesión de fisioterapia completada',
      type: 'therapy',
      status: 'completed',
      startTime: 'Ayer',
      pcd: 'Ana Martínez',
      assignedBy: 'Sistema',
    },
    {
      id: 2,
      title: 'Medicamento no tomado - Carlos',
      description: 'Omitió toma de medicamento a las 09:00',
      type: 'medicine',
      status: 'missed',
      startTime: 'Hoy',
      pcd: 'Carlos Gómez',
      assignedBy: 'Sistema',
    },
  ];

  const resumen = {
    totalPacientes: pacientesAsignados.length,
    actividadesCreadas: 12,
    reportesPendientes: 2,
    consultasHoy: 1,
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F8FAFE', '#FFFFFF']}
        style={styles.gradient}
      />

      {/* Header */}
      <View style={styles.customHeader}>
        <TouchableOpacity
          onPress={() => setDrawerVisible(true)}
          style={styles.menuButton}
        >
          <Ionicons name="menu" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Panel Profesional</Text>
        <TouchableOpacity
          onPress={() => Alert.alert('Notificaciones', 'Tienes 2 actividades pendientes de revisión')}
          style={styles.notificationButton}
        >
          <Ionicons name="notifications" size={24} color={COLORS.warning} />
          <View style={[styles.badge, { backgroundColor: COLORS.warning }]}>
            <Text style={styles.badgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          {/* Saludo */}
          <View style={styles.welcomeSection}>
            <Text style={styles.greeting}>Bienvenido/a</Text>
            <Text style={styles.username}>{user?.Nombre} {user?.Apellido}</Text>
            <View style={styles.professionalInfo}>
              <Ionicons name="medical" size={16} color={COLORS.professional} />
              <Text style={styles.specialty}>{user?.Especialidad || 'Profesional de la Salud'}</Text>
              {user?.Matricula && (
                <>
                  <Text style={styles.separator}>•</Text>
                  <Text style={styles.matricula}>Mat. {user.Matricula}</Text>
                </>
              )}
            </View>
          </View>

          {/* Resumen rápido */}
          <View style={styles.statsContainer}>
            <View style={[styles.statCard, { borderLeftColor: COLORS.primary }]}>
              <Ionicons name="people" size={28} color={COLORS.primary} />
              <Text style={styles.statValue}>{resumen.totalPacientes}</Text>
              <Text style={styles.statLabel}>Pacientes</Text>
            </View>
            <View style={[styles.statCard, { borderLeftColor: COLORS.secondary }]}>
              <Ionicons name="clipboard" size={28} color={COLORS.secondary} />
              <Text style={styles.statValue}>{resumen.actividadesCreadas}</Text>
              <Text style={styles.statLabel}>Actividades</Text>
            </View>
            <View style={[styles.statCard, { borderLeftColor: COLORS.warning }]}>
              <Ionicons name="alert-circle" size={28} color={COLORS.warning} />
              <Text style={styles.statValue}>{resumen.reportesPendientes}</Text>
              <Text style={styles.statLabel}>Pendientes</Text>
            </View>
          </View>

          {/* Pacientes asignados */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderLeft}>
                <Ionicons name="folder-open" size={24} color={COLORS.primary} />
                <Text style={styles.sectionTitle}>Mis Pacientes</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Usuarios')}>
                <Text style={styles.seeAllText}>Ver todos</Text>
              </TouchableOpacity>
            </View>

            {pacientesAsignados.map((paciente) => (
              <TouchableOpacity
                key={paciente.id}
                style={styles.patientCard}
                onPress={() => Alert.alert(paciente.nombre, 'Ver historial y crear actividades')}
              >
                <View style={styles.patientHeader}>
                  <Avatar name={paciente.nombre} type="user" size="large" showStatus status={paciente.estado} />
                  <View style={styles.patientInfo}>
                    <Text style={styles.patientName}>{paciente.nombre}</Text>
                    <Text style={styles.patientDetail}>
                      {paciente.tipoDiscapacidad} - Grado {paciente.grado}
                    </Text>
                    <View style={styles.patientMetrics}>
                      <View style={styles.metric}>
                        <Ionicons name="checkmark-circle" size={14} color={COLORS.success} />
                        <Text style={styles.metricText}>{paciente.actividadesActivas} activas</Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View style={styles.patientActions}>
                  <TouchableOpacity
                    style={[styles.actionBtn, { backgroundColor: COLORS.primaryLight }]}
                    onPress={() => Alert.alert('Nueva Actividad', `Crear actividad para ${paciente.nombre}`)}
                  >
                    <Ionicons name="add-circle" size={18} color={COLORS.primary} />
                    <Text style={[styles.actionBtnText, { color: COLORS.primary }]}>Crear Actividad</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionBtn, { backgroundColor: COLORS.secondaryLight }]}
                    onPress={() => Alert.alert('Nuevo Reporte', `Crear reporte para ${paciente.nombre}`)}
                  >
                    <Ionicons name="document-text" size={18} color={COLORS.secondary} />
                    <Text style={[styles.actionBtnText, { color: COLORS.secondary }]}>Reporte</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Actividades pendientes de revisión */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderLeft}>
                <Ionicons name="checkmark-done" size={24} color={COLORS.primary} />
                <Text style={styles.sectionTitle}>Pendientes de Revisión</Text>
              </View>
            </View>

            <View style={styles.activitiesList}>
              {actividadesPendientes.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  {...activity}
                  onPress={() => Alert.alert('Revisar', `Revisar: ${activity.title}`)}
                />
              ))}
            </View>
          </View>

          {/* Acciones rápidas */}
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.quickActionBtn}
              onPress={() => navigation.navigate('Calendario')}
            >
              <Ionicons name="calendar" size={24} color={COLORS.white} />
              <Text style={styles.quickActionText}>Calendario</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quickActionBtn, { backgroundColor: COLORS.secondary }]}
              onPress={() => navigation.navigate('Reportes')}
            >
              <Ionicons name="stats-chart" size={24} color={COLORS.white} />
              <Text style={styles.quickActionText}>Estadísticas</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: SIZES.xl }} />
        </Animated.View>
      </ScrollView>

      <CustomDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        navigation={navigation}
        currentRoute="Dashboard"
      />
    </View>
  );
}

