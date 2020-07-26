const http = require('http')
const fs = require('fs')

http.createServer((request, response) => {
  let input = []
  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    input.push(chunk)
  }).on('end', () => {
    input = Buffer.concat(input).toString()
    response.setHeader("Access-Control-Allow-Origin", "*"); // 设置可访问的源
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    fs.readFile('./sample.html', (error, data) => {
      if(error) {
        response.writeHead(500)
      } else {
        response.writeHead(200, {'Content-Type': 'text/html'})
        console.log(data)
        response.end(data)
      }
    })
  })
}).listen(8848)

console.log('Server started, listening port 8848')
