
export const createNestFragment = (tag, attr, content) => {

  const node = document.createElement(tag);

  for (const [key, value] of Object.entries(attr)) {
    node.setAttribute(key, value);
  }

  if (typeof content === 'string') {
    node.textContent = content;
  }
  else {
    for (const ele of content) {
      node.append(createNestFragment(...ele))
    }
  }
  return node;
}

export const Elements = {
  ARTICLE: 'article',
  FORM: 'form',
  FIELDSET: 'fieldset',
  LEGEND: 'legend',
  H2: 'h2',
  INPUT: 'input',
  LABEL: 'label',
  DIV: 'div',
  H1: 'h1'
}
