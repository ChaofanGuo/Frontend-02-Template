const cssParser = require('./cssParser')
const layout = require('./layout')

const EOF = Symbol('EOF') // EOF (End Of File)
let currentToken = initCurrentToken()
let currentAttribute = initCurrentAttribute()
const tokenStack = [{type: 'document', children: []}]
let currentTextNode = null

function initCurrentToken() {
  return {
    type: '',
    tagName: '',
    isSelfClosing: false
  }
}

function initCurrentAttribute() {
  return {
    name: '',
    value: ''
  }
}

function emit(token) {
  let top = tokenStack[tokenStack.length - 1]
  if (token.type === 'startTag') {
    let element = {
      tagName: token.tagName,
      type: 'element',
      children: [],
      attribute: []
    }

    for (let p in token) {
      if (p !== 'type' && p !== 'tagName') {
        element.attribute.push({
          name: p,
          value: token[p]
        })
      }
    }

    top.children.push(element)
    element.parent = top

    if (!token.isSelfClosing) {
      tokenStack.push(element)
    }

    currentTextNode = null

    cssParser.computeCSS(element, tokenStack.slice().reverse())
  } else if (token.type === 'endTag') {
    if (top.tagName === token.tagName) {
      if (token.tagName === 'style') {
        cssParser.addCssRules(top.children[0].content)
      }
      layout(top)
      tokenStack.pop()
    } else {
      throw new Error('Tag not end properly')
    }
    currentTextNode = null
  } else if (token.type === 'text') {
    if (currentTextNode === null) {
      currentTextNode = {
        type: 'text',
        content: ''
      }
      top.children.push(currentTextNode)
    }
    currentTextNode.content += token.content
  }
}

function data(char) {
  if (char === '<') {
    return tagOpen
  } else if (char === EOF) {
    emit({
      type: 'EOF',
      content: EOF
    })
  } else {
    emit({
      type: 'text',
      content: char
    })
    return data
  }
}

function tagOpen(char) {
  if (char === '/') {
    return endTagOpen
  } else if (char.match(/^[a-zA-z]$/)) {
    currentToken.type = 'startTag'
    currentToken.tagName = ''
    return tagName(char)
  }
}

function endTagOpen(char) {
  if (char.match(/^[a-zA-Z]$/)) {
    currentToken.type = 'endTag'
    currentToken.tagName = ''
    return tagName(char)
  }
}

function tagName(char) {
  if (char.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (char === '/') {
    return selfClosingStartTag
  } else if (char.match(/^[a-zA-Z1-6]$/)) {
    currentToken.tagName += char
    return tagName
  } else if (char === '>') {
    emit(currentToken)
    currentToken = initCurrentToken()
    return data
  } else {
    return tagName
  }
}

function beforeAttributeName(char) {
  if (char.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (char === '>' || char === '/' || char === EOF) {
    return afterAttributeName(char)
  } else if (char === '=') {
    return beforeAttributeName
  } else {
    currentAttribute.name = ''
    currentAttribute.value = ''
    return attributeName(char)
  }
}

function attributeName(char) {
  if (char.match(/^[\t\n\f ]$/) || char === '/' || char === '>' || char === EOF) {
    return afterAttributeName(char)
  } else if (char === '=') {
    return beforeAttributeValue
  } else if (char === '\u0000') {

  } else if (char === '\"' || char === '\'' || char === '<') {

  } else {
    currentAttribute.name += char
    return attributeName
  }
}

function afterAttributeName(char) {
  if (char.match(/^[\t\n\f ]$/)) {
    return afterAttributeName
  } else if (char === '/') {
    return selfClosingStartTag
  } else if (char === '=') {
    return beforeAttributeValue
  } else if (char === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value
    currentAttribute = initCurrentAttribute()
    emit(currentToken)
    currentToken = initCurrentToken()
    return data
  } else if (char === EOF) {

  } else {
    currentToken[currentAttribute.name] = currentAttribute.value
    currentAttribute = initCurrentAttribute()
    return attributeName
  }
}

function beforeAttributeValue(char) {
  if (char.match(/^[\t\n\f ]$/) || char === '/' || char === '>' || char === EOF) {
    return beforeAttributeValue
  } else if (char === '\"') {
    return doubleQuotedAttributeValue
  } else if (char === '\'') {
    return singleQuotedAttributeValue
  } else if (char === '>') {

  } else {
    return unquotedAttributeValue(char)
  }
}

function doubleQuotedAttributeValue(char) {
  if (char === '\"') {
    currentToken[currentAttribute.name] = currentAttribute.value
    currentAttribute = initCurrentAttribute()
    return afterQuotedAttributeValue
  } else if (char === '\u0000') {

  } else if (char === EOF) {

  } else {
    currentAttribute.value += char
    return doubleQuotedAttributeValue
  }
}

function singleQuotedAttributeValue(char) {
  if (char === '\'') {
    currentToken[currentAttribute.name] = currentAttribute.value
    currentAttribute = initCurrentAttribute()
    return afterQuotedAttributeValue
  } else if (char === '\u0000') {

  } else if (char === EOF) {

  } else {
    currentAttribute.value += char
    return singleQuotedAttributeValue
  }
}

function afterQuotedAttributeValue(char) {
  if (char.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (char === '/') {
    return selfClosingStartTag
  } else if (char === '>') {
    emit(currentToken)
    currentToken = initCurrentToken()
    return data
  } else if (char === EOF) {

  }
}

function unquotedAttributeValue(char) {
  if (char.match(/^[\t\n\f ]$/)) {
    currentToken[currentAttribute.name] = currentAttribute.value
    currentAttribute = initCurrentAttribute()
    return beforeAttributeName
  } else if (char === '/') {
    currentToken[currentAttribute.name] = currentAttribute.value
    currentAttribute = initCurrentAttribute()
    return selfClosingStartTag
  } else if (char === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value
    currentAttribute = initCurrentAttribute()
    return data
  } else if (char === '\u0000') {

  } else if (char === '\"' || char === '\'' || char === '<' || char === '=' || char === '`') {

  } else if (char === EOF) {

  } else {
    currentAttribute.value += char
    return unquotedAttributeValue
  }
}


function selfClosingStartTag(char) {
  if (char === '>') {
    currentToken.isSelfClosing = true
    emit(currentToken)
    currentToken = initCurrentToken()
    return data
  } else if (char === EOF) {

  }
}

function parseHtml(str) {
  let state = data,
    input = String(str)
  const len = input.length
  for (let i = 0; i < len; i++) {
    state = state(input[i])
  }
  state = state(EOF)
  return tokenStack[0]
}

module.exports = {
  parseHtml
}
