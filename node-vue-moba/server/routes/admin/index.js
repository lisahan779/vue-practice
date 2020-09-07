const { Model } = require('mongoose')

// 模型层文件在此导入
module.exports = app => {
  const express = require('express')
  const assert = require('http-assert')  //替换if else的逻辑判断
  const jwt = require('jsonwebtoken') //注册生成token
  const AdminUser = require('../../models/AdminUser')
  const router = express.Router({
    mergeParams: true  //合并url参数
  })

  // -----开发环境接口设计----

  // 8 本地将模型层引入
  // const Category = require("../../models/Category")
  //  规范模型层的数据 由于每个接口都会使用，做成中间件，在app.use中使用
  // const modelName = require("inflection").classify(req.params.resource)
  // const Model = require(`../../models/${modelName}`)

  // 增添数据
  router.post("/", async (req, res) => {
    const model = await req.Model.create(req.body)
    const name = req.body.name
    const repeat = await req.Model.findOne({ name })
    assert(repeat, 200, name + '已存在')
    res.send(model)
  })
  //  获取数据前的token验证及获取数据 
  // 请求拦截与响应拦截解决的问题是，在没有token的情况下，不允许访问服务端的返回的接口信息，步骤前台在请求是设置拦截携带token，后端在获取数据的接口中获取token，校验token是否被篡改然后才将接口信息展示
  router.get("/", async (req, res) => {
    // 获取模型层并转换大小写  安装inflection插件,截取模型层地址获取模型数据
    // const modelName = require("inflection").classify(req.params.resource)
    // const Model = require(`../../models/${modelName}`)

    // // 未使用关联的parent是一个字符串 parent:"5dvf2cjkvsddb"
    // // const item = await Category.find().limit(10)
    // // 查询关联的上级分类parent是模型中的对应值，使用了关联的parent变成对象形式
    // 由于有的接口不需要关联数据，所以使用setOptions({populate("parent")})
    // const item = await req.Model.find().populate("parent").limit(10)
    let page = parseInt(req.query.page);
    let row = parseInt(req.query.row);
    let skip = (page - 1) * row;
    let queryOptions = {}
    if (req.Model.modelName === "Category") {
      queryOptions.populate = 'parent'
    }
    var allsend = {
      all: await req.Model.find({}).setOptions(queryOptions).skip(skip).limit(row), //获取每页展示数据条数
      count: await req.Model.countDocuments()  //获取数据库总条数 和上面是平行关系
    }

    res.send(allsend)
  })


  // 13 获取分类详情数据接口
  router.get('/:id', async (req, res) => {
    const data = await req.Model.findById(req.params.id)
    res.send(data)
  })
  // 修改数据
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  router.delete('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send(model)
  })
  // 11 express 使用这个路由 
  // app.use('/admin/api', router)  

  // 设定路由 用户存在否 设置模型 最后挂载路由  加了两中间件，可以提出来在middlewear文件中
  // 中间件处理是否在没有token的情况下访问服务端接口
  // async (req, res, next) => {
  //   const token = String(req.headers.authorization || '').split(' ').pop()  //获取前端请求头内容authorization的token内容分割bear和空格后的内容 分割后为一个数组，使用pop提取数组最后一个元素
  //   assert(token, 401, '请先登录')
  //   const { id } = jwt.verify(token, app.get('secret'))  //解密token,校验token正确与否 token秘钥 req.app.get('secret')在更目录下的index.js中
  //   assert(id, 401, '请先登录')
  //   req.user = await AdminUser.findById(id)
  //   console.log(111,req.user)
  //   assert(req.user, 401, '请先登录')
  //   await next()
  // }
  // 获取模型层的中间件
  // async (req, res, next) => {
  //   const modelName = require("inflection").classify(req.params.resource)
  //   // 给请求对象上挂载model
  //   req.Model = await require(`../../models/${modelName}`)
  //   next()
  // }
  // 封装增删改查数据接口，统一命名规范使用/rest/:resource代替categories 在前台添加使用的路由rest/路由名称
  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    const token = String(req.headers.authorization || '').split(' ').pop()
    assert(token, 401, '1请先登录')
    // 通过token解密的id与数据库中用户做比较，不存在不允许访问
    const { id } = jwt.verify(token, req.app.get('secret'))
    console.log(333, id)
    assert(id, 401, '2请先登录')
    req.user = await AdminUser.findById({ _id: id })
    console.log(111, req.user)
    assert(req.user, 401, '3请先登录')
    await next()
    // 查询数据并以分页的形式返回
  }, async (req, res, next) => {
    const modelName = require("inflection").classify(req.params.resource)
    // 给请求对象上挂载model
    req.Model = await require(`../../models/${modelName}`)
    next()
  }, router)


  // 上传图片逻辑，由于和增删改查不是共用接口单独写，同时添加验证token的方法
  const multer = require("multer")
  // 通过中间件将上传的图片存储在uploads文件夹中 
  const upload = multer({ dest: __dirname + '/../../uploads' })
  // 上传图片的中间件 multer upload.single('file')允许上传单个文件将其保存在服务端的upoads中
  app.post('/admin/api/upload', async (req, res, next) => {
    const token = String(req.headers.authorization || '').split(' ').pop()  //获取前端请求头内容authorization的token内容分割bear和空格
    assert(token, 401, '请先登录')
    const { id } = jwt.verify(token, app.get('secret'))  //解密token,校验token正确与否 token秘钥 解密出来是创建用户生成的那个id 所以使用解构赋值拿到这个id req.app.get('secret')在更目录下的index.js中
    assert(id, 401, '请先登录')
    req.user = await AdminUser.findById(id)
    assert(req.user, 401, '请先登录')
    await next()
  }, upload.single('file'), async (req, res) => {
    const file = req.file
    // 客户端访问服务端的静态资源
    file.url = `http://localhost:3000/uploads/${file.filename}`
    // file.url = `http://test.topfullstack.com/uploads/${file.filename}`
    res.send(file)
  })
  // token函数
  function createJWT(id, sub, exp, strTimer) {
    const token = jwt.sign({
      id: id, // 用户id
      sub: sub // 主题
    }, app.get('secret'), {
      expiresIn: `${exp}${strTimer}` // 过期时间
    })
    return token;
  }
  // 登陆接口
  app.post('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    // 1.根据用户名找用户  .select('+password') 在查找用户的同时把密码取出来，不然由于编辑时设置了密码不显示，无法执行接下来的校验工作
    const user = await AdminUser.findOne({ username }).select('+password')
    assert(user, 422, '用户不存在')  //封装的错误提示
    // 2.校验密码 中间件 返回的是布尔值
    const isValid = require('bcrypt').compareSync(password, user.password)
    assert(isValid, 422, '密码错误')
    // 3.返回token   app.get('secret') 这个来自于index，js 生成token秘钥，验证token是否是有篡改
    const token = createJWT(user._id, 'login', 24, 'h');
    // const token = jwt.sign({ id: user._id }, app.get('secret'),{
    //   expiresIn: '0.001h' // 过期时间
    // })
    res.send({ token, user })
  })

  // 错误处理函数
  app.use(async (err, req, res, next) => {
    // console.log(err) 
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })


  // -----线上接口----

  // // 创建资源
  // router.post('/', async (req, res) => {   
  //   const model = await req.Model.create(req.body)
  //   res.send(model)
  // })
  // 更新资源
  //   router.put('/:id', async (req, res) => {
  //     const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
  //     res.send(model)
  //   })
  //   // 删除资源
  //   router.delete('/:id', async (req, res) => {
  //     await req.Model.findByIdAndDelete(req.params.id)
  //     res.send({
  //       success: true
  //     })
  //   })
  //   // 资源列表
  //   router.get('/', async (req, res) => {
  //     const queryOptions = {}
  //     if (req.Model.modelName === 'Category') {
  //       queryOptions.populate = 'parent'
  //     }
  //     const items = await req.Model.find().setOptions(queryOptions).limit(100)
  //     res.send(items)
  //   })
  //   // 资源详情
  //   router.get('/:id', async (req, res) => {
  //     const model = await req.Model.findById(req.params.id)
  //     res.send(model)
  //   })
  //   // 登录校验中间件 在整体的后端接口下校验token及获取model的实现
  //   const authMiddleware = require('../../middleware/auth')
  //   const resourceMiddleware = require('../../middleware/resource')  
  //   app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)  //5 类似于脚手架的app.js中的引入route层

  //   const multer = require('multer')
  //   const MAO = require('multer-aliyun-oss');
  //   const upload = multer({
  //     // dest: __dirname + '/../../uploads',
  //     storage: MAO({
  //       config: {
  //         region: 'oss-cn-zhangjiakou',
  //         accessKeyId: '替换为你的真实id',
  //         accessKeySecret: '替换为你的真实secret',
  //         bucket: 'node-vue-moba'
  //       }
  //     })
  //   })
  //   app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
  //     const file = req.file
  //     // file.url = `http://test.topfullstack.com/uploads/${file.filename}`
  //     res.send(file)
  //   })

  // // 登陆接口
  //   app.post('/admin/api/login', async (req, res) => {
  //     const { username, password } = req.body
  //     // 1.根据用户名找用户

  //     const user = await AdminUser.findOne({ username }).select('+password')
  //     assert(user, 422, '用户不存在')
  //     // 2.校验密码
  //     const isValid = require('bcrypt').compareSync(password, user.password)
  //     assert(isValid, 422, '密码错误')
  //     // 3.返回token
  //     const token = jwt.sign({ id: user._id }, app.get('secret'))
  //     res.send({ token })
  //   })

  //   // 错误处理函数
  //   app.use(async (err, req, res, next) => {
  //     // console.log(err)
  //     res.status(err.statusCode || 500).send({
  //       message: err.message
  //     })
  //   })
}