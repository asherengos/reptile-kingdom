import { getRandomQuiz } from '../quizData';

beforeEach(() => {
  // reset session storage
  sessionStorage.clear();
});

test('getRandomQuiz avoids repeats within a session for a species', () => {
  const name = 'Ball Python';
  const q1 = getRandomQuiz(name);
  const q2 = getRandomQuiz(name);
  expect(q1.id).not.toEqual(q2.id);
});

test('getRandomQuiz falls back to general when species absent', () => {
  const q = getRandomQuiz('Nonexistent Species');
  expect(q).toBeTruthy();
});


