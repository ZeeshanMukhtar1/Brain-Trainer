import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {fetchQuizData} from '../network/QuizApi';
import {
  shuffleArray,
  handleSkipQuestion,
  handleSelectedOption,
} from '../utils/quizUtils';
import LottieView from 'lottie-react-native'; // Import LottieView

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
  const [loading, setLoading] = useState(true); // Loading state

  // Function to fetch quiz data
  const getQuiz = async () => {
    try {
      setLoading(true); // Set loading to true while fetching data
      const quizData = await fetchQuizData();
      setQuestions(quizData);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error fetching quiz data:', error);
      setLoading(false); // Set loading to false on error
    }
  };

  useEffect(() => {
    getQuiz();
  }, []);

  // Function to generate options and shuffle them
  const generateOptionsAndShuffle = () => {
    if (questions.length > 0) {
      let _options = [
        ...questions[currentQuestion].incorrect_answers,
        questions[currentQuestion].correct_answer,
      ];
      shuffleArray(_options);
      setOptions(_options);
    }
  };

  // Function to skip a question
  const skipQuestion = () => {
    handleSkipQuestion(
      currentQuestion,
      questions,
      setCurrentQuestion,
      setAnswered,
    );
    setCurrentQuestion(currentQuestion + 1); // Manually move to the next question
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

  // Load options when the current question changes
  useEffect(() => {
    generateOptionsAndShuffle();
  }, [currentQuestion]);

  // Function to move to the next question
  const moveToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswered(false);
    } else {
      // Navigate to results when all questions are answered
      navigation.navigate('Results', {score: score});
    }
  };

  // Initialize options for the first question
  useEffect(() => {
    generateOptionsAndShuffle();
  }, [questions]);

  return (
    <View style={styles.container}>
      {loading ? ( // Check if loading is true
        <View style={styles.loadingContainer}>
          <LottieView
            style={{
              width: 300,
              height: 300,
            }}
            source={require('../assets/loading.json')}
            autoPlay
            loop
          />
          <Text style={{fontSize: 20, color: '#000'}}>Loading...</Text>
        </View>
      ) : questions.length > 0 ? ( // Check if questions are available
        <View style={styles.parent}>
          {/* Display the current question */}
          <View style={styles.top}>
            <Text style={styles.question}>
              Q{currentQuestion + 1}:{' '}
              {decodeURIComponent(questions[currentQuestion].question)}
            </Text>
          </View>
          {/* Display answer options */}
          <View style={styles.options}>
            {options.map((option, index) => (
              <TouchableOpacity
                onPress={() => handleOptionSelection(option)}
                key={index}
                style={styles.optionButton}
                disabled={answered}>
                <Text style={styles.option}>{decodeURIComponent(option)}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity onPress={skipQuestion} style={styles.button}>
              <Text style={styles.buttonText}>Skip</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={moveToNextQuestion}
              disabled={answered}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        // No questions found
        <View style={styles.noQuestionsContainer}>
          <LottieView
            style={{
              width: 200,
              height: 200,
            }}
            source={require('../assets/notfound.json')}
            autoPlay
            loop
          />
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
    fontSize: 22,
    color: '#000',
    textAlign: 'justify',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
