import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import LottieView from 'lottie-react-native';
import Share from 'react-native-share';

const shareApp = () => {
  const handleShare = async () => {
    try {
      await Share.open({
        title: 'Share - Brain Trainer App',
        message:
          'Join me in unlocking the world of learning and excitement with Brain Trainer! Download the app now!',
        url: 'https://dub.sh/V0csuhG',
      });
    } catch (error) {
      Alert.alert(
        'Error',
        'Unfortunately , You canceled the action: ' + (error as Error).message,
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Spread the Knowledge, Spark the Fun!
        </Text>
        <Text style={styles.descriptionText}>
          Unlock a world of learning and excitement! Share our brain teaser app
          with your friends and family, and let the journey to sharpen minds and
          enjoy thrilling quizzes begin. Together, we can make learning an
          unforgettable adventure. Tap 'Share' now and inspire those around you!
        </Text>
      </View>

      {/* Animation */}
      <LottieView
        style={styles.animation}
        source={require('../assets//share.json')}
        autoPlay
        loop
      />

      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
        <Text style={styles.shareButtonText}>Share</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F172A',
  },
  animation: {
    width: 330,
    height: 300,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
    marginHorizontal: 15,
    marginVertical: 30,
  },
  descriptionText: {
    fontSize: 14,
    color: '#fff',
    marginHorizontal: 20,
    alignContent: 'center',
    textAlign: 'justify',
  },
  shareButton: {
    backgroundColor: '#00bfff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 40,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    height: 30,
    textAlign: 'center',
    width: 100,
  },
});

export default shareApp;
