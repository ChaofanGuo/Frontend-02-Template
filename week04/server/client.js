const Request = require('./request')
const HtmlParser = require('./htmlParser')

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
  console.log(html)
  let dom = HtmlParser.parseHtml(html.body)
  console.log(dom)
}

getDom()

