## typescript

### 安装环境

> typescript
>
> ts-node (ts-->js)

### typescript 的静态类型



 tsc -init  生成tsc配置文件
**定义后类型不可改变**

  ts类型注解：如果不能自动分析需要做注解

**函数参数及类型**

viod 函数没有返回值 如果写了return 就会报错
never 永远执行不了（死循环，抛出错误）
参数是对象的，不能直接在值后面：类型、

>function getnumber({one,two }:{one:number,two:number}){
>return one+two
>}

**数组类型定义**
类别别名：

```javascript
type lady={name:string,age:number}
class madam{
  name:string;
  age:number
}
const person:lady[]=[
  {name:"lisa",age:18}
  {name:"cedy",age:18}
]
```
**元组**
解决数组的缺陷
## 接口
函数无返回值时定义方法
有时候函数是没有返回值的，比如现在定义一个sayHello的函数，这个函数只是简单的terminal打印，并没有返回值。

function sayHello() {
  console.log("hello world");
}
这就是没有返回值的函数，我们就可以给他一个类型注解void，代表没有任何返回值。

function sayHello(): void {
  console.log("hello world");
}
如果这样定义后，你再加入任何返回值，程序都会报错
## interface和type 的区别
## 接口和类型别名的区别

类型别名可以直接给类型，比如string，而接口必须代表对象。

比如我们的类型别名可以写出下面的代码：

type Girl1 = stirng;
但是接口就不能这样写，它必须代表的是一个对象，也就是说，你初始化girl的时候，必须写出下面的形式.

const girl = {
  name: "大脚",
  age: 18,
  bust: 94,
};
