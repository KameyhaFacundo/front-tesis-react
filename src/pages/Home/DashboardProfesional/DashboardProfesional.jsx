import React, { useEffect, useMemo, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../../contexts/AuthContext';
import { Avatar, ActivityCard } from '../../../components';
import { COLORS, SIZES } from '../../../constants/theme';
import styles from './DashboardProfesional.styles';

export default function DashboardProfesional({ navigation, onOpenDrawer }) {
  const { user } = useAuth();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 55,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const pacientesAsignados = [
    {
      id: 1,
      nombre: 'Ana Martinez',
      tipoDiscapacidad: 'Motora',
      grado: 'Moderado',
      estado: 'online',
      actividadesActivas: 5,
      prioridad: 'alta',
    },
    {
      id: 2,
      nombre: 'Carlos Gomez',
      tipoDiscapacidad: 'Visual',
      grado: 'Severo',
      estado: 'offline',
      actividadesActivas: 3,
      prioridad: 'media',
    },
    {
      id: 3,
      nombre: 'Laura Fernandez',
      tipoDiscapacidad: 'Intelectual',
      grado: 'Leve',
      estado: 'online',
      actividadesActivas: 4,
      prioridad: 'media',
    },
  ];

  const actividadesPendientes = [
    {
      id: 1,
      title: 'Revisar progreso - Ana',
      description: 'Sesion de fisioterapia completada.',
      type: 'therapy',
      status: 'completed',
      startTime: 'Ayer',
      pcd: 'Ana Martinez',
      assignedBy: 'Sistema',
    },
    {
      id: 2,
      title: 'Medicamento no tomado - Carlos',
      description: 'Omitio toma de medicamento a las 09:00.',
      type: 'medicine',
      status: 'pending',
      startTime: 'Hoy',
      pcd: 'Carlos Gomez',
      assignedBy: 'Sistema',
    },
  ];

  const resumen = {
    totalPacientes: pacientesAsignados.length,
    actividadesCreadas: 12,
    reportesPendientes: 2,
    consultasHoy: 1,
  };

  const fechaHoy = useMemo(() => {
    return new Date().toLocaleDateString('es-AR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  }, []);

  const stats = [
    {
      key: 'pacientes',
      icon: 'people',
      value: resumen.totalPacientes,
      label: 'Pacientes',
      helper: 'Activos',
      color: '#0F766E',
      bg: '#E6F7F5',
    },
    {
      key: 'actividades',
      icon: 'clipboard',
      value: resumen.actividadesCreadas,
      label: 'Actividades',
      helper: 'Plan semanal',
      color: '#1D4ED8',
      bg: '#E8F0FF',
    },
    {
      key: 'pendientes',
      icon: 'alert-circle',
      value: resumen.reportesPendientes,
      label: 'Pendientes',
      helper: 'Revision',
      color: '#B45309',
      bg: '#FFF4DE',
    },
    {
      key: 'consultas',
      icon: 'calendar',
      value: resumen.consultasHoy,
      label: 'Consultas',
      helper: 'Para hoy',
      color: '#7C3AED',
      bg: '#EFE7FF',
    },
  ];

  const quickActions = [
    {
      key: 'actividades',
      icon: 'add-circle',
      label: 'Nueva actividad',
      color: '#1D4ED8',
      onPress: () => navigation.navigate('Actividades'),
    },
    {
      key: 'agenda',
      icon: 'calendar',
      label: 'Agenda',
      color: '#0F766E',
      onPress: () => navigation.navigate('Calendario'),
    },
    {
      key: 'reportes',
      icon: 'document-text',
      label: 'Reportes',
      color: '#C2410C',
      onPress: () => navigation.navigate('Reportes'),
    },
    {
      key: 'alertas',
      icon: 'warning',
      label: 'Alertas',
      color: '#BE123C',
      onPress: () => navigation.navigate('Alertas'),
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#F2F7FF', '#F8FBFF', '#FFFFFF']} style={styles.backgroundGradient} />
      <View style={styles.glowTop} />

      <View style={styles.customHeader}>
        <TouchableOpacity
          onPress={onOpenDrawer}
          style={styles.menuButton}
          activeOpacity={0.85}
        >
          <Ionicons name="menu" size={24} color={COLORS.primary} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Panel profesional</Text>
          <Text style={styles.headerSubtitle}>Seguimiento clinico diario</Text>
        </View>

        <TouchableOpacity
          onPress={() => Alert.alert('Notificaciones', 'Tenes 2 items pendientes de revision')}
          style={styles.notificationButton}
          activeOpacity={0.85}
        >
          <Ionicons name="notifications" size={20} color={COLORS.warning} />
          <View style={styles.badge}>
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
          <LinearGradient colors={['#1146A6', '#1D62D2']} style={styles.heroCard}>
            <View style={styles.heroTopRow}>
              <View style={styles.heroIdentity}>
                <Text style={styles.heroGreeting}>Bienvenido/a</Text>
                <Text style={styles.heroName}>{user?.Nombre} {user?.Apellido}</Text>
                <View style={styles.heroRolePill}>
                  <Ionicons name="medkit" size={14} color="#BFE2FF" />
                  <Text style={styles.heroRoleText}>{user?.Especialidad || 'Profesional de salud'}</Text>
                </View>
              </View>

              <Avatar
                name={`${user?.Nombre || ''} ${user?.Apellido || ''}`}
                type="professional"
                size="large"
                showStatus
                status="online"
              />
            </View>

            <View style={styles.heroBottomRow}>
              <View>
                <Text style={styles.heroDateLabel}>Hoy</Text>
                <Text style={styles.heroDate}>{fechaHoy}</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Calendario')}
                style={styles.heroCta}
                activeOpacity={0.9}
              >
                <Ionicons name="calendar-clear" size={18} color="#0D3B8E" />
                <Text style={styles.heroCtaText}>Ver agenda</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          <View style={styles.statsGrid}>
            {stats.map((stat) => (
              <TouchableOpacity key={stat.key} style={styles.statCard} activeOpacity={0.85}>
                <View style={[styles.statIconWrap, { backgroundColor: stat.bg }]}>
                  <Ionicons name={stat.icon} size={20} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={[styles.statHelper, { color: stat.color }]}>{stat.helper}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Pacientes prioritarios</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Usuarios')} activeOpacity={0.8}>
              <Text style={styles.sectionAction}>Ver todos</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.patientList}>
            {pacientesAsignados.map((paciente) => {
              const prioridadColor =
                paciente.prioridad === 'alta' ? '#DC2626' : paciente.prioridad === 'media' ? '#D97706' : '#16A34A';

              return (
                <TouchableOpacity
                  key={paciente.id}
                  style={styles.patientCard}
                  onPress={() => Alert.alert(paciente.nombre, 'Abrir ficha clinica y plan de cuidado')}
                  activeOpacity={0.9}
                >
                  <View style={styles.patientHeader}>
                    <Avatar name={paciente.nombre} type="user" size="medium" showStatus status={paciente.estado} />
                    <View style={styles.patientInfo}>
                      <Text style={styles.patientName}>{paciente.nombre}</Text>
                      <Text style={styles.patientDetail}>
                        {paciente.tipoDiscapacidad} | Grado {paciente.grado}
                      </Text>
                    </View>
                    <View style={[styles.priorityPill, { backgroundColor: `${prioridadColor}1F` }]}>
                      <View style={[styles.priorityDot, { backgroundColor: prioridadColor }]} />
                      <Text style={[styles.priorityText, { color: prioridadColor }]}>{paciente.prioridad}</Text>
                    </View>
                  </View>

                  <View style={styles.patientMetaRow}>
                    <View style={styles.metaBadge}>
                      <Ionicons name="pulse" size={14} color="#0F766E" />
                      <Text style={styles.metaBadgeText}>{paciente.actividadesActivas} activas</Text>
                    </View>
                    <View style={styles.metaBadge}>
                      <Ionicons name="time" size={14} color="#1D4ED8" />
                      <Text style={styles.metaBadgeText}>Revision hoy</Text>
                    </View>
                  </View>

                  <View style={styles.patientActions}>
                    <TouchableOpacity
                      style={[styles.actionBtn, styles.primaryActionBtn]}
                      onPress={() => navigation.navigate('Actividades')}
                    >
                      <Ionicons name="add" size={16} color="#1D4ED8" />
                      <Text style={styles.primaryActionText}>Actividad</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.actionBtn, styles.secondaryActionBtn]}
                      onPress={() => navigation.navigate('Mapa')}
                    >
                      <Ionicons name="location" size={16} color="#0F766E" />
                      <Text style={styles.secondaryActionText}>Ubicacion</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Bandeja de revision</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Notificaciones')} activeOpacity={0.8}>
              <Text style={styles.sectionAction}>Ver bandeja</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.activityList}>
            {actividadesPendientes.map((activity) => (
              <ActivityCard
                key={activity.id}
                {...activity}
                onPress={() => Alert.alert('Revisar', `Revisar: ${activity.title}`)}
              />
            ))}
          </View>

          <View style={styles.quickActionsSection}>
            <Text style={styles.sectionTitle}>Accesos rapidos</Text>
            <View style={styles.quickGrid}>
              {quickActions.map((action) => (
                <TouchableOpacity
                  key={action.key}
                  style={styles.quickCard}
                  onPress={action.onPress}
                  activeOpacity={0.88}
                >
                  <View style={[styles.quickIconWrap, { backgroundColor: `${action.color}1A` }]}>
                    <Ionicons name={action.icon} size={20} color={action.color} />
                  </View>
                  <Text style={styles.quickLabel}>{action.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={{ height: SIZES.xl }} />
        </Animated.View>
      </ScrollView>

    </View>
  );
}
