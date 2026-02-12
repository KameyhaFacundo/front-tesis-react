import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Linking,
  ScrollView,
} from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components';
import { COLORS } from '../../constants/theme';
import styles from './Mapa.styles';
import {
  obtenerUbicaciones,
  actualizarUbicacion,
  guardarEnHistorial,
} from '../../api/ubicaciones';
import { verificarYResolverAlertas } from '../../api/alertas';

export default function Mapa({ route }) {
  const { user, isPCD, loading: authLoading } = useAuth();
  const [location, setLocation] = useState(null);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  const { pcdId, pcdNombre } = route?.params || {};

  useEffect(() => {
    if (authLoading || !user?.ID) return;
    solicitarPermisos();
    cargarUbicaciones();
  }, [authLoading, user?.ID]);

  const solicitarPermisos = async () => {
    if (!user?.ID) return;
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permiso de ubicacion denegado');
        Alert.alert(
          'Permiso Necesario',
          'Esta app necesita acceso a la ubicacion para funcionar correctamente.'
        );
        setLoading(false);
        return;
      }

      await obtenerUbicacionActual();
    } catch (error) {
      console.error('Error solicitando permisos:', error);
      setErrorMsg('Error al solicitar permisos');
      setLoading(false);
    }
  };

  const obtenerUbicacionActual = async () => {
    if (!user?.ID) {
      setErrorMsg('Sesion no disponible. Volve a iniciar sesion.');
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const updatedLocation = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      };

      setLocation(updatedLocation);

      await actualizarUbicacion(
        user.ID,
        currentLocation.coords.latitude,
        currentLocation.coords.longitude
      );

      await guardarEnHistorial(user.ID, {
        Latitud: currentLocation.coords.latitude,
        Longitud: currentLocation.coords.longitude,
        Timestamp: new Date().toISOString(),
      });

      if (isPCD()) {
        await verificarYResolverAlertas(
          user.ID,
          currentLocation.coords.latitude,
          currentLocation.coords.longitude
        );
      }

      setLoading(false);
    } catch (error) {
      console.error('Error obteniendo ubicacion:', error);
      setErrorMsg('No se pudo obtener la ubicacion');
      setLoading(false);
      Alert.alert('Error', 'No se pudo obtener la ubicacion actual');
    }
  };

  const cargarUbicaciones = async () => {
    try {
      const data = await obtenerUbicaciones();
      setUbicaciones(data);
    } catch (error) {
      console.error('Error cargando ubicaciones:', error);
    }
  };

  const abrirEnGoogleMaps = async (lat, lon) => {
    const url = `https://www.google.com/maps?q=${lat},${lon}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', 'No se pudo abrir Google Maps');
    }
  };

  if (authLoading || loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Obteniendo ubicacion GPS...</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16, gap: 12 }}>
      <View style={[styles.infoPanel, { position: 'relative', top: 0, left: 0, right: 0 }]}>
        <View style={styles.infoPanelHeader}>
          <Ionicons name="location" size={20} color={pcdId ? COLORS.warning : COLORS.primary} />
          <Text style={styles.infoPanelTitle}>
            {pcdId && pcdNombre ? `Ubicacion: ${pcdNombre}` : 'Mi Ubicacion'}
          </Text>
        </View>

        {location ? (
          <View style={styles.coordsContainer}>
            <Text style={styles.coordsText}>Lat: {location.latitude.toFixed(6)}</Text>
            <Text style={styles.coordsText}>Lon: {location.longitude.toFixed(6)}</Text>
          </View>
        ) : (
          <Text style={styles.noLocationText}>No se pudo obtener la ubicacion</Text>
        )}

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.iconButton} onPress={obtenerUbicacionActual}>
            <Ionicons name="refresh" size={24} color={COLORS.white} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.trackingButton}
            onPress={() => {
              if (!location) return;
              abrirEnGoogleMaps(location.latitude, location.longitude);
            }}
          >
            <Ionicons name="map" size={20} color={COLORS.white} />
            <Text style={styles.trackingButtonText}>Abrir mapa</Text>
          </TouchableOpacity>
        </View>
      </View>

      {!isPCD() && (
        <View style={[styles.legend, { position: 'relative', bottom: 0, left: 0, right: 0 }]}>
          <Text style={[styles.infoPanelTitle, { marginBottom: 8 }]}>PCD a cargo</Text>
          {ubicaciones
            .filter((u) => u.UsuarioID !== user?.ID)
            .map((ubicacion) => (
              <TouchableOpacity
                key={ubicacion.ID}
                onPress={() => abrirEnGoogleMaps(ubicacion.Latitud, ubicacion.Longitud)}
                style={{
                  backgroundColor: '#F3F6FB',
                  borderRadius: 10,
                  padding: 12,
                  marginBottom: 8,
                }}
              >
                <Text style={{ color: COLORS.text, fontWeight: '600' }}>
                  {ubicacion.Nombre || `Usuario ${ubicacion.UsuarioID}`}
                </Text>
                <Text style={styles.coordsText}>
                  {ubicacion.Latitud?.toFixed?.(6)}, {ubicacion.Longitud?.toFixed?.(6)}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      )}
    </ScrollView>
  );
}
