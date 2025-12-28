import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Alert, Animated } from 'react-native';
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

const Stack = createNativeStackNavigator();

// Pantalla de Dashboard principal
function DashboardScreen({ navigation }) {
  const { user, isPCD, isTutor, isProfesional } = useAuth();

  // Renderizar dashboard según el rol del usuario
  if (isPCD()) {
    return <DashboardPCD navigation={navigation} />;
  }

  if (isTutor()) {
    return <DashboardTutor navigation={navigation} />;
  }

  if (isProfesional()) {
    return <DashboardProfesional navigation={navigation} />;
  }

  // Dashboard por defecto (fallback)
  return <DefaultDashboard navigation={navigation} />;
}

// Dashboard por defecto (fallback para otros roles)
function DefaultDashboard({ navigation }) {
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

  const activitiesData = [
    {
      id: 1,
      title: 'Tomar Ibuprofeno',
      description: 'Tomar 400mg después del desayuno',
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
      description: 'Ejercicios de rehabilitación',
      type: 'therapy',
      status: 'inProgress',
      startTime: '14:00',
      endTime: '15:00',
      date: 'Hoy',
      assignedBy: 'Lic. Martínez',
    },
    {
      id: 3,
      title: 'Ejercicios de Estiramiento',
      description: 'Rutina matutina de 15 minutos',
      type: 'exercise',
      status: 'completed',
      startTime: '07:00',
      endTime: '07:15',
      date: 'Hoy',
      assignedBy: 'Tutor Principal',
    },
  ];

  const stats = [
    {
      icon: 'checkmark-circle',
      label: 'Completadas',
      value: '12',
      color: COLORS.success,
      bgColor: '#E8F5E9',
      trend: '+2 hoy'
    },
    {
      icon: 'time-outline',
      label: 'Pendientes',
      value: '5',
      color: COLORS.warning,
      bgColor: '#FFF3E0',
      trend: '3 urgentes'
    },
    {
      icon: 'pulse',
      label: 'En Progreso',
      value: '3',
      color: COLORS.info,
      bgColor: '#E3F2FD',
      trend: '1 activa'
    },
  ];

  // ...existing code...

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F8FAFE', '#FFFFFF']}
        style={styles.gradient}
      />

      <View style={styles.customHeader}>
        <TouchableOpacity
          onPress={() => setDrawerVisible(true)}
          style={styles.menuButton}
          activeOpacity={0.7}
        >
          <Ionicons name="menu" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Inicio</Text>
        <TouchableOpacity
          onPress={() => Alert.alert('Notificaciones', 'No tienes notificaciones nuevas')}
          style={styles.notificationButton}
          activeOpacity={0.7}
        >
          <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
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
          <View style={styles.header}>
            <View style={styles.headerRow}>
              <View style={styles.headerLeft}>
                <Text style={styles.greeting}>Hola, bienvenido</Text>
                <Text style={styles.username}>Usuario Demo</Text>
                <Text style={styles.dateText}>{dateString}</Text>
              </View>
              <View style={styles.headerRight}>
                <Avatar name="Usuario Demo" type="user" size="xlarge" showStatus status="online" />
              </View>
            </View>
          </View>

          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <TouchableOpacity key={index} style={styles.statCard} activeOpacity={0.7}>
                <View style={[styles.statIconContainer, { backgroundColor: stat.bgColor }]}>
                  <Ionicons name={stat.icon} size={28} color={stat.color} />
                </View>
                <View style={styles.statContent}>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                  <Text style={[styles.statTrend, { color: stat.color }]}>{stat.trend}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Acciones rápidas eliminadas */}

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionHeaderLeft}>
                <Ionicons name="today" size={24} color={COLORS.primary} />
                <Text style={styles.sectionTitle}>Actividades de Hoy</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate('Actividades')}
                style={styles.seeAllButton}
              >
                <Text style={styles.seeAllText}>Ver todas</Text>
                <Ionicons name="arrow-forward" size={16} color={COLORS.primary} />
              </TouchableOpacity>
            </View>

            <View style={styles.activitiesList}>
              {activitiesData.map((activity) => (
                <ActivityCard
                  key={activity.id}
                  {...activity}
                  onPress={() => Alert.alert('Actividad', `Ver detalles de: ${activity.title}`)}
                />
              ))}
            </View>
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

