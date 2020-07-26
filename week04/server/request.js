const net = require('net')
const ResponseParser = require('./responseParser')

class Request {
  constructor(options) {
    this.method = options.mothod || 'GET'
    this.host = options.host
    this.port = options.port || '80'
    this.path = options.path || '/'
    this.body = options.body || {}
    this.headers = options.headers || {}

    if (!this.headers['Content-Type']) {
      this.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    if (this.headers['Content-Type'] === 'application/json') {
      this.bodyText = JSON.stringify(this.body)
    } else if (this.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&')
    }

    this.headers['Content-Length'] = this.bodyText.length
  }

  send() {
    console.log('about to send the request')
    return new Promise((resolve, reject) => {
      const parser = new ResponseParser()
      let connection = net.createConnection({
        host: this.host,
        port: parseInt(this.port)
      }, () => {
        connection.write(this.toString())
      })
      connection.on('data', data => {
        parser.receive(data.toString())
        resolve(parser.response)
        connection.end()
      })
      connection.on('error', error => {
        reject(error)
        connection.end()
      })
    })
  }

  toString() {
    return `${this.method} ${this.path} HTTP/1.1\r\n${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r\n\r\n${this.bodyText}`
  }
}

module.exports = Request
