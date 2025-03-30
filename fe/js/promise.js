// 模拟一个获取JSON的函数（使用 fetch API）
function getJSON(url) {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    });
}

// 生成一个Promise对象的数组
const promises = [2, 3, 5, 7, 11, 13].map(id => {
  return getJSON(`https://mock.apipost.net/mock/2a7e112b9c64000/user?apipost_id=73eb5f23ff002`);
});

// 使用 Promise.all 处理所有请求
Promise.all(promises)
  .then(posts => {
    // 所有请求成功后的处理
    console.log("所有请求成功完成");
    posts.forEach(post => {
      console.log(`Post ID :`, post);
    });
  })
  .catch(error => {
    // 处理任何一个请求失败的情况
    console.error("请求过程中出现错误:", error);
  });
      