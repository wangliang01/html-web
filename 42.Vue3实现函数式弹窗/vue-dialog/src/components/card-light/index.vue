<template>
  <div class="container">
    <div class="item" ref="cardRef">
      <div class="light" ref="lightRef" v-if="showLight"></div>
    </div>
    <div class="item"></div>
    <div class="item"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'

const useLightCard = () => {
  // 是否显示光
  const showLight = ref(false)
  // 获取卡片的dom节点
  const cardRef = ref(null)
  let cardOverflow = ''
  // 获取光的dom节点
  let lightRef = ref(null)

  // 设置卡片的overflow为hidden
  const setCardOverflowHidden = () => {
    const cardDom = cardRef.value
    if (cardDom) {
      // 记住原来dom overflow属性
      cardOverflow = cardDom.style.overflow
      cardDom.style.overflow = 'hidden'
    }
  }

  // 还原卡片的overflow
  const restoreCardOverflow = () => {
    const cardDom = cardRef.value
    if (cardDom) {
      cardDom.style.overflow = cardOverflow
    }
  }

  // 监听卡片的鼠标移入
  const onMouseEnter = () => {
    setCardOverflowHidden()
    showLight.value = true
  }

  // 监听鼠标移动
  const onMouseMove = (e) => {
    const { clientX, clientY } = e
    // 让光标跟随鼠标
    const cardDom = cardRef.value
    const lightDom = lightRef.value

    if (cardDom && lightDom) {
      // 获取卡片相对窗口的x, y度坐标
      const { x, y } = cardDom.getBoundingClientRect()
      const { width, height } = lightDom.getBoundingClientRect()
      lightDom.style.left = `${clientX - x - width / 2}px`
      lightDom.style.top = `${clientY - y - height / 2}px`
    }
  }

  const onMouseLeave = () => {
    restoreCardOverflow()
    showLight.value = false
  }

  onMounted(() => {
    cardRef.value?.addEventListener('mouseenter', onMouseEnter)
    cardRef.value?.addEventListener('mousemove', onMouseMove)
    cardRef.value?.addEventListener('mouseleave', onMouseLeave)
  })

  onUnmounted(() => {
    {
      cardRef.value?.removeEventListener('mouseenter', onMouseEnter)
      cardRef.value?.removeEventListener('mouseOver', onMouseMove)
      cardRef.value?.removeEventListener('mouseleave', onMouseLeave)
    }
  })

  return {
    showLight,
    cardRef,
    lightRef
  }
}

const { cardRef, lightRef, showLight } = useLightCard()
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  padding: 200px;
  display: flex;
  justify-content: space-between;
  background: #000;
}

.item {
  position: relative;
  width: 125px;
  height: 125px;
  background: #1c1c1f;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.light {
  position: absolute;
  width: 60px;
  height: 60px;
  /* left: 20px;
  top: 90px; */
  background: #ff4132;
  filter: blur(40px);
}
</style>
