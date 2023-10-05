// api/QuizApi.js

export async function fetchQuizData() {
  const url =
    'https://opentdb.com/api.php?amount=10&category=18&difficulty=hard&type=multiple&encode=url3986';

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.results;
  } catch (error) {
    throw new Error('Failed to fetch quiz data');
  }
}
