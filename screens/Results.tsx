import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';

export default function Results({navigation}: {navigation: any}) {
  // Access the params object
  const params = useRoute().params as {score: number}; // Use type assertion

  // Extract the score from the params object
  const score = params?.score || 0;

  return (
    <View>
      <View>
        <Text>Results</Text>
      </View>
      <View style={styles.bannerContainer}>
        <Image
          source={{
            uri: 'https://cdni.iconscout.com/illustration/premium/thumb/giving-different-feedback-and-review-in-websites-2112230-1779230.png',
          }}
          style={styles.banner}
          resizeMode="contain"
        />
        <View>
          {/* Display the score using a Text component */}
          <Text>Score: {score}</Text>
        </View>
      </View>

      <View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Text style={{color: '#fff', fontSize: 20}}>Home</Text>
        </TouchableOpacity>
      </View>
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
  },
  button: {
    backgroundColor: '#1A759F',
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    maxWidth: '25%',
    alignSelf: 'center',
  },
});
