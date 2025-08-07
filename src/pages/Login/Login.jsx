import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { obtenerUsuarios } from '../../api/usuarios';

export default function Login({ navigation }) {
  const [usuarios, setUsuarios] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [logueado, setLogueado] = useState(false);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await obtenerUsuarios();
        setUsuarios(data);
      } catch (error) {
        Alert.alert('Error', 'No se pudieron cargar los usuarios');
        console.error(error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleLogin = () => {
    const user = usuarios.find(
      (u) => u.CorreoElectronico === username && u.Password === password
    );

    if (user) {
      Alert.alert('Éxito', `Bienvenido, ${user.Nombre}`, [
        {
          text: 'OK',
          onPress: () => {
            setLogueado(true);
            navigation.replace('Home');
          },
        },
      ]);
    } else {
      Alert.alert('Error', 'Correo o contraseña incorrectos');
    }
  };

  if (logueado) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Estás logueado como {username}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        placeholder="Correo electrónico"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
});
