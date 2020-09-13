export class ToyVue {
  constructor(config) {
    this.template = document.querySelector(config.el)
    this.data = reactive(config.data)

    for(let name in config.methods) {
      this[name] = () => {
        config.methods[name].apply(this.data)
      }
    }

    this.traversal(this.template)
  }
  traversal(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.textContent.trim().match(/{{([\d\s\S]+)}}/)) {
        let name = RegExp.$1.trim(),
          textContent = node.textContent
        effect(() => node.textContent = textContent.replace(/{{[\d\s\S]+}}/, this.data[name]))
      }
    }
    if (node.nodeType === node.ELEMENT_NODE) {
      let attributes = node.attributes
      for(let attribute of attributes) {
        if (attribute.name === 'v-model') {
          effect(() => {
            node.value = this.data[attribute.value]
            node.addEventListener('input', event => this.data[attribute.value] = node.value)
          })
        }
        if (attribute.name.match(/^v-bind:([\d\s\S]+)$/)) {
          let attrName = RegExp.$1.trim(),
            name = attribute.value
          effect(() => node.setAttribute(attrName, this.data[name]))
        }
        if (attribute.name.match(/^v-on:([\d\s\S]+)$/)) {
          let eventName = RegExp.$1.trim(),
            fnName = attribute.value
          node.addEventListener(eventName, this[fnName])
        }
      }
    }
    if (node.childNodes && node.childNodes.length) {
      for(let child of node.childNodes)
        this.traversal(child)
    }
  }
}

let effects = new Map()
let currentEffect = null

function effect(fn) {
  currentEffect = fn
  fn()
  currentEffect = null
}

function reactive(object) {
  return new Proxy(object, {
    get(target, p, receiver) {
      if (currentEffect) {
        if (!effects.has(target))
          effects.set(target, new Map())
        if (!effects.get(target).has(p))
          effects.get(target).set(p, [])
        effects.get(target).get(p).push(currentEffect)
      }
      return target[p]
    },
    set(target, p, value, receiver) {
      target[p] = value
      if (effects.has(target) && effects.get(target).has(p)) {
        for(let effect of effects.get(target).get(p)) {
          effect()
        }
      }
      return value
    }
  })
}
