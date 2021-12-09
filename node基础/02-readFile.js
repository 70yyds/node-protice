var fs = require('fs')
//readfile 方法的两个参数
//文件路径，回调函数
// fs.readFile('./写入成功.md', function (error, res) {
//   //第一个是报错信息    第二个参数为数据
//   console.log('error,' + error);
//   console.log('res,' + res);
// })
fs.readFile('./写入成功.txt', (err, res) => {
  console.log('sucess,' + res);
  console.log('error,' + err);
})