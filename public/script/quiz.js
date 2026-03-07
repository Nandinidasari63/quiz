import { fetchQuestions } from "./api.js";
import { createNestFragment, Elements } from "./dom.js";
import { Quiz } from "./quiz_state.js";

const { ARTICLE, FORM, FIELDSET, LEGEND, H2, INPUT, DIV, LABEL, H1 } = Elements;

const divNodeStructure = (options) => {
  return options.map((option, i) => [
    DIV, {},
    [
      [INPUT, { type: 'radio', id: `option-${i + 1}`, name: 'options', value: option }, ''],
      [LABEL, { for: `option-${i + 1}` }, option]
    ]
  ]);
}

const articleNodeStructure = (divs, question, quizState) => {

  const value = quizState.currentQuestionNumber() < quizState.totalQuestions() ? 'Next' : 'Submit';
  return [
    ARTICLE, {},
    [
      [
        FORM, {},
        [
          [
            FIELDSET, {},
            [
              [
                LEGEND, {},
                [[H2, {}, question.question]]
              ],
              ...divs,
              [INPUT, { type: 'submit', value: `${value}` }, '']
            ]
          ]
        ]
      ]
    ]
  ]
}

const score = (e, quizState) => {
  const formData = new FormData(e.target);
  const selectedValue = formData.get("options");
  quizState.giveScore(selectedValue);
}

const removeArticle = (section) => {
  while (section.firstChild) {
    section.removeChild(section.firstChild);
  }
}

const responseOfQue = (section, quizState) => {
  if (quizState.isQuizFinish()) {
    return displayQuestion(quizState.getQuestion(), quizState);
  }
  else {
    const finalMessage = [
      DIV, { class: 'score' }, [
        [
          H1, {}, `your final Score is ${quizState.getScore()}`
        ]
      ]
    ]
    section.append(createNestFragment(...finalMessage));
  }
}

const listener = (section, quizState) => {
  const form = section.querySelector('form');
  form.addEventListener('submit',
    (e) => {
      e.preventDefault();
      score(e, quizState);
      removeArticle(section);
      quizState.nextQuestion();
      responseOfQue(section, quizState);
    }
  );
}

const displayQuestion = (question, quizState) => {
  const section = document.querySelector('section');

  const divs = divNodeStructure(question.options);
  const articleNode = articleNodeStructure(divs, question, quizState);

  section.append(createNestFragment(...articleNode));
  listener(section, quizState)
}

const main = async () => {
  const questions = await fetchQuestions();
  const quizState = new Quiz(questions);
  displayQuestion(quizState.getQuestion(), quizState);
}

window.onload = main;
