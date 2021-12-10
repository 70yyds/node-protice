const http = require('http')
const fs = require('fs')
//createserver 实例
const server = http.createServer()
server.on('request', (req, res) => {

	console.log(req.url, req.method);
	// res.end('hello world')//读完直接结束
	//根据请求地址返回指定数据  返回的数据必须是字符串或二进制数据   对象 布尔 数字等都不行，需要转类型
	let url = req.url
	if (url == '/html') {
		res.end('<h1>hello world</h1>')
	} else if (url == '/plain') { //plain 普通
		res.setHeader('Content-Type', 'text/plain;charset=utf-8');//设置服务器响应头   本身中文操作系统是gbk
		var arrdata = [
			{
				name: '张三',
				age: '23'
			},
			{
				name: '李四',
				age: '24'
			},
			{
				name: '王五',
				age: '25'
			},
		]
		var newarr = JSON.stringify(arrdata)
		res.end(newarr)
	}
	else if (url == '/index') {
		fs.readFile('./dist/index.html', (err, data) => {
			if (err) {
				res.end('404 not found')
			} else {
				res.setHeader('Content-Type', 'text/html; charset=utf-8')
				res.end(data)
			}
		})
	}
	else if (url === '/image') {
		fs.readFile('./dist/avatar2.jpg', (err, data) => {
			if (data) {
				res.end(data)//图片不需要设置响应头
			}
		})
	}
	else {
		res.end('404 not found')
	}

})

server.listen(8000, () => {
	console.log('可以访问');
})