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

## 通用 CRUD 接口** (封装的增删改查接口保证通用性和扩展)

```javascript
 // 注意定义的模型层名称与前端访问的rest/名称 保持一致
 // 创建资源
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  // 更新资源
    router.put('/:id', async (req, res) => {
      const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
      res.send(model)
    })
    // 删除资源
    router.delete('/:id', async (req, res) => {
      await req.Model.findByIdAndDelete(req.params.id)
      res.send({
        success: true
      })
    })
    // 资源列表
    router.get('/', async (req, res) => {
      const queryOptions = {}
      if (req.Model.modelName === 'Category') {
        queryOptions.populate = 'parent'
      }
      const items = await req.Model.find().setOptions(queryOptions).limit(100)
      res.send(items)
    })
    // 资源详情
    router.get('/:id', async (req, res) => {
      const model = await req.Model.findById(req.params.id)
      res.send(model)
    })
    // inflection 通过前端请求的接口截取模型层名称
   app.use('/admin/api/rest/:resource', async (req, res, next) => {
    const modelName = require("inflection").classify(req.params.resource)
    // 给请求对象上挂载model
    req.Model = await require(`../../models/${modelName}`)
    next()
  }, router)
  ```
  ###  中间件处理middleware 就是服务端处理没有token，不返回接口数据

**请求数据加入了分页逻辑，所以在各级页面请求数据是需要将get请求中的res.data=>res.data.all**

1. 装备管理
1. 图片上传 (multer 插件)

1. 英雄管理
1. 编辑英雄 (关联,多选,el-select, multiple)
1. 技能编辑

1. 文章管理
1. 富文本编辑器 (vue2-editor 插件)

1. 首页广告管理

1. 管理员账号管理 (bcrypt)
1. 登录页面
1. 登录接口 (jwt,jsonwebtoken)
1. 服务端登录校验
1. 客户端路由限制 (beforeEach, meta)
1. 上传文件的登录校验 (el-upload, headers)

## 三、移动端网站(web)

1. "工具样式"概念和 SASS (SCSS) 全局使用
1. 样式重置
1. 网站色彩和字体定义 (colors, text)
1. 通用flex布局样式定义 (flex)
1. 常用边距定义 (margin, padding)
1. 主页框架和顶部菜单 main.vue
1. 首页顶部轮播图片 (vue swiper)
1. 使用精灵图片 (sprite)  有一个网站交www.spritecow.com 将精灵图传上去可以自动定位精灵图的位置  选中2及% 选中对应图
1. 使用字体图标 (iconfont)阿里矢量图库
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

1. 生产环境编译（编译web和admin在serve的某一静态文件中 使其在serve中可以被访问到）
       1. 在前台使用npm run bulid 打包成静态文件后放在服务端的某一文件夹下就可以访问了
       2. 在前台项目src文件夹下创建 .env.development文件 ： VUE_APP_API_URL=http://localhost:3000/admin/api  为了方便在本地开发时修改线上接口为本地的  (只用于开发环境)
       3. 在服务端使用静态托管，访问接口不出来是打包的css路径问题=>解决办法：对应打包的前端项目创建一个vue.config.js文件
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

## 业务总结
1. 后台管理系统一般没有注册接口，由管理员添加用户账号

2. 用户在登陆后会生成一个秘钥token

3. http.js中设置拦截是为了方便在每一个请求接口的时候携带token才能访问接口信息，当没有token时，服务端返回错误，对应页面跳转到登录页

4. token要设置过期时间，并在登录的时候将token存储在localstorage中，方便页面跳转中携带访问接口

5. 客户端的router.js中设置路由守卫是防止没有访问服务端数据的界面在没有登录的情况下能展示

6. 在修改用户密码：在数据库创建用户模型时使用bcrypt做密码密文处理及设置select:false 在修改密码的时候密码不显示



账户 lisa 密码 hanmin1234