var template = require('art-template')
var http = require('http')
var fs = require('fs')
var url = require('url')
var comments = [
  {
    name: '战双',
    message: '捕捞',
    dateTime: '2021-12-13'
  },
  {
    name: '战双',
    message: '独步',
    dateTime: '2021-12-11'
  }

]

http
  .createServer((req, res) => {
    let pathObj = url.parse(req.url, true)
    let pathname = pathObj.pathname
    if (pathname === '/' || pathname === '/index') {
      fs.readFile('./views/index.html', (err, data) => {
        if (err) {
          return res.end('404 not found')
        }
        var result = template.render(data.toString(), {
          comments: comments
        })
        res.end(result)
      })
    }
    else if (pathname === '/post') {
      fs.readFile('./views/post.html', (err, data) => {
        if (err) {
          res.end('404 not found')
        }
        res.end(data)
      })
    }
    else if (pathname.indexOf('/public') == 0) {
      fs.readFile('.' + pathname, (err, data) => {
        if (err) {
          console.log(err);
          res.end('404 not found')
        }
        res.end(data)
      })
      // 统一处理访问静态资源
    }

  })
  .listen(3000, () => {
    console.log('running');
  })