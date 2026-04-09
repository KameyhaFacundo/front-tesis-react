import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { EmptyState, SkeletonCard } from '../../components';
import { COLORS, SIZES } from '../../constants/theme';
import styles from './Notificaciones.styles';
import {
  obtenerNotificacionesPorUsuario,
  marcarComoLeida,
  marcarTodasComoLeidas,
  eliminarNotificacion,
} from '../../api/notificaciones';

export default function Notificaciones() {
  const { user } = useAuth();
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('todas'); // todas, no_leidas, leidas

  useEffect(() => {
    cargarNotificaciones();
  }, [user]);

  const cargarNotificaciones = async () => {
    if (!user?.ID) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const data = await obtenerNotificacionesPorUsuario(user.ID);
      setNotificaciones(data.sort((a, b) =>
        new Date(b.FechaCreacion) - new Date(a.FechaCreacion)
      ));
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar las notificaciones');
    } finally {
      setLoading(false);
    }
  };

  const manejarNotificacion = async (notif) => {
    if (notif.Estado === 'no_leida') {
      try {
        await marcarComoLeida(notif.ID);
        cargarNotificaciones();
      } catch (error) {
        console.error('Error marcando como leída:', error);
      }
    }

    // Mostrar detalles
    Alert.alert(notif.Titulo, notif.Mensaje);
  };

  const marcarTodasLeidas = async () => {
    try {
      setLoading(true);
      await marcarTodasComoLeidas(user?.ID);
      Alert.alert('Éxito', 'Todas las notificaciones marcadas como leídas');
      cargarNotificaciones();
    } catch (error) {
      Alert.alert('Error', 'No se pudieron marcar las notificaciones');
    } finally {
      setLoading(false);
    }
  };

  const eliminar = async (id) => {
    try {
      await eliminarNotificacion(id);
      Alert.alert('Éxito', 'Notificación eliminada');
      cargarNotificaciones();
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar la notificación');
    }
  };

  const getTipoIcon = (tipo) => {
    switch (tipo) {
      case 'reminder':
        return 'alarm';
      case 'success':
        return 'checkmark-circle';
      case 'warning':
        return 'warning';
      case 'info':
        return 'information-circle';
      default:
        return 'notifications';
    }
  };

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case 'reminder':
        return COLORS.info;
      case 'success':
        return COLORS.success;
      case 'warning':
        return COLORS.warning;
      case 'info':
        return COLORS.primary;
      default:
        return COLORS.textSecondary;
    }
  };

  const getPrioridadColor = (prioridad) => {
    switch (prioridad) {
      case 'alta':
        return COLORS.error;
      case 'media':
        return COLORS.warning;
      case 'normal':
        return COLORS.info;
      default:
        return COLORS.textSecondary;
    }
  };

  const notificacionesFiltradas = notificaciones.filter((n) => {
    if (filtro === 'no_leidas') return n.Estado === 'no_leida';
    if (filtro === 'leidas') return n.Estado === 'leida';
    return true;
  });

  const noLeidas = notificaciones.filter((n) => n.Estado === 'no_leida').length;

  if (loading && notificaciones.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#F8FAFE', '#FFFFFF']} style={styles.gradient} />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Notificaciones</Text>
          {noLeidas > 0 && (
            <Text style={styles.headerSubtitle}>
              {noLeidas} {noLeidas === 1 ? 'nueva' : 'nuevas'}
            </Text>
          )}
        </View>

        {noLeidas > 0 && (
          <TouchableOpacity
            style={styles.markAllButton}
            onPress={marcarTodasLeidas}
          >
            <Ionicons name="checkmark-done" size={20} color={COLORS.primary} />
            <Text style={styles.markAllText}>Marcar todas</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filtros */}
      <View style={styles.filtersContainer}>
        <TouchableOpacity
          style={[styles.filterChip, filtro === 'todas' && styles.filterChipActive]}
          onPress={() => setFiltro('todas')}
        >
          <Text
            style={[
              styles.filterChipText,
              filtro === 'todas' && styles.filterChipTextActive,
            ]}
          >
            Todas ({notificaciones.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterChip,
            filtro === 'no_leidas' && styles.filterChipActive,
          ]}
          onPress={() => setFiltro('no_leidas')}
        >
          <Text
            style={[
              styles.filterChipText,
              filtro === 'no_leidas' && styles.filterChipTextActive,
            ]}
          >
            No leídas ({noLeidas})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterChip, filtro === 'leidas' && styles.filterChipActive]}
          onPress={() => setFiltro('leidas')}
        >
          <Text
            style={[
              styles.filterChipText,
              filtro === 'leidas' && styles.filterChipTextActive,
            ]}
          >
            Leídas ({notificaciones.length - noLeidas})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Lista de notificaciones */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={cargarNotificaciones} />}
        showsVerticalScrollIndicator={false}
      >
        {notificacionesFiltradas.map((notif) => (
          <TouchableOpacity
            key={notif.ID}
            style={[
              styles.notifCard,
              notif.Estado === 'no_leida' && styles.notifCardUnread,
            ]}
            onPress={() => manejarNotificacion(notif)}
          >
            <View style={styles.notifHeader}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: `${getTipoColor(notif.Tipo)}20` },
                ]}
              >
                <Ionicons
                  name={getTipoIcon(notif.Tipo)}
                  size={24}
                  color={getTipoColor(notif.Tipo)}
                />
              </View>

              <View style={styles.notifContent}>
                <View style={styles.notifTitleRow}>
                  <Text
                    style={[
                      styles.notifTitle,
                      notif.Estado === 'no_leida' && styles.notifTitleUnread,
                    ]}
                  >
                    {notif.Titulo}
                  </Text>
                  {notif.Estado === 'no_leida' && <View style={styles.unreadDot} />}
                </View>

                <Text style={styles.notifMessage}>{notif.Mensaje}</Text>

                <View style={styles.notifFooter}>
                  <Text style={styles.notifTime}>
                    {new Date(notif.FechaCreacion).toLocaleString('es-ES', {
                      day: '2-digit',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Text>

                  {notif.Prioridad && (
                    <View style={styles.priorityBadge}>
                      <View
                        style={[
                          styles.priorityDot,
                          { backgroundColor: getPrioridadColor(notif.Prioridad) },
                        ]}
                      />
                      <Text
                        style={[
                          styles.priorityText,
                          { color: getPrioridadColor(notif.Prioridad) },
                        ]}
                      >
                        {notif.Prioridad.charAt(0).toUpperCase() + notif.Prioridad.slice(1)}
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                  Alert.alert(
                    'Eliminar',
                    '¿Eliminar esta notificación?',
                    [
                      { text: 'Cancelar', style: 'cancel' },
                      {
                        text: 'Eliminar',
                        style: 'destructive',
                        onPress: () => eliminar(notif.ID),
                      },
                    ]
                  );
                }}
              >
                <Ionicons name="trash-outline" size={20} color={COLORS.error} />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        {notificacionesFiltradas.length === 0 && (
          <EmptyState
            icon="notifications-outline"
            title="No hay notificaciones"
            description={
              filtro === 'no_leidas'
                ? 'No tienes notificaciones sin leer.'
                : filtro === 'leidas'
                ? 'No tienes notificaciones leidas.'
                : 'Cuando recibas notificaciones apareceran aqui.'
            }
          />
        )}

        <View style={{ height: SIZES.xl }} />
      </ScrollView>
    </View>
  );
}

