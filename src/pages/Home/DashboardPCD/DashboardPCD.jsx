import React, { useEffect, useMemo, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../../contexts/AuthContext';
import { Avatar, ActivityCard } from '../../../components';
import { COLORS, SIZES } from '../../../constants/theme';
import styles from './DashboardPCD.styles';

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

export default function DashboardPCD({ navigation, onOpenDrawer }) {
  const { user } = useAuth();
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
  }, []);

  const fechaHoy = useMemo(
    () =>
      new Date().toLocaleDateString('es-AR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      }),
    []
  );

  const misActividades = [
    {
      id: 1,
      title: 'Tomar medicamento',
      description: 'Ibuprofeno 400mg despues del desayuno',
      type: 'medicine',
      status: 'pending',
      startTime: '09:00',
      endTime: '09:30',
      date: 'Hoy',
      assignedBy: 'Dr. Garcia',
    },
    {
      id: 2,
      title: 'Sesion de fisioterapia',
      description: 'Ejercicios con Lic. Martinez',
      type: 'therapy',
      status: 'inProgress',
      startTime: '14:00',
      endTime: '15:00',
      date: 'Hoy',
      assignedBy: 'Lic. Martinez',
    },
    {
      id: 3,
      title: 'Ejercicios matutinos',
      description: 'Rutina de estiramiento de 15 minutos',
      type: 'exercise',
      status: 'completed',
      startTime: '07:00',
      endTime: '07:15',
      date: 'Hoy',
      assignedBy: 'Maria Gonzalez',
    },
  ];

  const resumen = {
    completadas: 3,
    pendientes: 2,
    progreso: 60,
    proxima: 'Tomar medicamento - 09:00',
  };

  const stats = [
    {
      key: 'completadas',
      icon: 'checkmark-circle',
      value: resumen.completadas,
      label: 'Completadas',
      helper: 'Hoy',
      color: '#0F766E',
      bg: '#E6F7F5',
    },
    {
      key: 'pendientes',
      icon: 'time',
      value: resumen.pendientes,
      label: 'Pendientes',
      helper: 'Hoy',
      color: '#B45309',
      bg: '#FFF4DE',
    },
    {
      key: 'progreso',
      icon: 'bar-chart',
      value: `${resumen.progreso}%`,
      label: 'Progreso',
      helper: 'Diario',
      color: '#1D4ED8',
      bg: '#E8F0FF',
    },
    {
      key: 'recordatorios',
      icon: 'notifications',
      value: '2',
      label: 'Recordatorios',
      helper: 'Activos',
      color: '#7C3AED',
      bg: '#EFE7FF',
    },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#F2F7FF', '#F8FBFF', '#FFFFFF']} style={styles.gradient} />
      <View style={styles.glowTop} />

      <View style={styles.customHeader}>
        <TouchableOpacity onPress={onOpenDrawer} style={styles.menuButton} activeOpacity={0.85}>
          <Ionicons name="menu" size={24} color={COLORS.primary} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Mis actividades</Text>
          <Text style={styles.headerSubtitle}>seguimiento personal</Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Notificaciones')}
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
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          <LinearGradient colors={['#1146A6', '#1D62D2']} style={styles.heroCard}>
            <View style={styles.heroTopRow}>
              <View style={styles.heroIdentity}>
                <Text style={styles.heroGreeting}>Hola</Text>
                <Text style={styles.heroName}>{user?.Nombre} {user?.Apellido}</Text>
                <View style={styles.heroRolePill}>
                  <Ionicons name="sparkles" size={14} color="#BFE2FF" />
                  <Text style={styles.heroRoleText}>Tu progreso importa</Text>
                </View>
              </View>
              <Avatar
                name={`${user?.Nombre || ''} ${user?.Apellido || ''}`}
                type="user"
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

          <View style={styles.nextCard}>
            <View style={styles.nextCardHeader}>
              <Ionicons name="time" size={18} color="#1D4ED8" />
              <Text style={styles.nextCardTitle}>Proxima actividad</Text>
            </View>
            <Text style={styles.nextCardText}>{resumen.proxima}</Text>
          </View>

          <SectionHeader
            title="Mis actividades de hoy"
            actionLabel="Ver calendario"
            onActionPress={() => navigation.navigate('Calendario')}
          />
          <View style={styles.activitiesList}>
            {misActividades.map((activity) => (
              <ActivityCard
                key={activity.id}
                {...activity}
                onPress={() => Alert.alert('Actividad', `Ver detalles de: ${activity.title}`)}
              />
            ))}
          </View>

          <View style={styles.quickActions}>
            <TouchableOpacity
              style={[styles.quickActionBtn, { backgroundColor: '#1D4ED8' }]}
              onPress={() => navigation.navigate('Calendario')}
            >
              <Ionicons name="calendar" size={22} color={COLORS.white} />
              <Text style={styles.quickActionText}>Calendario</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.quickActionBtn, { backgroundColor: '#0F766E' }]}
              onPress={() => navigation.navigate('Reportes')}
            >
              <Ionicons name="stats-chart" size={22} color={COLORS.white} />
              <Text style={styles.quickActionText}>Mi progreso</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: SIZES.xl }} />
        </Animated.View>
      </ScrollView>

    </View>
  );
}
