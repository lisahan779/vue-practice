const mongoose = require('mongoose')
// 分类模型层
const schema = new mongoose.Schema({
  name: { type: String },
  // 父级模型层 关联模型 为了实现分类中的类型
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
})
// // 子分类children 关联内容来自category
// schema.virtual('children', {
//   localField: '_id',
//   foreignField: 'parent',
//   justOne: false,
//   ref: 'Category'
// })
// //模型 newlist关联的是Article
// schema.virtual('newsList', {
//   localField: '_id',
//   foreignField: 'categories', //外键
//   justOne: false,
//   ref: 'Article'
// })

module.exports = mongoose.model('Category', schema)