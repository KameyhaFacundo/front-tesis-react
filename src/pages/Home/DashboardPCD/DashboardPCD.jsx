import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../../contexts/AuthContext';
import { Avatar, ActivityCard, CustomDrawer } from '../../../components';
import { COLORS, SIZES } from '../../../constants/theme';
import styles from './DashboardPCD.styles';

export default function DashboardPCD({ navigation }) {
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

  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Actividades del usuario (simuladas)
  const misActividades = [
    {
      id: 1,
      title: 'Tomar Medicamento',
      description: 'Ibuprofeno 400mg después del desayuno',
      type: 'medicine',
      status: 'pending',
      startTime: '09:00',
      endTime: '09:30',
      date: 'Hoy',
      assignedBy: 'Dr. García',
    },
    {
      id: 2,
      title: 'Sesión de Fisioterapia',
      description: 'Ejercicios de rehabilitación con Lic. Martínez',
      type: 'therapy',
      status: 'inProgress',
      startTime: '14:00',
      endTime: '15:00',
      date: 'Hoy',
      assignedBy: 'Lic. Martínez',
    },
    {
      id: 3,
      title: 'Ejercicios Matutinos',
      description: 'Rutina de estiramiento de 15 minutos',
      type: 'exercise',
      status: 'completed',
      startTime: '07:00',
      endTime: '07:15',
      date: 'Hoy',
      assignedBy: 'María González',
    },
  ];

  const resumen = {
    completadas: 3,
    pendientes: 2,
    proxima: 'Tomar Medicamento - 09:00',
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
          activeOpacity={0.7}
        >
          <Ionicons name="menu" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mis Actividades</Text>
        <TouchableOpacity
          onPress={() => Alert.alert('Notificaciones', 'Tienes 2 recordatorios pendientes')}
          style={styles.notificationButton}
          activeOpacity={0.7}
        >
          <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
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
          {/* Saludo personalizado */}
          <View style={styles.welcomeSection}>
            <View style={styles.welcomeContent}>
              <View>
                <Text style={styles.greeting}>¡Hola!</Text>
                <Text style={styles.username}>{user?.Nombre} {user?.Apellido}</Text>
                <Text style={styles.dateText}>{dateString}</Text>
              </View>
              <Avatar
                name={`${user?.Nombre} ${user?.Apellido}`}
                type="user"
                size="xlarge"
                showStatus
                status="online"
              />
            </View>
          </View>

          {/* Resumen del día */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <Ionicons name="calendar-outline" size={24} color={COLORS.primary} />
              <Text style={styles.summaryTitle}>Resumen del Día</Text>
            </View>
            <View style={styles.summaryStats}>
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryValue, { color: COLORS.success }]}>
                  {resumen.completadas}
                </Text>
                <Text style={styles.summaryLabel}>Completadas</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryValue, { color: COLORS.warning }]}>
                  {resumen.pendientes}
                </Text>
                <Text style={styles.summaryLabel}>Pendientes</Text>
              </View>
            </View>
            <View style={styles.nextActivity}>
              <Ionicons name="time-outline" size={16} color={COLORS.info} />
              <Text style={styles.nextActivityText}>
                Próxima: {resumen.proxima}
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderLeft}>
                <Ionicons name="list" size={24} color={COLORS.primary} />
                <Text style={styles.sectionTitle}>Mis Actividades de Hoy</Text>
              </View>
            </View>

            <View style={styles.activitiesList}>
              {misActividades.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  {...activity}
                  onPress={() => Alert.alert('Actividad', `Ver detalles de: ${activity.title}`)}
                />
              ))}
            </View>
          </View>

  
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={[styles.quickActionBtn, { backgroundColor: COLORS.primaryLight }]}
              onPress={() => navigation.navigate('Calendario')}
            >
              <Ionicons name="calendar" size={24} color={COLORS.primary} />
              <Text style={[styles.quickActionText, { color: COLORS.primary }]}>
                Ver Calendario
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.quickActionBtn, { backgroundColor: COLORS.secondaryLight }]}
              onPress={() => navigation.navigate('Reportes')}
            >
              <Ionicons name="bar-chart" size={24} color={COLORS.secondary} />
              <Text style={[styles.quickActionText, { color: COLORS.secondary }]}>
                Mi Progreso
              </Text>
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

