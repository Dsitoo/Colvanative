import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { db } from '../api/database';
import { COLORS } from '../constants/colors';

export const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    id: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleRegister = async () => {
    try {
      // Validaciones locales
      if (!formData.id.trim()) {
        Alert.alert('Error', 'El número de identificación es requerido');
        return;
      }

      if (!formData.username.trim()) {
        Alert.alert('Error', 'El nombre de usuario es requerido');
        return;
      }

      if (formData.password.length < 6) {
        Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres');
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        Alert.alert('Error', 'Las contraseñas no coinciden');
        return;
      }

      await db.register({
        id: parseInt(formData.id, 10), // Added radix parameter
        username: formData.username.trim(),
        password: formData.password,
        role: 'user',
      });

      Alert.alert(
        'Registro Exitoso', 
        'Te has registrado correctamente',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Usuario</Text>
      <TextInput
        label="Número de Identificación"
        value={formData.id}
        onChangeText={(text) => setFormData({ ...formData, id: text })}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        label="Nombre de Usuario"
        value={formData.username}
        onChangeText={(text) => setFormData({ ...formData, username: text })}
        style={styles.input}
      />
      <TextInput
        label="Contraseña"
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        label="Confirmar Contraseña"
        value={formData.confirmPassword}
        onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
        secureTextEntry
        style={styles.input}
      />
      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        Registrarse
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: COLORS.primary,
  },
  input: {
    marginBottom: 15,
    backgroundColor: COLORS.background,
  },
  button: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
  },
});
