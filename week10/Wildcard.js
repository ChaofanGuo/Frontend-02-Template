
function find(source,target) {
  let starCount = 0
  for(let i = 0; i < target.length; i ++) {
    if (target[i] === '*')
      starCount ++
  }
  if (starCount === 0) {
    for(let i = 0; i < target.length; i ++) {
      if (target[i] !== source[i] && target[i] !== '?') {
        return false
      }
    }
    return true
  }

  let i = 0,
    lastIndex = 0

   for(i = 0; target[i] !== '*'; i ++) {
     if (source[i] !== target[i] && target[i] !== '?') {
       return false
     }
   }

   lastIndex = i

  for(let j = 0; j < starCount - 1; j ++) {
    i ++
    let sub = ''
    while(target[i] !== '*') {
      sub += target[i]
      i ++
    }

    let reg = new RegExp(sub.replace(/\?/g, '[\\s\\S]'), 'g')
    reg.lastIndex = lastIndex

    if (!reg.exec(source)) {
      return false
    }

    lastIndex = reg.lastIndex
  }

  for(let j = 0; j <= source.length - lastIndex && target[target.length - j] !== '*'; j ++) {
    if (target[target.length - j] !== source[source.length - j] && target[target.length - j] !== '?') {
      return false
    }
  }

  return true
}
