export class Quiz {
  #quizState;
  constructor(questions) {
    this.#quizState = {};
    this.#quizState.questions = questions;
    this.#quizState.index = 0;
    this.#quizState.score = 0;
  }

  getQuestion() {
    return this.#quizState.questions[this.#quizState.index]
  }

  nextQuestion() {
    this.#quizState.index++;
  }

  giveScore(answer) {
    if (this.#quizState.questions[this.#quizState.index].answer === answer) {
      this.#quizState.score++;
    }
  }

  isQuizFinish() {
    return this.#quizState.index < this.#quizState.questions.length
  }

  getScore() {
    return this.#quizState.score;
  }

  totalQuestions() {
    return this.#quizState.questions.length;
  }

  currentQuestionNumber() {
    return this.#quizState.index + 1;
  }

}