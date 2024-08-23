<script setup>
// import HelloWorld from './components/UserList.vue'
import { defineAsyncComponent, Suspense } from 'vue'
const UserList = defineAsyncComponent(() => import('./components/UserList.vue'))
</script>

<template>
  <Suspense>
    <UserList />
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
