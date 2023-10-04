import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export default function Quiz({navigation}: {navigation: any}) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const getQuiz = async () => {
    const url =
      'https://opentdb.com/api.php?amount=10&category=18&difficulty=hard&type=multiple';
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.results[0]);
    setQuestions(data.results);
  };

  useEffect(() => {
    getQuiz();
  }, []);

  return (
    <View style={styles.container}>
      {/* Check if questions are available */}
      {questions.length > 0 ? (
        <View style={styles.parent}>
          {/* Question section */}
          <View style={styles.top}>
            <Text style={styles.question}>
              Q: {questions[currentQuestion].question}
            </Text>
          </View>
          {/* Options section */}
          <View style={styles.options}>
            {questions[currentQuestion].incorrect_answers.map(
              (option, index) => (
                <TouchableOpacity key={index} style={styles.optionButton}>
                  <Text style={styles.option}>{option}</Text>
                </TouchableOpacity>
              ),
            )}
            <TouchableOpacity style={styles.optionButton}>
              <Text style={styles.option}>
                {questions[currentQuestion].correct_answer}
              </Text>
            </TouchableOpacity>
          </View>
          {/* Bottom buttons */}
          <View style={styles.bottom}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setCurrentQuestion(currentQuestion + 1);
              }}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('Results');
              }}>
              <Text style={styles.buttonText}>End</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        // Displayed when there are no questions
        <View style={styles.noQuestionsContainer}>
          <Text style={styles.noQuestionsText}>
            No questions available. Please try again later.
          </Text>
        </View>
      )}
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
    marginBottom: 20,
    paddingVertical: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1A759F',
    padding: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
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
    color: 'white',
    fontWeight: '400',
  },
  optionButton: {
    paddingVertical: 12,
    marginVertical: 6,
    backgroundColor: '#34A0A4',
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  parent: {
    height: '100%',
  },
  noQuestionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noQuestionsText: {
    fontSize: 20,
    textAlign: 'center',
  },
});
