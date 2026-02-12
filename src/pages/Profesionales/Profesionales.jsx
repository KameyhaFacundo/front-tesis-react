import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/theme';
import styles from './Profesionales.styles';
import { Avatar, Button } from '../../components';
import {
  obtenerProfesionales,
  crearProfesional,
  actualizarProfesional,
  eliminarProfesional,
  obtenerEspecialidades,
} from '../../api/profesionales';

export default function Profesionales() {
  const [profesionales, setProfesionales] = useState([]);
  const [profesionalesFiltrados, setProfesionalesFiltrados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [profesionalSeleccionado, setProfesionalSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState('');
  const [filtroEspecialidad, setFiltroEspecialidad] = useState('todas');
  const [especialidades, setEspecialidades] = useState([]);

  const [formData, setFormData] = useState({
    Nombre: '',
    Apellido: '',
    Especialidad: '',
    CorreoElectronico: '',
    Telefono: '',
    Matricula: '',
    Domicilio: '',
    FechaNacimiento: '',
    Estado: 'activo',
  });

  useEffect(() => {
    cargarProfesionales();
    cargarEspecialidades();
  }, []);

  useEffect(() => {
    filtrarProfesionales();
  }, [busqueda, filtroEspecialidad, profesionales]);

  const stats = useMemo(() => {
    const activos = profesionales.filter((p) => p.Estado === 'activo').length;
    const inactivos = profesionales.filter((p) => p.Estado === 'inactivo').length;
    return {
      total: profesionales.length,
      especialidades: especialidades.length,
      activos,
      inactivos,
    };
  }, [profesionales, especialidades]);

  const cargarProfesionales = async () => {
    try {
      setLoading(true);
      const data = await obtenerProfesionales();
      setProfesionales(data);
    } catch (error) {
      console.error('Error cargando profesionales:', error);
      Alert.alert('Error', 'No se pudieron cargar los profesionales');
    } finally {
      setLoading(false);
    }
  };

  const cargarEspecialidades = async () => {
    try {
      const data = await obtenerEspecialidades();
      setEspecialidades(data);
    } catch (error) {
      console.error('Error cargando especialidades:', error);
    }
  };

  const filtrarProfesionales = () => {
    let resultado = [...profesionales];

    if (busqueda.trim()) {
      const terminoBusqueda = busqueda.toLowerCase();
      resultado = resultado.filter(
        (p) =>
          p.Nombre.toLowerCase().includes(terminoBusqueda) ||
          p.Apellido.toLowerCase().includes(terminoBusqueda) ||
          p.Especialidad.toLowerCase().includes(terminoBusqueda) ||
          p.Matricula.toLowerCase().includes(terminoBusqueda)
      );
    }

    if (filtroEspecialidad !== 'todas') {
      resultado = resultado.filter((p) => p.Especialidad === filtroEspecialidad);
    }

    setProfesionalesFiltrados(resultado);
  };

  const abrirModalNuevo = () => {
    setModoEdicion(false);
    setProfesionalSeleccionado(null);
    setFormData({
      Nombre: '',
      Apellido: '',
      Especialidad: '',
      CorreoElectronico: '',
      Telefono: '',
      Matricula: '',
      Domicilio: '',
      FechaNacimiento: '',
      Estado: 'activo',
    });
    setModalVisible(true);
  };

  const abrirModalEditar = (profesional) => {
    setModoEdicion(true);
    setProfesionalSeleccionado(profesional);
    setFormData({
      Nombre: profesional.Nombre,
      Apellido: profesional.Apellido,
      Especialidad: profesional.Especialidad,
      CorreoElectronico: profesional.CorreoElectronico,
      Telefono: profesional.Telefono,
      Matricula: profesional.Matricula,
      Domicilio: profesional.Domicilio || '',
      FechaNacimiento: profesional.FechaNacimiento || '',
      Estado: profesional.Estado || 'activo',
    });
    setModalVisible(true);
  };

  const guardarProfesional = async () => {
    if (!formData.Nombre.trim() || !formData.Apellido.trim()) {
      Alert.alert('Error', 'Nombre y apellido son obligatorios');
      return;
    }

    if (!formData.Especialidad.trim()) {
      Alert.alert('Error', 'La especialidad es obligatoria');
      return;
    }

    if (!formData.Matricula.trim()) {
      Alert.alert('Error', 'La matricula es obligatoria');
      return;
    }

    try {
      if (modoEdicion) {
        await actualizarProfesional(profesionalSeleccionado.ID, formData);
        Alert.alert('Exito', 'Profesional actualizado correctamente');
      } else {
        await crearProfesional(formData);
        Alert.alert('Exito', 'Profesional creado correctamente');
      }
      setModalVisible(false);
      cargarProfesionales();
      cargarEspecialidades();
    } catch (error) {
      console.error('Error guardando profesional:', error);
      Alert.alert('Error', 'No se pudo guardar el profesional');
    }
  };

  const eliminarProfesionalConfirmado = (profesional) => {
    Alert.alert(
      'Eliminar profesional',
      `Estas seguro de eliminar a ${profesional.Nombre} ${profesional.Apellido}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await eliminarProfesional(profesional.ID);
              Alert.alert('Exito', 'Profesional eliminado correctamente');
              cargarProfesionales();
              cargarEspecialidades();
            } catch (error) {
              console.error('Error eliminando profesional:', error);
              Alert.alert('Error', 'No se pudo eliminar el profesional');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#F2F7FF', '#F8FBFF', '#FFFFFF']} style={styles.gradient} />
      <View style={styles.glowTop} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={cargarProfesionales} />}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient colors={['#1146A6', '#1D62D2']} style={styles.heroCard}>
          <View style={styles.heroHeader}>
            <View>
              <Text style={styles.heroTitle}>Profesionales</Text>
              <Text style={styles.heroSubtitle}>Gestion clinica y especialidades</Text>
            </View>
            <TouchableOpacity style={styles.heroAddButton} onPress={abrirModalNuevo}>
              <Ionicons name="add" size={20} color="#0D3B8E" />
            </TouchableOpacity>
          </View>

          <View style={styles.heroStats}>
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatValue}>{stats.total}</Text>
              <Text style={styles.heroStatLabel}>Total</Text>
            </View>
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatValue}>{stats.especialidades}</Text>
              <Text style={styles.heroStatLabel}>Especialidades</Text>
            </View>
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatValue}>{stats.activos}</Text>
              <Text style={styles.heroStatLabel}>Activos</Text>
            </View>
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatValue}>{stats.inactivos}</Text>
              <Text style={styles.heroStatLabel}>Inactivos</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={COLORS.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nombre, especialidad o matricula"
            value={busqueda}
            onChangeText={setBusqueda}
            placeholderTextColor={COLORS.textLight}
          />
          {busqueda.length > 0 && (
            <TouchableOpacity onPress={() => setBusqueda('')}>
              <Ionicons name="close-circle" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          <TouchableOpacity
            style={[styles.filterChip, filtroEspecialidad === 'todas' && styles.filterChipActive]}
            onPress={() => setFiltroEspecialidad('todas')}
          >
            <Text style={[styles.filterChipText, filtroEspecialidad === 'todas' && styles.filterChipTextActive]}>
              Todas ({profesionales.length})
            </Text>
          </TouchableOpacity>

          {especialidades.map((esp) => {
            const count = profesionales.filter((p) => p.Especialidad === esp).length;
            return (
              <TouchableOpacity
                key={esp}
                style={[styles.filterChip, filtroEspecialidad === esp && styles.filterChipActive]}
                onPress={() => setFiltroEspecialidad(esp)}
              >
                <Text style={[styles.filterChipText, filtroEspecialidad === esp && styles.filterChipTextActive]}>
                  {esp} ({count})
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.resultsCounter}>
          <Text style={styles.resultsText}>
            {profesionalesFiltrados.length} {profesionalesFiltrados.length === 1 ? 'profesional' : 'profesionales'}
          </Text>
        </View>

        {profesionalesFiltrados.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="briefcase-outline" size={64} color={COLORS.textLight} />
            <Text style={styles.emptyText}>No se encontraron profesionales</Text>
          </View>
        ) : (
          profesionalesFiltrados.map((profesional) => (
            <View key={profesional.ID} style={styles.card}>
              <View style={styles.cardHeader}>
                <Avatar name={`${profesional.Nombre} ${profesional.Apellido}`} type="professional" size="medium" />
                <View style={styles.cardInfo}>
                  <Text style={styles.cardName}>{profesional.Nombre} {profesional.Apellido}</Text>
                  <View style={styles.especialidadBadge}>
                    <Ionicons name="medical" size={14} color={COLORS.professional} />
                    <Text style={styles.especialidadText}>{profesional.Especialidad}</Text>
                  </View>
                  <Text style={styles.cardMatricula}>Mat: {profesional.Matricula}</Text>
                </View>
                <View style={styles.cardActions}>
                  <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#EAF1FF' }]} onPress={() => abrirModalEditar(profesional)}>
                    <Ionicons name="create-outline" size={20} color={COLORS.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#FFEBEE' }]} onPress={() => eliminarProfesionalConfirmado(profesional)}>
                    <Ionicons name="trash-outline" size={20} color={COLORS.error} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.cardDetails}>
                {profesional.CorreoElectronico && (
                  <View style={styles.detailRow}>
                    <Ionicons name="mail" size={16} color={COLORS.textSecondary} />
                    <Text style={styles.detailText}>{profesional.CorreoElectronico}</Text>
                  </View>
                )}
                {profesional.Telefono && (
                  <View style={styles.detailRow}>
                    <Ionicons name="call" size={16} color={COLORS.textSecondary} />
                    <Text style={styles.detailText}>{profesional.Telefono}</Text>
                  </View>
                )}
                {profesional.Domicilio && (
                  <View style={styles.detailRow}>
                    <Ionicons name="location" size={16} color={COLORS.textSecondary} />
                    <Text style={styles.detailText}>{profesional.Domicilio}</Text>
                  </View>
                )}
              </View>

              <View style={styles.cardFooter}>
                <View
                  style={[
                    styles.estadoBadge,
                    { backgroundColor: profesional.Estado === 'activo' ? COLORS.successLight : COLORS.errorLight },
                  ]}
                >
                  <Text
                    style={[
                      styles.estadoText,
                      { color: profesional.Estado === 'activo' ? COLORS.success : COLORS.error },
                    ]}
                  >
                    {profesional.Estado === 'activo' ? 'Activo' : 'Inactivo'}
                  </Text>
                </View>
              </View>
            </View>
          ))
        )}

        <View style={{ height: SIZES.xxl }} />
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={abrirModalNuevo}>
        <Ionicons name="add" size={28} color={COLORS.white} />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHandle} />
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>{modoEdicion ? 'Editar profesional' : 'Nuevo profesional'}</Text>
                <Text style={styles.modalSubtitle}>Completá datos clinicos y de contacto para guardar.</Text>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCloseButton}>
                <Ionicons name="close" size={28} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalForm}>
              <View style={styles.formCard}>
                <View style={styles.formSectionHeader}>
                  <View style={styles.formSectionIcon}>
                    <Ionicons name="medkit-outline" size={16} color={COLORS.primary} />
                  </View>
                  <Text style={styles.formSectionTitle}>Datos profesionales</Text>
                </View>

                <View style={styles.formRow}>
                  <View style={styles.formField}>
                    <Text style={styles.label}>Nombre *</Text>
                    <TextInput
                      style={styles.input}
                      value={formData.Nombre}
                      onChangeText={(text) => setFormData({ ...formData, Nombre: text })}
                      placeholder="Ej: Carlos"
                    />
                  </View>
                  <View style={styles.formField}>
                    <Text style={styles.label}>Apellido *</Text>
                    <TextInput
                      style={styles.input}
                      value={formData.Apellido}
                      onChangeText={(text) => setFormData({ ...formData, Apellido: text })}
                      placeholder="Ej: Garcia"
                    />
                  </View>
                </View>

                <Text style={styles.label}>Especialidad *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.Especialidad}
                  onChangeText={(text) => setFormData({ ...formData, Especialidad: text })}
                  placeholder="Ej: Fisioterapia"
                />

                <Text style={styles.label}>Matricula *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.Matricula}
                  onChangeText={(text) => setFormData({ ...formData, Matricula: text })}
                  placeholder="Ej: FT-12345"
                />
              </View>

              <View style={styles.formCard}>
                <View style={styles.formSectionHeader}>
                  <View style={styles.formSectionIcon}>
                    <Ionicons name="mail-outline" size={16} color={COLORS.primary} />
                  </View>
                  <Text style={styles.formSectionTitle}>Contacto y estado</Text>
                </View>

                <Text style={styles.label}>Correo electronico</Text>
                <TextInput
                  style={styles.input}
                  value={formData.CorreoElectronico}
                  onChangeText={(text) => setFormData({ ...formData, CorreoElectronico: text })}
                  placeholder="Ej: profesional@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <Text style={styles.label}>Telefono</Text>
                <TextInput
                  style={styles.input}
                  value={formData.Telefono}
                  onChangeText={(text) => setFormData({ ...formData, Telefono: text })}
                  placeholder="Ej: 11-2345-6789"
                  keyboardType="phone-pad"
                />

                <Text style={styles.label}>Domicilio</Text>
                <TextInput
                  style={styles.input}
                  value={formData.Domicilio}
                  onChangeText={(text) => setFormData({ ...formData, Domicilio: text })}
                  placeholder="Ej: Av. Corrientes 1234"
                />

                <Text style={styles.label}>Fecha de nacimiento</Text>
                <TextInput
                  style={styles.input}
                  value={formData.FechaNacimiento}
                  onChangeText={(text) => setFormData({ ...formData, FechaNacimiento: text })}
                  placeholder="YYYY-MM-DD"
                />

                <Text style={styles.label}>Estado</Text>
                <View style={styles.estadoSelector}>
                  <TouchableOpacity
                    style={[styles.estadoOption, formData.Estado === 'activo' && styles.estadoOptionActive]}
                    onPress={() => setFormData({ ...formData, Estado: 'activo' })}
                  >
                    <Text style={[styles.estadoOptionText, formData.Estado === 'activo' && styles.estadoOptionTextActive]}>
                      Activo
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.estadoOption, formData.Estado === 'inactivo' && styles.estadoOptionActive]}
                    onPress={() => setFormData({ ...formData, Estado: 'inactivo' })}
                  >
                    <Text style={[styles.estadoOptionText, formData.Estado === 'inactivo' && styles.estadoOptionTextActive]}>
                      Inactivo
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.modalButtons}>
                <Button
                  title="Cancelar"
                  onPress={() => setModalVisible(false)}
                  variant="secondary"
                  style={styles.modalButton}
                />
                <Button
                  title={modoEdicion ? 'Actualizar' : 'Crear'}
                  onPress={guardarProfesional}
                  style={styles.modalButton}
                />
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
