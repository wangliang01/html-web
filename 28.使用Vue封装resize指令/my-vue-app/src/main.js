import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)
// 注册指令
import directive from './directives/index'
app.use(directive)
app.mount('#app')
