<script setup >
import { reactive, onMounted, watchEffect } from 'vue'
import gsap from 'gsap'


// const props = withDefaults(
//   defineProps<{
//     from: number
//     to: number
//     duration?: number
//   }>(),
//   {
//     from: 0,
//     to: 0,
//     duration: 1
//   }
// )

// 定义 props
const props = defineProps({
  from: {
    type: Number,
    default: 0
  },
  to: {
    type: Number,
    default: 100
  },
  duration: {
    type: Number,
    default: 2
  }
});


let tweened = reactive({
  number: 0
})

watchEffect(() => {
  gsap.to(tweened, {
    number: props.to.toFixed(0),
    duration: props.duration,
    ease: 'power1.out',
  })
})

</script>

<template>
  <div class="gsap">
    {{
      tweened.number.toFixed(0)
    }}
  </div>
</template>

<style scoped>
.gsap {
  width: 200px;
  height: 100px;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  margin: 20px;

}
</style>
