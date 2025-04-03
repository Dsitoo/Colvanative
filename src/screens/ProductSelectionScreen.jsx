import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { Text, Button, Card, TextInput } from 'react-native-paper';
import { db } from '../api/database';
import { COLORS } from '../constants/colors';

export const ProductSelectionScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [environments, setEnvironments] = useState([{ id: 1, name: 'Ambiente 1' }]);
  const [selections, setSelections] = useState({});
  const [totals, setTotals] = useState({ subtotal: 0, iva: 0, total: 0 });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await db.getProducts();
      setProducts(data);
    } catch (error) {
      Alert.alert(
        'Error al cargar productos',
        'No se pudieron obtener los productos. Por favor intenta nuevamente.',
        [{ text: 'OK', style: 'default' }]
      );
    }
  };

  const addEnvironment = () => {
    const newId = environments.length + 1;
    setEnvironments([...environments, { id: newId, name: `Ambiente ${newId}` }]);
  };

  const updateSelection = (environmentId, productId, quantity) => {
    const newSelections = { ...selections };
    if (!newSelections[environmentId]) {
      newSelections[environmentId] = {};
    }
    
    const totalQuantity = Object.values(newSelections)
      .reduce((sum, env) => sum + (env[productId]?.quantity || 0), 0);
    
    const product = products.find(p => p.id === productId);
    if (totalQuantity + parseInt(quantity, 10) > product.unidades) {
      Alert.alert(
        'Unidades insuficientes',
        `Solo hay ${product.unidades} unidades disponibles de ${product.nombre}`,
        [{ text: 'Entendido', style: 'default' }],
      );
      return;
    }

    newSelections[environmentId][productId] = {
      quantity,
      price: product.costo
    };
    
    setSelections(newSelections);
    calculateTotals(newSelections);
  };

  const calculateTotals = (newSelections) => {
    const subtotal = Object.values(newSelections).reduce((sum, env) => 
      sum + Object.values(env).reduce((envSum, item) => 
        envSum + (item.quantity * item.price), 0,
      ), 0,
    );
    
    const iva = subtotal * 0.19;
    setTotals({
      subtotal,
      iva,
      total: subtotal + iva,
    });
  };

  const handleNext = () => {
    navigation.navigate('ClientForm', {
      selections,
      totals,
      products: products.reduce((acc, p) => ({ ...acc, [p.id]: p }), {})
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Button onPress={addEnvironment} mode="contained" style={styles.addButton}>
        Agregar Ambiente
      </Button>

      {environments.map(env => (
        <Card key={env.id} style={styles.environmentCard}>
          <Card.Title title={env.name} />
          <Card.Content>
            {products.map(product => (
              <View key={product.id} style={styles.productRow}>
                <Text>{product.nombre}</Text>
                <Text>Disponible: {product.unidades}</Text>
                <TextInput
                  keyboardType="numeric"
                  style={styles.quantityInput}
                  value={selections[env.id]?.[product.id]?.quantity?.toString() || ''}
                  onChangeText={(text) => updateSelection(env.id, product.id, parseInt(text) || 0)}
                />
              </View>
            ))}
          </Card.Content>
        </Card>
      ))}

      <View style={styles.totalsSection}>
        <Text>Subtotal: ${totals.subtotal.toFixed(2)}</Text>
        <Text>IVA (19%): ${totals.iva.toFixed(2)}</Text>
        <Text style={styles.totalText}>Total: ${totals.total.toFixed(2)}</Text>
      </View>

      <Button 
        mode="contained" 
        onPress={handleNext}
        disabled={Object.keys(selections).length === 0}
        style={styles.nextButton}
      >
        Siguiente
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.background,
  },
  addButton: {
    marginBottom: 16,
    backgroundColor: COLORS.primary,
  },
  environmentCard: {
    marginBottom: 16,
    backgroundColor: COLORS.background,
    borderColor: COLORS.border,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 8,
  },
  quantityInput: {
    width: 60,
    height: 40,
    backgroundColor: COLORS.background,
  },
  totalsSection: {
    marginVertical: 16,
    padding: 16,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: COLORS.primary,
  },
  nextButton: {
    marginVertical: 16,
    backgroundColor: COLORS.primary,
  },
});
