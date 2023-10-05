import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Title from '../components/Title';
import LottieView from 'lottie-react-native';

import {NavigationProp} from '@react-navigation/native';

export default function Home({navigation}: {navigation: NavigationProp<any>}) {
  return (
    <View style={styles.container}>
      <Title title="Brain Teaser" />
      <View style={styles.bannerContainer}>
        <LottieView
          style={{
            width: 300,
            height: 300,
          }}
          source={require('../assets/question.json')}
          autoPlay
          loop
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('Quiz');
        }}>
        <Text style={styles.buttonText}>Start!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: 300,
    width: 300,
  },
  bannerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: '100%',
  },
  button: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#1A759F',
    padding: 16,
    borderRadius: 16,
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
  },
});
