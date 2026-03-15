const setQuestionAndNumber = (questionNode, quizState, { question }) => {
  const questionNumber = `Question ${quizState.currentQuestionNumber()} / ${quizState.totalQuestions()}`;
  questionNode.querySelector(".question-num").textContent = questionNumber;
  questionNode.querySelector(".question-text").textContent = question;
};

const appendOptions = (optionsTemplate, { options }, formNode) => {
  options.forEach((option, index) => {
    const id = `option-${index + 1}`;
    const clonedOptions = optionsTemplate.content.cloneNode(true);
    const input = clonedOptions.querySelector("input");
    input.setAttribute('id', id);
    input.setAttribute('value', option);
    const label = clonedOptions.querySelector('.options');
    label.setAttribute('for', id);
    label.textContent = option;
    formNode.append(clonedOptions);
  });
}

const addSubmitButton = (clonedSubmit, formNode, quizState) => {
  const value =
    quizState.currentQuestionNumber() < quizState.totalQuestions()
      ? "Next"
      : "Submit";
  clonedSubmit.querySelector('input').setAttribute('value', value);
  formNode.append(clonedSubmit);
}

export const renderQuestion = (mainNode, question, quizState) => {
  const templates = {
    question: document.querySelector(".question-template"),
    options: document.querySelector(".options-template"),
    submit: document.querySelector(".submit-btn")
  };

  const clonedQuestion = templates.question.content.cloneNode(true);
  const optionsTemplate = templates.options
  const clonedSubmit = templates.submit.content.cloneNode(true);

  setQuestionAndNumber(clonedQuestion, quizState, question);
  const formNode = clonedQuestion.querySelector('form')
  appendOptions(optionsTemplate, question, formNode)
  addSubmitButton(clonedSubmit, formNode, quizState);
  mainNode.append(clonedQuestion);
};

export const renderScore = (mainNode, result) => {
  const scoreTemplate = document.querySelector(".score-template");
  const scoreNode = scoreTemplate.content.cloneNode(true);
  const score = `Your final score is ${result.score} / ${result.total}`
  scoreNode.querySelector('.score').textContent = score;
  mainNode.append(scoreNode);
};

export const removeCurrentQuestion = (mainNode) => {
  mainNode.querySelector('article').remove();

}