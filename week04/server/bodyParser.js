class ChunkedBodyParser {
  constructor(contentType) {
    this.current = this.waitingBodyChunkSize
    this.contentType = contentType

    this.chunkSizeStr = ''
    this.remainingSize = 0
    this.body = ''
    this.parseFinished = false
  }

  receive(char) {
    this.current = this.current(char)
  }

  waitingBodyChunkSize(char) {
    if (char === '\r') {
      this.remainingSize = parseInt(this.chunkSizeStr, 16)
      return this.remainingSize === 0 ? this.parseEnd : this.waitingBodyChunkSizeEnd
    } else
      this.chunkSizeStr += char
    return this.waitingBodyChunkSize
  }

  waitingBodyChunkSizeEnd(char) {
    if (char === '\n')
      return this.waitingBody
  }

  waitingBody(char) {
    if (this.remainingSize === 0 && char === '\r') {
      return this.waitingBodyEnd
    } else {
      this.remainingSize--
      this.body += char
    }
    return this.waitingBody
  }

  waitingBodyEnd(char) {
    if (char === '\n') {
      return this.waitingBodyBlockEnd
    }
  }

  waitingBodyBlockEnd(char) {
    if (char === '0')
      return this.waitingBodyNewLine
  }

  waitingBodyNewLine(char) {
    if (char === '\r')
      return this.waitingBodyNewLineEnd
  }

  waitingBodyNewLineEnd(char) {
    if (char === '\n')
      return this.parseEnd
  }

  parseEnd(char) {
    this.parseFinished = true
    return this.parseEnd
  }
}

module.exports = {
  ChunkedBodyParser: ChunkedBodyParser
}
