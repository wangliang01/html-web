const Rqndom = window.Mock.Random;
let app = document.querySelector("#app");
const loading = document.querySelector(".loading");
let userList = [];
let page = 0
let limit = 100
const total = 50000
const totalPage = Math.ceil(total / limit)

let observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    page += 1
    loadMore(page)
  }
})
function fetchData() {
  return new Promise((resolve, reject) => {
    let result = [];
    setTimeout(() => {
      // 模拟加载5万条数据
      for (let i = 0; i < total; i++) {
        result.push({
          id: i,
          name: Rqndom.cname(),
          age: Rqndom.integer(15, 45),
          address: Rqndom.province() + Rqndom.city(),
          createTime: Rqndom.datetime("yyyy-MM-dd HH:mm:ss"),
          updateTime: Rqndom.datetime("yyyy-MM-dd HH:mm:ss"),
          avatar: "https://picsum.photos/100/100?random=" + i,
          status: Rqndom.integer(0, 2),
          sex: Rqndom.integer(0, 1),
          isDelete: Rqndom.integer(0, 1),
          money: Rqndom.integer(1000, 10000),
          email: Rqndom.email(),
          qq: Rqndom.integer(100000000, 999999999),
          desc: Rqndom.csentence(10, 20),
          content: Rqndom.csentence(10, 20),
          title: Rqndom.csentence(10, 20),
        });
      }
      resolve(result);
    }, 0);
  });
}



function render() {

  // 遍历用户列表

  let renderer = function (page) {
    if (page === totalPage) return 
    let html = "";
    for (let i = page * limit; i < page * limit + limit; i++) {
      const item = userList[i];
      html += `
        <div class="flex">
          <span>姓名:${item.name}</span> 
          <span>年龄:${item.age}</span> 
          <span>性别:${item.sex ? "男" : "女"}</span> 
        </div>
      `;
    }

    let div = document.createElement("div");

    div.innerHTML = html;

    app.appendChild(div);

    // 使用setTimeout模拟渲染
    // setTimeout(() => {
    //   renderer(page + 1)
    // })

    // 使用requestAnimationFrame模拟渲染
    // requestAnimationFrame(() => {
    //   renderer(page + 1)
    // })
  };

  renderer(0)
  // let html = ''
  // for (let i = 0; i < userList.length; i++)  {
  //   const {name, age, sex} = userList[i]
  //   html += `
  //     <div class="flex">
  //       <span>姓名:${name}</span>
  //       <span>年龄:${age}</span>
  //       <span>性别:${sex ? '男' : '女'}</span>
  //     </div>
  //   `
  // }
  // let div = document.createElement('div')

  // div.innerHTML = html

  // fragment.appendChild(div)

  // app.appendChild(fragment)
}

function loadMore (page) {
  if (page === totalPage) return 
  let html = "";
  for (let i = page * limit; i < page * limit + limit; i++) {
    const item = userList[i];
    html += `
      <div class="flex">
        <span>姓名:${item.name}</span> 
        <span>年龄:${item.age}</span> 
        <span>性别:${item.sex ? "男" : "女"}</span> 
      </div>
    `;
  }

  let div = document.createElement("div");

  div.innerHTML = html;

  app.appendChild(div);


}

async function init() {
  console.time("请求数据耗时");
  const res = await fetchData();
  console.log("🚀 ~ init ~ res:", res);
  userList = res;
  console.timeEnd("请求数据耗时");
  console.time("页面加载耗时");
  render();
  window.addEventListener("DOMContentLoaded", () => {
    console.timeEnd("页面加载耗时");
  });


  observer.observe(loading)


}

init();
