<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'


onMounted(() => {
  gsap.to('.box', {
    x: 200,
    duration: 2,
    // ease: 'elastic',
    rotation: 360,
  })
})


</script>

<template>
  <div class="box"></div>
</template>

<style scoped>
.box {
  width: 100px;
  height: 100px;
  background-color: red;
  border-radius: 4px;
}
</style>
