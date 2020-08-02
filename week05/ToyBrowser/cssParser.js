const css = require('css')
let cssRules = []

function addCssRules(text) {
  let ast = css.parse(text)
  console.log(JSON.stringify(ast, null, "    "))
  cssRules.push(...ast.stylesheet.rules)
}

function match(selector, element) {
  if (!selector || !element.attribute)
    return false

  // 存在不在选择器开头的ID或类选择器，则为复合选择器
  if (selector.indexOf('#') > 0 || selector.indexOf('.') > 0) {
    let selectorParts = {
      tag: [],
      id: [],
      class: []
    }
    let state = 'tag',
      text = ''
    for (let s of selector) {
      if (s === '#') {
        selectorParts[state].push(text)
        text = ''
        state = 'id'
      } else if (s === '.') {
        selectorParts[state].push(text)
        text = ''
        state = 'class'
      } else {
        text += s
      }
    }
    if (selectorParts.tag[0] !== element.tagName) {
      return false
    }
    let notMatchedId = selectorParts.id.filter(part => !element.attribute['id'].includes(part))
    if (notMatchedId.length > 0) {
      return false
    }
    let notMatchedClass = selectorParts.class.filter(part => !element.attribute['class'].includes(part))
    if (notMatchedClass.length > 0) {
      return false
    }

    return true
  } else {
    if (selector.startsWith('#')) {
      let matched = element.attribute.filter(attr => attr.name === 'id' && attr.value === selector.substr(0))
      return matched.length > -1
    } else if (selector.startsWith('.')) {
      let matched = element.attribute.filter(attr => attr.name === 'class' && attr.value.includes(selector.substr(0)))
      return matched.length > -1
    } else {
      return element.tagName === selector
    }
  }
}

function specificity(selector) {
  let p = [0, 0, 0, 0]
  let selectorParts = selector.split(' ')
  for (let part of selectorParts) {
    if (part.startsWith('#')) {
      p[1] += 1
    } else if (part.startsWith('.')) {
      p[2] += 1
    } else {
      p[3] += 1
    }
  }
  return p
}

function compareSpecificity(spe1, spe2) {
  if (spe1[0] - spe2[0])
    return spe1[0] - spe2[0]
  else if (spe1[1] - spe2[1])
    return spe1[1] - spe2[1]
  else if (spe1[2] - spe2[2])
    return spe1[2] - spe2[2]
  else
    return spe1[3] - spe2[3]
}

function computeCSS(element, elements) {
  if (!element.computedStyle) {
    element.computedStyle = {}
  }

  for (let rule of cssRules) {
    let selectorParts = rule.selectors[0].split(' ').reverse()

    if (!match(selectorParts[0], element)) continue

    let j = 1
    for (let i = 0; i < elements.length; i++) {
      if (match(selectorParts[j], elements[i])) {
        j++
      }
    }

    if (j >= selectorParts.length) {
      // 当前元素完整匹配到当前样式选择器
      let spe = specificity(rule.selectors[0])
      for (let declaration of rule.declarations) {
        if (!element.computedStyle[declaration.property]) {
          element.computedStyle[declaration.property] = {}
        }

        if (!element.computedStyle[declaration.property].specificity) {
          element.computedStyle[declaration.property].value = declaration.value
          element.computedStyle[declaration.property].specificity = spe
        } else if (compareSpecificity(spe, element.computedStyle[declaration.property].specificity) > 0) {
          element.computedStyle[declaration.property].value = declaration.value
          element.computedStyle[declaration.property].specificity = spe
        }
      }
    }
  }
}


module.exports = {
  computeCSS,
  addCssRules
}
