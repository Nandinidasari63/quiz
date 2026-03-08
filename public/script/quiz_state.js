export class Quiz {
  #quizState;
  constructor(questions) {
    this.#quizState = {};
    this.#quizState.questions = questions;
    this.#quizState.index = 0;
    this.#quizState.answers = [];
  }

  getQuestion() {
    return this.#quizState.questions[this.#quizState.index]
  }

  nextQuestion() {
    this.#quizState.index++;
  }

  storeResponse(answer) {
    this.#quizState.answers.push(answer);
  }

  isQuizFinish() {
    return this.#quizState.index < this.#quizState.questions.length
  }

  totalQuestions() {
    return this.#quizState.questions.length;
  }

  currentQuestionNumber() {
    return this.#quizState.index + 1;
  }

  getResponses() {
    return this.#quizState.answers;
  }
}