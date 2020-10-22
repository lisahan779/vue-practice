function jslisa() {
  let web: string = "hello word";
  console.log(web);
}
const xiaoJiejie: {
  age: number;
  name: string;
} = {
  name: "lisa",
  age: 18,
};
const xiaoiejie: string[] = ["lisa", "hj", "998"];
class person {}
// 定义对象并新建对象
const dajiao: person = new person();
// 定义函数有返回值，且返回值是字符串类型
const hh: (a) => string = (a) => {
  console.log(a);
  return a;
};
hh("cd");
jslisa();
