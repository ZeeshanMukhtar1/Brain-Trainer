import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {fetchQuizData} from '../network/QuizApi';
import {
  shuffleArray,
  handleSkipQuestion,
  handleSelectedOption,
} from '../utils/quizUtils';

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export default function Quiz({navigation}: {navigation: any}) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  // Function to fetch quiz data
  const getQuiz = async () => {
    try {
      const quizData = await fetchQuizData();
      setQuestions(quizData);
      setOptions(GenerateOptionsandShuffle(quizData[0]));
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };

  useEffect(() => {
    getQuiz();
  }, []);

  // Function to generate options and shuffle them
  const GenerateOptionsandShuffle = (_question: Question) => {
    let _options = [..._question.incorrect_answers, _question.correct_answer];
    shuffleArray(_options);
    setOptions(_options);
    return _options;
  };

  // Function to skip a question
  const SkipQuestion = () => {
    handleSkipQuestion(
      currentQuestion,
      questions,
      setCurrentQuestion,
      setAnswered,
    );
  };

  // Function to handle option selection
  const handleOptionSelection = (option: string) => {
    handleSelectedOption(
      option,
      answered,
      setAnswered,
      questions,
      currentQuestion,
      setCurrentQuestion,
      setScore,
      score,
      navigation,
    );
  };

  return (
    <View style={styles.container}>
      {questions.length > 0 ? (
        <View style={styles.parent}>
          <View style={styles.top}>
            {/* Display the current question */}
            <Text style={styles.question}>
              Q{currentQuestion + 1}:{' '}
              {decodeURIComponent(questions[currentQuestion].question)}
            </Text>
          </View>
          <View style={styles.options}>
            {/* Display answer options */}
            {options.map((option, index) => (
              <TouchableOpacity
                onPress={() => handleOptionSelection(option)}
                key={index}
                style={styles.optionButton}>
                <Text style={styles.option}>{decodeURIComponent(option)}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity onPress={SkipQuestion} style={styles.button}>
              <Text style={styles.buttonText}>Skip</Text>
            </TouchableOpacity>
            {currentQuestion !== questions.length - 1 ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  GenerateOptionsandShuffle(questions[currentQuestion + 1]);
                  setCurrentQuestion(currentQuestion + 1);
                  setAnswered(false);
                }}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Results', {score: score})}>
                <Text style={styles.buttonText}>Show Results</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : (
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
