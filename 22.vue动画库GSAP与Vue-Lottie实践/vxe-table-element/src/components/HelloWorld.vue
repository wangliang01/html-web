<script>
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
export default {
  data() {
    return {
      tableData: [
        { name: '名字1', sex: '0', age: 24 },
        { name: '名字2', sex: '1', age: 26 },
        { name: '名字3', sex: '1', age: 28 },
        { name: '名字4', sex: '1', age: 30 }
      ],
      sexList: [
        { label: '男', value: '1' },
        { label: '女', value: '0' }
      ]
    }
  },
  mounted() {
    // 加载一万条数据
    for (let index = 0; index < 10000; index++) {
      this.tableData.push({
        name: '名字' + index,
        sex: index % 2 === 0 ? '1' : '0',
        age: random(18, 45)
      })
    }
    console.log(this.tableData.length)
  },
  methods: {
    getSelectLabel(value, list) {
      let item = list.find(item => item.value === value)
      return item ? item.label : null
    }
  }
}

</script>

<template>
  <vxe-table border show-overflow height="600" :data="tableData" :edit-config="{ trigger: 'click', mode: 'row' }" :scroll-y="{enabled: true}">
    <vxe-column type="checkbox" width="60"></vxe-column>
    <vxe-column type="seq" width="80" :edit-config="{ trigger: 'click', mode: 'row' }">
      <template v-slot:edit="{row}">
        <el-checkbox> </el-checkbox>
      </template>
    </vxe-column>
    <vxe-column field="name" title="ElInput" min-width="140" :edit-render="{ type: 'default' }">
      <template v-slot:edit="scope">
        <el-input v-model="scope.row.name"></el-input>
      </template>
    </vxe-column>
    <vxe-column field="sex" title="ElSelect" width="140" :edit-render="{ type: 'default' }">
      <template v-slot:edit="scope">
        <el-select v-model="scope.row.sex">
          <el-option v-for="item in sexList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </template>
      <template v-slot="{ row }">{{ getSelectLabel(row.sex, sexList) }}</template>
    </vxe-column>
  </vxe-table>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
