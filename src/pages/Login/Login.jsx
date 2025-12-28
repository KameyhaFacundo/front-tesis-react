import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { obtenerUsuarios } from '../../api/usuarios';
import { Button, Input } from '../../components';
import { COLORS, SIZES } from '../../constants/theme';
import styles from './Login.styles';

export default function Login({ navigation }) {
  const [usuarios, setUsuarios] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Animaciones
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const logoRotate = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideUp = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Animación del logo
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 40,
          friction: 6,
          useNativeDriver: true,
        }),
        Animated.timing(logoRotate, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(slideUp, {
          toValue: 0,
          tension: 40,
          friction: 7,
          useNativeDriver: true,
        }),
      ]),
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
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Ingresa un correo electrónico válido';
    }

    if (!password.trim()) {
      newErrors.password = 'La contraseña es requerida';
    } else if (password.length < 4) {
      newErrors.password = 'La contraseña debe tener al menos 4 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    console.log('=== INICIANDO LOGIN ===');
    console.log('Email ingresado:', email);
    console.log('Password ingresado:', password);
    console.log('Total usuarios disponibles:', usuarios.length);

    if (!validateForm()) {
      console.log('Validación de formulario falló');
      return;
    }

    console.log('Validación exitosa, procediendo con login...');
    setLoading(true);

    try {
      // Simular delay de red
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log('Buscando usuario en la lista...');
      const user = usuarios.find(
        (u) => u.CorreoElectronico?.toLowerCase() === email.toLowerCase() &&
               u.Password === password
      );

      console.log('Usuario encontrado:', user);

      if (user) {
        console.log('✅ Login exitoso! Navegando a Home...');
        // Aquí podrías guardar el usuario en contexto/AsyncStorage
        navigation.replace('Home', { user });
      } else {
        console.log('❌ Login fallido: Usuario no encontrado');
        Alert.alert(
          'Error de inicio de sesión',
          'El correo electrónico o la contraseña son incorrectos. Por favor, inténtalo de nuevo.'
        );
      }
    } catch (error) {
      console.error('❌ Error durante el login:', error);
      Alert.alert('Error', 'Ocurrió un error al intentar iniciar sesión');
    } finally {
      setLoading(false);
      console.log('=== FIN LOGIN ===');
    }
  };

  
  return (
    <View style={styles.container}>
      {/* Background Gradient Effect */}
      <LinearGradient
        colors={['rgba(74, 144, 226, 0.08)', 'transparent']}
        style={styles.backgroundTop}
      />
      <LinearGradient
        colors={['transparent', 'rgba(102, 187, 106, 0.06)']}
        style={styles.backgroundBottom}
      />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <Animated.View
              style={[
                styles.logoWrapper,
                {
                  transform: [
                    { scale: logoScale },
                    {
                      rotate: logoRotate.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                      }),
                    },
                  ],
                },
              ]}
            >
              <View style={styles.logoOuter}>
                <View style={styles.logoInner}>
                  <Ionicons name="heart" size={56} color="#FFFFFF" />
                </View>
              </View>
              <View style={styles.logoPulse} />
            </Animated.View>

            <Animated.Text style={[styles.appTitle, { opacity: fadeAnim }]}>
              Acompañar
            </Animated.Text>
            <Animated.Text style={[styles.appTagline, { opacity: fadeAnim }]}>
              Cuidado y seguimiento profesional
            </Animated.Text>

            <View style={styles.featureRow}>
              <View style={styles.featureBadge}>
                <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
                <Text style={styles.featureText}>Seguro</Text>
              </View>
              <View style={styles.featureBadge}>
                <Ionicons name="time" size={16} color={COLORS.info} />
                <Text style={styles.featureText}>24/7</Text>
              </View>
              <View style={styles.featureBadge}>
                <Ionicons name="shield-checkmark" size={16} color={COLORS.primary} />
                <Text style={styles.featureText}>Confiable</Text>
              </View>
            </View>
          </View>

          {/* Login Card */}
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
              <Text style={styles.welcomeText}>Bienvenido de nuevo</Text>
              <Text style={styles.instructionText}>
                Ingresa tus credenciales para continuar
              </Text>
            </View>

            <View style={styles.formSection}>
              <Input
                label="Correo Electrónico"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errors.email) {
                    setErrors({ ...errors, email: null });
                  }
                }}
                placeholder="tu@email.com"
                icon="mail-outline"
                keyboardType="email-address"
                autoCapitalize="none"
                error={errors.email}
              />

              <Input
                label="Contraseña"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password) {
                    setErrors({ ...errors, password: null });
                  }
                }}
                placeholder="••••••••"
                icon="lock-closed-outline"
                secureTextEntry
                error={errors.password}
              />

              <Button
                title="Iniciar Sesión"
                onPress={handleLogin}
                loading={loading}
                disabled={loading}
                fullWidth
                icon="arrow-forward"
                iconPosition="right"
                style={styles.loginButton}
              />

              <Button
                title="¿Olvidaste tu contraseña?"
                variant="text"
                size="small"
                onPress={() => Alert.alert('Recuperar contraseña', 'Funcionalidad en desarrollo')}
                style={styles.forgotButton}
              />
            </View>
          </Animated.View>

          {/* Footer Info */}
          <View style={styles.footerInfo}>
            <View style={styles.securityBadge}>
              <Ionicons name="lock-closed" size={14} color={COLORS.textSecondary} />
              <Text style={styles.securityText}>
                Tus datos están protegidos con encriptación SSL
              </Text>
            </View>

            <Text style={styles.versionText}>Versión 1.0.0</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

