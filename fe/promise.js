// 定义一个MyPromise类
class MyPromise {
  constructor(executor, name) {
    // 初始状态为pending
    this.state = "pending";
    // 成功的值
    this.value = undefined;
    // 失败的原因
    this.reason = undefined;
    // 成功回调函数数组
    this.onFulfilledCallbacks = [];
    // 失败回调函数数组
    this.onRejectedCallbacks = [];
    this.name = name;
    // resolve函数，用于将Promise状态从pending变为fulfilled，并记录成功的值
    const resolve = (value) => {
      // 只有在pending状态下才进行状态转变并将成功值赋值
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        // 执行所有成功回调函数
        this.onFulfilledCallbacks.forEach((fn) => fn());
      }
    };

    // reject函数，用于将Promise状态从pending变为rejected，并记录失败的原因
    const reject = (reason) => {
      // 只有在pending状态下才进行状态转变并将原因赋值给失败的值
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
        // 执行所有失败回调函数
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    // 执行executor函数，并将resolve和reject函数作为参数传入
    try {
      executor(resolve, reject);
    } catch (err) {
      // 如果executor函数执行出错，直接调用reject函数
      reject(err);
    }
  }
}
function resolvePromise(promise2, x, resolve, reject) {
  // 如果promise2和x相等，抛出TypeError防止死循环
  if (promise2 === x) {
    return reject(new TypeError("Chaining cycle detected for promise"));
  }

  let called;
  // 如果x是对象或函数
  if (x != null && (typeof x === "object" || typeof x === "function")) {
    try {
      // 取出x的then方法
      let then = x.then;
      // 如果then是函数，调用then，传入resolvePromise和reject函数
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        // 如果then不是函数，以x为值fulfill promise2
        resolve(x);
      }
    } catch (e) {
      // 如果取then方法出错，直接reject
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    // 如果x不是对象或函数，以x为值fulfill promise2
    resolve(x);
  }
}
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  // 设置默认回调函数，确保函数类型，如果没有提供则使用默认处理函数
  onFulfilled =
    typeof onFulfilled === "function" ? onFulfilled : (value) => value;
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : (reason) => {
          throw reason;
        };

  // 创建新的Promise，用于链式调用
  let promise2 = new MyPromise((resolve, reject) => {
    
    // 如果状态为fulfilled，执行成功回调。如果状态为rejected，执行失败回调
    if (this.state === "fulfilled" || this.state === "rejected") {
      console.log(this);
      setTimeout(() => {
        try {
          console.log("0----------0");

          // 获取成功回调的返回值
          let result =
            this.state === "fulfilled"
              ? onFulfilled(this.value)
              : onRejected(this.reason);
          // 处理返回值以确定promise2的状态
          resolvePromise(promise2, result, resolve, reject);
        } catch (e) {
          // 如果执行成功回调过程中出错，直接reject
          reject(e);
        }
      }, 0);
    }

    // 如果状态为pending，将回调函数存储起来
    if (this.state === "pending") {
      console.log(this);
      this.onFulfilledCallbacks.push(() => {
        setTimeout(() => {
          try {
            // 获取成功回调的返回值
            let x = onFulfilled(this.value);
            // 处理返回值以确定promise2的状态
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            // 如果执行成功回调过程中出错，直接reject
            reject(e);
          }
        }, 0);
      });

      this.onRejectedCallbacks.push(() => {
        setTimeout(() => {
          try {
            // 获取失败回调的返回值
            let x = onRejected(this.reason);
            // 处理返回值以确定promise2的状态
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            // 如果执行失败回调过程中出错，直接reject
            reject(e);
          }
        }, 0);
      });
      console.log(this,'---------------------');
      
    }
  },this.name);

  // 返回新的Promise实例，实现链式调用
  return promise2;
};

MyPromise.prototype.catch = function (onRejected) {
  // catch方法其实就是调用then方法，但只传入失败回调
  return this.then(null, onRejected);
};

function sendMessage(name) {
  return new MyPromise((resolve, reject) => {
    // 模拟 发送表白短信
    console.log(
      `邓哥 -> ${name}：最近有谣言说我喜欢你，我要澄清一下，那不是谣言😘`
    );
    console.log(`等待${name}回复......`);
    // 模拟 女神回复需要一段时间
    setTimeout(() => {
      console.log("00000000000000000000000000000000000000000");

      // 模拟 有10%的几率成功
      if (Math.random() <= 0.1) {
        // 成功，调用 onFuffiled，并传递女神的回复
        resolve(`${name} -> 邓哥：我是九，你是三，除了你还是你😘`);
      } else {
        // 失败，调用 onRejected，并传递女神的回复
        reject(`${name} -> 邓哥：你是个好人😜`);
      }
    }, 1000);
  }, name);
}

sendMessage("李建国")
  .catch((reply) => {
    // 失败，继续
    console.log(reply);
    return sendMessage("王富贵");
  })
  .catch((reply) => {
    // 失败，继续
    console.log(reply);
    return sendMessage("周聚财");
  })
  .catch((reply) => {
    // 失败，继续
    console.log(reply);
    return sendMessage("刘人勇");
  })
  .then(
    (reply) => {
      // 成功，结束
      console.log(reply);
      console.log("邓哥终于找到了自己的伴侣");
    },
    (reply) => {
      // 最后一个也失败了
      console.log(reply);
      console.log("邓哥命犯天煞孤星，无伴终老，孤独一生");
    }
  );
