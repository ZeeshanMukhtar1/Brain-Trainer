import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';

export default function Results({navigation}: {navigation: any}) {
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
      </View>

      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Text>Home</Text>
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
});
