import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../../contexts/AuthContext';
import { Avatar, ActivityCard, CustomDrawer } from '../../../components';
import { COLORS, SIZES } from '../../../constants/theme';
import { obtenerAlertasActivasPorTutor } from '../../../api/alertas';
import styles from './DashboardTutor.styles';

function SectionHeader({ title, actionLabel, onActionPress }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {actionLabel ? (
        <TouchableOpacity onPress={onActionPress} activeOpacity={0.8}>
          <Text style={styles.sectionAction}>{actionLabel}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

export default function DashboardTutor({ navigation }) {
  const { user } = useAuth();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [alertasActivas, setAlertasActivas] = useState([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 520,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 54,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

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

  const pcdACargo = [
    {
      id: 1,
      nombre: 'Ana Martinez',
      tipoDiscapacidad: 'Motora',
      grado: 'Moderado',
      actividadesPendientes: 2,
      actividadesCompletadas: 3,
      ultimaUbicacion: 'En casa',
      estado: 'online',
    },
    {
      id: 2,
      nombre: 'Laura Fernandez',
      tipoDiscapacidad: 'Intelectual',
      grado: 'Leve',
      actividadesPendientes: 1,
      actividadesCompletadas: 4,
      ultimaUbicacion: 'Centro de dia',
      estado: 'online',
    },
  ];

  const actividadesDelDia = [
    {
      id: 1,
      title: 'Tomar medicamento - Ana',
      description: 'Ibuprofeno 400mg',
      type: 'medicine',
      status: 'pending',
      startTime: '09:00',
      pcd: 'Ana Martinez',
      assignedBy: 'Dr. Garcia',
    },
    {
      id: 2,
      title: 'Fisioterapia - Ana',
      description: 'Sesion de rehabilitacion',
      type: 'therapy',
      status: 'inProgress',
      startTime: '14:00',
      pcd: 'Ana Martinez',
      assignedBy: 'Lic. Martinez',
    },
    {
      id: 3,
      title: 'Terapia ocupacional - Laura',
      description: 'Actividades de desarrollo',
      type: 'therapy',
      status: 'pending',
      startTime: '10:00',
      pcd: 'Laura Fernandez',
      assignedBy: 'Lic. Sofia Lopez',
    },
  ];

  const fechaHoy = useMemo(
    () =>
      new Date().toLocaleDateString('es-AR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      }),
    []
  );

  const resumen = {
    totalPCD: pcdACargo.length,
    actividadesPendientes: 3,
    actividadesHoy: 5,
    alertasCriticas: alertasActivas.length,
  };

  const stats = [
    {
      key: 'pcd',
      icon: 'people',
      value: resumen.totalPCD,
      label: 'PCD a cargo',
      helper: 'Seguimiento activo',
      color: '#0F766E',
      bg: '#E6F7F5',
    },
    {
      key: 'pendientes',
      icon: 'time',
      value: resumen.actividadesPendientes,
      label: 'Pendientes',
      helper: 'Para revisar',
      color: '#B45309',
      bg: '#FFF4DE',
    },
    {
      key: 'hoy',
      icon: 'clipboard',
      value: resumen.actividadesHoy,
      label: 'Actividades',
      helper: 'Del dia',
      color: '#1D4ED8',
      bg: '#E8F0FF',
    },
    {
      key: 'alertas',
      icon: 'warning',
      value: resumen.alertasCriticas,
      label: 'Alertas',
      helper: 'Criticas',
      color: '#BE123C',
      bg: '#FFE8EF',
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#F2F7FF', '#F8FBFF', '#FFFFFF']} style={styles.gradient} />
      <View style={styles.glowTop} />

      <View style={styles.customHeader}>
        <TouchableOpacity onPress={() => setDrawerVisible(true)} style={styles.menuButton} activeOpacity={0.85}>
          <Ionicons name="menu" size={24} color={COLORS.primary} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Panel tutor</Text>
          <Text style={styles.headerSubtitle}>supervision diaria</Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Alertas')}
          style={styles.notificationButton}
          activeOpacity={0.85}
        >
          <Ionicons
            name="notifications"
            size={20}
            color={alertasActivas.length > 0 ? COLORS.error : COLORS.warning}
          />
          {alertasActivas.length > 0 && (
            <View style={styles.badge}>
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
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <LinearGradient colors={['#1146A6', '#1D62D2']} style={styles.heroCard}>
            <View style={styles.heroTopRow}>
              <View style={styles.heroIdentity}>
                <Text style={styles.heroGreeting}>Bienvenido/a</Text>
                <Text style={styles.heroName}>{user?.Nombre} {user?.Apellido}</Text>
                <View style={styles.heroRolePill}>
                  <Ionicons name="shield-checkmark" size={14} color="#BFE2FF" />
                  <Text style={styles.heroRoleText}>Tutor responsable</Text>
                </View>
              </View>
              <Avatar
                name={`${user?.Nombre || ''} ${user?.Apellido || ''}`}
                type="tutor"
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
                onPress={() => navigation.navigate('Mapa')}
                style={styles.heroCta}
                activeOpacity={0.9}
              >
                <Ionicons name="map" size={18} color="#0D3B8E" />
                <Text style={styles.heroCtaText}>Ver mapa</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          <SectionHeader title="Resumen del dia" />
          <View style={styles.statsGrid}>
            {stats.map((stat) => (
              <TouchableOpacity key={stat.key} style={styles.statCard} activeOpacity={0.88}>
                <View style={[styles.statIconWrap, { backgroundColor: stat.bg }]}>
                  <Ionicons name={stat.icon} size={20} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={[styles.statHelper, { color: stat.color }]}>{stat.helper}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {alertasActivas.length > 0 && (
            <View style={styles.alertSection}>
              <SectionHeader
                title="Alertas criticas"
                actionLabel="Ver historial"
                onActionPress={() => navigation.navigate('Alertas')}
              />
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
                  <View style={styles.alertIcon}>
                    <Ionicons name="navigate" size={18} color={COLORS.white} />
                  </View>
                  <View style={styles.alertInfo}>
                    <Text style={styles.alertTitle}>{alerta.NombreUsuario}</Text>
                    <Text style={styles.alertSubtitle}>Fuera de zona segura</Text>
                    <Text style={styles.alertDistance}>{(alerta.DistanciaKm * 1000).toFixed(0)}m de distancia</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={COLORS.error} />
                </TouchableOpacity>
              ))}
            </View>
          )}

          <SectionHeader
            title="Personas a cargo"
            actionLabel="Ver todos"
            onActionPress={() => navigation.navigate('Usuarios')}
          />
          <View style={styles.pcdList}>
            {pcdACargo.map((pcd) => (
              <TouchableOpacity
                key={pcd.id}
                style={styles.pcdCard}
                onPress={() => navigation.navigate('Usuarios')}
                activeOpacity={0.9}
              >
                <View style={styles.pcdHeader}>
                  <Avatar name={pcd.nombre} type="user" size="medium" showStatus status={pcd.estado} />
                  <View style={styles.pcdInfo}>
                    <Text style={styles.pcdName}>{pcd.nombre}</Text>
                    <Text style={styles.pcdDetail}>{pcd.tipoDiscapacidad} | Grado {pcd.grado}</Text>
                    <View style={styles.pcdLocationRow}>
                      <Ionicons name="location" size={13} color="#1D4ED8" />
                      <Text style={styles.pcdLocationText}>{pcd.ultimaUbicacion}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.locationBtn}
                    onPress={(e) => {
                      e.stopPropagation();
                      navigation.navigate('Mapa', { pcdId: pcd.id, pcdNombre: pcd.nombre });
                    }}
                  >
                    <Ionicons name="navigate" size={18} color="#1D4ED8" />
                  </TouchableOpacity>
                </View>

                <View style={styles.pcdMetaRow}>
                  <View style={styles.metaBadge}>
                    <Ionicons name="checkmark-circle" size={14} color="#0F766E" />
                    <Text style={styles.metaBadgeText}>{pcd.actividadesCompletadas} completadas</Text>
                  </View>
                  <View style={styles.metaBadge}>
                    <Ionicons name="time" size={14} color="#B45309" />
                    <Text style={styles.metaBadgeText}>{pcd.actividadesPendientes} pendientes</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <SectionHeader title="Actividades de hoy" />
          <View style={styles.activitiesList}>
            {actividadesDelDia.map((activity) => (
              <ActivityCard
                key={activity.id}
                {...activity}
                onPress={() => Alert.alert('Actividad', `Gestionar: ${activity.title}`)}
              />
            ))}
          </View>

          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.quickActionBtn} onPress={() => navigation.navigate('Mapa')}>
              <Ionicons name="map" size={22} color={COLORS.white} />
              <Text style={styles.quickActionText}>Mapa en vivo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.quickActionBtn, { backgroundColor: '#0F766E' }]}
              onPress={() => navigation.navigate('Actividades')}
            >
              <Ionicons name="add-circle" size={22} color={COLORS.white} />
              <Text style={styles.quickActionText}>Nueva actividad</Text>
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
