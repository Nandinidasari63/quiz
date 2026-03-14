const setQuestionAndNumber = (questionNode, quizState, { question }) => {
  const questionNumber = `Question ${quizState.currentQuestionNumber()} / ${quizState.totalQuestions()}`;
  questionNode.querySelector(".question-num").textContent = questionNumber;
  questionNode.querySelector(".question-text").textContent = question;
};

const appendOptions = ({ options }, formNode) => {
  options.forEach((option, index) => {
    const optionsTemplate = document.querySelector('.options-template')
    const clonedOptions = optionsTemplate.content.cloneNode(true);
    const id = `option-${index + 1}`;
    clonedOptions.querySelector("input").setAttribute('id', id);
    const label = clonedOptions.querySelector('.options')
    label.setAttribute('for', id);
    label.textContent = option;
    formNode.append(clonedOptions);
  });
}

const addSubmitButton = (formNode, quizState) => {
  const submitBtn = document.querySelector('.submit-btn').content.cloneNode(true);
  const value =
    quizState.currentQuestionNumber() < quizState.totalQuestions()
      ? "Next"
      : "Submit";
  submitBtn.querySelector('input').setAttribute('value', value);
  formNode.append(submitBtn);
}

export const renderQuestion = (mainNode, question, quizState) => {
  const questionTemplate = document.querySelector('.question-template');
  const clonedQuestion = questionTemplate.content.cloneNode(true);
  setQuestionAndNumber(clonedQuestion, quizState, question);
  const formNode = clonedQuestion.querySelector('form')
  appendOptions(question, formNode)
  addSubmitButton(formNode, quizState);
  mainNode.append(clonedQuestion);
};

export const renderScore = (section, result) => {
  const scoreNode = [
    DIV,
    { class: "score" },
    [[H1, {}, `Your final score is ${result.score} / ${result.total}`]],
  ];

  section.append(createNestFragment(...scoreNode));
};

export const clearSection = (section) => {
  while (section.firstChild) {
    section.removeChild(section.firstChild);
  }
};
