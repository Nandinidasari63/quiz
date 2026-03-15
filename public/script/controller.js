import { fetchQuestions, submitAnswers } from "./api.js";
import { Quiz } from "./quiz_state.js";
import { removeCurrentQuestion, renderQuestion, renderScore } from "./renderer.js";

const saveAnswer = (e, quizState) => {
  const form = e.target;
  const selected = form.querySelector('input[name="options"]:checked');
  const answer = selected.value;
  quizState.storeResponse(answer);
};


const attachSubmitListener = (mainNode, quizState) => {
  const form = mainNode.querySelector('form');
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    saveAnswer(e, quizState);
    removeCurrentQuestion(mainNode);
    quizState.nextQuestion();

    if (quizState.hasMoreQuestions()) {
      renderQuestion(mainNode, quizState.getQuestion(), quizState);
      attachSubmitListener(mainNode, quizState);
    } else {
      const result = await submitAnswers(quizState.getResponses());
      renderScore(mainNode, result);
    }
  });
};

export const startQuiz = async (mainNode) => {
  const questions = await fetchQuestions();
  const quizState = new Quiz(questions);
  renderQuestion(mainNode, quizState.getQuestion(), quizState);
  attachSubmitListener(mainNode, quizState);
};
