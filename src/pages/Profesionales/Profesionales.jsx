import React, { useState } from 'react';
import { Text, View, Button, StyleSheet, ScrollView } from 'react-native';
import { obtenerProfesionales } from '../../api/profesionales';

export default function App() {
  const [profesionales, setProfesionales] = useState([]);
  const [error, setError] = useState(null);

  const cargarProfesionales = async () => {
    try {
      const data = await obtenerProfesionales();
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
      <Button title="Cargar Profesionales" onPress={cargarProfesionales} />
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

