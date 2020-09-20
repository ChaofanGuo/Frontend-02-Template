// Custom JSX create function, configured in webpack.config.js
export function createElement(tag, attributes, ...children) {
  let element
  if (typeof tag === 'string') {
    // tag's type is string means current is HTML tag
    element = new ElementWrapper(tag)
  } else {
    // tag's type is not string means current is custom Javascript class
    element = new tag()
  }
  for(let name in attributes) {
    element.setAttribute(name, attributes[name])
  }
  for(let child of children) {
    // In JSX, text content is a textNode type child
    if (typeof child === 'string') {
      child = new TextWrapper(child)
    }
    element.appendChild(child)
  }
  return element;
}

export class Component {
  constructor(tag) {
    this.root = void 0
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value)
  }
  appendChild(child) {
    child.mountTo(this.root)
  }
  mountTo(parent) {
    parent.appendChild(this.root)
  }
}

class ElementWrapper extends Component {
  constructor(tag) {
    super()
  }
  render() {
    this.root = document.createElement(tag)
  }
}

class TextWrapper extends Component {
  constructor(content) {
    super();
    this.root = document.createTextNode(content)
  }
  render() {
    this.root = document.createElement(tag)
  }
}
