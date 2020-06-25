const express = require('express');
var static = require('express-static');
const server = express();

server.use('*', function(req, res, next) {
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', 'null');
    next(); // 链式操作
});

server.use(static(__dirname + '/webapp'));
server.listen(9012, () => {
	console.log('已打开提供本地静态文件的端口9012');
})