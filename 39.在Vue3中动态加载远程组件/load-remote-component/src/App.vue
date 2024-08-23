<script setup>
import { defineAsyncComponent, Suspense } from 'vue';
import * as Vue from "vue";
import { loadModule } from 'vue3-sfc-loader';

// vue3-sfc-loader 配置
const options = {
  moduleCache: {
    vue: Vue
  },
  async getFile(url) {
    const res = await fetch(url);
    const code = await res.text();
    return code;
  },
  addStyle: (textContent) => {
    const style = Object.assign(document.createElement('style'), { textContent });
    const ref = document.head.getElementsByTagName('style')[0] || null;
    document.head.insertBefore(style, ref);
  },
}

const HelloWorld = defineAsyncComponent(async () => {
  const res = await loadModule(
    "http://localhost:8080/HelloWorld.vue",
    options
  );
  console.log("res", res);
  return res;
});


</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
      
    <Suspense>
      <HelloWorld msg="Vite + Vue" />
      <template #fallback>
        <div>Loading...</div>
      </template>
    </Suspense>
    </div>
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
