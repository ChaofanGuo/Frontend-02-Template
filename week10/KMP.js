function kmp(source, target) {
  debugger
  let table = new Array(target.length).fill(0)

  {
    let i = 1, j = 0
    while (i < target.length) {
      if (target[i] === target[j]) {
        i++
        j++
        table[i] = j
      } else {
        if (j === 0) {
          i++
        } else {
          j = table[j]
        }
      }
    }
  }

  {
    let i = 0, j = 0
    while (i < source.length) {
      if (source[i] === target[j]) {
        i++
        j++
      } else {
        if (j === 0) {
          i ++
        } else {
          j = table[j]
        }
      }
    }

    if (j === target.length) {
      return true
    }
  }
  return false
}

console.log(kmp('abc', 'abc'))
