import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index"
import ElementPlus from 'element-plus'
// 自定义全局css
import './assets/styles/global.css'
import './assets/styles/custom.css'
import * as ElIcons from '@element-plus/icons-vue'

// ① 引入createPinia方法从pinia
import { createPinia } from 'pinia'
// ② 拿到pinia实例
const pinia = createPinia()

import "tailwindcss/tailwind.css"

// 1 引入数据持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 2 pinia使用数据持久化插件
pinia.use(piniaPluginPersistedstate)


const app = createApp(App)
for (const name in ElIcons){
	app.component(name,(ElIcons as any)[name])
}

app
    .use(ElementPlus)
    .use(router)
    .use(pinia) // 启用 Pinia

    .mount('#app')
    
