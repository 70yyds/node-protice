const express = require('express')

const app = express()

//处理静态资源
app.use('/public/', express.static('./public/'))

app.engine('html', require('express-art-template')) //第一个参数是文件后缀 标识要render什么文件
app.get('/', (req, res) => {
  res.render('404.html')//express默认请求views目录下的404文件，其他同理  render方法只允许使用模板的情况下事情
})
app.get('/index', (req, res) => {
  res.send('hello express')
})
app.get('/about', (req, res) => {
  res.send('hello aboutaaaaaaaaaaaaa')
})

app.listen(3000, () => {
  console.log('running');
})