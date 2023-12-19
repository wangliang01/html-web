<template>
  <HelloWorld :to="num"/>

  <button @click="num += 10">加10</button>
</template>

<script setup>
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

const num = ref(10)


</script>


<style scoped>

</style>
