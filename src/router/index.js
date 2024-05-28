import { createRouter, createWebHashHistory } from 'vue-router'
import home from '../views/home.vue'
import login from '../views/login.vue'
import join from '../views/join.vue'
import calendar from '../views/calendar.vue'

const routes = [
  {
    path: '/calendar',
    name: 'calendar',
    component: calendar
  },
  {
    path: '/join',
    name: 'join',
    component: join
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/',
    name: 'home',
    component: home
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
