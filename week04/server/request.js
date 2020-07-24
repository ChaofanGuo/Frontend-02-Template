let net = require('net')

class Request {
  constructor (options) {
    this.method =   options.mothod || 'GET'
    this.host =     options.host
    this.port =     options.port || '80'
    this.path =     options.path || '/'
    this.body =     options.body || {}
    this.headers =  options.headers || {}

    if(!this.headers['Content-Type']) {
      this.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    if(this.headers['Content-Type'] === 'application/json') {
      this.bodyText = JSON.stringify(this.body)
    } else if (this.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&')
    }

    this.headers['Content-Length'] = this.bodyText.length
  }

  send() {
    return new Promise((resolve, reject) => {
    })
  }
}

function sendRequest() {
  let request = new Request({
    method: 'POST',
    host: 'localhost',
    port: '8848',
    path: '/',
    headers: {
      'Custom-Headers': 'customed'
    },
    body: {
      name: 'super',
      key: '546507341'
    }
  })
  console.log(request)

  // let response = await request.send()
  request.send().then(res => {
    console.log('res', res)
  })
}

sendRequest()
