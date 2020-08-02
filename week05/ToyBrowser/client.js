const Request = require('./request')
const HtmlParser = require('./htmlParser')
const render = require('./render')
const images = require('images')

async function getHTML(host, port, path) {
  let request = new Request({
    method: 'GET',
    host: host || 'localhost',
    port: port || '8848',
    path: path || '/'
  })

  // let response = await request.send()
  return await request.send()
}

async function getDom(url) {
  let html = await getHTML('localhost', '8848', '/')
  let dom = HtmlParser.parseHtml(html.body)

  let viewport = images(800, 600).fill(255, 255, 255)

  render(viewport, dom)

  viewport.save('browser.jpg')
}

getDom()

