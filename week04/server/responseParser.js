const ChunkedBodyParser = require('./bodyParser').ChunkedBodyParser

class ResponseParser {
  constructor() {
    this.current = this.waitingStatusLine
    this.statusLine = ''
    this.headerName = ''
    this.headerValue = ''
    this.headers = {}
    this.bodyParser = {}
    this.parseFinished = false
  }

  get response() {
    if (this.parseFinished && this.bodyParser.parseFinished) {
      const statusStr = /HTTP\/1.1 ([0-9]+ [\s\S]+)/.exec('HTTP/1.1 200 ok')[1]
      return {
        statusCode: statusStr.split(' ')[0],
        statusText: statusStr.split(' ')[1],
        headers: this.headers,
        body: this.bodyParser.body
      }
    }
  }

  receive(string) {
    const input = String(string),
      len = input.length
    for (let i = 0; i < len; i++) {
      this.current = this.current(input.charAt(i))
    }
    this.parseFinished = true
  }

  waitingStatusLine(char) {
    if (char === '\r')
      return this.waitingStatusLineEnd
    else
      this.statusLine += char
    return this.waitingStatusLine
  }

  waitingStatusLineEnd(char) {
    if (char === '\n')
      return this.waitingHeaderName
    return this.waitingStatusLineEnd
  }

  waitingHeaderName(char) {
    if (char === '\r') {
      return this.waitingHeaderBlockEnd
    } else if (char === ':')
      return this.waitingHeaderSpace
    else
      this.headerName += char
    return this.waitingHeaderName
  }

  waitingHeaderSpace(char) {
    if (char === ' ')
      return this.waitingHeaderValue
    else if (char === '\r')
      return this.waitingHeaderLineEnd
    return this.waitingHeaderSpace
  }

  waitingHeaderValue(char) {
    if (char === '\r') {
      this.headers[this.headerName] = this.headerValue
      this.headerName = ''
      this.headerValue = ''
      return this.waitingHeaderLineEnd
    } else
      this.headerValue += char
    return this.waitingHeaderValue
  }

  waitingHeaderLineEnd(char) {
    if (char === '\n')
      return this.waitingHeaderName
    return this.waitingHeaderLineEnd
  }

  waitingHeaderBlockEnd(char) {
    if (char === '\n') {
      if (this.headers['Transfer-Encoding'] === 'chunked') {
        this.bodyParser = new ChunkedBodyParser()
        return this.parseBody
        // return this.bodyParser.receive
      }
    }
    return this.waitingHeaderBlockEnd
  }

  parseBody(char) {
    this.bodyParser.receive(char)
    return this.parseBody
  }
}

/*
class ResponseParser {
  constructor() {
    this.WAITING_STATUS_LINE = 0
    this.WAITING_STATUS_LINE_END = 1
    this.WAITING_HEADER_NAME = 2
    this.WAITING_HEADER_SPACE = 3
    this.WAITING_HEADER_VALUE = 4
    this.WAITING_HEADER_LINE_END = 5
    this.WAITING_HEADER_BLOCK_END = 6
    this.WAITING_BODY = 7

    this.current = this.WAITING_STATUS_LINE
    this.statusLine = ''
    this.headers = {}
    this.headerName = ''
    this.headerValue = ''
    this.bodyParser = {}
  }

  receive(string) {
    const len = string.length
    let bodyIndex = -1
    for (let i = 0; i < len; i++) {
      if (this.receiveChar(string.charAt(i))) {
        bodyIndex = i
        break
      }
    }
    return String(string).substr(bodyIndex)
  }

  receiveChar(char) {
    console.log(`char : ${char}, current : ${this.current}`)
    if (this.current === this.WAITING_STATUS_LINE) {
      if (char === '\r') {
        this.current = this.WAITING_STATUS_LINE_END
      } else {
        this.statusLine += char
      }
    } else if (this.current === this.WAITING_STATUS_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITING_HEADER_NAME
      }
    } else if (this.current === this.WAITING_HEADER_NAME) {
      if (char === ':') {
        this.current = this.WAITING_HEADER_SPACE
      } else if (char === '\r') {
        this.current = this.WAITING_HEADER_BLOCK_END
      } else {
        this.headerName += char
      }
    } else if (this.current === this.WAITING_HEADER_SPACE) {
      if (char === ' ') {
        this.current = this.WAITING_HEADER_VALUE
      } else if (char === '\r') {
        this.current = this.WAITING_HEADER_LINE_END
      }
    } else if (this.current === this.WAITING_HEADER_VALUE) {
      if (char === '\r') {
        this.current = this.WAITING_HEADER_LINE_END
        this.headers[this.headerName] = this.headerValue
        this.headerName = ''
        this.headerValue = ''
      } else {
        this.headerValue += char
      }
    } else if (this.current === this.WAITING_HEADER_LINE_END) {
      if (char === '\n') {
        this.current = this.WAITING_HEADER_NAME
      }
    } else if (this.current === this.WAITING_HEADER_BLOCK_END) {
      if (char === '\n') {
        this.current = this.WAITING_BODY
      }
    } else if (this.current === this.WAITING_BODY) {
      console.log('waiting body')
      return true
    }
  }
}
*/


module.exports = ResponseParser
