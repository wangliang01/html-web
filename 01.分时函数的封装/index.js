let TOTAL = 1000000;
let btn = document.querySelector(".btn");
let container = document.querySelector(".container");
function init() {
  // 创建一个按钮
  btn.textContent = `插入${TOTAL}条数据`;

  // 生成数据函数
  let datas = new Array(TOTAL);
  for (let i = 0; i < TOTAL; i++) {
    datas[i] = i + 1;
  }

  // 消费函数
  function consumer(item) {
    let div = document.createElement("div");
    div.textContent = item;
    container.appendChild(div);
  }

  // 任务分割函数，task也是一个函数
  function chunkSpliter(task) {
    setTimeout(() => {
      task((time) => time < 16.6);
    }, 30);
  }

  // 绑定点击事件
  btn.addEventListener("click", () => performceChunk(datas, consumer));
}

init();

// 写一个分时函数，避免长时间的重复渲染，导致页面卡顿
function performceChunk(datas, consumer, chunkSpliter) {
  if (typeof datas === "number") {
    datas = new Array(datas);
  }
  if (chunkSpliter === undefined) {
    if (globalThis.requestIdleCallback) {
      chunkSpliter = (task) => {
        globalThis.requestIdleCallback(idle => {
          task(() => idle.timeRemaining() > 0);
        })
      }
    } else {
      chunkSpliter = (task) => {
        setTimeout(() => {
          task((time) => time < 16.6);
        }, 30);
      }
    }
  }
  if (datas.length === 0) return;
  let i = 0;
  let _run = () => {
    chunkSpliter((hasTime) => {
      let now = Date.now();
      if (hasTime(Date.now() - now) && i < datas.length) {
        consumer(datas[i], i);
        i++;
        _run();
      }
    });
  };

  _run();
}
