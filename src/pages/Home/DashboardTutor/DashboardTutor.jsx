import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../../contexts/AuthContext';
import { Avatar, ActivityCard, CustomDrawer, Card } from '../../../components';
import { COLORS, SIZES } from '../../../constants/theme';
import { obtenerAlertasActivasPorTutor } from '../../../api/alertas';
import styles from './DashboardTutor.styles';

export default function DashboardTutor({ navigation }) {
  const { user } = useAuth();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedPCD, setSelectedPCD] = useState(null);
  const [alertasActivas, setAlertasActivas] = useState([]);
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

    // Cargar alertas activas
    cargarAlertas();
  }, []);

  const cargarAlertas = async () => {
    try {
      const alertas = await obtenerAlertasActivasPorTutor(user.ID);
      setAlertasActivas(alertas);
    } catch (error) {
      console.error('Error cargando alertas:', error);
    }
  };

  // PCD a cargo del tutor (simulado)
  const pcdACargo = [
    {
      id: 1,
      nombre: 'Ana Martínez',
      tipoDiscapacidad: 'Motora',
      grado: 'Moderado',
      actividadesPendientes: 2,
      actividadesCompletadas: 3,
      ultimaUbicacion: 'En casa',
      estado: 'online',
      latitud: -34.6037,
      longitud: -58.3816,
    },
    {
      id: 2,
      nombre: 'Laura Fernández',
      tipoDiscapacidad: 'Intelectual',
      grado: 'Leve',
      actividadesPendientes: 1,
      actividadesCompletadas: 4,
      ultimaUbicacion: 'Centro de día',
      estado: 'online',
      latitud: -34.6040,
      longitud: -58.3820,
    },
  ];

  // Actividades del día de todas las PCD
  const actividadesDelDia = [
    {
      id: 1,
      title: 'Tomar Medicamento - Ana',
      description: 'Ibuprofeno 400mg',
      type: 'medicine',
      status: 'pending',
      startTime: '09:00',
      pcd: 'Ana Martínez',
      assignedBy: 'Dr. García',
    },
    {
      id: 2,
      title: 'Fisioterapia - Ana',
      description: 'Sesión de rehabilitación',
      type: 'therapy',
      status: 'inProgress',
      startTime: '14:00',
      pcd: 'Ana Martínez',
      assignedBy: 'Lic. Martínez',
    },
    {
      id: 3,
      title: 'Terapia Ocupacional - Laura',
      description: 'Actividades de desarrollo',
      type: 'therapy',
      status: 'pending',
      startTime: '10:00',
      pcd: 'Laura Fernández',
      assignedBy: 'Lic. Sofía López',
    },
  ];

  const resumen = {
    totalPCD: pcdACargo.length,
    actividadesPendientes: 3,
    actividadesHoy: 5,
    alertasCriticas: alertasActivas.length,
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
        <Text style={styles.headerTitle}>Panel de Tutor</Text>
        <TouchableOpacity
          onPress={() => {
            if (alertasActivas.length > 0) {
              const mensajeAlertas = alertasActivas
                .map((a) => `• ${a.Mensaje} (${(a.DistanciaKm * 1000).toFixed(0)}m de distancia)`)
                .join('\n');
              Alert.alert(
                '🚨 Alertas Críticas',
                mensajeAlertas,
                [
                  { text: 'Ver en Mapa', onPress: () => navigation.navigate('Mapa') },
                  { text: 'Cerrar', style: 'cancel' },
                ]
              );
            } else {
              Alert.alert('Notificaciones', 'No hay alertas activas');
            }
          }}
          style={styles.notificationButton}
        >
          <Ionicons
            name="notifications"
            size={24}
            color={alertasActivas.length > 0 ? COLORS.error : COLORS.textSecondary}
          />
          {alertasActivas.length > 0 && (
            <View style={[styles.badge, { backgroundColor: COLORS.error }]}>
              <Text style={styles.badgeText}>{alertasActivas.length}</Text>
            </View>
          )}
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
            <Text style={styles.role}>Tutor/a</Text>
          </View>

          {/* Resumen rápido */}
          <View style={styles.statsContainer}>
            <View style={[styles.statCard, { borderLeftColor: COLORS.primary }]}>
              <Ionicons name="people" size={28} color={COLORS.primary} />
              <Text style={styles.statValue}>{resumen.totalPCD}</Text>
              <Text style={styles.statLabel}>PCD a cargo</Text>
            </View>
            <View style={[styles.statCard, { borderLeftColor: COLORS.warning }]}>
              <Ionicons name="time" size={28} color={COLORS.warning} />
              <Text style={styles.statValue}>{resumen.actividadesPendientes}</Text>
              <Text style={styles.statLabel}>Pendientes</Text>
            </View>
            <View style={[styles.statCard, { borderLeftColor: COLORS.error }]}>
              <Ionicons name="alert-circle" size={28} color={COLORS.error} />
              <Text style={styles.statValue}>{resumen.alertasCriticas}</Text>
              <Text style={styles.statLabel}>Alertas</Text>
            </View>
          </View>

          {/* Alertas Críticas */}
          {alertasActivas.length > 0 && (
            <View style={styles.alertSection}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionHeaderLeft}>
                  <Ionicons name="warning" size={24} color={COLORS.error} />
                  <Text style={styles.alertTitle}>Alertas Críticas</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Alertas')}>
                  <Text style={styles.seeAllText}>Ver historial</Text>
                </TouchableOpacity>
              </View>
              {alertasActivas.map((alerta) => (
                <TouchableOpacity
                  key={alerta.ID}
                  style={styles.alertCard}
                  onPress={() =>
                    navigation.navigate('Mapa', {
                      pcdId: alerta.UsuarioID,
                      pcdNombre: alerta.NombreUsuario,
                    })
                  }
                >
                  <View style={styles.alertCardContent}>
                    <View style={styles.alertIcon}>
                      <Ionicons name="navigate" size={20} color={COLORS.white} />
                    </View>
                    <View style={styles.alertInfo}>
                      <Text style={styles.alertCardTitle}>{alerta.NombreUsuario}</Text>
                      <Text style={styles.alertCardMessage}>Fuera de zona segura</Text>
                      <Text style={styles.alertCardDistance}>
                        {(alerta.DistanciaKm * 1000).toFixed(0)}m de distancia
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color={COLORS.error} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* PCD a cargo */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderLeft}>
                <Ionicons name="people-outline" size={24} color={COLORS.primary} />
                <Text style={styles.sectionTitle}>Personas a Cargo</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Usuarios')}>
                <Text style={styles.seeAllText}>Ver todos</Text>
              </TouchableOpacity>
            </View>

            {pcdACargo.map((pcd) => (
              <TouchableOpacity
                key={pcd.id}
                style={styles.pcdCard}
                onPress={() => Alert.alert(pcd.nombre, 'Ver detalles y actividades')}
              >
                <View style={styles.pcdHeader}>
                  <Avatar name={pcd.nombre} type="user" size="large" showStatus status={pcd.estado} />
                  <View style={styles.pcdInfo}>
                    <Text style={styles.pcdName}>{pcd.nombre}</Text>
                    <Text style={styles.pcdDetail}>
                      {pcd.tipoDiscapacidad} - Grado {pcd.grado}
                    </Text>
                    <View style={styles.pcdLocation}>
                      <Ionicons name="location" size={14} color={COLORS.info} />
                      <Text style={styles.pcdLocationText}>{pcd.ultimaUbicacion}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.locationBtn}
                    onPress={(e) => {
                      e.stopPropagation();
                      navigation.navigate('Mapa', {
                        pcdId: pcd.id,
                        pcdNombre: pcd.nombre
                      });
                    }}
                  >
                    <Ionicons name="navigate" size={20} color={COLORS.primary} />
                  </TouchableOpacity>
                </View>
                <View style={styles.pcdStats}>
                  <View style={styles.pcdStat}>
                    <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
                    <Text style={styles.pcdStatText}>{pcd.actividadesCompletadas} completadas</Text>
                  </View>
                  <View style={styles.pcdStat}>
                    <Ionicons name="time" size={16} color={COLORS.warning} />
                    <Text style={styles.pcdStatText}>{pcd.actividadesPendientes} pendientes</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Actividades del día */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderLeft}>
                <Ionicons name="list" size={24} color={COLORS.primary} />
                <Text style={styles.sectionTitle}>Actividades de Hoy</Text>
              </View>
            </View>

            <View style={styles.activitiesList}>
              {actividadesDelDia.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  {...activity}
                  onPress={() => Alert.alert('Actividad', `Gestionar: ${activity.title}`)}
                />
              ))}
            </View>
          </View>

          {/* Acciones rápidas */}
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={styles.quickActionBtn}
              onPress={() => navigation.navigate('Mapa')}
            >
              <Ionicons name="map" size={24} color={COLORS.white} />
              <Text style={styles.quickActionText}>Ver Mapa</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quickActionBtn, { backgroundColor: COLORS.secondary }]}
              onPress={() => Alert.alert('Actividad', 'Crear nueva actividad')}
            >
              <Ionicons name="add-circle" size={24} color={COLORS.white} />
              <Text style={styles.quickActionText}>Nueva Actividad</Text>
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

