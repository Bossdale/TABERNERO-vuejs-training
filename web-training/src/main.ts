import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
// @ts-ignore — router is a plain JS module (Day 3 activity) with no type declarations
import router from './router/router-index.js'

createApp(App).use(createPinia()).use(router).mount('#app')