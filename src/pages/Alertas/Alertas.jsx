import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import styles from './Alertas.styles';
import {
  obtenerAlertasPorTutor,
  resolverAlerta,
  marcarFalsaAlarma,
} from '../../api/alertas';

export default function Alertas({ navigation }) {
  const { user } = useAuth();
  const [alertas, setAlertas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState('todas'); // todas, activa, resuelta, falsa_alarma

  useEffect(() => {
    cargarAlertas();
  }, []);

  const cargarAlertas = async () => {
    try {
      setLoading(true);
      const data = await obtenerAlertasPorTutor(user.ID);
      setAlertas(data);
    } catch (error) {
      console.error('Error cargando alertas:', error);
      Alert.alert('Error', 'No se pudieron cargar las alertas');
    } finally {
      setLoading(false);
    }
  };

  const handleResolverAlerta = async (alertaID, nombreUsuario) => {
    Alert.alert(
      'Resolver Alerta',
      `¿${nombreUsuario} ha vuelto a la zona segura?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sí, resolver',
          onPress: async () => {
            try {
              await resolverAlerta(alertaID);
              Alert.alert('Éxito', 'Alerta resuelta correctamente');
              cargarAlertas();
            } catch (error) {
              console.error('Error resolviendo alerta:', error);
              Alert.alert('Error', 'No se pudo resolver la alerta');
            }
          },
        },
      ]
    );
  };

  const handleMarcarFalsaAlarma = async (alertaID) => {
    Alert.alert(
      'Falsa Alarma',
      '¿Estás seguro de marcar esto como falsa alarma?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sí, marcar',
          style: 'destructive',
          onPress: async () => {
            try {
              await marcarFalsaAlarma(alertaID);
              Alert.alert('Éxito', 'Marcado como falsa alarma');
              cargarAlertas();
            } catch (error) {
              console.error('Error marcando falsa alarma:', error);
              Alert.alert('Error', 'No se pudo marcar como falsa alarma');
            }
          },
        },
      ]
    );
  };

  const alertasFiltradas = alertas.filter((alerta) => {
    if (filtroEstado === 'todas') return true;
    return alerta.Estado === filtroEstado;
  });

  const getIconoEstado = (estado) => {
    switch (estado) {
      case 'activa':
        return { name: 'warning', color: COLORS.error };
      case 'resuelta':
        return { name: 'checkmark-circle', color: COLORS.success };
      case 'falsa_alarma':
        return { name: 'close-circle', color: COLORS.textSecondary };
      default:
        return { name: 'alert-circle', color: COLORS.warning };
    }
  };

  const getColorEstado = (estado) => {
    switch (estado) {
      case 'activa':
        return COLORS.error;
      case 'resuelta':
        return COLORS.success;
      case 'falsa_alarma':
        return COLORS.textSecondary;
      default:
        return COLORS.warning;
    }
  };

  const formatFecha = (timestamp) => {
    const fecha = new Date(timestamp);
    const ahora = new Date();
    const diff = ahora - fecha;
    const minutos = Math.floor(diff / 60000);
    const horas = Math.floor(diff / 3600000);
    const dias = Math.floor(diff / 86400000);

    if (minutos < 1) return 'Ahora';
    if (minutos < 60) return `Hace ${minutos}min`;
    if (horas < 24) return `Hace ${horas}h`;
    if (dias < 7) return `Hace ${dias}d`;

    return fecha.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <View style={styles.container}>
      {/* Filtros */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        <TouchableOpacity
          style={[
            styles.filterButton,
            filtroEstado === 'todas' && styles.filterButtonActive,
          ]}
          onPress={() => setFiltroEstado('todas')}
        >
          <Text
            style={[
              styles.filterText,
              filtroEstado === 'todas' && styles.filterTextActive,
            ]}
          >
            Todas ({alertas.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filtroEstado === 'activa' && styles.filterButtonActive,
          ]}
          onPress={() => setFiltroEstado('activa')}
        >
          <Text
            style={[
              styles.filterText,
              filtroEstado === 'activa' && styles.filterTextActive,
            ]}
          >
            Activas ({alertas.filter((a) => a.Estado === 'activa').length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filtroEstado === 'resuelta' && styles.filterButtonActive,
          ]}
          onPress={() => setFiltroEstado('resuelta')}
        >
          <Text
            style={[
              styles.filterText,
              filtroEstado === 'resuelta' && styles.filterTextActive,
            ]}
          >
            Resueltas ({alertas.filter((a) => a.Estado === 'resuelta').length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            filtroEstado === 'falsa_alarma' && styles.filterButtonActive,
          ]}
          onPress={() => setFiltroEstado('falsa_alarma')}
        >
          <Text
            style={[
              styles.filterText,
              filtroEstado === 'falsa_alarma' && styles.filterTextActive,
            ]}
          >
            Falsas ({alertas.filter((a) => a.Estado === 'falsa_alarma').length})
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Lista de alertas */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={cargarAlertas} />
        }
      >
        {alertasFiltradas.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="shield-checkmark" size={64} color={COLORS.success} />
            <Text style={styles.emptyText}>No hay alertas</Text>
            <Text style={styles.emptySubtext}>
              {filtroEstado === 'activa'
                ? 'Todas las PCD están en zona segura'
                : 'No hay alertas en esta categoría'}
            </Text>
          </View>
        ) : (
          alertasFiltradas.map((alerta) => {
            const icono = getIconoEstado(alerta.Estado);
            const color = getColorEstado(alerta.Estado);

            return (
              <View key={alerta.ID} style={[styles.alertCard, { borderLeftColor: color }]}>
                <View style={styles.alertHeader}>
                  <View style={[styles.alertIcon, { backgroundColor: color }]}>
                    <Ionicons name={icono.name} size={24} color={COLORS.white} />
                  </View>
                  <View style={styles.alertHeaderInfo}>
                    <Text style={styles.alertUsername}>{alerta.NombreUsuario}</Text>
                    <Text style={styles.alertTime}>{formatFecha(alerta.Timestamp)}</Text>
                  </View>
                  <View style={[styles.estadoBadge, { backgroundColor: `${color}15` }]}>
                    <Text style={[styles.estadoText, { color }]}>
                      {alerta.Estado === 'activa'
                        ? 'Activa'
                        : alerta.Estado === 'resuelta'
                        ? 'Resuelta'
                        : 'Falsa'}
                    </Text>
                  </View>
                </View>

                <Text style={styles.alertMessage}>{alerta.Mensaje}</Text>

                <View style={styles.alertDetails}>
                  <View style={styles.alertDetail}>
                    <Ionicons name="navigate" size={16} color={COLORS.textSecondary} />
                    <Text style={styles.alertDetailText}>
                      {(alerta.DistanciaKm * 1000).toFixed(0)}m de distancia
                    </Text>
                  </View>
                  <View style={styles.alertDetail}>
                    <Ionicons name="location" size={16} color={COLORS.textSecondary} />
                    <Text style={styles.alertDetailText}>
                      {alerta.Latitud.toFixed(4)}, {alerta.Longitud.toFixed(4)}
                    </Text>
                  </View>
                </View>

                {/* Acciones para alertas activas */}
                {alerta.Estado === 'activa' && (
                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      style={[styles.actionButton, { backgroundColor: COLORS.primaryLight }]}
                      onPress={() =>
                        navigation.navigate('Mapa', {
                          pcdId: alerta.UsuarioID,
                          pcdNombre: alerta.NombreUsuario,
                        })
                      }
                    >
                      <Ionicons name="map" size={18} color={COLORS.primary} />
                      <Text style={[styles.actionButtonText, { color: COLORS.primary }]}>
                        Ver Mapa
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.actionButton, { backgroundColor: COLORS.successLight }]}
                      onPress={() => handleResolverAlerta(alerta.ID, alerta.NombreUsuario)}
                    >
                      <Ionicons name="checkmark" size={18} color={COLORS.success} />
                      <Text style={[styles.actionButtonText, { color: COLORS.success }]}>
                        Resolver
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.actionButton, { backgroundColor: COLORS.errorLight }]}
                      onPress={() => handleMarcarFalsaAlarma(alerta.ID)}
                    >
                      <Ionicons name="close" size={18} color={COLORS.error} />
                      <Text style={[styles.actionButtonText, { color: COLORS.error }]}>
                        Falsa
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

                {/* Información de resolución */}
                {alerta.FechaResolucion && (
                  <View style={styles.resolutionInfo}>
                    <Ionicons name="time" size={14} color={COLORS.textSecondary} />
                    <Text style={styles.resolutionText}>
                      {alerta.Estado === 'resuelta' ? 'Resuelta' : 'Marcada'} el{' '}
                      {formatFecha(alerta.FechaResolucion)}
                    </Text>
                  </View>
                )}
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

