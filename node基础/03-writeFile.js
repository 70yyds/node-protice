var fs = require('fs')//引入
//路径，内容，回调
fs.writeFile('./写入成功.txt', 'has successed', function (error, res) {
  console.log(error);
  console.log(res);
})
