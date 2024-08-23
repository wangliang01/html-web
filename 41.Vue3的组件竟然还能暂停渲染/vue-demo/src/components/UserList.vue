<template>
  <div class="user-list" v-if="userList.length > 0">
    <UserItem v-for="item in userList" :key="'user' + item.id" :item="item"></UserItem>
  </div>
  <div v-else>暂无数据</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import UserItem from './UserItem.vue';
import MockJS from 'mockjs'
const Random = MockJS.Random

const userList = ref([])
// 请求用户数据
const fetchUserList =  () => {
  return new Promise(resolve => {
    let result = []
    for (let i = 0; i < 10; i++) {
      let user = {
        id: i,
        name: Random.cname(),
        age: Random.integer(15, 45),
        email: Random.email(),
        address: Random.city(true),
        avatar: 'https://picsum.photos/100/100?random=' + i,
        createTime: Random.datetime('yyyy-MM-dd HH:mm:ss')
      }
      result.push(user)
    }
    setTimeout(() => {
      resolve(result)
    }, 500)
  })
}
// 在顶层使用了await后子组件就变成了一个异步组件，等到await fetchUserList()执行完了后，也就是从服务端拿到了数据后，子组件才算是加载完成了。
userList.value = await fetchUserList()

// 获取用户列表
// onMounted(() => {
//   fetchUserList().then(res => {
//     userList.value = res
//     console.log("🚀 ~ fetchUserList ~ userList.value:", userList.value)
//   })
// })
</script>

<style  scoped>
.user-list {
  margin: 30px;
}
</style>
