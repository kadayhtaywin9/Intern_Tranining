import About from '@/components/About.vue'
import Home from '@/components/Home.vue'
import Portfolio from '@/components/Portfolio.vue'
import Role from '@/components/settings/Role.vue'
import User from '@/components/settings/User.vue'
import Login from '@/components/nav/login.vue'
import Signup from '@/components/nav/Signup.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    component: Home,
    name: 'Dashboard',
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    component: Login,
    name: 'Login',
    meta: { guestOnly: true },
  },
  {
    path: '/signup',
    component: Signup,
    name: 'Signup',
    meta: { guestOnly: true },
  },
  {
    path: '/about',
    component: About,
    name: 'About',
    meta: { requiresAuth: true },
  },
  {
    path: '/user',
    component: User,
    name: 'Users',
    meta: { requiresAuth: true },
  },
  {
    path: '/role',
    component: Role,
    name: 'Roles',
    meta: { requiresAuth: true },
  },
  {
    path: '/portfolio',
    component: Portfolio,
    name: 'Portfolio',
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'Login' }
  }
  if (to.meta.guestOnly && auth.isAuthenticated) {
    return { name: 'Dashboard' }
  }
})

export default router
