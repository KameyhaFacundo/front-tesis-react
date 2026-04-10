import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform,
  Animated,
} from 'react-native';
import MapView, { Marker, Circle, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components';
import { COLORS, SIZES } from '../../constants/theme';
import styles from './Mapa.styles';
import {
  obtenerUbicaciones,
  actualizarUbicacion,
  guardarEnHistorial,
} from '../../api/ubicaciones';
import {
  verificarZonaSegura,
  crearAlertaZonaSegura,
  verificarYResolverAlertas,
} from '../../api/alertas';

const PANEL_COLLAPSED = 80;
const PANEL_EXPANDED = 270;

function getInitials(nombre) {
  if (!nombre) return '?';
  const parts = nombre.trim().split(' ');
  return parts.slice(0, 2).map((p) => p[0]).join('').toUpperCase();
}

function calcDistance(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const d = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return d < 1000 ? `${Math.round(d)} m` : `${(d / 1000).toFixed(1)} km`;
}

export default function Mapa({ route }) {
  const { user, isPCD } = useAuth();
  const [location, setLocation] = useState(null);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tracking, setTracking] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const mapRef = useRef(null);
  const watchSubscription = useRef(null);
  const panelAnim = useRef(new Animated.Value(PANEL_COLLAPSED)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const pulseLoop = useRef(null);

  const { pcdId, pcdNombre } = route?.params || {};

  useEffect(() => {
    solicitarPermisos();
    return () => {
      if (watchSubscription.current) watchSubscription.current.remove();
      if (pulseLoop.current) pulseLoop.current.stop();
    };
  }, []);

  useEffect(() => {
    if (tracking) {
      pulseLoop.current = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.5, duration: 900, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 900, useNativeDriver: true }),
        ])
      );
      pulseLoop.current.start();
    } else {
      if (pulseLoop.current) pulseLoop.current.stop();
      pulseAnim.setValue(1);
    }
  }, [tracking]);

  const expandPanel = (ubicacion) => {
    setSelectedUser(ubicacion);
    Animated.spring(panelAnim, {
      toValue: PANEL_EXPANDED,
      useNativeDriver: false,
      tension: 65,
      friction: 11,
    }).start();
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: ubicacion.Latitud,
          longitude: ubicacion.Longitud,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        },
        600
      );
    }
  };

  const collapsePanel = () => {
    setSelectedUser(null);
    Animated.spring(panelAnim, {
      toValue: PANEL_COLLAPSED,
      useNativeDriver: false,
      tension: 65,
      friction: 11,
    }).start();
  };

  const solicitarPermisos = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permiso de ubicación denegado');
        Alert.alert('Permiso Necesario', 'Esta app necesita acceso a la ubicación para funcionar correctamente.');
        setLoading(false);
        return;
      }
      obtenerUbicacionActual();
    } catch (error) {
      console.error('Error solicitando permisos:', error);
      setErrorMsg('Error al solicitar permisos');
      setLoading(false);
    }
  };

  const obtenerUbicacionActual = async () => {
    try {
      setLoading(true);
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const newLocation = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setLocation(newLocation);
      if (user?.ID) {
        await actualizarUbicacion(user.ID, currentLocation.coords.latitude, currentLocation.coords.longitude);
        await guardarEnHistorial(user.ID, {
          Latitud: currentLocation.coords.latitude,
          Longitud: currentLocation.coords.longitude,
          Timestamp: new Date().toISOString(),
        });
        if (isPCD()) {
          await verificarYResolverAlertas(user.ID, currentLocation.coords.latitude, currentLocation.coords.longitude);
        }
      }
      await cargarUbicaciones();
      if (mapRef.current) mapRef.current.animateToRegion(newLocation, 1000);
      setLoading(false);
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
      setErrorMsg('No se pudo obtener la ubicación');
      setLoading(false);
      Alert.alert('Error', 'No se pudo obtener la ubicación actual');
    }
  };

  const cargarUbicaciones = async () => {
    try {
      const data = await obtenerUbicaciones();
      setUbicaciones(data);
      if (pcdId && mapRef.current) {
        const pcdUbicacion = data.find((u) => u.UsuarioID === pcdId);
        if (pcdUbicacion) {
          setTimeout(() => {
            mapRef.current?.animateToRegion(
              {
                latitude: pcdUbicacion.Latitud,
                longitude: pcdUbicacion.Longitud,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              },
              1000
            );
          }, 500);
        }
      }
    } catch (error) {
      console.error('Error cargando ubicaciones:', error);
    }
  };

  const iniciarTracking = async () => {
    if (!user?.ID) { Alert.alert('Error', 'Sesión no disponible'); return; }
    try {
      setTracking(true);
      watchSubscription.current = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 10000, distanceInterval: 10 },
        async (newLocation) => {
          const updatedLocation = {
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
          setLocation(updatedLocation);
          await actualizarUbicacion(user.ID, newLocation.coords.latitude, newLocation.coords.longitude);
          await guardarEnHistorial(user.ID, {
            Latitud: newLocation.coords.latitude,
            Longitud: newLocation.coords.longitude,
            Timestamp: new Date().toISOString(),
          });
          if (isPCD()) {
            const verificacion = await verificarZonaSegura(user.ID, newLocation.coords.latitude, newLocation.coords.longitude);
            if (!verificacion.dentroDeLaZona) {
              await crearAlertaZonaSegura(
                user?.ID,
                `${user?.Nombre || ''} ${user?.Apellido || ''}`,
                newLocation.coords.latitude,
                newLocation.coords.longitude,
                verificacion.distancia,
                3
              );
            } else {
              await verificarYResolverAlertas(user.ID, newLocation.coords.latitude, newLocation.coords.longitude);
            }
          }
          cargarUbicaciones();
        }
      );
    } catch (error) {
      console.error('Error iniciando tracking:', error);
      Alert.alert('Error', 'No se pudo iniciar el tracking');
      setTracking(false);
    }
  };

  const detenerTracking = () => {
    if (watchSubscription.current) {
      watchSubscription.current.remove();
      watchSubscription.current = null;
    }
    setTracking(false);
  };

  const centrarEnMiUbicacion = () => {
    if (location && mapRef.current) mapRef.current.animateToRegion(location, 800);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Obteniendo ubicación GPS...</Text>
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="location-outline" size={64} color={COLORS.error} />
        <Text style={styles.errorText}>{errorMsg}</Text>
        <Button title="Reintentar" onPress={solicitarPermisos} style={styles.retryButton} />
      </View>
    );
  }

  const distance =
    selectedUser && location
      ? calcDistance(location.latitude, location.longitude, selectedUser.Latitud, selectedUser.Longitud)
      : null;

  const fabBottom = PANEL_COLLAPSED + 20;

  return (
    <View style={styles.container}>
      {/* Mapa */}
      {location ? (
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
          initialRegion={location}
          showsUserLocation={false}
          showsMyLocationButton={false}
          showsCompass={true}
          toolbarEnabled={false}
          onPress={collapsePanel}
        >
          {/* Marcador propio con pulso */}
          <Marker
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title="Mi Ubicación"
            description={`${user?.Nombre || ''} ${user?.Apellido || ''}`}
          >
            <View style={styles.myMarkerWrapper}>
              {tracking && (
                <Animated.View
                  style={[styles.pulseRing, { transform: [{ scale: pulseAnim }] }]}
                />
              )}
              <View style={[styles.markerCircle, { backgroundColor: tracking ? COLORS.success : COLORS.primary }]}>
                <Ionicons name="person" size={22} color={COLORS.white} />
              </View>
            </View>
          </Marker>

          {/* Zona segura */}
          <Circle
            center={{ latitude: location.latitude, longitude: location.longitude }}
            radius={500}
            fillColor="rgba(74, 144, 226, 0.08)"
            strokeColor="rgba(74, 144, 226, 0.35)"
            strokeWidth={2}
          />

          {/* Marcadores de otros usuarios */}
          {!isPCD() &&
            ubicaciones
              .filter((u) => u.UsuarioID !== user?.ID)
              .map((ubicacion) => {
                const isSelected =
                  selectedUser?.UsuarioID === ubicacion.UsuarioID ||
                  pcdId === ubicacion.UsuarioID;
                return (
                  <Marker
                    key={ubicacion.ID}
                    coordinate={{ latitude: ubicacion.Latitud, longitude: ubicacion.Longitud }}
                    onPress={() => expandPanel(ubicacion)}
                  >
                    <View style={styles.userMarkerWrapper}>
                      <View
                        style={[
                          styles.userMarkerCircle,
                          {
                            backgroundColor: isSelected ? COLORS.warning : COLORS.user,
                            width: isSelected ? 52 : 42,
                            height: isSelected ? 52 : 42,
                            borderRadius: isSelected ? 26 : 21,
                            borderWidth: isSelected ? 3 : 2,
                          },
                        ]}
                      >
                        <Text style={[styles.userMarkerInitials, { fontSize: isSelected ? 16 : 13 }]}>
                          {getInitials(ubicacion.Nombre)}
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.markerPointer,
                          { borderTopColor: isSelected ? COLORS.warning : COLORS.user },
                        ]}
                      />
                    </View>
                  </Marker>
                );
              })}
        </MapView>
      ) : (
        <View style={styles.noLocationContainer}>
          <Ionicons name="location-outline" size={64} color={COLORS.textLight} />
          <Text style={styles.noLocationText}>No se pudo obtener la ubicación</Text>
        </View>
      )}

      {/* Chip de tracking activo (top center) */}
      {tracking && (
        <View style={styles.trackingChip}>
          <Animated.View style={[styles.trackingDot, { transform: [{ scale: pulseAnim }] }]} />
          <Text style={styles.trackingChipText}>Tracking activo</Text>
        </View>
      )}

      {/* FABs flotantes (derecha) */}
      <View style={[styles.fabColumn, { bottom: fabBottom }]}>
        <TouchableOpacity style={styles.fabSmall} onPress={centrarEnMiUbicacion} activeOpacity={0.85}>
          <Ionicons name="navigate" size={20} color={COLORS.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.fabSmall} onPress={obtenerUbicacionActual} activeOpacity={0.85}>
          <Ionicons name="refresh" size={20} color={COLORS.primary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.fabLarge, { backgroundColor: tracking ? COLORS.error : COLORS.primary }]}
          onPress={tracking ? detenerTracking : iniciarTracking}
          activeOpacity={0.85}
        >
          <Ionicons name={tracking ? 'stop' : 'radio'} size={26} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet */}
      <Animated.View style={[styles.bottomSheet, { height: panelAnim }]}>
        {/* Handle */}
        <View style={styles.sheetHandle}>
          <View style={styles.handleBar} />
        </View>

        {selectedUser ? (
          <View style={styles.sheetContent}>
            {/* Header del usuario */}
            <View style={styles.sheetUserRow}>
              <View style={styles.sheetAvatar}>
                <Text style={styles.sheetAvatarText}>{getInitials(selectedUser.Nombre)}</Text>
              </View>
              <View style={styles.sheetUserInfo}>
                <Text style={styles.sheetUserName}>
                  {selectedUser.Nombre || `Usuario ${selectedUser.UsuarioID}`}
                </Text>
                {distance && (
                  <View style={styles.sheetDistanceRow}>
                    <Ionicons name="walk" size={13} color={COLORS.textSecondary} />
                    <Text style={styles.sheetDistanceText}>{distance} de distancia</Text>
                  </View>
                )}
              </View>
              <TouchableOpacity onPress={collapsePanel} style={styles.sheetCloseBtn}>
                <Ionicons name="close-circle" size={26} color={COLORS.textLight} />
              </TouchableOpacity>
            </View>

            {/* Coords */}
            <View style={styles.sheetCoordsRow}>
              <View style={styles.sheetCoordCard}>
                <Text style={styles.sheetCoordLabel}>LATITUD</Text>
                <Text style={styles.sheetCoordValue}>{selectedUser.Latitud?.toFixed(6)}</Text>
              </View>
              <View style={styles.sheetCoordCard}>
                <Text style={styles.sheetCoordLabel}>LONGITUD</Text>
                <Text style={styles.sheetCoordValue}>{selectedUser.Longitud?.toFixed(6)}</Text>
              </View>
            </View>

            {/* Acción */}
            <TouchableOpacity
              style={styles.sheetCenterBtn}
              onPress={() => {
                if (mapRef.current) {
                  mapRef.current.animateToRegion(
                    {
                      latitude: selectedUser.Latitud,
                      longitude: selectedUser.Longitud,
                      latitudeDelta: 0.004,
                      longitudeDelta: 0.004,
                    },
                    600
                  );
                }
              }}
              activeOpacity={0.88}
            >
              <Ionicons name="navigate" size={18} color={COLORS.white} />
              <Text style={styles.sheetCenterBtnText}>Centrar en este usuario</Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* Panel colapsado: info básica propia */
          <View style={styles.sheetCollapsedRow}>
            <View
              style={[
                styles.sheetCollapsedIcon,
                { backgroundColor: tracking ? `${COLORS.success}20` : `${COLORS.primary}15` },
              ]}
            >
              <Ionicons
                name="location"
                size={18}
                color={tracking ? COLORS.success : COLORS.primary}
              />
            </View>
            <View>
              <Text style={styles.sheetCollapsedTitle}>
                {tracking ? 'Tracking activo' : 'Mi ubicación'}
              </Text>
              {location && (
                <Text style={styles.sheetCollapsedCoords}>
                  {location.latitude.toFixed(5)}, {location.longitude.toFixed(5)}
                </Text>
              )}
            </View>
            {!isPCD() && (
              <Text style={styles.sheetCollapsedCount}>
                {ubicaciones.filter((u) => u.UsuarioID !== user?.ID).length} PCD
              </Text>
            )}
          </View>
        )}
      </Animated.View>
    </View>
  );
}
