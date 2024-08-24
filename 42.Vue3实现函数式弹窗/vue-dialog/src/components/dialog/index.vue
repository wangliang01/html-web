<template>
  <el-dialog :model-value="visible" title="账号和密码" width="500" :before-close="handleClose">
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="账号">
        <el-input v-model="form.account" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" show-password placeholder="请输入密码" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="submitForm"> 提交 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  visible: Boolean,
  confirm: {
    type: Function,
    default: () => {}
  },
  cancel: {
    type: Function,
    default: () => {}
  }
})

const emit = defineEmits(['update:visible'])

const form = ref({
  account: '',
  password: ''
})

const submitForm = () => {
  props.confirm(form.value)
  handleClose()
}
const handleClose = () => {
  emit('update:visible', false)
  props.cancel()
}
</script>

<style lang="scss" scoped></style>
