console.log('this is b');
let a = require('./a')
//不同文件中对象的命名不会冲突
a.text = 'this is changed text of a'
console.log(a.text);