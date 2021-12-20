//1  这种方式是以模块的方式书写的

// module.exports = function (app) {
//   //app为express的实例，这里的get，post，delete等请求方式都是express封装好的api
//   app.get('/student', (req, res) => {
//     fs.readFile('./db.json', 'utf8', (err, data) => {
//       if (err) {
//         res.status(500).send('Server error')
//       }
//       var studentdata = JSON.parse(data).students //拿到db中的学生数据
//       res.render('index.html', {
//         students: studentdata //默认自动定位views文件夹下的路径  指定文件中，然后将读取的值赋给模板中的对象
//       })
//     })
//   })
// }

// 2 这种方式 使用了express封装好的router方法，不需要exports
const express = require('express')
const router = express.Router()  //路由模块对象
const Student = require('./student')

//渲染首页
router.get('/students', (req, res) => {
  Student.find(null, (err, data) => {
    if (err) {
      return res.send(err)
    }
    res.render('index.html', {
      students: data
    })
  })
})

//渲染new页面
router.get('/students/new', (req, res) => {
  res.render('new.html')
})

//完成new的提交事件
router.post('/students/new', (req, res) => {
  Student.save(req.body, (err, data) => {
    if (err) {
      return res.send(err)
    }
    res.redirect('/students')
  })
})

//渲染编辑页面
router.get('/students/edit', (req, res) => {
  Student.find(req.query.id, (err, data) => {
    if (err) {
      return res.send(err)
    }
    console.log(data);
    res.render('edit.html', {
      students: data
    })
  })
})


//完成edit的提交事件
router.post('/students/edit', (req, res) => {
  Student.update(req.body.id, req.body, (err, data) => {
    if (err) {
      console.log(err);
      return res.send(err)
    }
    res.redirect('/students')
  })
})

//删除功能
//这里没有删除页面  由此可见 这个地方只识别路径，express封装好的会自动过滤掉query，  与index中的请求路径相符  能够走delete方法即可
router.get('/students/delete', (req, res) => {
  Student.delete(req.query.id, (err, data) => {
    if (err) {
      return res.send(err)
    }
    res.redirect('/students')
  })
})

module.exports = router