var http = require('http')
var fs = require('fs')

http
  .createServer((req, res) => {
    let url = req.url
    if (url === '/') {
      fs.readFile('./views/index.html', (err, data) => {
        if (err) {
          return res.end('404 not found')
        }
        res.end(data)
      })
    } else if (url.indexOf('/public/') == 0) {
      fs.readFile('.' + url, (err, data) => {
        if (err) {
          console.log(err);
          res.end('404 not found')
        }
        res.end(data)
      })
      console.log(url);
      // 统一处理访问静态资源
    }

  })
  .listen(3000, () => {
    console.log('running');
  })