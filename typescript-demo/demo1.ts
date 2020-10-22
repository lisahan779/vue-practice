import { Alert } from "element-ui";

let count: number;
count: 123;
let countInference = 123
function total(one: number, two: number) {
    return one + two;
}
const xiaojiejei: () => string = () => {
    return "ds"
}
const aa = total(8, 9)
console.log(aa)
function s({ one, two }: { one: number, two: number }): number {
    return one + two
}
const b = s({ one: 3, two: 6 })
console.log(b)
// 案例2
class madam {
    name: string;
    age: number;

}
interface select {
    name: string;
    age: number;
    // 非必选值的填写
    waistline?: number;
    // 自定义
    [propname: string]: any;
    // 接口里的方法
    say():string
}
// teacher 继承前面的select
interface teacher extends select {
    teacher: string
}
const sel = {
    name: "lld",
    age: 13,
    sex: "nv",
    say(){
        return "你好"
    },
    teacher:"wenshu"
}
const fuselect = (sel: teacher) => {
    console.log(111, sel.sex)
}
// 此时的sel是teacher
fuselect(sel);
// demo3
const kk: (string | number)[] = ["k", "jk", 123]
const nn: madam[] = [
    { name: "ll", age: 18 }

]
// demo4  类中的private public protected
class Person {
    private name: string;
    public sayHello() {
        console.log(this.name + 'say Hello')  //此处不报错
    }
}
//-------以下属于类的外部--------
const person = new Person()
// person.name = 'jspang.com'    //此处报错
person.sayHello()
// console.log(person.name)  //此处报错


// protected 允许在类内及继承的子类中使用
class Person1 {
    protected name: string;
    public sayHello() {
        console.log(this.name + 'say Hello')  //此处不报错
    }
}

class Teacher extends Person1 {
    public sayBye() {
        this.name;
    }
}
// demo5 构造函数;
// 新建立一个页面Demo12.ts,然后在页面里新建一个 Person 类，类的里边定义一个name，但是name我们并不给他值,然后我们希望在new出对象的时候，直接通过传递参数的形式，给name赋值，并打印出来。这时候我们就需要用到构造函数了，构造函数的关键字是constructor。
class Person3 {
    public name: string;
    constructor(name: string) {
        this.name = name
    }

}
const person3 = new Person3('jspang')
console.log(person3.name)

// demo6 类中的geteter 与setter
// 类中使用了private 外部就能范文类中的属性，通过getter 获取 关键字是get 如果想修改类中的属性值，使用set 
// 如果别人想知道，就必须通过getter属性知道, 注意我这里用的是属性，对他就是一个属性。getter属性的关键字是get, 后边跟着类似方法的东西, 但是你要注意，它并不是方法，归根到底还是属性。

class Xiaojiejie1 {
    constructor(private _age: number) { }
    get age() {
        return this._age
    }
}

const dajiao1 = new Xiaojiejie1(28)

console.log(11,dajiao1.age)

class Xiaojiejie2 {
    constructor(private _age: number) { }
    get age() {
        return this._age - 10
    }
}

class Xiaojiejie3 {
    constructor(private _age: number) { }
    get age() {
        return this._age - 10
    }
    set age(age: number) {
        this._age = age+3
    }
}

const dajiao3 = new Xiaojiejie3(28)
dajiao3.age = 25
console.log(333,dajiao3.age)

// demo 7 类中的static


