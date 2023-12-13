<template>
  <div class="cursor">
    <div class="text">Juejin</div>
    <div class="text">Juejin</div>
    <div class="text">Juejin</div>
    <div class="text">Juejin</div>
    <div class="text">Juejin</div>
    <div class="text">Juejin</div>
    <div class="text">Juejin</div>
    <div class="text">Juejin</div>
  </div>
</template>

<script setup>
import gsap from 'gsap';
import { onMounted } from 'vue';

onMounted(() => {
  document.addEventListener('mousemove', (e) => {
    gsap.to('.text', {
      x: e.clientX,
      y: e.clientY,
      stagger: -0.02
    })
  })
})
</script>

<style  scoped>
.text {
  position: absolute;
  pointer-events: none;
  color: #fff;
  font-size: 10em;
  -webkit-text-stroke: 2px #000;
  font-weight: 800;
  text-transform: uppercase;
  transform: translate(-50%, -50%);
}
</style>
