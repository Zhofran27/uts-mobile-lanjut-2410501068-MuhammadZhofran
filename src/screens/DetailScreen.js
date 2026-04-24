import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DetailScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Detail Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D', alignItems: 'center', justifyContent: 'center' },
  text: { color: '#F5C842', fontSize: 20 },
});