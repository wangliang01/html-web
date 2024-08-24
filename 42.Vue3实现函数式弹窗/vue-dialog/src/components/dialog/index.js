import { createApp } from 'vue'
import Dialog from './index.vue'

export function openDialog(options) {
  const mountNode = document.createElement('div')
  let app = createApp(Dialog, {
    visible: true,
    cancel() {
      console.log('cancel')
      if (app) {
        app.unmount()
        mountNode.remove()
        options?.cancel()
        app = null
      }
    },
    confirm() {
      app.unmount()
      mountNode.remove()
      options?.confirm()
      app = null
    }
  })

  app.mount(mountNode)
  document.body.appendChild(mountNode)
}
