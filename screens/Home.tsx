import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Title from '../components/Title';
import LottieView from 'lottie-react-native';
import {NavigationProp} from '@react-navigation/native';
import Animated, {FadeIn, FadeOut, FadeOutDown} from 'react-native-reanimated';
import Toast from 'react-native-toast-message';

export default function Home({navigation}: {navigation: NavigationProp<any>}) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null,
  );

  const handleStartQuiz = () => {
    if (selectedDifficulty) {
      navigation.navigate('Quiz', {difficulty: selectedDifficulty});
    } else {
      // Alert.alert('Please select a difficulty level');
      Toast.show({
        type: 'info',
        text1: 'Validation Error',
        text2: ' Hold on! Please select a difficulty level.',
      });
    }
  };

  const handleInfoPress = () => {
    navigation.navigate('Info');
  };

  const handleAboutDeveloperPress = () => {
    navigation.navigate('AboutDeveloper');
  };

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOutDown}
      style={styles.container}>
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
        <Text style={styles.dificultyText}>
          Please select a difficulty level:{' '}
        </Text>
      </View>
      <View style={styles.difficultyButtons}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedDifficulty === 'easy' && styles.selectedButton,
          ]}
          onPress={() => setSelectedDifficulty('easy')}>
          <Text style={styles.buttonText}>Easy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedDifficulty === 'medium' && styles.selectedButton,
          ]}
          onPress={() => setSelectedDifficulty('medium')}>
          <Text style={styles.buttonText}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedDifficulty === 'hard' && styles.selectedButton,
          ]}
          onPress={() => setSelectedDifficulty('hard')}>
          <Text style={styles.buttonText}>Hard</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.startButton} onPress={handleStartQuiz}>
        <Text style={styles.startButtonText}>Start!</Text>
      </TouchableOpacity>
    </Animated.View>
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
    backgroundColor: '#0F172A',
    fontFamily: 'Lato, Arial, sans-serif',
  },
  difficultyButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1A759F',
    padding: 10,
    borderRadius: 16,
    marginRight: 10,
  },
  selectedButton: {
    backgroundColor: '#03C988',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
  startButton: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#1A759F',
    padding: 16,
    borderRadius: 16,
    marginBottom: 30,
  },
  startButtonText: {
    color: 'white',
    fontSize: 24,
  },
  dificultyText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginTop: 85,
  },
  info: {
    position: 'absolute',
    top: -20,
    right: -10,
    backgroundColor: '#0F172A',
    padding: 10,
    borderRadius: 16,
  },
  infoSize: {
    fontSize: 20,
    color: '#fff',
  },
  iconContainer: {
    position: 'absolute',
    top: -20,
    right: -10,
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 16,
  },
  iconContainerLeft: {
    position: 'absolute',
    top: -20,
    left: -10,
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 16,
    marginLeft: 10,
  },
  icon: {
    fontSize: 25,
    color: '#fff',
  },
  logoImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
