let $ = Symbol('End of word')

class Tire {
  constructor() {
    this.root = Object.create(null)
  }

  insert(word) {
    let node = this.root
    for (let c of word) {
      if (!node[c]) {
        node[c] = Object.create(null)
      }
      node = node[c]
    }

    if (!($ in node)) {
      node[$] = 0
    }
    node[$]++
  }

  most() {
    let max = 0,
      maxWord = null
    let visit = (node, word) => {
      if (node[$] && node[$] > max) {
        max = node[$]
        maxWord = word
      }
      for(let p in node) {
        visit(node[p], word + p)
      }
    }
    visit(this.root, '')
    return maxWord
  }
}

function randomWord(n) {
  let word = ''
  for(let i = 0; i < n; i ++) {
    word += String.fromCharCode(Math.random(4) * 26 + 'a'.charCodeAt(0))
  }
  return word
}

let tire = new Tire()
for(let i = 0; i < 100000; i ++) {
  tire.insert(randomWord(4))
}

console.log(tire.most())
