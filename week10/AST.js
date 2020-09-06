let reg = /([0-9.]+)|([ \t]+)|([\r\n]+)|(\+)|(\-)|(\*)|(\/)/g
let dic = ['Number', 'Whitespace', 'LineTerminator', '+', '-', '*', '/']

function LL() {

}

function* tokenize(source) {
  let result = null,
    lastIndex = 0
  while(true) {
    lastIndex = reg.lastIndex
    result = reg.exec(source)

    if (!result) break

    if (reg.lastIndex - lastIndex > result[0].length) break

    let token = {
      type: null,
      value: null
    }

    for(let i = 1; i <= dic.length; i ++) {
      if (result[i]) {
        token.type = dic[i - 1]
      }
    }
    token.value = result[0]
    yield token
  }
  yield {
    type: 'EOF'
  }
}

function Expression(source) {

}

function AdditiveExpression(source) {
  if (source[0].type === 'MultiplicativeExpression') {
    source[0] = {
      type: 'AdditiveExpression',
      children: [source[0]]
    }
    return AdditiveExpression(source)
  }
  if (source[0].type === 'AdditiveExpression' && source[1] && (source[1].type === '+' || source[1].type === '0')) {
    let node = {
      type: 'AdditiveExpression',
      operator: source[1].type,
      children: []
    }
    node.children.push(source.shift())
    node.children.push(source.shift())
    MultiplicativeExpression(source)
    node.children.push(source[0])
    source[0] = node
    return AdditiveExpression(source)
  }
  if (source[0].type === 'AdditiveExpression') {
    return source[0]
  }

  MultiplicativeExpression(source)
  return AdditiveExpression(source)
}

function MultiplicativeExpression(source) {
  if (source[0].type === 'Number') {
    source[0] = {
      type: 'MultiplicativeExpression',
      children: [source[0]]
    }
    return MultiplicativeExpression(source)
  }
  if (source[0].type === 'MultiplicativeExpression' && source[1] && (source[1].type === '*' || source[1].type === '/')) {
    let node = {
      type: 'MultiplicativeExpression',
      operator: source[1].type,
      children: []
    }
    node.children.push(source.shift())
    node.children.push(source.shift())
    node.children.push(source[0])
    source[0] = node
    return MultiplicativeExpression(source)
  }

  if (source[0].type === 'MultiplicativeExpression') {
    return source[0]
  }

  return MultiplicativeExpression(source)
}

let source = []
for(let token of tokenize('2014 * 10 + 24 / 3')) {
  if (token.type !== 'Whitespace' && token.type !== 'LineTerminator') {
    source.push(token)
  }
}
debugger
let result = AdditiveExpression(source)
console.log(result)
