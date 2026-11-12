import About from '@/components/About.vue'
import Home from '@/components/Home.vue'
import Portfolio from '@/components/Portfolio.vue'
import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
     path:'/',
     component:Home
  },
  {
    path:'/about',
    component: About
  },
  {
    path:'/portfolio',
    component: Portfolio
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
