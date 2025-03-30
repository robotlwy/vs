function P() {}
let p=new P();
console.log(P.__proto__);
console.log(P.prototype.__proto__===Object.prototype);

console.log(Object.getOwnPropertyNames(P));
console.log(Object.getOwnPropertyNames(P.prototype));
console.log(Object.getOwnPropertyNames(Object.prototype));
console.log(Object.getOwnPropertyNames(Object));

console.log('------------------------------------------');


console.log(Object.getOwnPropertyNames(P));
console.log(Object.getOwnPropertyNames(P.prototype));
console.log(Object.getOwnPropertyNames(Function));
console.log(Object.getOwnPropertyNames(Function.prototype));

console.log('------------------------------------------');



  
  // 实例
  var actor = new Function( 'x','y' ,'return x+y');
  console.log(actor.prototype);
  console.log(Function.prototype===actor.prototype);
  
//   console.log(_new(Function, 'x','y' ,'return x+y'));
//   console.log(_new(P));

console.log(typeof Function);
console.log(Object.getOwnPropertyNames(actor.__proto__));
console.log(typeof Function.prototype);
console.log(actor.prototype===Object.prototype);
console.log(actor.prototype===Function.prototype);
console.log(P.prototype===Function.prototype);
console.log(P.prototype===actor.prototype);
function A() {}
console.log(A.prototype===P.prototype);
console.log(Object.getOwnPropertyNames(A.prototype));
console.log(Object.getOwnPropertyNames(P.prototype));
console.log(Object.getOwnPropertyNames(actor.prototype));
console.log(Object.getOwnPropertyNames(Object.prototype));
console.log(Object.getOwnPropertyNames(Function.prototype));


console.log(Object.getPrototypeOf(P));


console.log(Object.getOwnPropertyNames(Function));
console.log(Object.getOwnPropertyNames(Function.prototype));
console.log(Function.prototype.__proto__===Object.prototype);
console.log((Function.__proto__)===Function.prototype);
console.log(Object.getOwnPropertyDescriptor(Function.prototype.__proto__,'__proto__'));

var currentProto = Object.getPrototypeOf(Function);
while (currentProto) {
    if (Object.getOwnPropertyNames(currentProto).includes('__proto__')) {
        console.log('属性__proto__在原型', currentProto, '上');
        break;
    }
    currentProto = Object.getPrototypeOf(currentProto);
}
console.log(Object.prototype.toString.toString());