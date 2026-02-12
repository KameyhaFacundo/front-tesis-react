import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { ActivityCard } from '../../components';
import { COLORS, SIZES } from '../../constants/theme';
import styles from './Calendario.styles';
import {
  obtenerActividades,
  obtenerActividadesPorUsuario,
} from '../../api/actividades';

export default function Calendario() {
  const { user, isPCD } = useAuth();
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mesActual, setMesActual] = useState(new Date());
  const [diaSeleccionado, setDiaSeleccionado] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  useEffect(() => {
    cargarActividades();
  }, []);

  const cargarActividades = async () => {
    try {
      setLoading(true);
      const data = isPCD()
        ? await obtenerActividadesPorUsuario(user.ID)
        : await obtenerActividades();
      setActividades(data);
    } catch (error) {
      console.error('Error cargando actividades:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDiasEnMes = (fecha) => {
    const año = fecha.getFullYear();
    const mes = fecha.getMonth();
    const primerDia = new Date(año, mes, 1);
    const ultimoDia = new Date(año, mes + 1, 0);
    const diasEnMes = ultimoDia.getDate();
    const primerDiaSemana = primerDia.getDay();

    const dias = [];

    // Días vacíos al inicio
    for (let i = 0; i < primerDiaSemana; i++) {
      dias.push(null);
    }

    // Días del mes
    for (let dia = 1; dia <= diasEnMes; dia++) {
      dias.push(new Date(año, mes, dia));
    }

    return dias;
  };

  const getActividadesPorDia = (fecha) => {
    if (!fecha) return [];

    const fechaStr = fecha.toISOString().split('T')[0];
    return actividades.filter((act) => {
      const actFecha = new Date(act.FechaInicio).toISOString().split('T')[0];
      return actFecha === fechaStr;
    });
  };

  const getEstadisticasDia = (fecha) => {
    const acts = getActividadesPorDia(fecha);
    return {
      total: acts.length,
      completadas: acts.filter((a) => a.Estado === 'completed').length,
      pendientes: acts.filter((a) => a.Estado === 'pending').length,
      enProgreso: acts.filter((a) => a.Estado === 'inProgress').length,
      perdidas: acts.filter((a) => a.Estado === 'missed').length,
    };
  };

  const getColorIndicador = (fecha) => {
    const stats = getEstadisticasDia(fecha);

    if (stats.total === 0) return null;
    if (stats.perdidas > 0) return COLORS.error;
    if (stats.pendientes > 0 || stats.enProgreso > 0) return COLORS.warning;
    if (stats.completadas === stats.total) return COLORS.success;
    return COLORS.info;
  };

  const esDiaHoy = (fecha) => {
    if (!fecha) return false;
    const hoy = new Date();
    return (
      fecha.getDate() === hoy.getDate() &&
      fecha.getMonth() === hoy.getMonth() &&
      fecha.getFullYear() === hoy.getFullYear()
    );
  };

  const cambiarMes = (direccion) => {
    const nuevaFecha = new Date(mesActual);
    nuevaFecha.setMonth(nuevaFecha.getMonth() + direccion);
    setMesActual(nuevaFecha);
  };

  const seleccionarDia = (fecha) => {
    if (!fecha) return;
    const acts = getActividadesPorDia(fecha);
    if (acts.length > 0) {
      setDiaSeleccionado(fecha);
      setModalVisible(true);
    }
  };

  const dias = getDiasEnMes(mesActual);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Cargando calendario...</Text>
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
            <Text style={styles.heroTitle}>Calendario</Text>
            <Text style={styles.heroSubtitle}>Seguimiento mensual de actividades</Text>
          </View>
          <TouchableOpacity
            onPress={() => setMesActual(new Date())}
            style={styles.todayButton}
          >
            <Text style={styles.todayButtonText}>Hoy</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.monthButton}
            onPress={() => cambiarMes(-1)}
          >
            <Ionicons name="chevron-back" size={24} color="#0D3B8E" />
          </TouchableOpacity>

          <View style={styles.monthInfo}>
            <Text style={styles.monthText}>
              {meses[mesActual.getMonth()]} {mesActual.getFullYear()}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.monthButton}
            onPress={() => cambiarMes(1)}
          >
            <Ionicons name="chevron-forward" size={24} color="#0D3B8E" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Leyenda */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: COLORS.success }]} />
          <Text style={styles.legendText}>Completadas</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: COLORS.warning }]} />
          <Text style={styles.legendText}>Pendientes</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: COLORS.error }]} />
          <Text style={styles.legendText}>Perdidas</Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Días de la semana */}
        <View style={styles.weekDaysContainer}>
          {diasSemana.map((dia) => (
            <View key={dia} style={styles.weekDayCell}>
              <Text style={styles.weekDayText}>{dia}</Text>
            </View>
          ))}
        </View>

        {/* Calendario */}
        <View style={styles.calendarGrid}>
          {dias.map((fecha, index) => {
            const stats = fecha ? getEstadisticasDia(fecha) : { total: 0 };
            const colorIndicador = fecha ? getColorIndicador(fecha) : null;
            const esHoy = esDiaHoy(fecha);

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dayCell,
                  esHoy && styles.dayCellToday,
                  !fecha && styles.dayCellEmpty,
                ]}
                onPress={() => seleccionarDia(fecha)}
                disabled={!fecha || stats.total === 0}
              >
                {fecha && (
                  <>
                    <Text
                      style={[
                        styles.dayNumber,
                        esHoy && styles.dayNumberToday,
                      ]}
                    >
                      {fecha.getDate()}
                    </Text>

                    {stats.total > 0 && (
                      <>
                        <View style={styles.activityCount}>
                          <Text style={styles.activityCountText}>
                            {stats.total}
                          </Text>
                        </View>
                        {colorIndicador && (
                          <View
                            style={[
                              styles.statusIndicator,
                              { backgroundColor: colorIndicador },
                            ]}
                          />
                        )}
                      </>
                    )}
                  </>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Resumen del mes */}
        <View style={styles.monthSummary}>
          <Text style={styles.summaryTitle}>Resumen del Mes</Text>

          <View style={styles.summaryCards}>
            {(() => {
              const totalMes = actividades.filter((act) => {
                const actFecha = new Date(act.FechaInicio);
                return (
                  actFecha.getMonth() === mesActual.getMonth() &&
                  actFecha.getFullYear() === mesActual.getFullYear()
                );
              });

              const completadas = totalMes.filter(
                (a) => a.Estado === 'completed'
              ).length;
              const pendientes = totalMes.filter(
                (a) => a.Estado === 'pending'
              ).length;
              const perdidas = totalMes.filter(
                (a) => a.Estado === 'missed'
              ).length;

              const porcentajeCompletadas = totalMes.length
                ? Math.round((completadas / totalMes.length) * 100)
                : 0;

              return (
                <>
                  <View style={styles.summaryCard}>
                    <Ionicons
                      name="calendar"
                      size={32}
                      color={COLORS.primary}
                    />
                    <Text style={styles.summaryValue}>{totalMes.length}</Text>
                    <Text style={styles.summaryLabel}>Total</Text>
                  </View>

                  <View style={styles.summaryCard}>
                    <Ionicons
                      name="checkmark-circle"
                      size={32}
                      color={COLORS.success}
                    />
                    <Text style={styles.summaryValue}>{completadas}</Text>
                    <Text style={styles.summaryLabel}>Completadas</Text>
                  </View>

                  <View style={styles.summaryCard}>
                    <Ionicons name="time" size={32} color={COLORS.warning} />
                    <Text style={styles.summaryValue}>{pendientes}</Text>
                    <Text style={styles.summaryLabel}>Pendientes</Text>
                  </View>

                  <View style={styles.summaryCard}>
                    <Ionicons
                      name="close-circle"
                      size={32}
                      color={COLORS.error}
                    />
                    <Text style={styles.summaryValue}>{perdidas}</Text>
                    <Text style={styles.summaryLabel}>Perdidas</Text>
                  </View>

                  <View
                    style={[styles.summaryCard, { backgroundColor: COLORS.primaryLight }]}
                  >
                    <Ionicons
                      name="stats-chart"
                      size={32}
                      color={COLORS.primary}
                    />
                    <Text style={styles.summaryValue}>
                      {porcentajeCompletadas}%
                    </Text>
                    <Text style={styles.summaryLabel}>Cumplimiento</Text>
                  </View>
                </>
              );
            })()}
          </View>
        </View>

        <View style={{ height: SIZES.xl }} />
      </ScrollView>

      {/* Modal de actividades del día */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {diaSeleccionado &&
                  `${diaSeleccionado.getDate()} de ${
                    meses[diaSeleccionado.getMonth()]
                  }`}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={28} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalScroll}>
              {diaSeleccionado &&
                getActividadesPorDia(diaSeleccionado).map((actividad) => (
                  <View key={actividad.ID} style={styles.modalActivity}>
                    <ActivityCard
                      {...actividad}
                      title={actividad.Titulo}
                      description={actividad.Descripcion}
                      type={actividad.Tipo}
                      status={actividad.Estado}
                      startTime={new Date(
                        actividad.FechaInicio
                      ).toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                      assignedBy={actividad.AsignadoPor}
                    />
                  </View>
                ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

