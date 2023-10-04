import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

// Using an algorithm to shuffle the options
// Algorithm source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// Credit: Durstenfeld shuffle,
const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

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

  const getQuiz = async () => {
    const url =
      'https://opentdb.com/api.php?amount=10&category=18&difficulty=hard&type=multiple&encode=url3986';
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.results[0]);
    setQuestions(data.results);
    setOptions(GenerateOptionsandShuffle(data.results[0]));
  };

  useEffect(() => {
    getQuiz();
  }, []);

  // Generate options and shuffle them
  const GenerateOptionsandShuffle = (_question: Question) => {
    let _options = [..._question.incorrect_answers];
    _options.push(_question.correct_answer);
    console.log('encoded shuffled options', _options); // Log before shuffling
    shuffleArray(_options);
    setOptions(_options);
    console.log('decoded shuffled options', _options); // Log after shuffling
    return _options;
  };

  const SkipQuestion = () => {
    if (currentQuestion !== 9) {
      setCurrentQuestion(currentQuestion + 1);
      GenerateOptionsandShuffle(questions[currentQuestion + 1]);
      setAnswered(false); // Reset answered status for the next question
    }
  };

  const handleSelectedOption = (option: string) => {
    if (!answered) {
      setAnswered(true); // Prevent selecting multiple options for the same question
      if (
        option === decodeURIComponent(questions[currentQuestion].correct_answer)
      ) {
        console.log('Correct answer');
        setScore(score + 10); // Increment the score for a correct answer
      } else {
        console.log('Wrong answer');
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Check if questions are available */}
      {questions.length > 0 ? (
        <View style={styles.parent}>
          {/* Question section */}
          <View style={styles.top}>
            <Text style={styles.question}>
              {/* Decoding fetched string */}
              Q: {decodeURIComponent(questions[currentQuestion].question)}
            </Text>
          </View>
          {/* Options section */}
          <View style={styles.options}>
            {questions[currentQuestion].incorrect_answers.map(
              (option, index) => (
                <TouchableOpacity
                  onPress={() => handleSelectedOption(option)}
                  key={index}
                  style={styles.optionButton}>
                  <Text style={styles.option}>
                    {decodeURIComponent(option)}
                  </Text>
                </TouchableOpacity>
              ),
            )}
            <TouchableOpacity
              onPress={() =>
                handleSelectedOption(
                  decodeURIComponent(questions[currentQuestion].correct_answer),
                )
              }
              style={styles.optionButton}>
              <Text style={styles.option}>
                {decodeURIComponent(questions[currentQuestion].correct_answer)}
              </Text>
            </TouchableOpacity>
          </View>
          {/* Bottom buttons */}
          <View style={styles.bottom}>
            <TouchableOpacity onPress={SkipQuestion} style={styles.button}>
              <Text style={styles.buttonText}>Skip</Text>
            </TouchableOpacity>
            {currentQuestion !== 9 && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  setCurrentQuestion(currentQuestion + 1);
                  GenerateOptionsandShuffle(questions[currentQuestion + 1]);
                  setAnswered(false); // Reset answered status for the next question
                }}>
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            )}
            {currentQuestion === 9 && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  console.log('Total Scores:', score); // Log the total score
                  navigation.navigate('Results', {questions, score});
                }}>
                <Text style={styles.buttonText}>Show Results</Text>
              </TouchableOpacity>
            )}
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
