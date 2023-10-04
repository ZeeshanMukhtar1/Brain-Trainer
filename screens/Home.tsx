import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Title from '../components/Title';

import {NavigationProp} from '@react-navigation/native';

export default function Home({navigation}: {navigation: NavigationProp<any>}) {
  return (
    <View style={styles.container}>
      <Title />
      <View style={styles.bannerContainer}>
        <Image
          source={{
            uri: 'https://cdni.iconscout.com/illustration/premium/thumb/giving-different-feedback-and-review-in-websites-2112230-1779230.png',
          }}
          style={styles.banner}
          resizeMode="contain"
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
