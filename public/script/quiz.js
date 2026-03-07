import { createNestFragment, Elements } from "./dom.js";

const { ARTICLE, FORM, FIELDSET, LEGEND, H2, INPUT, DIV, LABEL } = Elements;

let questions = [];
let index = 0;

const divNodeStructure = (options) => {
  return options.map((option, i) => [
    DIV, {},
    [
      [INPUT, { type: 'radio', id: `option-${i + 1}`, name: 'options' }, ''],
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

const displayQuestion = (question) => {
  const section = document.querySelector('section');

  const divs = divNodeStructure(question.options);
  const articleNode = articleNodeStructure(divs, question);

  section.append(createNestFragment(...articleNode));

  const form = section.querySelector('form');
  form.addEventListener('submit', handleSubmit);
}

const handleSubmit = (e) => {
  e.preventDefault();

  const section = document.querySelector('section');

  while (section.firstChild) {
    section.removeChild(section.firstChild);
  }

  index++;

  if (index < questions.length) {
    displayQuestion(questions[index]);
  }
}

const fetchQuestions = async () => {
  return [
    {
      question: '1.What is the capital of India?',
      options: ['india', 'pakistan', 'new delhi', 'andhra pradesh']
    },
    {
      question: '2.What is the capital of Pakistan?',
      options: ['india', 'pakistan', 'andhra pradesh', 'agra']
    },
    {
      question: '3.What is the capital of Andhra Pradesh?',
      options: ['india', 'pakistan', 'andhra pradesh', 'amaravathi']
    }
  ];
}

const main = async () => {
  questions = await fetchQuestions();
  displayQuestion(questions[index]);
}

window.onload = main;