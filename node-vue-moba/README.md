# 【全栈之巅】Node.js + Vue.js 全栈开发王者荣耀手机端官网和管理后台
> 本项目是 [Bilibili 全栈之巅](https://space.bilibili.com/341919508) 视频教程相关源码
> https://github.com/wxs77577/node-vue-moba
> 持续更新中... 敬请关注

## 一、 入门
1. 项目介绍
1. 工具安装和环境搭建(nodejs,npm,mongodb nodemon) 
1. 初始化项目

### node-vue-moba文件夹是数据库数据
 
## 二、 管理后台(admin)
1. 基于Element UI的后台管理基础界面搭建

1. 创建分类 CategoryEdit
1. 分类列表 CategoryList
1. 修改分类
1. 删除分类
1. 子分类

1. **通用 CRUD 接口** (封装的增删改查接口保证通用性和扩展)

请求数据加入了分页逻辑，所以在各级页面请求数据是需要将get请求中的res.data=>res.data.all

1. 装备管理
1. 图片上传 (multer 插件)

1. 英雄管理
1. 编辑英雄 (关联,多选,el-select, multiple)
1. 技能编辑 

1. 文章管理
1. 富文本编辑器 (quill 插件)

1. 首页广告管理

1. 管理员账号管理 (bcrypt)
1. 登录页面
1. 登录接口 (jwt,jsonwebtoken)
1. 服务端登录校验
1. 客户端路由限制 (beforeEach, meta)
1. 上传文件的登录校验 (el-upload, headers)

## 三、移动端网站(web)

1. "工具样式"概念和 SASS (SCSS)
1. 样式重置
1. 网站色彩和字体定义 (colors, text)
1. 通用flex布局样式定义 (flex)
1. 常用边距定义 (margin, padding)
1. 主页框架和顶部菜单
1. 首页顶部轮播图片 (vue swiper)
1. 使用精灵图片 (sprite)
1. 使用字体图标 (iconfont)
1. 卡片组件 (card)
1. 列表卡片组件 (list-card, nav, swiper)
1. 首页新闻资讯-数据录入(+后台bug修复)
1. 首页新闻资讯-数据接口
1. 首页新闻资讯-界面展示
1. 首页英雄列表-提取官网数据
1. 首页英雄列表-录入数据
1. 首页英雄列表-界面展示
1. 新闻详情页
1. 新闻详情页-完善
1. 英雄详情页-1-前端准备
1. 英雄详情页-2-后台编辑
1. 英雄详情页-3-前端顶部
1. 英雄详情页-4-完善

## 四、发布和部署 (阿里云)

1. 生产环境编译
1. 购买域名和服务器
1. 域名解析
1. Nginx 安装和配置
1. MongoDB数据库的安装和配置
1. git 安装、配置ssh-key
1. Node.js 安装、配置淘宝镜像
1. 拉取代码，安装pm2并启动项目
1. 配置 Nginx 的反向代理
1. 迁移本地数据到服务器 (mongodump)

## 五、进阶
1. 使用免费SSL证书启用HTTPS安全连接
1. 使用阿里云OSS云存储存放上传文件

 移动端 web
 

后台管理系统admin
1. 安装element，
2. 配置http.js axios的封装在main.js中导入并设置原型方式
3. 写服务端代码
后台服务端serve 
 npm init  -y 初始化
 index.js  入口文件 在 packjson的script中配置终端启动方式
 安装 express mongoose（数据库） cors(跨域请求)



知识点学习当两个组件公用一个页面是，例如新增编辑
```javascript
        { path: '/heroes/create', component: HeroEdit },
        { path: '/heroes/edit/:id', component: HeroEdit, props: true }, //props: true 当两个路由同时访问一个页面时，允许传值
  // 组件中使用
  props: {
    //接收传的值
    id: {},
  },
// 渲染使用
   <h1>{{id ? '编辑' : '新建'}}分类</h1>

//    后台数据进行增删改查
module.exports = app => {
  const express = require('express')
  // const assert = require('http-assert')
  // const jwt = require('jsonwebtoken')
  // const AdminUser = require('../../models/AdminUser')
  const router = express.Router({
    mergeParams: true
  })

  // -----开发环境接口设计----

  // 8 本地将模型层引入
  const Category = require("../../models/Category")
  // 增添数据
  router.post("/categories", async (req, res) => {
    const model = await Category.create(req.body)
    res.send(model)
  })

  // 10 分类列表页从数据库获取数据
  router.get("/categories", async (req, res) => {
    const item = await Category.find().limit(10)
    res.send(item)
  })
  // 13 获取分类详情数据接口
  router.get('/categories/:id', async (req, res) => {
    const data = await Category.findById(req.params.id)
    res.send(data)
  })
  // 修改数据
  router.put('/categories/:id', async (req, res) => {
    const model = await Category.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  // 删除数据 
  router.delete('/categories/:id', async (req, res) => {
    const model = await Category.findByIdAndDelete(req.params.id, req.body)
    res.send(model)
  })
  // 11 express 使用这个路由
  app.use('/admin/api', router)
}
```        
```
async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      // 如果this.abnfmomdel中添加了其他服务端没有的数据 这种会完全替换this.model ，效果不好
      // this.model =res.data 
      //下面这种方法解决弊端 将this.model添加到空对象中然后把服务端数据添加到里面去（对象属性的合并）
      this.model = Object.assign({}, this.model, res.data);
    },
```