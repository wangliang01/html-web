const container = document.querySelector('.container')
const imgSize = 250
const gap = 16
console.log(container)

/**
 * 瀑布流布局
 * 1、创建图片元素
 * 2、设置图片元素的位置
 * 3、监听窗口尺寸变化，重新布局
 */

// 1、创建图片元素
const _createImg = (src = `https://picsum.photos/${imgSize}` ) => {
  let img = document.createElement('img')
  img.src = src
  container.appendChild(img)
}

const _random = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

const createImgs = (n = 20) => {
  for (let i = 0; i < n; i++) {
    let h = _random(100, 500)
    _createImg(`https://picsum.photos/${imgSize}/${h}?timestamp=${i}`)
  }
}

createImgs()

// 2、设置图片元素的位置

/**
 * 设置图片元素的位置
 * 1、根据容器宽度，图片的宽度，间距，计算出列数
 * 2、根据 列数，创建一个数组，用来记录每一列图片的高度
 * 3、遍历图片，计算每一列图片的高度
 * 4、加入防抖处理
 * 
 */

// 防抖
const debounce = (fn, delay) => {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
const setImgsPosition = debounce(() => {
  const containerWidth = container.offsetWidth
  const cols = Math.floor(containerWidth / (imgSize + gap))
  console.log(cols)
  let heights = new Array(cols).fill(0)

  // 3、遍历图片，计算每一列图片的高度
  for (let i = 0; i < container.children.length; i++) {
    const img = container.children[i]
    // index 为heights最小的一个
    const index = heights.indexOf(Math.min(...heights))
    img.style.position = 'absolute'
    img.style.left = index * (imgSize + gap) + gap +  'px'
    img.style.top = heights[index] + gap +  'px'
    // 拿到当前图片的高度
    heights[index] += (img.height || imgSize) + gap
  }

}, 300)

setImgsPosition()

// 在图片加载完成后，重新布局
window.addEventListener('load', setImgsPosition)

// 3、监听窗口尺寸变化，重新布局
window.addEventListener('resize', setImgsPosition)



// 滚动到底部，加载更多
const loadMore = () => {
  createImgs(20)
  setImgsPosition()
}

window.addEventListener('scroll', () => {
  // 判断元素是否到底部
  const { scrollHeight, scrollTop, clientHeight } = document.documentElement
  if (scrollTop + clientHeight >= scrollHeight) {
    console.log('到底部了')
    // 添加loading效果
  }
})