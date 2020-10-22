console.log("lisa")
// 通过namespace 模块化 ，就会解决编译的类定义为全局的这种结果
namespace Home {

   export class page {
    constructor() {
      new  Components.header();
      new Components.content();
      new Components.footer();
    }
  }
}
