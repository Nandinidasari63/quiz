import { createNestFragment, Elements } from "./dom.js";

const { ARTICLE, FORM, FIELDSET, LEGEND, INPUT, DIV, LABEL, H1, P } = Elements;

const divNodeStructure = (options) => {
  return options.map((option, i) => [
    DIV, {},
    [
      [INPUT, { type: 'radio', id: `option-${i + 1}`, name: 'options', value: option, required: true }, ''],
      [LABEL, { for: `option-${i + 1}`, class: 'options' }, option]
    ]
  ]);
};

const articleNodeStructure = (divs, question, quizState) => {
  const value =
    quizState.currentQuestionNumber() < quizState.totalQuestions()
      ? "Next"
      : "Submit";

  return [
    ARTICLE, {},
    [
      [
        P, { id: "question-Num" },
        `Question ${quizState.currentQuestionNumber()} / ${quizState.totalQuestions()}`
      ],
      [
        FORM, {},
        [
          [
            FIELDSET, {},
            [
              [LEGEND, {}, [[H1, {}, question.question]]],
              ...divs,
              [
                DIV, { class: "button" },
                [[INPUT, { type: "submit", value: value, id: "btn" }, ""]]
              ]
            ]
          ]
        ]
      ]
    ]
  ];
};

export const renderQuestion = (section, question, quizState) => {
  const divs = divNodeStructure(question.options);
  const article = articleNodeStructure(divs, question, quizState);

  section.append(createNestFragment(...article));
};

export const renderScore = (section, result) => {
  const scoreNode = [
    DIV, { class: "score" },
    [[H1, {}, `Your final score is ${result.score} / ${result.total}`]]
  ];

  section.append(createNestFragment(...scoreNode));
};

export const clearSection = (section) => {
  while (section.firstChild) {
    section.removeChild(section.firstChild);
  }
};