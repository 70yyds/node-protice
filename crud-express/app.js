/**
 * app.js 入门模块
 * 职责：
 *   创建服务
 *   做一些服务相关配置
 *     模板引擎
 *     body-parser 解析表单 post 请求体
 *     提供静态资源服务
 *   挂载路由
 *   监听端口启动服务
 */

var express = require('express')
var router = require('./router') //引入导出的router方法
var bodyParser = require('body-parser')

var app = express()

app.use('/node_modules/', express.static('./node_modules/'))//处理静态文件
app.use('/public/', express.static('./public/'))

app.engine('html', require('express-art-template'))//识别html模板

// 配置模板引擎和 body-parser 一定要在 app.use(router) 挂载路由之前
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) //处理post表单数据
// parse application/json
app.use(bodyParser.json())

// router(app) //router文件以module导出时的使用  传入app，此时路由可以正常使用
app.use(router)

app.listen(3000, function () {
  console.log('running 3000...')
})

module.exports = app
