//通过require引入其他模块
//各个模块即使变量相同方法相同也互不冲突影响
var hello = require('./01-helloworld')
console.log(hello.test(3,10));
console.log(hello.list);//undefined    必须exports