import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { ActivityCard, Button } from '../../components';
import { COLORS, SIZES } from '../../constants/theme';
import styles from './Actividades.styles';
import {
  obtenerActividades,
  obtenerActividadesPorUsuario,
  eliminarActividad,
  cambiarEstadoActividad,
} from '../../api/actividades';
import { obtenerUsuarios } from '../../api/usuarios';
import FormularioActividad from './FormularioActividad';

export default function Actividades() {
  const { user, isPCD, isTutor, isProfesional, loading: authLoading } = useAuth();
  const [actividades, setActividades] = useState([]);
  const [actividadesFiltradas, setActividadesFiltradas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroTipo, setFiltroTipo] = useState('Todas');
  const [filtroEstado, setFiltroEstado] = useState('Todas');
  const [modalVisible, setModalVisible] = useState(false);
  const [actividadEditar, setActividadEditar] = useState(null);

  const tipos = [
    'Todas',
    'medicine',
    'therapy',
    'exercise',
    'appointment',
  ];

  const tiposLabels = {
    'Todas': 'Todas',
    'medicine': 'Medicamentos',
    'therapy': 'Terapias',
    'exercise': 'Ejercicios',
    'appointment': 'Citas',
  };

  const estados = ['Todas', 'pending', 'inProgress', 'completed', 'missed'];

  const estadosLabels = {
    'Todas': 'Todas',
    'pending': 'Pendiente',
    'inProgress': 'En Progreso',
    'completed': 'Completada',
    'missed': 'Perdida',
  };

  const resumen = {
    total: actividades.length,
    pendientes: actividades.filter((a) => a.Estado === 'pending').length,
    enProgreso: actividades.filter((a) => a.Estado === 'inProgress').length,
    completadas: actividades.filter((a) => a.Estado === 'completed').length,
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  useEffect(() => {
    filtrarActividades();
  }, [filtroTipo, filtroEstado, actividades]);

  const cargarDatos = async () => {
    if (authLoading) return;
    if (isPCD() && !user?.ID) return;

    try {
      setLoading(true);
      const [actividadesData, usuariosData] = await Promise.all([
        isPCD() ? obtenerActividadesPorUsuario(user.ID) : obtenerActividades(),
        obtenerUsuarios(),
      ]);
      setActividades(actividadesData);
      setUsuarios(usuariosData);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar las actividades');
    } finally {
      setLoading(false);
    }
  };

  const filtrarActividades = () => {
    let filtered = [...actividades];

    if (filtroTipo !== 'Todas') {
      filtered = filtered.filter((a) => a.Tipo === filtroTipo);
    }

    if (filtroEstado !== 'Todas') {
      filtered = filtered.filter((a) => a.Estado === filtroEstado);
    }

    // Ordenar por fecha (más reciente primero)
    filtered.sort((a, b) => new Date(b.FechaInicio) - new Date(a.FechaInicio));

    setActividadesFiltradas(filtered);
  };

  const abrirModalNueva = () => {
    setActividadEditar(null);
    setModalVisible(true);
  };

  const abrirModalEditar = (actividad) => {
    setActividadEditar(actividad);
    setModalVisible(true);
  };

  const confirmarEliminar = (actividad) => {
    Alert.alert(
      'Confirmar eliminación',
      `¿Estás seguro de eliminar la actividad "${actividad.Titulo}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => eliminarActividadConfirmada(actividad.ID),
        },
      ]
    );
  };

  const eliminarActividadConfirmada = async (id) => {
    try {
      setLoading(true);
      await eliminarActividad(id);
      Alert.alert('Éxito', 'Actividad eliminada correctamente');
      cargarDatos();
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar la actividad');
    } finally {
      setLoading(false);
    }
  };

  const cambiarEstado = (actividad, nuevoEstado) => {
    Alert.alert(
      'Cambiar estado',
      `¿Marcar como ${estadosLabels[nuevoEstado].toLowerCase()}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Confirmar',
          onPress: async () => {
            try {
              await cambiarEstadoActividad(actividad.ID, nuevoEstado);
              Alert.alert('Éxito', 'Estado actualizado');
              cargarDatos();
            } catch (error) {
              Alert.alert('Error', 'No se pudo actualizar el estado');
            }
          },
        },
      ]
    );
  };

  const obtenerUsuarioNombre = (usuarioID) => {
    const usuario = usuarios.find((u) => u.ID === usuarioID);
    return usuario ? `${usuario.Nombre} ${usuario.Apellido}` : 'Desconocido';
  };

  const getAccionesActividad = (actividad) => {
    const acciones = [];

    if (actividad.Estado === 'pending') {
      acciones.push({
        label: 'Iniciar',
        icon: 'play',
        color: COLORS.info,
        onPress: () => cambiarEstado(actividad, 'inProgress'),
      });
    }

    if (actividad.Estado === 'inProgress' || actividad.Estado === 'pending') {
      acciones.push({
        label: 'Completar',
        icon: 'checkmark-circle',
        color: COLORS.success,
        onPress: () => cambiarEstado(actividad, 'completed'),
      });
    }

    if (actividad.Estado === 'pending') {
      acciones.push({
        label: 'Perdida',
        icon: 'close-circle',
        color: COLORS.error,
        onPress: () => cambiarEstado(actividad, 'missed'),
      });
    }

    if (!isPCD()) {
      acciones.push({
        label: 'Editar',
        icon: 'create',
        color: COLORS.primary,
        onPress: () => abrirModalEditar(actividad),
      });

      acciones.push({
        label: 'Eliminar',
        icon: 'trash',
        color: COLORS.error,
        onPress: () => confirmarEliminar(actividad),
      });
    }

    return acciones;
  };

  if (authLoading || (loading && actividades.length === 0)) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Cargando actividades...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#F2F7FF', '#F8FBFF', '#FFFFFF']} style={styles.gradient} />
      <View style={styles.glowTop} />

      <LinearGradient colors={['#1146A6', '#1D62D2']} style={styles.heroCard}>
        <View style={styles.heroHeader}>
          <View>
            <Text style={styles.heroTitle}>Actividades</Text>
            <Text style={styles.heroSubtitle}>Planificacion y seguimiento diario</Text>
          </View>
          {!isPCD() && (
            <TouchableOpacity style={styles.heroAddButton} onPress={abrirModalNueva}>
              <Ionicons name="add" size={20} color="#0D3B8E" />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.heroStats}>
          <View style={styles.heroStatItem}>
            <Text style={styles.heroStatValue}>{resumen.total}</Text>
            <Text style={styles.heroStatLabel}>Total</Text>
          </View>
          <View style={styles.heroStatItem}>
            <Text style={styles.heroStatValue}>{resumen.pendientes}</Text>
            <Text style={styles.heroStatLabel}>Pendientes</Text>
          </View>
          <View style={styles.heroStatItem}>
            <Text style={styles.heroStatValue}>{resumen.enProgreso}</Text>
            <Text style={styles.heroStatLabel}>En progreso</Text>
          </View>
          <View style={styles.heroStatItem}>
            <Text style={styles.heroStatValue}>{resumen.completadas}</Text>
            <Text style={styles.heroStatLabel}>Completadas</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.filtersBlock}>
        <Text style={styles.filterTitle}>Tipo</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          {tipos.map((tipo) => (
            <TouchableOpacity
              key={tipo}
              style={[
                styles.filterChip,
                filtroTipo === tipo && styles.filterChipActive,
              ]}
              onPress={() => setFiltroTipo(tipo)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  filtroTipo === tipo && styles.filterChipTextActive,
                ]}
              >
                {tiposLabels[tipo]}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.filterTitle}>Estado</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          {estados.map((estado) => (
            <TouchableOpacity
              key={estado}
              style={[
                styles.filterChip,
                filtroEstado === estado && styles.filterChipActive,
              ]}
              onPress={() => setFiltroEstado(estado)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  filtroEstado === estado && styles.filterChipTextActive,
                ]}
              >
                {estadosLabels[estado]}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Contador de resultados */}
      <View style={styles.resultsCounter}>
        <Text style={styles.resultsText}>
          {actividadesFiltradas.length}{' '}
          {actividadesFiltradas.length === 1 ? 'actividad' : 'actividades'}
        </Text>
      </View>

      {/* Lista de actividades */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {actividadesFiltradas.map((actividad) => (
          <View key={actividad.ID} style={styles.activityCardContainer}>
            <ActivityCard
              {...actividad}
              title={actividad.Titulo}
              description={actividad.Descripcion}
              type={actividad.Tipo}
              status={actividad.Estado}
              startTime={new Date(actividad.FechaInicio).toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit',
              })}
              assignedBy={actividad.AsignadoPor}
              pcd={obtenerUsuarioNombre(actividad.UsuarioID)}
              onPress={() => {
                const acciones = getAccionesActividad(actividad);
                if (acciones.length > 0) {
                  Alert.alert(
                    actividad.Titulo,
                    actividad.Descripcion,
                    acciones.map((a) => ({
                      text: a.label,
                      onPress: a.onPress,
                    }))
                  );
                }
              }}
            />

            {/* Información adicional según tipo */}
            {actividad.Tipo === 'medicine' && (
              <View style={styles.extraInfo}>
                <View style={styles.extraInfoRow}>
                  <Ionicons name="medical" size={14} color={COLORS.info} />
                  <Text style={styles.extraInfoText}>
                    {actividad.NombreMedicamento} - {actividad.Dosis}
                  </Text>
                </View>
                <View style={styles.extraInfoRow}>
                  <Ionicons name="repeat" size={14} color={COLORS.textSecondary} />
                  <Text style={styles.extraInfoText}>{actividad.Frecuencia}</Text>
                </View>
              </View>
            )}

            {actividad.Tipo === 'therapy' && actividad.Lugar && (
              <View style={styles.extraInfo}>
                <View style={styles.extraInfoRow}>
                  <Ionicons name="location" size={14} color={COLORS.info} />
                  <Text style={styles.extraInfoText}>{actividad.Lugar}</Text>
                </View>
              </View>
            )}

            {actividad.Tipo === 'exercise' && (
              <View style={styles.extraInfo}>
                <View style={styles.extraInfoRow}>
                  <Ionicons name="time" size={14} color={COLORS.textSecondary} />
                  <Text style={styles.extraInfoText}>
                    Duración: {actividad.Duracion}
                  </Text>
                </View>
                <View style={styles.extraInfoRow}>
                  <Ionicons name="flash" size={14} color={COLORS.warning} />
                  <Text style={styles.extraInfoText}>
                    Intensidad: {actividad.Intensidad}
                  </Text>
                </View>
              </View>
            )}
          </View>
        ))}

        {actividadesFiltradas.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="clipboard-outline" size={64} color={COLORS.textLight} />
            <Text style={styles.emptyStateText}>No hay actividades</Text>
            <Text style={styles.emptyStateSubtext}>
              {filtroTipo !== 'Todas' || filtroEstado !== 'Todas'
                ? 'Intenta cambiar los filtros'
                : !isPCD()
                ? 'Agrega una nueva actividad para comenzar'
                : 'No tienes actividades asignadas'}
            </Text>
          </View>
        )}

        <View style={{ height: SIZES.xl }} />
      </ScrollView>

      {/* Modal de formulario */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setModalVisible(false)}
      >
        <FormularioActividad
          actividad={actividadEditar}
          usuarios={usuarios}
          onClose={() => setModalVisible(false)}
          onSuccess={() => {
            setModalVisible(false);
            cargarDatos();
          }}
        />
      </Modal>
    </View>
  );
}

