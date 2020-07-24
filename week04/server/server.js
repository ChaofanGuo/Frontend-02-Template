const http = require('http')

http.createServer((request, response) => {
  let input = []
  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    input.push(chunk.toString())
    console.log('chunk', chunk)
  }).on('end', () => {
    input = Buffer.concat(input).toString
    console.log(input)
    response.setHeader("Access-Control-Allow-Origin", "*"); // 设置可访问的源
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.end(JSON.stringify({currentTime: new Date()}))
  })
}).listen(8848)

console.log('Server started, listening port 8848')
