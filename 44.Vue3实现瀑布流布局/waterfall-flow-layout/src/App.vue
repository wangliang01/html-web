<template>
  <div class="container">
    <div class="images" ref="imagesRef">
    </div>
    <div class="loading" ref="loadingRef">
  </div>
  </div>

</template>

<script setup>
import { onMounted, ref } from 'vue'
// import Loading from './components/Loading.vue'
const imagesRef = ref(null)
const loadingRef = ref(null)
let timer = null
function useWaterfallLayout() {
  const IMG_WIDTH = 220

  // 计算container的宽度
  const getContainerWidth = () => {
    const containerWidth = imagesRef.value?.clientWidth
    return containerWidth
  }

  // 根据图片宽度，计算可以放置的图片数量，及计算图片之间的padding
  const calc = () => {
    const containerWidth = getContainerWidth()
    // 计算列的数量
    const clolumn = Math.floor(containerWidth / IMG_WIDTH)
    console.log("🚀 ~ calc ~ clolumn:", clolumn)


    // 图片之间的padding
    const gap = (containerWidth - IMG_WIDTH * clolumn) / (clolumn + 1)
    return {
      clolumn,
      gap
    }
  }

  // 根据每排可以放置的图片数量及padding，动态放置图片
  const createImages = () => {
    for (let i = 0; i < 10; i++) {
      const img = document.createElement('img')
      const height = Math.round(Math.random() * 300 + 100)
      img.src = `https://picsum.photos/220/${height}?random=${i}`
      img.style.width = IMG_WIDTH + 'px'
      img.style.position = "absolute"; // 设置position
      img.style.transition = "0.3s"; // 设置transition
      imagesRef.value.appendChild(img)
      img.onload = setPosition
    }
  }

  // 图片定位
  const setPosition = () => {
    const { clolumn, gap } = calc()
    let nextTops = new Array(clolumn).fill(0)
    const children = imagesRef.value.children
    for (let i = 0; i < children.length; i++) {
      const img = children[i]
      // 找出最短的那一列
      const minTop = Math.min.apply(null, nextTops)
      img.style.top = minTop + gap + 'px'
      const minIndex = nextTops.indexOf(minTop)
      nextTops[minIndex] += img.height + gap
      const left = minIndex * IMG_WIDTH + (minIndex + 1) * gap
      img.style.left = left + 'px'
    }

    const max = Math.max.apply(null, nextTops)
    imagesRef.value.style.height = max + 'px'
  }

  // 加载更多
  const loadMore = () => {
    createImages()
  }




  window.addEventListener('resize', () => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      setPosition()
    }, 200)
  })

  onMounted(() => {
    loadMore()
    // observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log("🚀 ~ entries.forEach ~ isIntersecting:", entry.isIntersecting)
          loadMore()
        }
      })
    }, {
      rootMargin: '300px',
      threshold: 0.1 // 当容器与视口至少有10%的交叉时触发事件
    })

    observer.observe(loadingRef.value)
  })

}

useWaterfallLayout()
</script>

<style lang="scss" scoped>
.container {
  width: 90%;
  min-height: 100vh;
  margin: 0 auto;
  box-sizing: border-box;
  border: 2px solid;
  position: relative;
}

.images {
  width: 100%;
}

.loading {
  height: 60px;
}
</style>
