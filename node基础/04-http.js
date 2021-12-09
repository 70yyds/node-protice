//搭建本地服务器测试项目

//引入http模块编辑一个node服务器
var http = require('http');
var path = require('path');
const { stringify } = require('querystring');
var mine = require('./mine').types;
var url = require('url');
var fs = require('fs');
//使用createServe方法创建一个服务器
//返回一个服务器实例
var server = http.createServer(function (request, response) {

  //服务器默认编码为utf8   中文操作系统默认gbk   设置头   否则汉字会乱码
  // res.setHeader('Content-Type', 'text/plain; charset=utf8')
  var pathname = url.parse(request.url).pathname;
  var realPath = path.join('dist', pathname)
  var ext = path.extname(realPath)
  ext = ext ? ext.slice(1) : 'unknown';
  fs.exists(realPath, function (exists) {
    if (!exists) {
      response.writeHead(404, {
        'Content-Type': 'text/plain'
      });

      response.write("This request URL " + pathname + " was not found on this server.");
      response.end();
    } else {
      fs.readFile(realPath, "binary", function (err, file) {
        if (err) {
          response.writeHead(500, {
            'Content-Type': 'text/plain'
          });
          response.end(err);
        } else {
          var contentType = mine[ext] || "text/plain";
          response.writeHead(200, {
            'Content-Type': contentType
          });
          response.write(file, "binary");
          response.end();
        }
      });
    }
  });
  if (request.url === '/login') {
    console.log(request.url);//端口号之后的路径
    //在页面写入内容
    res.end('login')
  }
  else if (request.url === '/logout') {
    res.end('login')
  }
  else if (request.url === '/list') {
    var list = [
      {
        name: '小明',
        age: '23'
      },
      {
        name: '小红',
        age: '24'
      }, {
        name: '小李',
        age: '21'
      }
    ]
    res.end(JSON.stringify(list))
  }
  else {
    //需要告诉服务器结束响应    只是别字符串类型
    res.end('404')
  }

})

//对客户端的request的请求进行处理
//回调函数传入request，response


//绑定端口号，启动服务器      但还没给客户端反馈     ctrl+c   关闭
server.listen('8000', function () {
  console.log('现在可以进行访问');
  console.log('------------------------------------------');
})
