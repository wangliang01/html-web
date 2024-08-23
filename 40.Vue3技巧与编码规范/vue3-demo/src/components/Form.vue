<template>
  <UserName v-model:first-name="firstName" v-model:last-name="lastName"></UserName>
  <p>{{ firstName }} - {{ lastName }}</p>
</template>

<script setup>
import { ref, provide } from 'vue'
import UserName from './UserName.vue'

const form = ref({
  age: 30,
  email: '123@qq.com',
})

// 将form信息provide子组件
provide('form', form)

const firstName = ref('')
const lastName = ref('')
</script>

<style lang="scss" scoped>

</style>
