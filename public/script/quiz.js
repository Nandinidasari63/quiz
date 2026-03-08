import { fetchQuestions, submitAnswers } from "./api.js";
import { createNestFragment, Elements } from "./dom.js";
import { Quiz } from "./quiz_state.js";

const { ARTICLE, FORM, FIELDSET, LEGEND, H2, INPUT, DIV, LABEL, H1, P } = Elements;

const divNodeStructure = (options) => {
  return options.map((option, i) => [
    DIV, {},
    [
      [INPUT, { type: 'radio', id: `option-${i + 1}`, name: 'options', value: option, required: true }, ''],
      [LABEL, { for: `option-${i + 1}`, class: 'options' }, option]
    ]
  ]);
}

const articleNodeStructure = (divs, question, quizState) => {

  const value = quizState.currentQuestionNumber() < quizState.totalQuestions() ? 'Next' : 'Submit';
  return [
    ARTICLE, {},
    [
      [
        P, { id: "question-Num" }, `question Number : ${quizState.currentQuestionNumber()} / ${quizState.totalQuestions()} `
      ],

      [
        FORM, {},
        [
          [
            FIELDSET, {},
            [
              [
                LEGEND, {},
                [[H1, {}, question.question]]
              ],
              ...divs,

              [DIV, { class: 'button' }, [
                [
                  INPUT, { type: 'submit', value: `${value}`, id: 'btn' }, ''
                ]
              ]
              ]
            ]
          ]
        ]
      ]
    ]
  ]
}

const storeAnswer = (e, quizState) => {
  const formData = new FormData(e.target);
  const selectedValue = formData.get("options");
  quizState.storeResponse(selectedValue);
}

const removeArticle = (section) => {
  while (section.firstChild) {
    section.removeChild(section.firstChild);
  }
}

const responseOfQue = async (section, quizState) => {
  if (quizState.isQuizFinish()) {
    return displayQuestion(quizState.getQuestion(), quizState);
  }
  else {

    const result = await submitAnswers(quizState.getResponses());
    const finalMessage = [
      DIV, { class: 'score' }, [
        [
          H1, {}, `your final Score is ${result.score} / ${result.total}`
        ]
      ]
    ]
    section.append(createNestFragment(...finalMessage));
  }
}

const listener = (section, quizState) => {
  const form = section.querySelector('form');
  form.addEventListener('submit',
    async (e) => {
      e.preventDefault();
      removeArticle(section);
      storeAnswer(e, quizState);
      quizState.nextQuestion();
      await responseOfQue(section, quizState);
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
