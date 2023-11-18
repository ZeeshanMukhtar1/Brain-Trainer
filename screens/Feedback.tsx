import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import Animated, {StretchInX, StretchOutX} from 'react-native-reanimated';

export default function Feedback() {
  const [name, setName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [featureDescription, setFeatureDescription] = useState('');

  const sendFeedback = () => {
    const subject = 'Feedback from App User';
    const body = 'Please provide your feedback here.';

    const mailtoLink = `mailto:zeshanmukhtar0878@gmail.com?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailtoLink)
      .then(() => {
        console.log('Email client opened');
        Alert.alert(
          'Success',
          'Feedback sent successfully! We will get back to you soon.',
        );
      })
      .catch(error => {
        console.error('Error opening email client:', error);
        Alert.alert(
          'Error',
          'Could not open email client. Please try again later.',
        );
      });
  };
  return (
    <Animated.View
      entering={StretchInX}
      exiting={StretchOutX}
      style={styles.container}>
      <View>
        <Text style={styles.descText}>
          Want to give us feedback? We'd love to hear from you! Please feel free
          to suggest any features you'd like to see in the app.
        </Text>
      </View>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Name"
        placeholderTextColor="#fff"
        onChangeText={text => setName(text)}
        value={name}
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholderTextColor="#fff"
        placeholder="Enter valid  Email"
        onChangeText={text => setEmailAddress(text)}
        value={emailAddress}
        keyboardType="email-address"
      />

      <Text style={styles.label}> Description:</Text>
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Describe the feature you'd like to see..."
        placeholderTextColor="#fff"
        onChangeText={text => setFeatureDescription(text)}
        value={featureDescription}
        multiline
      />

      <TouchableOpacity style={styles.sendButton} onPress={sendFeedback}>
        <Text style={styles.sendButtonText}>Send Feedback</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#0F172A',
    height: '100%',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 15,
    color: '#fff',
  },
  descriptionInput: {
    height: 100,
    color: '#fff',
  },
  sendButton: {
    backgroundColor: '#00bfff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginVertical: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  descText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
    marginVertical: 10,
  },
});
