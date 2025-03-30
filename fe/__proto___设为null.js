function C(){

}
C.prototype=null
let c=new C();
console.log(c.__proto__===Object.prototype);
console.log(c.__proto__,Object.prototype);

let a=Object.create(null);
let obj = new Object();
obj.__proto__ = null;
let o = {
    a: 1,
    b: 2,
  };
  
o.__proto__ = null;
console.log(a.__proto__,obj.__proto__,o,{});
console.log(o.__proto__);

//在通过 new 关键字来创建一个对象的时候，会查看 Persion.prototype 是不是一个对象，如果不是的话，就设置为 Object.prototype
// Object.create(null)
// 等价于：
// var obj = new Object();
// obj.__proto__ = null;
