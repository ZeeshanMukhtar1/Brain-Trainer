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
import Toast from 'react-native-toast-message';
import {openComposer} from 'react-native-email-link';

export default function Feedback() {
  const [subject, setsubject] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [featureDescription, setFeatureDescription] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [feedbacktype, setFeedbacktype] = useState('');

  const sendFeedback = () => {
    // Validate if all required fields are filled
    if (!subject || !feedbacktype || !featureDescription) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Uh-oh! It is important to complete all fields.',
      });
      return;
    }

    // Constructing the email parameters
    const emailParams = {
      to: 'zeshanmukhtar878@gmail.com',
      subject: subject,
      body: `Contact Information: ${contactInfo}\n\n Description : ${featureDescription}\n\nFeedback Type : ${feedbacktype}`, // Includeing the contact information and the feature description in the email body
    };

    // Open the email composer
    Linking.openURL(
      'mailto:' +
        emailParams.to +
        '?subject=' +
        emailParams.subject +
        '&body=' +
        emailParams.body,
    )
      .then(() => {
        console.log('Email composer opened');
        Toast.show({
          type: 'success',
          text1: 'Email Sent',
          text2: 'Thank you for your feedback!',
        });
      })
      .catch(error => {
        console.error('Error opening email composer:', error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Uh-oh! Something went wrong.',
        });
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
      <Text style={styles.label}>Subject:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your Subject"
        placeholderTextColor="#fff"
        onChangeText={text => setsubject(text)}
        value={subject}
      />
      <View>
        <Text style={styles.label}>Contact Information:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your contact information"
          placeholderTextColor="#fff"
          onChangeText={text => setContactInfo(text)}
          value={contactInfo}
        />
      </View>
      <Text style={styles.label}>Feedback Type:</Text>
      <TextInput
        style={styles.input}
        placeholder="Feedback type : (bug, feature request, etc)"
        placeholderTextColor="#fff"
        onChangeText={text => setFeedbacktype(text)}
        value={feedbacktype}
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
    textAlign: 'justify',
    marginHorizontal: 10,
  },
});
