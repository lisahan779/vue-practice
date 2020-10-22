// 这个inde.js就是脚手架中的app.js
const express = require("express")  //1

const app = express() //2

app.set('secret', 'i2u34y12oi3u4y8')   //token秘钥

app.use(require('cors')()) //跨域
app.use(express.json()) // 使用async await 的时候加
app.use('/', express.static(__dirname + '/web'))  //web前端文件静态托管到"/"上去
app.use('/admin', express.static(__dirname + '/admin'))
app.use('/uploads', express.static(__dirname + '/uploads')) // 托管静态文件
// 类似于脚手架中的这种写法
// const shopping = require("./route/shopping")
// app.use("/shopping",shopping);
require('./plugins/db')(app)   // 7 连接数据库并导入
require('./routes/admin')(app)  // 4 导入这个函数并把express的app传给这个函数，就可以在router中使用express了
require('./routes/web')(app)

app.listen(3000, () => {  //3
  console.log('http://localhost:3000');
});