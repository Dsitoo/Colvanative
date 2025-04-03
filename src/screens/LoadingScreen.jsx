import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text } from 'react-native-paper';

export const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo_colvatel.jpg')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.appName}>COLVA APP</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 50,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0b3d93',
  },
});