import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⚠️</Text>
      <Text style={styles.message}>{message || 'Something went wrong'}</Text>
      {onRetry && (
        <TouchableOpacity style={styles.button} onPress={onRetry}>
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D0D',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  icon: {
    fontSize: 40,
    marginBottom: 16,
  },
  message: {
    color: '#888888',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#F5C842',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#0D0D0D',
    fontWeight: 'bold',
    fontSize: 14,
  },
});