import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { db } from './src/api/database';

// Screens
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { PrincipalScreen } from './src/screens/PrincipalScreen';
import { CotizacionScreen } from './src/screens/CotizacionScreen.jsx';
import { UsersScreen } from './src/screens/UsersScreen.jsx';
import { ClientFormScreen } from './src/screens/ClientFormScreen.jsx';
import { LoadingScreen } from './src/screens/LoadingScreen.jsx';
import { ProductSelectionScreen } from './src/screens/ProductSelectionScreen.jsx';
import { HistorialScreen } from './src/screens/HistorialScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2196F3',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {!user ? (
        <>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: 'Registro' }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Principal"
            component={PrincipalScreen}
            options={{ title: 'Pantalla Principal' }}
          />
          <Stack.Screen
            name="Cotizacion"
            component={CotizacionScreen}
            options={{ title: 'Nueva Cotización' }}
          />
          <Stack.Screen
            name="ProductSelection"
            component={ProductSelectionScreen}
            options={{ title: 'Selección de Productos' }}
          />
          <Stack.Screen
            name="ClientForm"
            component={ClientFormScreen}
            options={{ title: 'Datos del Cliente' }}
          />
          <Stack.Screen
            name="Users"
            component={UsersScreen}
            options={{ title: 'Gestión de Usuarios' }}
          />
          <Stack.Screen
            name="Historial"
            component={HistorialScreen}
            options={{ title: 'Historial de Cotizaciones' }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

const App = () => {
  useEffect(() => {
    db.initializeDatabase().catch(console.error);
  }, []);

  return (
    <PaperProvider>
      <StatusBar style="auto" />
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </PaperProvider>
  );
}

export default App;