
// 使用espress这种框架节省了fs读文件内容赋值的步骤，直接使用封装好的方法render  html
// 但是底层肯定还是使用的fs模块进行的操作
var express = require('express')
var bodyParser = require('body-parser')//nodejs 的post数据体中转插件   express本身没有处理post数据的api
var app = express()//express实例

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

app.engine('html', require('express-art-template'))//配置模板引擎
app.use('/public', express.static('./public'))//处理静态资源
// 配置bodyparser中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/index', (req, res) => {
  //req.query只能拿get的参数
  res.render('index.html', {
    comments: comments
  })
})
app.get('/post', (req, res) => {
  res.render('post.html')
})

app.post('/post', (req, res) => {
  var commont = req.body//数据主体
  commont.dateTime = '2021-10-12'
  comments.unshift(commont)
  res.redirect('/index')
})

app.listen(3000, (err, res) => {
  console.log('running');
})