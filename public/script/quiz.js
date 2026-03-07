import { createNestFragment, Elements } from "./dom.js";

const { ARTICLE, FORM, FIELDSET, LEGEND, H2, INPUT, DIV, LABEL } = Elements;

const divNodeStructure = (options) => {
  return options.map((option, index) =>
    [
      DIV, {},
      [
        [
          INPUT, { type: 'radio', id: `option-${index + 1}`, name: 'options' },
          ''
        ],
        [
          LABEL, { for: `option-${index + 1}` }, `${option}`,
        ]
      ]
    ])
}

const articleNodeStructure = (divs, questions) =>
  [
    ARTICLE, {},
    [
      [
        FORM, { action: '' },
        [
          [
            FIELDSET, {},
            [
              [
                LEGEND
                , {},
                [
                  [
                    H2, {}, `${questions.question}`
                  ]
                ]
              ],
              ...divs,
              [INPUT, { type: 'submit', value: 'submit' }, '']
            ]
          ]
        ]
      ]
    ]
  ]

const displayQuestions = (questions) => {
  const section = document.querySelector('section')
  const divs = divNodeStructure(questions.options)
  const articleNode = articleNodeStructure(divs, questions)
  section.append(createNestFragment(...articleNode));
  console.log(section);
}

const fetchQuestions = async () => {
  return [{
    question: '1.What is the captial of India?',
    options: ['india', 'pakistan', 'new delhi', 'andhara pradesh']
  },
  {
    question: '2.what is the captial of pakistan?',
    options: ['india', 'pakistan', 'andhara pradesh', 'agra']
  },
  // {
  //   question: '3.what is the captial of andhra pradesh ?',
  //   options: ['india', 'pakistan', 'andhara pradesh', 'amaravathi']
  // }
  ]
}

const main = () => {
  fetchQuestions().then((questions) => questions.map(displayQuestions));
}

window.onload = main;
