import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../../contexts/AuthContext';
import { Avatar, ActivityCard, CustomDrawer } from '../../../components';
import { COLORS, SIZES } from '../../../constants/theme';
import styles from './Home.styles';
import Profesionales from '../../Profesionales/Profesionales';
import DashboardPCD from '../DashboardPCD/DashboardPCD';
import DashboardTutor from '../DashboardTutor/DashboardTutor';
import DashboardProfesional from '../DashboardProfesional/DashboardProfesional';
import Usuarios from '../../Usuarios/Usuarios';
import Actividades from '../../Actividades/Actividades';
import Calendario from '../../Calendario/Calendario';
import Notificaciones from '../../Notificaciones/Notificaciones';
import Reportes from '../../Reportes/Reportes';
import Mapa from '../../Mapa/Mapa';
import Alertas from '../../Alertas/Alertas';
import Perfil from '../../Perfil/Perfil';

const Stack = createNativeStackNavigator();

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

function QuickAction({ icon, label, color, onPress }) {
  return (
    <TouchableOpacity style={styles.quickActionCard} onPress={onPress} activeOpacity={0.88}>
      <View style={[styles.quickActionIcon, { backgroundColor: `${color}1A` }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text style={styles.quickActionLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function DashboardScreen({ navigation }) {
  const { isPCD, isTutor, isProfesional } = useAuth();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const onOpenDrawer = () => setDrawerVisible(true);

  const renderDashboard = () => {
    if (isPCD()) return <DashboardPCD navigation={navigation} onOpenDrawer={onOpenDrawer} />;
    if (isTutor()) return <DashboardTutor navigation={navigation} onOpenDrawer={onOpenDrawer} />;
    if (isProfesional()) return <DashboardProfesional navigation={navigation} onOpenDrawer={onOpenDrawer} />;
    return <DefaultDashboard navigation={navigation} onOpenDrawer={onOpenDrawer} />;
  };

  return (
    <>
      {renderDashboard()}
      <CustomDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        navigation={navigation}
        currentRoute="Dashboard"
      />
    </>
  );
}

function DefaultDashboard({ navigation, onOpenDrawer }) {
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

  const dateString = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const activitiesData = [
    {
      id: 1,
      title: 'Tomar ibuprofeno',
      description: 'Tomar 400mg despues del desayuno',
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
      description: 'Ejercicios de rehabilitacion',
      type: 'therapy',
      status: 'inProgress',
      startTime: '14:00',
      endTime: '15:00',
      date: 'Hoy',
      assignedBy: 'Lic. Martinez',
    },
    {
      id: 3,
      title: 'Ejercicios de estiramiento',
      description: 'Rutina matutina de 15 minutos',
      type: 'exercise',
      status: 'completed',
      startTime: '07:00',
      endTime: '07:15',
      date: 'Hoy',
      assignedBy: 'Tutor principal',
    },
  ];

  const stats = [
    {
      icon: 'checkmark-circle',
      label: 'Completadas',
      value: '12',
      helper: '+2 hoy',
      color: '#0F766E',
      bg: '#E6F7F5',
    },
    {
      icon: 'time-outline',
      label: 'Pendientes',
      value: '5',
      helper: '3 urgentes',
      color: '#B45309',
      bg: '#FFF4DE',
    },
    {
      icon: 'pulse',
      label: 'En progreso',
      value: '3',
      helper: '1 activa',
      color: '#1D4ED8',
      bg: '#E8F0FF',
    },
    {
      icon: 'warning',
      label: 'Alertas',
      value: '1',
      helper: 'Requiere atencion',
      color: '#BE123C',
      bg: '#FFE8EF',
    },
  ];

  const quickActions = [
    {
      key: 'actividades',
      icon: 'clipboard',
      label: 'Actividades',
      color: '#1D4ED8',
      onPress: () => navigation.navigate('Actividades'),
    },
    {
      key: 'mapa',
      icon: 'location',
      label: 'Mapa',
      color: '#0F766E',
      onPress: () => navigation.navigate('Mapa'),
    },
    {
      key: 'calendario',
      icon: 'calendar',
      label: 'Calendario',
      color: '#7C3AED',
      onPress: () => navigation.navigate('Calendario'),
    },
    {
      key: 'reportes',
      icon: 'stats-chart',
      label: 'Reportes',
      color: '#C2410C',
      onPress: () => navigation.navigate('Reportes'),
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient colors={['#F2F7FF', '#F8FBFF', '#FFFFFF']} style={styles.gradient} />
      <View style={styles.glowTop} />

      <View style={styles.customHeader}>
        <TouchableOpacity onPress={onOpenDrawer} style={styles.menuButton} activeOpacity={0.85}>
          <Ionicons name="menu" size={24} color={COLORS.primary} />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Inicio</Text>
          <Text style={styles.headerSubtitle}>panel de seguimiento</Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('Notificaciones')}
          style={styles.notificationButton}
          activeOpacity={0.85}
        >
          <Ionicons name="notifications" size={20} color={COLORS.warning} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>1</Text>
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
            <View style={styles.heroRow}>
              <View style={styles.heroLeft}>
                <Text style={styles.heroGreeting}>Hola, bienvenido</Text>
                <Text style={styles.heroName}>Usuario Demo</Text>
                <Text style={styles.heroDate}>{dateString}</Text>
              </View>
              <Avatar name="Usuario Demo" type="user" size="large" showStatus status="online" />
            </View>

            <TouchableOpacity
              style={styles.heroPrimaryAction}
              onPress={() => navigation.navigate('Actividades')}
              activeOpacity={0.9}
            >
              <Ionicons name="flash" size={18} color="#0D3B8E" />
              <Text style={styles.heroPrimaryActionText}>Ver prioridad de hoy</Text>
            </TouchableOpacity>
          </LinearGradient>

          <SectionHeader title="Resumen diario" />
          <View style={styles.statsGrid}>
            {stats.map((stat) => (
              <TouchableOpacity key={stat.label} style={styles.statCard} activeOpacity={0.88}>
                <View style={[styles.statIcon, { backgroundColor: stat.bg }]}>
                  <Ionicons name={stat.icon} size={20} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
                <Text style={[styles.statHelper, { color: stat.color }]}>{stat.helper}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <SectionHeader
            title="Prioridad ahora"
            actionLabel="Ver todas"
            onActionPress={() => navigation.navigate('Actividades')}
          />
          <View style={styles.activitiesList}>
            {activitiesData.map((activity) => (
              <ActivityCard
                key={activity.id}
                {...activity}
                onPress={() => Alert.alert('Actividad', `Ver detalles de: ${activity.title}`)}
              />
            ))}
          </View>

          <SectionHeader title="Accesos rapidos" />
          <View style={styles.quickActionsGrid}>
            {quickActions.map(({ key, ...rest }) => (
              <QuickAction key={key} {...rest} />
            ))}
          </View>

          <View style={{ height: SIZES.xl }} />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ScreenWithDrawer({ Component, currentRoute, ...props }) {
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.customHeader}>
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={styles.menuButton}
          activeOpacity={0.85}
        >
          <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{currentRoute}</Text>

        <TouchableOpacity
          onPress={() => setDrawerVisible(true)}
          style={styles.menuButton}
          activeOpacity={0.85}
        >
          <Ionicons name="menu" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <Component {...props} />

      <CustomDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        navigation={props.navigation}
        currentRoute={currentRoute}
      />
    </SafeAreaView>
  );
}

export default function Home() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Usuarios">
        {(props) => <ScreenWithDrawer {...props} Component={Usuarios} currentRoute="Usuarios" />}
      </Stack.Screen>
      <Stack.Screen name="Profesionales">
        {(props) => <ScreenWithDrawer {...props} Component={Profesionales} currentRoute="Profesionales" />}
      </Stack.Screen>
      <Stack.Screen name="Actividades">
        {(props) => <ScreenWithDrawer {...props} Component={Actividades} currentRoute="Actividades" />}
      </Stack.Screen>
      <Stack.Screen name="Calendario">
        {(props) => <ScreenWithDrawer {...props} Component={Calendario} currentRoute="Calendario" />}
      </Stack.Screen>
      <Stack.Screen name="Reportes">
        {(props) => <ScreenWithDrawer {...props} Component={Reportes} currentRoute="Reportes" />}
      </Stack.Screen>
      <Stack.Screen name="Notificaciones">
        {(props) => <ScreenWithDrawer {...props} Component={Notificaciones} currentRoute="Notificaciones" />}
      </Stack.Screen>
      <Stack.Screen name="Mapa">
        {(props) => <ScreenWithDrawer {...props} Component={Mapa} currentRoute="Mapa" />}
      </Stack.Screen>
      <Stack.Screen name="Alertas">
        {(props) => <ScreenWithDrawer {...props} Component={Alertas} currentRoute="Alertas" />}
      </Stack.Screen>
      <Stack.Screen name="Perfil">
        {(props) => <ScreenWithDrawer {...props} Component={Perfil} currentRoute="Perfil" />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
