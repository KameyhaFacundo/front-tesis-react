import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import Avatar from '../Avatar/Avatar';
import { COLORS } from '../../constants/theme';
import styles, { DRAWER_WIDTH } from './CustomDrawer.styles';

const CustomDrawer = ({ visible, onClose, navigation, currentRoute }) => {
  const { user, logout } = useAuth();
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 280,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 280,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -DRAWER_WIDTH,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, slideAnim, fadeAnim]);

  const menuItems = [
    { id: 'dashboard', title: 'Inicio', icon: 'home', route: 'Dashboard' },
    { id: 'usuarios', title: 'Usuarios', icon: 'people', route: 'Usuarios' },
    { id: 'profesionales', title: 'Profesionales', icon: 'medkit', route: 'Profesionales' },
    { id: 'actividades', title: 'Actividades', icon: 'clipboard', route: 'Actividades' },
    { id: 'calendario', title: 'Calendario', icon: 'calendar', route: 'Calendario' },
    { id: 'mapa', title: 'Ubicacion GPS', icon: 'location', route: 'Mapa' },
    { id: 'reportes', title: 'Reportes', icon: 'document-text', route: 'Reportes' },
    { id: 'notificaciones', title: 'Notificaciones', icon: 'notifications', route: 'Notificaciones' },
    { id: 'alertas', title: 'Alertas', icon: 'alert-circle', route: 'Alertas' },
    { id: 'perfil', title: 'Perfil', icon: 'person-circle', route: 'Perfil' },
  ];

  const handleNavigate = (route) => {
    onClose();
    setTimeout(() => {
      if (navigation?.navigate) navigation.navigate(route);
    }, 250);
  };

  const handleLogout = () => {
    Alert.alert('Cerrar sesion', 'Estas seguro de que deseas salir?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Salir',
        style: 'destructive',
        onPress: async () => {
          onClose();
          await logout();
          setTimeout(() => {
            if (navigation?.replace) navigation.replace('Login');
          }, 260);
        },
      },
    ]);
  };

  const roleLabel = user?.Rol || 'Usuario';
  const roleIcon = roleLabel === 'Tutor' ? 'people-circle' : roleLabel === 'PCD' ? 'person' : 'medkit';

  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}> 
          <TouchableOpacity style={styles.overlayTouchable} activeOpacity={1} onPress={onClose} />
        </Animated.View>

        <Animated.View style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}> 
          <LinearGradient colors={['#F2F7FF', '#FFFFFF']} style={styles.drawerTopBg} />

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.drawerBrand}>
              <LinearGradient colors={['#1146A6', '#1D62D2']} style={styles.brandLogoContainer}>
                <Ionicons name="heart" size={20} color="#FFFFFF" />
              </LinearGradient>
              <View>
                <Text style={styles.brandName}>AcompanAR</Text>
                <Text style={styles.brandTagline}>Panel de gestion y cuidado</Text>
              </View>
            </View>

            <View style={styles.userProfileCard}>
              <Avatar
                name={user ? `${user.Nombre} ${user.Apellido || ''}` : 'Usuario'}
                type={user?.Rol === 'PCD' ? 'user' : user?.Rol === 'Tutor' ? 'tutor' : 'professional'}
                size="large"
                showStatus
                status="online"
              />
              <View style={styles.userProfileInfo}>
                <Text style={styles.userProfileName}>{user ? `${user.Nombre} ${user.Apellido || ''}` : 'Usuario'}</Text>
                <View style={styles.roleBadge}>
                  <Ionicons name={roleIcon} size={12} color="#1D4ED8" />
                  <Text style={styles.roleText}>{roleLabel}</Text>
                </View>
              </View>
            </View>

            <Text style={styles.navLabel}>NAVEGACION</Text>
            {menuItems.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.menuItem, isActive && styles.menuItemActive]}
                  onPress={() => handleNavigate(item.route)}
                  activeOpacity={0.82}
                >
                  <View style={[styles.menuIconWrap, isActive && styles.menuIconWrapActive]}>
                    <Ionicons name={item.icon} size={18} color={isActive ? '#1D4ED8' : COLORS.textSecondary} />
                  </View>
                  <Text style={[styles.menuItemText, isActive && styles.menuItemTextActive]}>{item.title}</Text>
                  {isActive && <View style={styles.activeDot} />}
                </TouchableOpacity>
              );
            })}

            <Text style={styles.navLabel}>CUENTA</Text>
            <TouchableOpacity style={styles.logoutItem} onPress={handleLogout} activeOpacity={0.8}>
              <View style={styles.logoutIconWrap}>
                <Ionicons name="log-out-outline" size={18} color={COLORS.error} />
              </View>
              <Text style={styles.logoutText}>Cerrar sesion</Text>
            </TouchableOpacity>
          </ScrollView>

          <View style={styles.drawerFooter}>
            <Text style={styles.footerVersion}>Version 1.0.0</Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default CustomDrawer;
