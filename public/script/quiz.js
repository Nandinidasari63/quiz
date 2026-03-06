import { createNestFragment, Elements } from "./dom.js";

const { ARTICLE, FORM, FIELDSET, LEGEND, H2, INPUT, DIV, LABEL } = Elements;

const options = ['Ooty', 'pakistan', 'delhi']
const divs = options.map((option, index) =>
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

const articleNode =
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
                    H2, {}, "1.What is the captial of india?"
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

window.onload = () => {
  const section = document.querySelector('section')
  section.append(createNestFragment(...articleNode));
  console.log(section);
}