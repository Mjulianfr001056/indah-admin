import axios from 'axios'

import { createApp, VueElement } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from './components/DashboardView.vue'
import KatalogData from './components/KatalogData.vue'
import UserTable from './components/UserTable.vue'
import './css/style.css'
VueElement.prototype.$http = axios

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: DashboardView },
  { path: '/katalog', component: KatalogData },
  { path: '/user', component: UserTable }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
