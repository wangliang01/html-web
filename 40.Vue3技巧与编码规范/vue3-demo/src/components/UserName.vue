<template>
  <input type="text" v-model="firstName">
  <input type="text" v-model="lastName">
  <div>其他信息:
    <p>年龄:{{ form.age }} </p>
    <p>邮箱:{{ form.email }}</p>
  </div>
</template>

<script setup>
import { inject } from 'vue'
const firstName = defineModel('firstName')
const lastName = defineModel('lastName')

const form = inject('form')
</script>

<style lang="scss" scoped></style>