function UsuariosScreen({ navigation }) {
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.customHeader}>
        <TouchableOpacity
          onPress={() => setDrawerVisible(true)}
          style={styles.menuButton}
        >
          <Ionicons name="menu" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Usuarios</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.centerContent}>
        <Ionicons name="people" size={64} color={COLORS.primary} />
        <Text style={styles.title}>Gestión de Usuarios</Text>
        <Text style={styles.description}>
          Administra personas con discapacidad, tutores y profesionales
        </Text>
      </View>

      <CustomDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        navigation={navigation}
        currentRoute="Usuarios"
      />
    </SafeAreaView>
  );
}

function ProfesionalesScreen({ navigation }) {
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.customHeader}>
        <TouchableOpacity
          onPress={() => setDrawerVisible(true)}
          style={styles.menuButton}
        >
          <Ionicons name="menu" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profesionales</Text>
        <View style={{ width: 40 }} />
      </View>

      <Profesionales />

      <CustomDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        navigation={navigation}
        currentRoute="Profesionales"
      />
    </SafeAreaView>
  );
}

function ActividadesScreen({ navigation }) {
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.customHeader}>
        <TouchableOpacity
          onPress={() => setDrawerVisible(true)}
          style={styles.menuButton}
        >
          <Ionicons name="menu" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Actividades</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.centerContent}>
        <Ionicons name="clipboard" size={64} color={COLORS.secondary} />
        <Text style={styles.title}>Actividades</Text>
        <Text style={styles.description}>
          Gestiona medicamentos, terapias y ejercicios
        </Text>
      </View>

      <CustomDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        navigation={navigation}
        currentRoute="Actividades"
      />
    </SafeAreaView>
  );
}

function CalendarioScreen({ navigation }) {
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.customHeader}>
        <TouchableOpacity
          onPress={() => setDrawerVisible(true)}
          style={styles.menuButton}
        >
          <Ionicons name="menu" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Calendario</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.centerContent}>
        <Ionicons name="calendar" size={64} color={COLORS.success} />
        <Text style={styles.title}>Calendario</Text>
        <Text style={styles.description}>
          Visualiza actividades completadas y pendientes
        </Text>
      </View>

      <CustomDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        navigation={navigation}
        currentRoute="Calendario"
      />
    </SafeAreaView>
  );
}

function ReportesScreen({ navigation }) {
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.customHeader}>
        <TouchableOpacity
          onPress={() => setDrawerVisible(true)}
          style={styles.menuButton}
        >
          <Ionicons name="menu" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reportes de Progreso</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.centerContent}>
        <Ionicons name="document-text" size={64} color={COLORS.accent} />
        <Text style={styles.title}>Reportes de Progreso</Text>
        <Text style={styles.description}>
          Consulta y crea reportes de avance
        </Text>
      </View>

      <CustomDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        navigation={navigation}
        currentRoute="Reportes"
      />
    </SafeAreaView>
  );
}

function NotificacionesScreen({ navigation }) {
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.customHeader}>
        <TouchableOpacity
          onPress={() => setDrawerVisible(true)}
          style={styles.menuButton}
        >
          <Ionicons name="menu" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notificaciones</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.centerContent}>
        <Ionicons name="notifications" size={64} color={COLORS.info} />
        <Text style={styles.title}>Notificaciones</Text>
        <Text style={styles.description}>
          Alertas y recordatorios de actividades
        </Text>
      </View>

      <CustomDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        navigation={navigation}
        currentRoute="Notificaciones"
      />
    </SafeAreaView>
  );
}

// Wrapper con CustomDrawer para pantallas que lo necesitan
function ScreenWithDrawer({ Component, currentRoute, ...props }) {
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.customHeader}>
        <TouchableOpacity
          onPress={() => setDrawerVisible(true)}
          style={styles.menuButton}
        >
          <Ionicons name="menu" size={28} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{currentRoute}</Text>
        <View style={{ width: 40 }} />
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

// Componente principal con Stack Navigator
export default function Home() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Usuarios">
        {(props) => <ScreenWithDrawer {...props} Component={Usuarios} currentRoute="Usuarios" />}
      </Stack.Screen>
      <Stack.Screen name="Profesionales" component={ProfesionalesScreen} />
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
    </Stack.Navigator>
  );
}

