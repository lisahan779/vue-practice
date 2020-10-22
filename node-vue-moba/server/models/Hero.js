const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String }, //名称
  avatar: { type: String }, //头像
  banner: { type: String }, 
  title: { type: String }, //称号 
  // 连接到Category表格  一个英雄可能有两个身份 战士刺客，所以关联使用复数，并以数组形式展示
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  scores: {  //复合类型 简介
    difficult: { type: Number }, //难度
    skills: { type: Number }, //技能
    attack: { type: Number }, //攻击
    survive: { type: Number },  //生存
  },
  skills: [{   //技能  只要定义为复数就是数组
    icon: { type: String },// 图标
    name: { type: String },  //名称
    delay: { type: String },  //
    cost: { type: String },  
    description: { type: String },  //技能介绍
    tips: { type: String },  //小提示
  }],
  // 装备  关联物品
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }], //顺风出装
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }],  //逆风出装
  usageTips: { type: String },  //使用技巧
  battleTips: { type: String },  //对抗技巧
  teamTips: { type: String },   //团战技巧
  partners: [{   //搭档有多个  数组
    hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },  //关联英雄
    description: { type: String },  //描述
  }],
})

module.exports = mongoose.model('Hero', schema, 'heroes')