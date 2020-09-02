const mongoose = require('mongoose')
// 广告位轮播图
const schema = new mongoose.Schema({
  name: { type: String },
  items: [{
    image: { type: String },
    url: { type: String },  // 跳转连接
  }]
})

module.exports = mongoose.model('Ad', schema)