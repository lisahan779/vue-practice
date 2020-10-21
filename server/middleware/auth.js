// 通过token连确定是否可以直接在未登录情况下访问服务端接口的信息
module.exports = options => {
  const assert = require('http-assert')  //
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../models/AdminUser')
// 登陆的时候
  return async (req, res, next) => {
    const token = String(req.headers.authorization || '').split(' ').pop()  //获取前端请求头内容authorization的token内容分割bear和空格
    assert(token, 401, '请先登录') //不存在 报401 提示
    const { id } = jwt.verify(token, req.app.get('secret'))  //解密token,校验token正确与否 token秘钥 req.app.get('secret')在更目录下的index.js中
    assert(id, 401, '请先登录')
    req.user = await AdminUser.findById(id)
    assert(req.user, 401, '请先登录')
    await next()
  }
}