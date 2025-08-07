import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import Profesionales from '../Profesionales/Profesionales'; 


function UsuariosScreen() {
  return (
    <SafeAreaView style={styles.center}>
      <Text style={styles.title}>Usuarios</Text>
    </SafeAreaView>
  );
}

function ProfesionalesScreen() {
  return (
    <SafeAreaView style={styles.center}>
      <Text style={styles.title}>Profesionales</Text>
      navigation.replace('Profesionales');
    </SafeAreaView>
  );
}

function ActividadesScreen() {
  return (
    <SafeAreaView style={styles.center}>
      <Text style={styles.title}>Actividades</Text>
    </SafeAreaView>
  );
}

function NotificacionesScreen() {
  return (
    <SafeAreaView style={styles.center}>
      <Text style={styles.title}>Notificaciones</Text>
    </SafeAreaView>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Ionicons name="people-circle-outline" size={48} color="#4285F4" />
        <Text style={styles.drawerTitle}>Acompañar</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Cerrar sesión"
        icon={({ color, size }) => <Ionicons name="log-out-outline" size={size} color={color} />}
        onPress={() => {
          // Aquí podrías hacer logout real
          props.navigation.replace('Login');
        }}
      />
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

export default function Home() {
  return (
    <Drawer.Navigator
      initialRouteName="Usuarios"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: '#4285F4' },
        headerTintColor: '#fff',
        drawerActiveTintColor: '#4285F4',
        drawerLabelStyle: { fontWeight: 'bold' },
      }}
    >
      <Drawer.Screen
        name="Usuarios"
        component={UsuariosScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="people-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Profesionales"
        component={Profesionales}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="medkit-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Actividades"
        component={ActividadesScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="clipboard-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Notificaciones"
        component={NotificacionesScreen}
        options={{
          drawerIcon: ({ color, size }) => <Ionicons name="notifications-outline" size={size} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginBottom: 8,
  },
  drawerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 12,
    color: '#4285F4',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
  },
});
