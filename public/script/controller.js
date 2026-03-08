import { fetchQuestions, submitAnswers } from "./api.js";
import { Quiz } from "./quiz_state.js";
import { renderQuestion, renderScore, clearSection } from "./renderer.js";

const storeAnswer = (e, quizState) => {
  const formData = new FormData(e.target);
  const answer = formData.get("options");
  quizState.storeResponse(answer);
};

const handleSubmit = async (e, section, quizState) => {
  e.preventDefault();

  storeAnswer(e, quizState);
  clearSection(section);

  quizState.nextQuestion();

  if (quizState.isQuizFinish()) {
    renderQuestion(section, quizState.getQuestion(), quizState);
    attachListener(section, quizState);
  } else {
    const result = await submitAnswers(quizState.getResponses());
    renderScore(section, result);
  }
};

const attachListener = (section, quizState) => {
  const form = section.querySelector("form");

  form.addEventListener("submit", (e) =>
    handleSubmit(e, section, quizState)
  );
};

export const startQuiz = async (section) => {
  const questions = await fetchQuestions();
  const quizState = new Quiz(questions);

  renderQuestion(section, quizState.getQuestion(), quizState);
  attachListener(section, quizState);
};