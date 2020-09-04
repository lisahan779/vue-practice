module.exports = app => {  // 6连接数据库
  const mongoose = require("mongoose")
  mongoose.connect('mongodb://127.0.0.1:27018/node-vue-moba', {
    useNewUrlParser: true
  })
// 插件吧model中的js引用了一遍
  require('require-all')(__dirname + '/../models')
}