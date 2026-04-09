import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Avatar, Button, Input, EmptyState, SkeletonCard } from '../../components';
import { COLORS, SIZES } from '../../constants/theme';
import styles from './Usuarios.styles';
import { useToast } from '../../contexts/ToastContext';
import {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from '../../api/usuarios';

export default function Usuarios() {
  const { showToast } = useToast();
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [filtroRol, setFiltroRol] = useState('Todos');
  const [modalVisible, setModalVisible] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState(null);
  const [formData, setFormData] = useState({});

  const roles = ['Todos', 'PCD', 'Tutor', 'Profesional', 'Administrador'];

  useEffect(() => {
    cargarUsuarios();
  }, []);

  useEffect(() => {
    filtrarUsuarios();
  }, [searchText, filtroRol, usuarios]);

  const stats = useMemo(() => {
    const pcd = usuarios.filter((u) => u.Rol === 'PCD').length;
    const tutor = usuarios.filter((u) => u.Rol === 'Tutor').length;
    const profesional = usuarios.filter((u) => u.Rol === 'Profesional').length;

    return {
      total: usuarios.length,
      pcd,
      tutor,
      profesional,
    };
  }, [usuarios]);

  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      const data = await obtenerUsuarios();
      setUsuarios(data);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  const filtrarUsuarios = () => {
    let filtered = [...usuarios];

    if (filtroRol !== 'Todos') {
      filtered = filtered.filter((u) => u.Rol === filtroRol);
    }

    if (searchText.trim()) {
      const search = searchText.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.Nombre?.toLowerCase().includes(search) ||
          u.Apellido?.toLowerCase().includes(search) ||
          u.CorreoElectronico?.toLowerCase().includes(search) ||
          u.DNI?.includes(search)
      );
    }

    setUsuariosFiltrados(filtered);
  };

  const abrirModalNuevo = () => {
    setUsuarioEditar(null);
    setFormData({
      Nombre: '',
      Apellido: '',
      DNI: '',
      CorreoElectronico: '',
      Password: '1234',
      Telefono: '',
      Direccion: '',
      FechaNacimiento: '',
      Rol: 'PCD',
    });
    setModalVisible(true);
  };

  const abrirModalEditar = (usuario) => {
    setUsuarioEditar(usuario);
    setFormData({ ...usuario });
    setModalVisible(true);
  };

  const guardarUsuario = async () => {
    try {
      if (!formData.Nombre || !formData.Apellido || !formData.CorreoElectronico) {
        Alert.alert('Error', 'Nombre, Apellido y Email son requeridos');
        return;
      }

      setLoading(true);

      if (usuarioEditar) {
        await actualizarUsuario(usuarioEditar.ID, formData);
        showToast('Usuario actualizado correctamente', 'success');
      } else {
        await crearUsuario(formData);
        showToast('Usuario creado correctamente', 'success');
      }

      setModalVisible(false);
      cargarUsuarios();
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el usuario');
    } finally {
      setLoading(false);
    }
  };

  const confirmarEliminar = (usuario) => {
    Alert.alert(
      'Confirmar eliminacion',
      `Estas seguro de eliminar a ${usuario.Nombre} ${usuario.Apellido}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => eliminarUsuarioConfirmado(usuario.ID),
        },
      ]
    );
  };

  const eliminarUsuarioConfirmado = async (id) => {
    try {
      setLoading(true);
      await eliminarUsuario(id);
      showToast('Usuario eliminado correctamente', 'success');
      cargarUsuarios();
    } catch (error) {
      Alert.alert('Error', 'No se pudo eliminar el usuario');
    } finally {
      setLoading(false);
    }
  };

  const getRolColor = (rol) => {
    switch (rol) {
      case 'PCD':
        return COLORS.user;
      case 'Tutor':
        return COLORS.tutor;
      case 'Profesional':
        return COLORS.professional;
      case 'Administrador':
        return COLORS.primary;
      default:
        return COLORS.textSecondary;
    }
  };

  const getRolIcon = (rol) => {
    switch (rol) {
      case 'PCD':
        return 'person';
      case 'Tutor':
        return 'people';
      case 'Profesional':
        return 'medical';
      case 'Administrador':
        return 'shield-checkmark';
      default:
        return 'person-outline';
    }
  };

  if (loading && usuarios.length === 0) {
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
      <LinearGradient colors={['#F2F7FF', '#F8FBFF', '#FFFFFF']} style={styles.gradient} />
      <View style={styles.glowTop} />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#1146A6', '#1D62D2']} style={styles.heroCard}>
          <View style={styles.heroHeader}>
            <View>
              <Text style={styles.heroTitle}>Usuarios</Text>
              <Text style={styles.heroSubtitle}>Gestion de personas y roles</Text>
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
              <Text style={styles.heroStatValue}>{stats.pcd}</Text>
              <Text style={styles.heroStatLabel}>PCD</Text>
            </View>
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatValue}>{stats.tutor}</Text>
              <Text style={styles.heroStatLabel}>Tutores</Text>
            </View>
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatValue}>{stats.profesional}</Text>
              <Text style={styles.heroStatLabel}>Profesionales</Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={COLORS.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nombre, email o DNI"
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor={COLORS.textLight}
          />
          {searchText ? (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Ionicons name="close-circle" size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
          ) : null}
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          {roles.map((rol) => (
            <TouchableOpacity
              key={rol}
              style={[styles.filterChip, filtroRol === rol && styles.filterChipActive]}
              onPress={() => setFiltroRol(rol)}
            >
              <Text style={[styles.filterChipText, filtroRol === rol && styles.filterChipTextActive]}>{rol}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.resultsCounter}>
          <Text style={styles.resultsText}>
            {usuariosFiltrados.length} {usuariosFiltrados.length === 1 ? 'usuario' : 'usuarios'}
          </Text>
        </View>

        {usuariosFiltrados.map((usuario) => (
          <View key={usuario.ID} style={styles.userCard}>
            <View style={styles.userCardHeader}>
              <Avatar
                name={`${usuario.Nombre} ${usuario.Apellido}`}
                type={usuario.Rol === 'PCD' ? 'user' : usuario.Rol === 'Tutor' ? 'tutor' : 'professional'}
                size="large"
              />
              <View style={styles.userCardInfo}>
                <Text style={styles.userName}>{usuario.Nombre} {usuario.Apellido}</Text>
                <View style={[styles.roleBadge, { backgroundColor: `${getRolColor(usuario.Rol)}20` }]}>
                  <Ionicons name={getRolIcon(usuario.Rol)} size={14} color={getRolColor(usuario.Rol)} />
                  <Text style={[styles.roleText, { color: getRolColor(usuario.Rol) }]}>{usuario.Rol}</Text>
                </View>
              </View>
            </View>

            <View style={styles.userCardDetails}>
              <View style={styles.detailRow}>
                <Ionicons name="mail" size={16} color={COLORS.textSecondary} />
                <Text style={styles.detailText}>{usuario.CorreoElectronico}</Text>
              </View>
              {usuario.Telefono && (
                <View style={styles.detailRow}>
                  <Ionicons name="call" size={16} color={COLORS.textSecondary} />
                  <Text style={styles.detailText}>{usuario.Telefono}</Text>
                </View>
              )}
              {usuario.DNI && (
                <View style={styles.detailRow}>
                  <Ionicons name="card" size={16} color={COLORS.textSecondary} />
                  <Text style={styles.detailText}>DNI: {usuario.DNI}</Text>
                </View>
              )}
              {usuario.Especialidad && (
                <View style={styles.detailRow}>
                  <Ionicons name="medical" size={16} color={COLORS.professional} />
                  <Text style={styles.detailText}>{usuario.Especialidad}</Text>
                </View>
              )}
              {usuario.TipoDiscapacidad && (
                <View style={styles.detailRow}>
                  <Ionicons name="information-circle" size={16} color={COLORS.user} />
                  <Text style={styles.detailText}>{usuario.TipoDiscapacidad} - Grado {usuario.Grado}</Text>
                </View>
              )}
            </View>

            <View style={styles.userCardActions}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: '#EAF1FF' }]}
                onPress={() => abrirModalEditar(usuario)}
              >
                <Ionicons name="create" size={18} color={COLORS.primary} />
                <Text style={[styles.actionButtonText, { color: COLORS.primary }]}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: '#FFEBEE' }]}
                onPress={() => confirmarEliminar(usuario)}
              >
                <Ionicons name="trash" size={18} color={COLORS.error} />
                <Text style={[styles.actionButtonText, { color: COLORS.error }]}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {usuariosFiltrados.length === 0 && (
          <EmptyState
            icon="people-outline"
            title="No se encontraron usuarios"
            description={
              searchText || filtroRol !== 'Todos'
                ? 'Intenta cambiar los filtros.'
                : 'Agrega un nuevo usuario para comenzar.'
            }
            actionText="Nuevo usuario"
            onAction={abrirModalNuevo}
          />
        )}

        <View style={{ height: SIZES.xl }} />
      </ScrollView>

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
                <Text style={styles.modalTitle}>{usuarioEditar ? 'Editar usuario' : 'Nuevo usuario'}</Text>
                <Text style={styles.modalSubtitle}>Completá la informacion obligatoria para continuar.</Text>
              </View>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCloseButton}>
                <Ionicons name="close" size={28} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
              <View style={[styles.formSection, styles.formCard]}>
                <View style={styles.formSectionHeader}>
                  <View style={styles.formSectionIcon}>
                    <Ionicons name="person-outline" size={16} color={COLORS.primary} />
                  </View>
                  <Text style={styles.formSectionTitle}>Informacion personal</Text>
                </View>

                <Input
                  label="Nombre *"
                  value={formData.Nombre}
                  onChangeText={(text) => setFormData({ ...formData, Nombre: text })}
                  placeholder="Ingrese el nombre"
                />

                <Input
                  label="Apellido *"
                  value={formData.Apellido}
                  onChangeText={(text) => setFormData({ ...formData, Apellido: text })}
                  placeholder="Ingrese el apellido"
                />

                <Input
                  label="DNI"
                  value={formData.DNI}
                  onChangeText={(text) => setFormData({ ...formData, DNI: text })}
                  placeholder="12345678"
                  keyboardType="numeric"
                />

                <Input
                  label="Fecha de nacimiento"
                  value={formData.FechaNacimiento}
                  onChangeText={(text) => setFormData({ ...formData, FechaNacimiento: text })}
                  placeholder="YYYY-MM-DD"
                />
              </View>

              <View style={[styles.formSection, styles.formCard]}>
                <View style={styles.formSectionHeader}>
                  <View style={styles.formSectionIcon}>
                    <Ionicons name="mail-outline" size={16} color={COLORS.primary} />
                  </View>
                  <Text style={styles.formSectionTitle}>Contacto</Text>
                </View>

                <Input
                  label="Email *"
                  value={formData.CorreoElectronico}
                  onChangeText={(text) => setFormData({ ...formData, CorreoElectronico: text })}
                  placeholder="usuario@ejemplo.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <Input
                  label="Telefono"
                  value={formData.Telefono}
                  onChangeText={(text) => setFormData({ ...formData, Telefono: text })}
                  placeholder="1234567890"
                  keyboardType="phone-pad"
                />

                <Input
                  label="Direccion"
                  value={formData.Direccion}
                  onChangeText={(text) => setFormData({ ...formData, Direccion: text })}
                  placeholder="Calle, numero, ciudad"
                />

                {!usuarioEditar && (
                  <Input
                    label="Contrasena"
                    value={formData.Password}
                    onChangeText={(text) => setFormData({ ...formData, Password: text })}
                    placeholder="••••••••"
                    secureTextEntry
                  />
                )}
              </View>

              <View style={[styles.formSection, styles.formCard]}>
                <View style={styles.formSectionHeader}>
                  <View style={styles.formSectionIcon}>
                    <Ionicons name="shield-checkmark-outline" size={16} color={COLORS.primary} />
                  </View>
                  <Text style={styles.formSectionTitle}>Rol y permisos</Text>
                </View>
                <Text style={styles.inputLabel}>Rol *</Text>
                <View style={styles.rolePicker}>
                  {['PCD', 'Tutor', 'Profesional', 'Administrador'].map((rol) => (
                    <TouchableOpacity
                      key={rol}
                      style={[styles.roleOption, formData.Rol === rol && styles.roleOptionActive]}
                      onPress={() => setFormData({ ...formData, Rol: rol })}
                    >
                      <Ionicons
                        name={getRolIcon(rol)}
                        size={20}
                        color={formData.Rol === rol ? COLORS.white : getRolColor(rol)}
                      />
                      <Text style={[styles.roleOptionText, formData.Rol === rol && styles.roleOptionTextActive]}>{rol}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {formData.Rol === 'Profesional' && (
                <View style={[styles.formSection, styles.formCard]}>
                  <View style={styles.formSectionHeader}>
                    <View style={styles.formSectionIcon}>
                      <Ionicons name="medkit-outline" size={16} color={COLORS.primary} />
                    </View>
                    <Text style={styles.formSectionTitle}>Datos profesionales</Text>
                  </View>

                  <Input
                    label="Matricula"
                    value={formData.Matricula}
                    onChangeText={(text) => setFormData({ ...formData, Matricula: text })}
                    placeholder="MP-12345"
                  />

                  <Input
                    label="Especialidad"
                    value={formData.Especialidad}
                    onChangeText={(text) => setFormData({ ...formData, Especialidad: text })}
                    placeholder="Medicina General, Fisioterapia, etc."
                  />

                  <Input
                    label="Establecimiento"
                    value={formData.Establecimiento}
                    onChangeText={(text) => setFormData({ ...formData, Establecimiento: text })}
                    placeholder="Hospital, Clinica, etc."
                  />

                  <Input
                    label="Descripcion"
                    value={formData.Descripcion}
                    onChangeText={(text) => setFormData({ ...formData, Descripcion: text })}
                    placeholder="Breve descripcion profesional"
                    multiline
                  />
                </View>
              )}

              {formData.Rol === 'PCD' && (
                <View style={[styles.formSection, styles.formCard]}>
                  <View style={styles.formSectionHeader}>
                    <View style={styles.formSectionIcon}>
                      <Ionicons name="accessibility-outline" size={16} color={COLORS.primary} />
                    </View>
                    <Text style={styles.formSectionTitle}>Datos de discapacidad</Text>
                  </View>

                  <Input
                    label="Tipo de discapacidad"
                    value={formData.TipoDiscapacidad}
                    onChangeText={(text) => setFormData({ ...formData, TipoDiscapacidad: text })}
                    placeholder="Motora, Visual, Auditiva, Intelectual, etc."
                  />

                  <Input
                    label="Grado"
                    value={formData.Grado}
                    onChangeText={(text) => setFormData({ ...formData, Grado: text })}
                    placeholder="Leve, Moderado, Severo"
                  />

                  <Input
                    label="Diagnostico"
                    value={formData.Diagnostico}
                    onChangeText={(text) => setFormData({ ...formData, Diagnostico: text })}
                    placeholder="Descripcion del diagnostico"
                    multiline
                  />
                </View>
              )}

              <View style={styles.modalActions}>
                <Button
                  title="Cancelar"
                  variant="outline"
                  onPress={() => setModalVisible(false)}
                  style={{ flex: 1 }}
                />
                <Button
                  title={usuarioEditar ? 'Actualizar' : 'Crear'}
                  onPress={guardarUsuario}
                  loading={loading}
                  style={{ flex: 1 }}
                />
              </View>

              <View style={{ height: SIZES.xl }} />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
