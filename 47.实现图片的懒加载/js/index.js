console.log("图片懒加载");


// 根据图片宽度设置容器宽度
function setContainerWidth() {
  const imgWidth = 200
  const gap = 16

  const container = document.querySelector('.container')
  const innerWidth = window.innerWidth
  const column = Math.floor(innerWidth / (imgWidth + gap))
  const containerWidth = imgWidth * column + gap * (column - 1)
  container.style.width = containerWidth + 'px'
}


// 图片懒加载
function lazyLoad() {
  const imgs = document.querySelectorAll('img[data-src]')
  for (let i = 0; i < imgs.length; i++) {
    const img = imgs[i]
    const rect = img.getBoundingClientRect()
    // 判断图片是否在可视区域

    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const image = new Image()
      image.src = img.dataset.src
      image.onload = () => {
        img.src = image.src
        img.removeAttribute('data-src')
      }
    }
  }
}


window.onload = () => {
  setContainerWidth()
  lazyLoad()
}

window.onresize = () => {
  setContainerWidth()
  lazyLoad()
}


window.onscroll = () => {
  lazyLoad()
}
