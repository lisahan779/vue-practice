module.exports = app => {  // 6连接数据库
  const mongoose = require("mongoose")
  mongoose.connect('mongodb://127.0.0.1:27018/node-vue-moba', {
    useNewUrlParser: true
  })

  require('require-all')(__dirname + '/../models')
}