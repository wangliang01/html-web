const list = document.querySelector('.list')

function cloneNode() {
  const firstNode = list.children[0]
  let cloneNode = firstNode.cloneNode(true)
  list.appendChild(cloneNode)
}

cloneNode()

// 每隔一段时间，将列表滚动到一个位置
let duration = 2000
let curIndex = 0
let offsetHeight = 40
setInterval(moveNext, duration)

function moveNext() {
  let from = curIndex * offsetHeight
  curIndex++
  let to = curIndex * offsetHeight

  let totalDuration = 500 
  let duration = 10 
  let times = totalDuration / duration

  let dis = (to - from) / times

  let timer = setInterval(() => {
   from += dis
   if (from >= to) {
     clearInterval(timer)
     if (curIndex === list.children.length - 1) {
      from = 0
      curIndex = 0
     }
   }

   list.scrollTop = from
  }, duration)
}
