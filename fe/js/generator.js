// function* fibonacci() {
//   let [prev, curr] = [0, 1];
//   for (;;) {
//     yield curr;
//     [prev, curr] = [curr, prev + curr];
//   }
// }
// let index=0;
// for (let n of fibonacci()) {
//   if (index++>100) break;
//   console.log(n);
// }
// function* f() {
//   for(var i = 0; true; i++) {
//     var reset = yield i;
//     if(reset) { i = -1; }
//   }
// }

// var g = f();
// console.log(g.next()) // { value: 0, done: false }
// console.log(g.next()) // { value: 1, done: false }
// console.log(g.next(true)) // { value: 0, done: false };
// function* foo(x) {
//   var y = 2 * (yield (x + 1));
//   var z = yield (y / 3);
//   return (x + y + z);
// }

// var a = foo(5);
// console.log(a.next()) // Object{value:6, done:false}
// console.log(a.next());
//  // Object{value:NaN, done:false}
// console.log(a.next());
//  // Object{value:NaN, done:true}

// var b = foo(5);
// console.log(b.next())// { value:6, done:false }
// b.next(12) // { value:8, done:false }
// b.next(13) // { value:42, done:true }

var g = function* () {
  try{
    try {
      yield;
    } catch (e) {
      console.log('内部捕获', e);
    }
  } catch (e) {
    yield;
    console.log('外部捕获3', e);
  }
};

var i = g();
i.next();

try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}