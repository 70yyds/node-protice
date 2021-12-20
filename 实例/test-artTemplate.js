var template = require('art-template') //引入模板
var http = require('http')
var fs = require('fs')

const server = http.createServer()
server.on('request', (req, res) => {
  let url = req.url

  if (url === '/index') {
    fs.readFile('./test-artTemplate.html', (err, data) => {
      if (err) {
        console.log('error');
        return
      }
      // data就是读到的文件的内容，artTemplate这里只识别字符串，需要转换一下
      fs.readdir('../node基础', (err, files) => {
        //readdir读取文件目录
        if (err) {
          return res.end("Sorry,Con't find the dir")
        }
        var result = template.render(data.toString(), {
          files: files
        })
        res.end(result)
      })

    })
  }

  //服务器需要返回给浏览器html文本解析，服务端是字符串，在浏览器中会自动解读
  //在打包之后会把index.html中的内容转换成字符串模板返回给浏览器，artTemplate只是方便了一下步骤，因为node没有script标签，所以没法给dom上内容

})
server.listen(8001, () => {
  console.log('running');
})




