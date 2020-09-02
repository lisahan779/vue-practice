const mongoose = require('mongoose')
// 分类模型层
const schema = new mongoose.Schema({
  name: { type: String },
  // 父级模型层 关联模型 为了实现分类中的类型
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
})

// schema.virtual('children', {
//   localField: '_id',
//   foreignField: 'parent',
//   justOne: false,
//   ref: 'Category'
// })

// schema.virtual('newsList', {
//   localField: '_id',
//   foreignField: 'categories',
//   justOne: false,
//   ref: 'Article'
// })

module.exports = mongoose.model('Category', schema)