import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Home from './screens/Home';
import Quiz from './screens/Quiz';
import Results from './screens/Results';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Home /> */}
      {/* <Quiz /> */}
      <Results />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 16,
  },
});
