import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { Avatar } from '../../components';
import { COLORS } from '../../constants/theme';
import styles from './Perfil.styles';

export default function Perfil() {
  const { user } = useAuth();

  const campos = [
    { label: 'Rol', value: user?.Rol || 'Sin rol', icon: 'shield-checkmark' },
    { label: 'Email', value: user?.CorreoElectronico || '-', icon: 'mail' },
    { label: 'Telefono', value: user?.Telefono || '-', icon: 'call' },
    { label: 'DNI', value: user?.DNI || '-', icon: 'card' },
    { label: 'Direccion', value: user?.Direccion || '-', icon: 'location' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#F2F7FF', '#F8FBFF', '#FFFFFF']} style={styles.gradient} />
      <View style={styles.glowTop} />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={['#1146A6', '#1D62D2']} style={styles.heroCard}>
          <Avatar
            name={`${user?.Nombre || ''} ${user?.Apellido || ''}`}
            type={user?.Rol === 'PCD' ? 'user' : user?.Rol === 'Tutor' ? 'tutor' : 'professional'}
            size="xlarge"
            showStatus
            status="online"
          />
          <Text style={styles.heroName}>{user?.Nombre} {user?.Apellido}</Text>
          <Text style={styles.heroRole}>{user?.Rol || 'Usuario'}</Text>
        </LinearGradient>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informacion personal</Text>
          <View style={styles.card}>
            {campos.map((item) => (
              <View key={item.label} style={styles.row}>
                <View style={styles.rowLeft}>
                  <Ionicons name={item.icon} size={16} color={COLORS.primary} />
                  <Text style={styles.label}>{item.label}</Text>
                </View>
                <Text style={styles.value}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acciones</Text>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => Alert.alert('Perfil', 'Edicion de perfil disponible en una proxima version')}
          >
            <Ionicons name="create-outline" size={20} color={COLORS.primary} />
            <Text style={styles.actionText}>Editar perfil</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
