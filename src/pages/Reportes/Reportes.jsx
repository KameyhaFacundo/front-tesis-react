import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { Button, EmptyState, SkeletonCard } from '../../components';
import { COLORS, SIZES } from '../../constants/theme';
import styles from './Reportes.styles';
import {
  obtenerReportes,
  obtenerReportesPorUsuario,
  obtenerReportePorId,
  eliminarReporte,
  descargarAdjunto,
} from '../../api/reportes';

export default function Reportes() {
  const { user, isPCD } = useAuth();
  const [reportes, setReportes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reporteSeleccionado, setReporteSeleccionado] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    cargarReportes();
  }, []);

  const cargarReportes = async () => {
    if (isPCD() && !user?.ID) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const data = isPCD()
        ? await obtenerReportesPorUsuario(user?.ID)
        : await obtenerReportes();
      setReportes(data.sort((a, b) =>
        new Date(b.FechaCreacion) - new Date(a.FechaCreacion)
      ));
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los reportes');
    } finally {
      setLoading(false);
    }
  };

  const abrirReporte = async (id) => {
    try {
      const reporte = await obtenerReportePorId(id);
      setReporteSeleccionado(reporte);
      setModalVisible(true);
    } catch (error) {
      Alert.alert('Error', 'No se pudo cargar el reporte');
    }
  };

  const confirmarEliminar = (reporte) => {
    Alert.alert(
      'Eliminar Reporte',
      `¿Estás seguro de eliminar "${reporte.Titulo}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await eliminarReporte(reporte.ID);
              Alert.alert('Éxito', 'Reporte eliminado');
              cargarReportes();
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar el reporte');
            }
          },
        },
      ]
    );
  };

  const manejarDescargarAdjunto = async (adjunto) => {
    try {
      const resultado = await descargarAdjunto(adjunto);
      Alert.alert('Descarga', resultado.message);
    } catch (error) {
      Alert.alert('Error', 'No se pudo descargar el archivo');
    }
  };

  const getIconoAdjunto = (tipo) => {
    switch (tipo) {
      case 'pdf':
        return 'document-text';
      case 'image':
        return 'image';
      case 'document':
        return 'document';
      default:
        return 'attach';
    }
  };

  const getColorAdjunto = (tipo) => {
    switch (tipo) {
      case 'pdf':
        return COLORS.error;
      case 'image':
        return COLORS.success;
      case 'document':
        return COLORS.info;
      default:
        return COLORS.textSecondary;
    }
  };

  const getColorEstadoObjetivo = (estado) => {
    switch (estado) {
      case 'completado':
        return COLORS.success;
      case 'en_progreso':
        return COLORS.warning;
      case 'pendiente':
        return COLORS.textSecondary;
      default:
        return COLORS.textLight;
    }
  };

  if (loading && reportes.length === 0) {
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
        <Text style={styles.headerTitle}>Reportes de Progreso</Text>
      </View>

      {/* Lista de reportes */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={cargarReportes} />}
        showsVerticalScrollIndicator={false}
      >
        {reportes.map((reporte) => (
          <TouchableOpacity
            key={reporte.ID}
            style={styles.reportCard}
            onPress={() => abrirReporte(reporte.ID)}
          >
            <View style={styles.reportHeader}>
              <View
                style={[
                  styles.progressCircle,
                  {
                    borderColor:
                      reporte.Progreso >= 75
                        ? COLORS.success
                        : reporte.Progreso >= 50
                        ? COLORS.warning
                        : COLORS.error,
                  },
                ]}
              >
                <Text style={styles.progressText}>{reporte.Progreso}%</Text>
              </View>

              <View style={styles.reportInfo}>
                <Text style={styles.reportTitle}>{reporte.Titulo}</Text>
                <Text style={styles.reportDescription}>{reporte.Descripcion}</Text>

                <View style={styles.reportMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons name="person" size={14} color={COLORS.professional} />
                    <Text style={styles.metaText}>{reporte.ProfesionalNombre}</Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="calendar" size={14} color={COLORS.textSecondary} />
                    <Text style={styles.metaText}>
                      {new Date(reporte.FechaCreacion).toLocaleDateString('es-ES')}
                    </Text>
                  </View>
                </View>

                {reporte.Adjuntos && reporte.Adjuntos.length > 0 && (
                  <View style={styles.attachmentsBadge}>
                    <Ionicons name="attach" size={12} color={COLORS.info} />
                    <Text style={styles.attachmentsText}>
                      {reporte.Adjuntos.length}{' '}
                      {reporte.Adjuntos.length === 1 ? 'adjunto' : 'adjuntos'}
                    </Text>
                  </View>
                )}
              </View>

              {!isPCD() && (
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => confirmarEliminar(reporte)}
                >
                  <Ionicons name="trash-outline" size={20} color={COLORS.error} />
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        ))}

        {reportes.length === 0 && (
          <EmptyState
            icon="document-text-outline"
            title="No hay reportes"
            description={
              isPCD()
                ? 'Cuando tu equipo medico cree reportes apareceran aqui.'
                : 'Crea reportes para hacer seguimiento del progreso.'
            }
          />
        )}

        <View style={{ height: SIZES.xl }} />
      </ScrollView>

      {/* Modal de detalle del reporte */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <LinearGradient
            colors={['#F8FAFE', '#FFFFFF']}
            style={styles.modalGradient}
          />

          {/* Header del modal */}
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color={COLORS.text} />
            </TouchableOpacity>
            <Text style={styles.modalHeaderTitle}>Detalle del Reporte</Text>
            <View style={{ width: 40 }} />
          </View>

          {reporteSeleccionado && (
            <ScrollView
              style={styles.modalScroll}
              contentContainerStyle={styles.modalContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Título y progreso */}
              <View style={styles.modalSection}>
                <Text style={styles.modalTitle}>{reporteSeleccionado.Titulo}</Text>
                <Text style={styles.modalDescription}>
                  {reporteSeleccionado.Descripcion}
                </Text>

                <View style={styles.progressBar}>
                  <View style={styles.progressBarBg}>
                    <View
                      style={[
                        styles.progressBarFill,
                        {
                          width: `${reporteSeleccionado.Progreso}%`,
                          backgroundColor:
                            reporteSeleccionado.Progreso >= 75
                              ? COLORS.success
                              : reporteSeleccionado.Progreso >= 50
                              ? COLORS.warning
                              : COLORS.error,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.progressBarText}>
                    {reporteSeleccionado.Progreso}% de progreso general
                  </Text>
                </View>
              </View>

              {/* Información del reporte */}
              <View style={styles.modalSection}>
                <Text style={styles.sectionTitle}>Información</Text>

                <View style={styles.infoCard}>
                  <View style={styles.infoRow}>
                    <Ionicons name="medical" size={20} color={COLORS.professional} />
                    <View style={styles.infoContent}>
                      <Text style={styles.infoLabel}>Profesional</Text>
                      <Text style={styles.infoValue}>
                        {reporteSeleccionado.ProfesionalNombre}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.infoRow}>
                    <Ionicons name="folder" size={20} color={COLORS.secondary} />
                    <View style={styles.infoContent}>
                      <Text style={styles.infoLabel}>Tipo</Text>
                      <Text style={styles.infoValue}>{reporteSeleccionado.Tipo}</Text>
                    </View>
                  </View>

                  <View style={styles.infoRow}>
                    <Ionicons name="calendar" size={20} color={COLORS.info} />
                    <View style={styles.infoContent}>
                      <Text style={styles.infoLabel}>Periodo</Text>
                      <Text style={styles.infoValue}>{reporteSeleccionado.Periodo}</Text>
                    </View>
                  </View>

                  <View style={styles.infoRow}>
                    <Ionicons name="time" size={20} color={COLORS.textSecondary} />
                    <View style={styles.infoContent}>
                      <Text style={styles.infoLabel}>Fecha de creación</Text>
                      <Text style={styles.infoValue}>
                        {new Date(reporteSeleccionado.FechaCreacion).toLocaleString('es-ES')}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Observaciones */}
              <View style={styles.modalSection}>
                <Text style={styles.sectionTitle}>Observaciones</Text>
                <View style={styles.observationsCard}>
                  <Text style={styles.observationsText}>
                    {reporteSeleccionado.Observaciones}
                  </Text>
                </View>
              </View>

              {/* Objetivos */}
              {reporteSeleccionado.Objetivos && reporteSeleccionado.Objetivos.length > 0 && (
                <View style={styles.modalSection}>
                  <Text style={styles.sectionTitle}>Objetivos</Text>
                  {reporteSeleccionado.Objetivos.map((objetivo) => (
                    <View key={objetivo.id} style={styles.objetivoCard}>
                      <View style={styles.objetivoHeader}>
                        <Text style={styles.objetivoDescripcion}>
                          {objetivo.descripcion}
                        </Text>
                        <View
                          style={[
                            styles.objetivoEstado,
                            {
                              backgroundColor: `${getColorEstadoObjetivo(
                                objetivo.estado
                              )}20`,
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.objetivoEstadoText,
                              { color: getColorEstadoObjetivo(objetivo.estado) },
                            ]}
                          >
                            {objetivo.estado.replace('_', ' ')}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.objetivoProgress}>
                        <View style={styles.objetivoProgressBar}>
                          <View
                            style={[
                              styles.objetivoProgressFill,
                              {
                                width: `${objetivo.porcentaje}%`,
                                backgroundColor: getColorEstadoObjetivo(objetivo.estado),
                              },
                            ]}
                          />
                        </View>
                        <Text style={styles.objetivoProgressText}>
                          {objetivo.porcentaje}%
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}

              {/* Adjuntos */}
              {reporteSeleccionado.Adjuntos && reporteSeleccionado.Adjuntos.length > 0 && (
                <View style={styles.modalSection}>
                  <Text style={styles.sectionTitle}>Archivos Adjuntos</Text>
                  {reporteSeleccionado.Adjuntos.map((adjunto) => (
                    <TouchableOpacity
                      key={adjunto.id}
                      style={styles.adjuntoCard}
                      onPress={() => manejarDescargarAdjunto(adjunto)}
                    >
                      <View
                        style={[
                          styles.adjuntoIcon,
                          { backgroundColor: `${getColorAdjunto(adjunto.tipo)}20` },
                        ]}
                      >
                        <Ionicons
                          name={getIconoAdjunto(adjunto.tipo)}
                          size={24}
                          color={getColorAdjunto(adjunto.tipo)}
                        />
                      </View>

                      <View style={styles.adjuntoInfo}>
                        <Text style={styles.adjuntoNombre}>{adjunto.nombre}</Text>
                        <Text style={styles.adjuntoMeta}>
                          {adjunto.tamaño} •{' '}
                          {new Date(adjunto.fecha).toLocaleDateString('es-ES')}
                        </Text>
                      </View>

                      <Ionicons name="download-outline" size={20} color={COLORS.primary} />
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Recomendaciones */}
              {reporteSeleccionado.RecomendacionesProximas && (
                <View style={styles.modalSection}>
                  <Text style={styles.sectionTitle}>Recomendaciones Próximas</Text>
                  <View style={styles.recommendationsCard}>
                    <Ionicons name="bulb" size={20} color={COLORS.warning} />
                    <Text style={styles.recommendationsText}>
                      {reporteSeleccionado.RecomendacionesProximas}
                    </Text>
                  </View>
                </View>
              )}

              <View style={{ height: SIZES.xl }} />
            </ScrollView>
          )}
        </View>
      </Modal>
    </View>
  );
}

