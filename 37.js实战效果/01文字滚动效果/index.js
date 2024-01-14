(function() {
  const list = document.querySelector('.list')
  
  let offsetHeight = 40
  let duration = 2000
  let curIndex = 0
  let len = list.children.length
  
  function cloneNode() {
    // 将第一个克隆第一个元素，并插入到最后
    let clone = list.children[0].cloneNode(true)
    list.appendChild(clone)
  }
  
  cloneNode()
  
  let timer
  function scroll() {
    len = list.children.length
    let y = curIndex * offsetHeight
   
    list.style.transform = `translateY(${-y}px)`
    list.style.transition = `transform ${duration}ms`
    if (curIndex === len - 1) {
      // 滚动到最后一项
      curIndex = -1
    } 
    
    if (curIndex === 0) {
      list.style.transition = 'none'
      timer =  setTimeout(scroll, 0)
    } else {
      timer = setTimeout(scroll, duration)
    }
    curIndex++
  
  }
  
  scroll()
})()
