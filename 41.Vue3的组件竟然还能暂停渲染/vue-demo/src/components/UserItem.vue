<template>
  <div class="user">
    <img :src="item.avatar" alt="" class="avatar">

    <div class="content">
      <div class="flex title">
        <p>{{ item.name }}</p>
      </div>
      <div class="flex text mt-2">
        <p>{{ item.age }}岁</p>
        <p>{{ item.email }}</p>
      </div>
      <div class="flex text mt-2">
        <p>{{ item.address }}</p>
        <p>{{ item.createTime }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object
  }
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.user {
  display: flex;
  text-align: left;
  gap: 12px;
  width: 600px;
  font-size: 14px;
  margin-bottom: 16px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.content {
  flex: 1;
}

.flex {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}

.title {
  color: #333;
}

.text {
  color: #666;
}

.mt-2 {
  margin-top: 8px;
}
</style>
