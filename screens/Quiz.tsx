import {
  StyleSheet,
  Text,
  Touchable,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

export default function Quiz() {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Text>Question 1</Text>
      </View>
      <View style={styles.options}>
        <TouchableOpacity>
          <Text>Answer 1</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Answer 2</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Answer 3</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Answer 4</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity>
          <Text>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: '100%',
  },
  top: {
    marginVertical: 16,
  },
  options: {
    marginVertical: 16,
    flex: 1,
  },
  bottom: {
    marginBottom: 12,
    paddingVertical: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#1A759F',
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  question: {
    fontSize: 28,
  },
  option: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  optionButtom: {
    paddingVertical: 12,
    marginVertical: 6,
    backgroundColor: '#34A0A4',
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  parent: {
    height: '100%',
  },
});
