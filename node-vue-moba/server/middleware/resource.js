//inflection插件 中间件获取模型层
module.exports = options => {
    return async(req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource)
        req.Model = require(`../models/${modelName}`)
        next()
    }
}