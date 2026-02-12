import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Input } from '../../components';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import styles from './FormularioActividad.styles';
import { crearActividad, actualizarActividad } from '../../api/actividades';
import { useAuth } from '../../contexts/AuthContext';

export default function FormularioActividad({ actividad, usuarios, onClose, onSuccess }) {
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [tipoSeleccionado, setTipoSeleccionado] = useState(
    actividad?.Tipo || 'medicine'
  );

  const [formData, setFormData] = useState({
    Titulo: actividad?.Titulo || '',
    Descripcion: actividad?.Descripcion || '',
    Tipo: actividad?.Tipo || 'medicine',
    Estado: actividad?.Estado || 'pending',
    FechaInicio: actividad?.FechaInicio || '',
    FechaFin: actividad?.FechaFin || '',
    UsuarioID: actividad?.UsuarioID || '',
    AsignadoPorID: user?.ID || null,
    AsignadoPor: user ? `${user.Nombre} ${user.Apellido}` : '',
    Notas: actividad?.Notas || '',
    Recordatorio: actividad?.Recordatorio !== undefined ? actividad.Recordatorio : true,
    MinutosAntes: actividad?.MinutosAntes || 15,
    // Medicamento
    NombreMedicamento: actividad?.NombreMedicamento || '',
    Dosis: actividad?.Dosis || '',
    Via: actividad?.Via || 'Oral',
    Frecuencia: actividad?.Frecuencia || '',
    // Terapia
    TipoTerapia: actividad?.TipoTerapia || '',
    Profesional: actividad?.Profesional || '',
    Lugar: actividad?.Lugar || '',
    Especialidad: actividad?.Especialidad || '',
    // Ejercicio
    TipoEjercicio: actividad?.TipoEjercicio || '',
    Duracion: actividad?.Duracion || '',
    Intensidad: actividad?.Intensidad || 'Moderada',
  });

  const tipos = [
    { id: 'medicine', label: 'Medicamento', icon: 'medical' },
    { id: 'therapy', label: 'Terapia', icon: 'fitness' },
    { id: 'exercise', label: 'Ejercicio', icon: 'barbell' },
    { id: 'appointment', label: 'Cita', icon: 'calendar' },
  ];

  const pcdUsuarios = usuarios.filter((u) => u.Rol === 'PCD');

  const guardarActividad = async () => {
    if (!user?.ID) {
      Alert.alert('Sesion no disponible', 'Volve a iniciar sesion para crear actividades');
      return;
    }

    // Validaciones
    if (!formData.Titulo.trim()) {
      Alert.alert('Error', 'El título es requerido');
      return;
    }

    if (!formData.UsuarioID) {
      Alert.alert('Error', 'Debes seleccionar un usuario');
      return;
    }

    if (!formData.FechaInicio) {
      Alert.alert('Error', 'La fecha de inicio es requerida');
      return;
    }

    // Validaciones específicas por tipo
    if (tipoSeleccionado === 'medicine') {
      if (!formData.NombreMedicamento || !formData.Dosis) {
        Alert.alert('Error', 'Nombre y dosis del medicamento son requeridos');
        return;
      }
    }

    try {
      setLoading(true);

      const datosActividad = {
        ...formData,
        Tipo: tipoSeleccionado,
      };

      if (actividad) {
        await actualizarActividad(actividad.ID, datosActividad);
        Alert.alert('Éxito', 'Actividad actualizada correctamente');
      } else {
        await crearActividad(datosActividad);
        Alert.alert('Éxito', 'Actividad creada correctamente');
      }

      onSuccess();
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la actividad');
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  if (authLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cargando...</Text>
          <View style={{ width: 40 }} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {actividad ? 'Editar Actividad' : 'Nueva Actividad'}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Tabs de tipo de actividad */}
      <View style={styles.tabsContainer}>
        {tipos.map((tipo) => (
          <TouchableOpacity
            key={tipo.id}
            style={[
              styles.tab,
              tipoSeleccionado === tipo.id && styles.tabActive,
            ]}
            onPress={() => setTipoSeleccionado(tipo.id)}
          >
            <Ionicons
              name={tipo.icon}
              size={20}
              color={tipoSeleccionado === tipo.id ? COLORS.primary : COLORS.textSecondary}
            />
            <Text
              style={[
                styles.tabText,
                tipoSeleccionado === tipo.id && styles.tabTextActive,
              ]}
            >
              {tipo.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Información General */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información General</Text>

          <Input
            label="Título *"
            value={formData.Titulo}
            onChangeText={(text) => updateFormData('Titulo', text)}
            placeholder="Ej: Tomar Ibuprofeno"
          />

          <Input
            label="Descripción"
            value={formData.Descripcion}
            onChangeText={(text) => updateFormData('Descripcion', text)}
            placeholder="Detalles adicionales"
            multiline
          />

          <Text style={styles.inputLabel}>Usuario (PCD) *</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.userPicker}
          >
            {pcdUsuarios.map((usuario) => (
              <TouchableOpacity
                key={usuario.ID}
                style={[
                  styles.userOption,
                  formData.UsuarioID === usuario.ID && styles.userOptionActive,
                ]}
                onPress={() => updateFormData('UsuarioID', usuario.ID)}
              >
                <Text
                  style={[
                    styles.userOptionText,
                    formData.UsuarioID === usuario.ID && styles.userOptionTextActive,
                  ]}
                >
                  {usuario.Nombre} {usuario.Apellido}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Input
            label="Fecha y Hora de Inicio *"
            value={formData.FechaInicio}
            onChangeText={(text) => updateFormData('FechaInicio', text)}
            placeholder="YYYY-MM-DDTHH:mm:ss"
          />

          <Input
            label="Fecha y Hora de Fin"
            value={formData.FechaFin}
            onChangeText={(text) => updateFormData('FechaFin', text)}
            placeholder="YYYY-MM-DDTHH:mm:ss"
          />

          <Input
            label="Notas"
            value={formData.Notas}
            onChangeText={(text) => updateFormData('Notas', text)}
            placeholder="Notas adicionales"
            multiline
          />
        </View>

        {/* Campos específicos por tipo */}
        {tipoSeleccionado === 'medicine' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Datos del Medicamento</Text>

            <Input
              label="Nombre del Medicamento *"
              value={formData.NombreMedicamento}
              onChangeText={(text) => updateFormData('NombreMedicamento', text)}
              placeholder="Ej: Ibuprofeno"
            />

            <Input
              label="Dosis *"
              value={formData.Dosis}
              onChangeText={(text) => updateFormData('Dosis', text)}
              placeholder="Ej: 400mg"
            />

            <Text style={styles.inputLabel}>Vía de Administración</Text>
            <View style={styles.optionsPicker}>
              {['Oral', 'Tópica', 'Inyectable', 'Otra'].map((via) => (
                <TouchableOpacity
                  key={via}
                  style={[
                    styles.optionChip,
                    formData.Via === via && styles.optionChipActive,
                  ]}
                  onPress={() => updateFormData('Via', via)}
                >
                  <Text
                    style={[
                      styles.optionChipText,
                      formData.Via === via && styles.optionChipTextActive,
                    ]}
                  >
                    {via}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Input
              label="Frecuencia"
              value={formData.Frecuencia}
              onChangeText={(text) => updateFormData('Frecuencia', text)}
              placeholder="Ej: Cada 8 horas, Diaria, etc."
            />
          </View>
        )}

        {tipoSeleccionado === 'therapy' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Datos de la Terapia</Text>

            <Input
              label="Tipo de Terapia"
              value={formData.TipoTerapia}
              onChangeText={(text) => updateFormData('TipoTerapia', text)}
              placeholder="Ej: Fisioterapia, Psicología, etc."
            />

            <Input
              label="Profesional"
              value={formData.Profesional}
              onChangeText={(text) => updateFormData('Profesional', text)}
              placeholder="Nombre del profesional"
            />

            <Input
              label="Lugar"
              value={formData.Lugar}
              onChangeText={(text) => updateFormData('Lugar', text)}
              placeholder="Centro, clínica, hospital, etc."
            />

            <Input
              label="Especialidad"
              value={formData.Especialidad}
              onChangeText={(text) => updateFormData('Especialidad', text)}
              placeholder="Área de especialización"
            />
          </View>
        )}

        {tipoSeleccionado === 'exercise' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Datos del Ejercicio</Text>

            <Input
              label="Tipo de Ejercicio"
              value={formData.TipoEjercicio}
              onChangeText={(text) => updateFormData('TipoEjercicio', text)}
              placeholder="Ej: Estiramiento, Caminata, etc."
            />

            <Input
              label="Duración"
              value={formData.Duracion}
              onChangeText={(text) => updateFormData('Duracion', text)}
              placeholder="Ej: 15 minutos, 30 minutos"
            />

            <Text style={styles.inputLabel}>Intensidad</Text>
            <View style={styles.optionsPicker}>
              {['Baja', 'Moderada', 'Alta'].map((intensidad) => (
                <TouchableOpacity
                  key={intensidad}
                  style={[
                    styles.optionChip,
                    formData.Intensidad === intensidad && styles.optionChipActive,
                  ]}
                  onPress={() => updateFormData('Intensidad', intensidad)}
                >
                  <Text
                    style={[
                      styles.optionChipText,
                      formData.Intensidad === intensidad && styles.optionChipTextActive,
                    ]}
                  >
                    {intensidad}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {tipoSeleccionado === 'appointment' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Datos de la Cita</Text>

            <Input
              label="Profesional"
              value={formData.Profesional}
              onChangeText={(text) => updateFormData('Profesional', text)}
              placeholder="Nombre del profesional"
            />

            <Input
              label="Lugar"
              value={formData.Lugar}
              onChangeText={(text) => updateFormData('Lugar', text)}
              placeholder="Consultorio, hospital, etc."
            />

            <Input
              label="Especialidad"
              value={formData.Especialidad}
              onChangeText={(text) => updateFormData('Especialidad', text)}
              placeholder="Medicina general, Cardiología, etc."
            />
          </View>
        )}

        {/* Recordatorios */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recordatorios</Text>

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => updateFormData('Recordatorio', !formData.Recordatorio)}
          >
            <Ionicons
              name={formData.Recordatorio ? 'checkbox' : 'square-outline'}
              size={24}
              color={COLORS.primary}
            />
            <Text style={styles.checkboxLabel}>Activar recordatorio</Text>
          </TouchableOpacity>

          {formData.Recordatorio && (
            <Input
              label="Minutos antes"
              value={String(formData.MinutosAntes)}
              onChangeText={(text) => updateFormData('MinutosAntes', parseInt(text) || 0)}
              placeholder="15"
              keyboardType="numeric"
            />
          )}
        </View>

        {/* Botones de acción */}
        <View style={styles.actions}>
          <Button
            title="Cancelar"
            variant="outline"
            onPress={onClose}
            style={{ flex: 1 }}
          />
          <Button
            title={actividad ? 'Actualizar' : 'Crear'}
            onPress={guardarActividad}
            loading={loading}
            style={{ flex: 1 }}
          />
        </View>

        <View style={{ height: SIZES.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

