//此文件用于封装对文件的操作的 异步 api
// 不关心业务
// 注：调用封装好的方法时，不关心方法内部的方法结束的事件，这些封装方法中的读写操作都是异步的操作
const fs = require('fs')
const dbPath = './db.json'

//callback(err,data)  第一个参数始终是false  有err就穿err，没报错就穿null，再传个data

//封装写入数据库，调用回调函数的操作
const saveDbData = function (newDb, callback) {
  let newDbStr = JSON.stringify({ students: newDb })
  fs.writeFile(dbPath, newDbStr, (werr, wdata) => {
    if (werr) {
      return callback(werr)
    }
    callback(null, newDb)
  })
}
//生成随机id
const randomId = function () {
  return (Math.random() * 10000000).toString(16).substr(0, 4) + '-' + (new Date()).getTime() + '-' + Math.random().toString().substr(2, 5);

}

//查询所有学生数据
exports.find = function (id, callback) {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }
    let studentdb = JSON.parse(data).students
    if (id) {
      //这里返回的是一个数组
      let editdata = studentdb.filter(item => {
        return item.id === id
      })
      callback(null, editdata[0])
    }
    else {
      callback(null, studentdb)
    }
  })
}

// 添加  提交并保存
exports.save = function (student, callback) {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      return callback(err)
    }
    let studentdb = JSON.parse(data).students //拿到文件内容，转换成对象

    student.id = randomId()

    studentdb.push(student) //此时是个对象，文件保存的时候只认识字符串  需要在stringfy一下

    saveDbData(studentdb, callback)
  })
}

//更新  并保存   
exports.update = function (id, body, callback) {
  fs.readFile(dbPath, (err, data) => {
    let studentdb = JSON.parse(data).students
    // 备份一下
    fs.writeFile('./db-copy.json', JSON.stringify(studentdb), (err, data) => {
      if (err) {
        return
      }
    })

    let stu = studentdb.find(item => {//找到就返回  并停止循环
      return item.id === id
    })
    Object.assign(stu, body) //1 将body覆盖给stu，这个方法的细节可以参考百度
    //2 遍历键值拷贝对象
    // for (var key in body) {
    //   stu[key] = body[key]
    // }
    saveDbData(studentdb, callback)
  })
}

// 删除
exports.delete = function (id, callback) {
  fs.readFile(dbPath, (err, data) => {
    if (err) {
      return callback(err)
    }
    let studentdb = JSON.parse(data).students
    //删除之前备份一下
    // fs.writeFile('./db-copy.json', JSON.stringify({ students: studentdb }), (err, data) => {
    //   if (err) {
    //     console.log(err);
    //   }
    // })
    var itemIndex = studentdb.findIndex(item => {
      return item.id === id
    })
    console.log(itemIndex);
    studentdb.splice(itemIndex, 1)  //从目标出删除一个   删掉这个元素
    saveDbData(studentdb, callback)
  })
}

