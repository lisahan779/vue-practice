module.exports = {
  // outputDir  将打包的dist文件夹放在指定的服务端某一路径并重命名
  // 执行打包程序时，publicPath:生成的静态文件路径  在打包后文件下的index.html中可以看到所家的前缀信息
  outputDir: __dirname + '/../server/admin',
  publicPath: process.env.NODE_ENV === 'production'
    ? '/admin/'  // 生产环境下加对应admin前缀访问
    : '/'   
}