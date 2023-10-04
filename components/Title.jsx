import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function Title() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Brain Teaser</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  container: {
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
