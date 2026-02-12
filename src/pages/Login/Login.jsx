import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { obtenerUsuarios } from '../../api/usuarios';
import { Button, Input } from '../../components';
import { COLORS } from '../../constants/theme';
import styles from './Login.styles';

const QUICK_ACCOUNTS = [
  { label: 'Profesional', email: 'profesional@test.com', password: '1234' },
  { label: 'Tutor', email: 'tutor@test.com', password: '1234' },
  { label: 'PCD', email: 'usuario@test.com', password: '1234' },
];

export default function Login({ navigation }) {
  const [usuarios, setUsuarios] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(36)).current;
  const logoScale = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 520,
        useNativeDriver: true,
      }),
      Animated.spring(slideUp, {
        toValue: 0,
        tension: 54,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 52,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await obtenerUsuarios();
        setUsuarios(data);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      }
    };

    fetchUsuarios();
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'El correo electronico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Ingresa un correo electronico valido';
    }

    if (!password.trim()) {
      newErrors.password = 'La contrasena es requerida';
    } else if (password.length < 4) {
      newErrors.password = 'La contrasena debe tener al menos 4 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleQuickAccount = (account) => {
    setEmail(account.email);
    setPassword(account.password);
    setErrors({});
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 700));

      const user = usuarios.find(
        (u) => u.CorreoElectronico?.toLowerCase() === email.toLowerCase() && u.Password === password
      );

      if (user) {
        navigation.replace('Home', { user });
      } else {
        Alert.alert('Error de inicio de sesion', 'El correo electronico o la contrasena son incorrectos.');
      }
    } catch (error) {
      console.error('Error durante el login:', error);
      Alert.alert('Error', 'Ocurrio un error al intentar iniciar sesion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#F2F7FF', '#F8FBFF', '#FFFFFF']} style={styles.backgroundGradient} />
      <View style={styles.glowTop} />

      <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Animated.View style={[styles.heroSection, { opacity: fadeAnim }]}> 
            <Animated.View style={[styles.logoWrapper, { transform: [{ scale: logoScale }] }]}> 
              <LinearGradient colors={['#1146A6', '#1D62D2']} style={styles.logoInner}>
                <Ionicons name="heart" size={34} color="#FFFFFF" />
              </LinearGradient>
            </Animated.View>

            <Text style={styles.appTitle}>AcompanAR</Text>
            <Text style={styles.appTagline}>Cuidado y seguimiento en tiempo real</Text>

            <View style={styles.featureRow}>
              <View style={styles.featureBadge}>
                <Ionicons name="shield-checkmark" size={14} color="#0F766E" />
                <Text style={styles.featureText}>Seguro</Text>
              </View>
              <View style={styles.featureBadge}>
                <Ionicons name="time" size={14} color="#1D4ED8" />
                <Text style={styles.featureText}>24/7</Text>
              </View>
              <View style={styles.featureBadge}>
                <Ionicons name="pulse" size={14} color="#7C3AED" />
                <Text style={styles.featureText}>Monitoreo</Text>
              </View>
            </View>
          </Animated.View>

          <Animated.View
            style={[
              styles.loginCard,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideUp }],
              },
            ]}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Iniciar sesion</Text>
              <Text style={styles.instructionText}>Ingresa tus credenciales para continuar.</Text>
            </View>

            <View style={styles.formSection}>
              <Input
                label="Correo electronico"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errors.email) setErrors({ ...errors, email: null });
                }}
                placeholder="tu@email.com"
                icon="mail-outline"
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
              />

              <Input
                label="Contrasena"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password) setErrors({ ...errors, password: null });
                }}
                placeholder="••••••••"
                icon="lock-closed-outline"
                secureTextEntry
                error={errors.password}
              />

              <Button
                title="Entrar"
                onPress={handleLogin}
                loading={loading}
                disabled={loading}
                fullWidth
                icon="arrow-forward"
                iconPosition="right"
                style={styles.loginButton}
              />

              <Text style={styles.quickLabel}>Acceso rapido de prueba</Text>
              <View style={styles.quickAccountsRow}>
                {QUICK_ACCOUNTS.map((account) => (
                  <TouchableOpacity
                    key={account.label}
                    style={styles.quickAccountChip}
                    onPress={() => handleQuickAccount(account)}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.quickAccountText}>{account.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Button
                title="Olvide mi contrasena"
                variant="text"
                size="small"
                onPress={() => Alert.alert('Recuperar contrasena', 'Funcionalidad en desarrollo')}
                style={styles.forgotButton}
              />
            </View>
          </Animated.View>

          <View style={styles.footerInfo}>
            <Text style={styles.versionText}>Version 1.0.0</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
