import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import VXETable from 'vxe-table'
import VXETablePluginElement from 'vxe-table-plugin-element'
import 'element-plus/dist/index.css'
import 'vxe-table/lib/style.css'
import 'vxe-table-plugin-element/dist/style.css'

const app = createApp(App)
app.use(ElementPlus)
app.use(VXETable)
VXETable.use(VXETablePluginElement)
app.mount('#app')
