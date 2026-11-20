<template>
  <v-navigation-drawer v-model="model" color="white" border-e>
    <v-list class="py-3">
      <v-list-item>
        <template #prepend>
          <v-avatar color="primary" class="text-white font-weight-bold">
            R
          </v-avatar>
        </template>
        <v-list-item-title class="font-weight-bold text-subtitle-2">
          RFID Library
        </v-list-item-title>
        <v-list-item-subtitle class="text-caption">
          Management System
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <div class="px-4 py-2 text-caption text-uppercase font-weight-bold text-medium-emphasis">
      {{ auth.user?.role_name || 'Administrator' }}
    </div>

    <v-list density="compact" nav>
      <v-list-item
        v-for="item in menulist"
        :key="item.title"
        :prepend-icon="item.icon"
        :title="item.title"
        :to="item.url"
        color="primary"
        rounded="lg"
      ></v-list-item>
    </v-list>

    <template #append>
      <div class="pa-3">
        <v-btn
          block
          color="error"
          variant="tonal"
          prepend-icon="mdi-logout"
          class="text-none"
          @click="handleLogout"
        >
          Logout
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const model = defineModel({ type: Boolean, default: true })
const router = useRouter()
const auth = useAuthStore()

const menulist = ref([
  { title: 'Dashboard', url: '/', icon: 'mdi-view-dashboard-outline' },
  { title: 'Users', url: '/user', icon: 'mdi-account-group-outline' },
  { title: 'Roles', url: '/role', icon: 'mdi-shield-account-outline' },
  { title: 'Portfolio', url: '/portfolio', icon: 'mdi-briefcase-account-outline' },
  { title: 'About', url: '/about', icon: 'mdi-information-outline' },
])

const handleLogout = () => {
  auth.logout()
  router.push('/login')
}
</script>
