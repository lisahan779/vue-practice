const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }], //分类
  title: { type: String }, //标题
  body: { type: String },  //内容
}, { 
  timestamps: true
})

module.exports = mongoose.model('Article', schema)