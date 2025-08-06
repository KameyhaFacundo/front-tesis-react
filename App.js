import React, { useState } from 'react';
import { Text, View, Button, StyleSheet, ScrollView } from 'react-native';

// ⚠️ Asegurate de reemplazar esta IP con la IP local de tu PC
const API_URL = 'http://192.168.101.76:3000/api/profesionales/listar';

export default function App() {
  const [profesionales, setProfesionales] = useState([]);
  const [error, setError] = useState(null);

  const obtenerProfesionales = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('Error al obtener profesionales');
      const data = await response.json();
      setProfesionales(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setProfesionales([]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Profesionales</Text>
      <Button title="Cargar Profesionales" onPress={obtenerProfesionales} />
      {error && <Text style={styles.error}>Error: {error}</Text>}
      <ScrollView style={styles.scroll}>
        {profesionales.map((p) => (
          <View key={p.IdUsuario} style={styles.card}>
            <Text style={styles.name}>{p.Nombre} {p.Apellido}</Text>
            <Text>Email: {p.CorreoElectronico}</Text>
            <Text>Tel: {p.Telefono}</Text>
            <Text>Dirección: {p.Domicilio}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    marginVertical: 10,
    textAlign: 'center',
  },
  scroll: {
    marginTop: 20,
  },
  card: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

