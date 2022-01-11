const Didact = {
  createElement,
  render,
};

type DidactElement = {
  type: string;
  props: {
    nodeValue?: string;
    children?: Array<DidactElement>;
  };
};

/** @jsx Didact.createElement */
const element = (
  <div id="foo">
    <a>bar</a>
    <b />
  </div>
);

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === 'object' ? child : createTextElement(child)
      ),
    },
  };
}

function createTextElement(text) {
  return {
    type: 'TEXT_ELEMENT',
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function render(element: DidactElement, container) {
  const dom =
    element.type === 'TEXT_ELEMENT'
      ? document.createTextNode('')
      : document.createElement(element.type);

  const isProperty = (key) => key !== 'children';
  Object.keys(element.props)
    .filter(isProperty)
    .forEach((name) => {
      dom[name] = element.props[name];
    });
  element.props.children.forEach((child) => render(child, dom));
  container.appendChild(dom);
}

const container = document.getElementById('root');

Didact.render(element, container);
