import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform,
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

export default function Mapa({ route }) {
  const { user, isPCD } = useAuth();
  const [location, setLocation] = useState(null);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tracking, setTracking] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const mapRef = useRef(null);
  const watchSubscription = useRef(null);

  // Parámetros de navegación para centrar en un PCD específico
  const { pcdId, pcdNombre } = route?.params || {};

  useEffect(() => {
    solicitarPermisos();
    cargarUbicaciones();

    return () => {
      // Limpiar el tracking al desmontar
      if (watchSubscription.current) {
        watchSubscription.current.remove();
      }
    };
  }, []);

  const solicitarPermisos = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permiso de ubicación denegado');
        Alert.alert(
          'Permiso Necesario',
          'Esta app necesita acceso a la ubicación para funcionar correctamente.'
        );
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

      // Guardar ubicación en la API
      await actualizarUbicacion(
        user.ID,
        currentLocation.coords.latitude,
        currentLocation.coords.longitude
      );

      // Guardar en historial
      await guardarEnHistorial(user.ID, {
        Latitud: currentLocation.coords.latitude,
        Longitud: currentLocation.coords.longitude,
        Timestamp: new Date().toISOString(),
      });

      // Verificar zona segura si es PCD
      if (isPCD()) {
        await verificarYResolverAlertas(
          user.ID,
          currentLocation.coords.latitude,
          currentLocation.coords.longitude
        );
      }

      // Centrar el mapa en la ubicación actual
      if (mapRef.current) {
        mapRef.current.animateToRegion(newLocation, 1000);
      }

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

      // Si viene un pcdId, centrar el mapa en esa ubicación
      if (pcdId && mapRef.current) {
        const pcdUbicacion = data.find((u) => u.UsuarioID === pcdId);
        if (pcdUbicacion) {
          const region = {
            latitude: pcdUbicacion.Latitud,
            longitude: pcdUbicacion.Longitud,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };
          setTimeout(() => {
            mapRef.current?.animateToRegion(region, 1000);
          }, 500);
        }
      }
    } catch (error) {
      console.error('Error cargando ubicaciones:', error);
    }
  };

  const iniciarTracking = async () => {
    try {
      setTracking(true);

      watchSubscription.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 10000, // Actualizar cada 10 segundos
          distanceInterval: 10, // O cuando se mueva 10 metros
        },
        async (newLocation) => {
          const updatedLocation = {
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          };

          setLocation(updatedLocation);

          // Actualizar en la API
          await actualizarUbicacion(
            user.ID,
            newLocation.coords.latitude,
            newLocation.coords.longitude
          );

          // Guardar en historial
          await guardarEnHistorial(user.ID, {
            Latitud: newLocation.coords.latitude,
            Longitud: newLocation.coords.longitude,
            Timestamp: new Date().toISOString(),
          });

          // Verificar zona segura y crear/resolver alertas automáticamente
          if (isPCD()) {
            const verificacion = await verificarZonaSegura(
              user.ID,
              newLocation.coords.latitude,
              newLocation.coords.longitude
            );

            if (!verificacion.dentroDeLaZona) {
              // Fuera de zona segura - crear alerta
              console.log('⚠️ Usuario fuera de zona segura!', verificacion.distanciaMetros, 'm');
              // Asumimos que el tutor tiene ID 3 (esto debería venir de la relación usuario-tutor)
              await crearAlertaZonaSegura(
                user.ID,
                `${user.Nombre} ${user.Apellido}`,
                newLocation.coords.latitude,
                newLocation.coords.longitude,
                verificacion.distancia,
                3 // TutorID - en producción esto vendría de la DB
              );
            } else {
              // Dentro de zona segura - resolver alertas si hay
              await verificarYResolverAlertas(
                user.ID,
                newLocation.coords.latitude,
                newLocation.coords.longitude
              );
            }
          }

          // Recargar ubicaciones de otros usuarios
          cargarUbicaciones();
        }
      );

      Alert.alert(
        'Tracking Activado',
        'Tu ubicación se actualizará automáticamente cada 10 segundos'
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
    Alert.alert('Tracking Detenido', 'El seguimiento de ubicación se ha detenido');
  };

  const centrarEnMiUbicacion = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion(location, 1000);
    }
  };

  const getMarkerColor = (usuarioID) => {
    if (usuarioID === user.ID) return COLORS.primary;
    return COLORS.user;
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

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : undefined}
          initialRegion={location}
          showsUserLocation={true}
          showsMyLocationButton={false}
          showsCompass={true}
          toolbarEnabled={false}
        >
          {/* Mi ubicación actual */}
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Mi Ubicación"
            description={`${user.Nombre} ${user.Apellido}`}
            pinColor={COLORS.primary}
          >
            <View style={[styles.markerContainer, { backgroundColor: COLORS.primary }]}>
              <Ionicons name="person" size={20} color={COLORS.white} />
            </View>
          </Marker>

          {/* Círculo de zona segura (500m de radio) */}
          <Circle
            center={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            radius={500}
            fillColor="rgba(74, 144, 226, 0.1)"
            strokeColor="rgba(74, 144, 226, 0.5)"
            strokeWidth={2}
          />

          {/* Ubicaciones de otros usuarios (PCD) - visible para Tutores/Profesionales */}
          {!isPCD() &&
            ubicaciones
              .filter((u) => u.UsuarioID !== user.ID)
              .map((ubicacion) => {
                const isSelected = pcdId === ubicacion.UsuarioID;
                return (
                  <Marker
                    key={ubicacion.ID}
                    coordinate={{
                      latitude: ubicacion.Latitud,
                      longitude: ubicacion.Longitud,
                    }}
                    title={ubicacion.Nombre || `Usuario ${ubicacion.UsuarioID}`}
                    description={ubicacion.Direccion}
                  >
                    <View
                      style={[
                        styles.markerContainer,
                        {
                          backgroundColor: isSelected ? COLORS.warning : COLORS.user,
                          width: isSelected ? 50 : 40,
                          height: isSelected ? 50 : 40,
                          borderRadius: isSelected ? 25 : 20,
                        },
                      ]}
                    >
                      <Ionicons
                        name={isSelected ? "person" : "person-outline"}
                        size={isSelected ? 28 : 20}
                        color={COLORS.white}
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

      {/* Panel de información */}
      <View style={styles.infoPanel}>
        <View style={styles.infoPanelHeader}>
          <Ionicons name="location" size={20} color={pcdId ? COLORS.warning : COLORS.primary} />
          <Text style={styles.infoPanelTitle}>
            {pcdId && pcdNombre
              ? `Ubicación: ${pcdNombre}`
              : tracking
              ? 'Tracking Activo'
              : 'Mi Ubicación'}
          </Text>
        </View>

        {location && (
          <View style={styles.coordsContainer}>
            <Text style={styles.coordsText}>
              Lat: {location.latitude.toFixed(6)}
            </Text>
            <Text style={styles.coordsText}>
              Lon: {location.longitude.toFixed(6)}
            </Text>
          </View>
        )}

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={centrarEnMiUbicacion}
          >
            <Ionicons name="navigate" size={24} color={COLORS.white} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={obtenerUbicacionActual}
          >
            <Ionicons name="refresh" size={24} color={COLORS.white} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.trackingButton,
              tracking && styles.trackingButtonActive,
            ]}
            onPress={tracking ? detenerTracking : iniciarTracking}
          >
            <Ionicons
              name={tracking ? 'pause' : 'play'}
              size={20}
              color={COLORS.white}
            />
            <Text style={styles.trackingButtonText}>
              {tracking ? 'Detener' : 'Tracking'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Leyenda */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendMarker, { backgroundColor: COLORS.primary }]} />
          <Text style={styles.legendText}>Mi ubicación</Text>
        </View>
        {!isPCD() && (
          <>
            <View style={styles.legendItem}>
              <View style={[styles.legendMarker, { backgroundColor: COLORS.user }]} />
              <Text style={styles.legendText}>PCD a cargo</Text>
            </View>
            {pcdId && (
              <View style={styles.legendItem}>
                <View style={[styles.legendMarker, { backgroundColor: COLORS.warning, width: 20, height: 20, borderRadius: 10 }]} />
                <Text style={styles.legendText}>Persona seleccionada</Text>
              </View>
            )}
          </>
        )}
        <View style={styles.legendItem}>
          <View style={styles.legendCircle} />
          <Text style={styles.legendText}>Zona segura (500m)</Text>
        </View>
      </View>
    </View>
  );
}

