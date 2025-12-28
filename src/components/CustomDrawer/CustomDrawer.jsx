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
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -DRAWER_WIDTH,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const menuItems = [
    { id: 'dashboard', title: 'Inicio', icon: 'home', route: 'Dashboard' },
    { id: 'usuarios', title: 'Usuarios', icon: 'people', route: 'Usuarios' },
    { id: 'profesionales', title: 'Profesionales', icon: 'medkit', route: 'Profesionales' },
    { id: 'actividades', title: 'Actividades', icon: 'clipboard', route: 'Actividades' },
    { id: 'calendario', title: 'Calendario', icon: 'calendar', route: 'Calendario' },
    { id: 'mapa', title: 'Ubicación GPS', icon: 'location', route: 'Mapa' },
    { id: 'reportes', title: 'Reportes de Progreso', icon: 'document-text', route: 'Reportes' },
    { id: 'notificaciones', title: 'Notificaciones', icon: 'notifications', route: 'Notificaciones' },
  ];

  const handleNavigate = (route) => {
    onClose();
    // Pequeño delay para que se cierre el drawer antes de navegar
    setTimeout(() => {
      if (navigation && navigation.navigate) {
        navigation.navigate(route);
      }
    }, 300);
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que deseas salir?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Salir',
          style: 'destructive',
          onPress: async () => {
            onClose();
            await logout();
            setTimeout(() => {
              if (navigation && navigation.replace) {
                navigation.replace('Login');
              }
            }, 300);
          },
        },
      ]
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        {/* Overlay */}
        <Animated.View
          style={[
            styles.overlay,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <TouchableOpacity
            style={styles.overlayTouchable}
            activeOpacity={1}
            onPress={onClose}
          />
        </Animated.View>

        {/* Drawer */}
        <Animated.View
          style={[
            styles.drawer,
            {
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Brand Section */}
            <View style={styles.drawerBrand}>
              <View style={styles.brandLogoContainer}>
                <Ionicons name="heart" size={28} color={COLORS.primary} />
              </View>
              <Text style={styles.brandName}>Acompañar</Text>
              <Text style={styles.brandTagline}>Sistema de gestión</Text>
            </View>

            {/* User Profile Card */}
            <View style={styles.userProfileCard}>
              <Avatar
                name={user ? `${user.Nombre} ${user.Apellido || ''}` : 'Usuario'}
                type={user?.Rol === 'PCD' ? 'user' : user?.Rol === 'Tutor' ? 'tutor' : 'professional'}
                size="large"
                showStatus
                status="online"
              />
              <View style={styles.userProfileInfo}>
                <Text style={styles.userProfileName}>
                  {user ? `${user.Nombre} ${user.Apellido || ''}` : 'Usuario'}
                </Text>
                <View style={styles.roleBadge}>
                  <Ionicons name="shield-checkmark" size={12} color={COLORS.info} />
                  <Text style={styles.roleText}>{user?.Rol || 'Usuario'}</Text>
                </View>
              </View>
            </View>

            {/* Menu Label */}
            <Text style={styles.navLabel}>MENÚ PRINCIPAL</Text>

            {/* Menu Items */}
            {menuItems.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.menuItem,
                    isActive && styles.menuItemActive,
                  ]}
                  onPress={() => handleNavigate(item.route)}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={item.icon}
                    size={22}
                    color={isActive ? COLORS.primary : COLORS.textSecondary}
                  />
                  <Text
                    style={[
                      styles.menuItemText,
                      isActive && styles.menuItemTextActive,
                    ]}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            })}

            {/* Account Label */}
            <Text style={styles.navLabel}>CUENTA</Text>

            {/* Logout Button */}
            <TouchableOpacity
              style={styles.logoutItem}
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <Ionicons name="log-out-outline" size={22} color={COLORS.error} />
              <Text style={styles.logoutText}>Cerrar Sesión</Text>
            </TouchableOpacity>
          </ScrollView>

          {/* Footer */}
          <View style={styles.drawerFooter}>
            <Text style={styles.footerVersion}>Versión 1.0.0</Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default CustomDrawer;
