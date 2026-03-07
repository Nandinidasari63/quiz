import { createNestFragment, Elements } from "./dom.js";
import { Quiz } from "./quiz_state.js";

const { ARTICLE, FORM, FIELDSET, LEGEND, H2, INPUT, DIV, LABEL } = Elements;

let questions = [];
let index = 0;

const divNodeStructure = (options) => {
  return options.map((option, i) => [
    DIV, {},
    [
      [INPUT, { type: 'radio', id: `option-${i + 1}`, name: 'options', value: option }, ''],
      [LABEL, { for: `option-${i + 1}` }, option]
    ]
  ]);
}

const articleNodeStructure = (divs, question) => [
  ARTICLE, {},
  [
    [
      FORM, { action: '#' },
      [
        [
          FIELDSET, {},
          [
            [
              LEGEND, {},
              [[H2, {}, question.question]]
            ],
            ...divs,
            [INPUT, { type: 'submit', value: 'submit' }, '']
          ]
        ]
      ]
    ]
  ]
]
const listener = (section, quizState) => {
  const form = section.querySelector('form');
  form.addEventListener('submit',
    (e) => {
      const formData = new FormData(e.target);
      const selectedValue = formData.get("options");
      e.preventDefault();
      console.log(quizState)
      const section = document.querySelector('section');

      while (section.firstChild) {
        section.removeChild(section.firstChild);
      }
      quizState.validateAnswer(selectedValue);
      quizState.nextQuestion();
      if (quizState.isQuizFinish()) {
        displayQuestion(quizState.getQuestion(), quizState);
      }
      else {
        console.log(quizState.getScore());
      }
    }
  );
}
const displayQuestion = (question, quizState) => {
  const section = document.querySelector('section');

  const divs = divNodeStructure(question.options);
  const articleNode = articleNodeStructure(divs, question);

  section.append(createNestFragment(...articleNode));
  listener(section, quizState)
}
const fetchQuestions = async () => {
  return [
    {
      question: '1.What is the capital of India?',
      options: ['india', 'pakistan', 'new delhi', 'andhra pradesh'],
      answer: 'india',
    },
    {
      question: '2.What is the capital of Pakistan?',
      options: ['india', 'pakistan', 'andhra pradesh', 'agra'],
      answer: 'pakistan'

    },
    {
      question: '3.What is the capital of Andhra Pradesh?',
      options: ['india', 'pakistan', 'andhra pradesh', 'amaravathi'],
      answer: 'amaravathi'
    }
  ];
}

const main = async () => {
  questions = await fetchQuestions();
  const quizState = new Quiz(questions);
  displayQuestion(quizState.getQuestion(), quizState);
}

window.onload = main;
