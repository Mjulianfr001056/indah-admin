import { createRouter, createWebHistory } from 'vue-router'
import KatalogData from '../components/KatalogData.vue'
import UserTable from '../components/UserTable.vue'
import DashboardView from '../components/DashboardView.vue'

const routes = [
  {
    path: '/about',
    name: 'about',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    name: 'DashboardView',
    path: '/dashboard',
    component: DashboardView
  },
  {
    name: 'KatalogData',
    path: '/katalog',
    component: KatalogData
  },
  // {
  //   path: '/',
  //   name: 'dashboard',
  //   component: () =>
  //     import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue')
  // },

  {
    name: 'UserTable',
    path: '/user',
    component: UserTable
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
