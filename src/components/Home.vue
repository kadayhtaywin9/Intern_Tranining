<template>
  <v-container class="py-6" style="max-width: 1120px;">
    <!-- Welcome Banner -->
    <v-card rounded="xl" elevation="0" class="pa-6 mb-6 border bg-white">
      <div class="d-flex flex-column flex-sm-row justify-space-between align-sm-center ga-4">
        <div>
          <h2 class="text-h5 font-weight-bold text-grey-darken-4">
            Welcome back, {{ auth.user?.name || 'User' }}!
          </h2>
          <p class="text-body-2 text-medium-emphasis mt-1">
            Logged in as <strong>@{{ auth.user?.username }}</strong> • Role: {{ auth.user?.role_name || 'Member' }}
          </p>
        </div>
        <!-- <div class="d-flex ga-2">
          <v-btn color="primary" variant="flat" rounded="lg" prepend-icon="mdi-account-plus" class="text-none" @click="router.push('/user')">
            Manage Users
          </v-btn>
          <v-btn variant="outlined" rounded="lg" prepend-icon="mdi-refresh" class="text-none" :loading="loading" @click="loadDashboard">
            Refresh
          </v-btn>
        </div> -->
      </div>
    </v-card>

    <v-alert v-if="error" type="warning" variant="tonal" class="mb-6" closable>
      {{ error }}
    </v-alert>

    <!-- KPI Cards -->
    <!-- <v-row class="mb-6">
      <v-col cols="12" sm="4">
        <v-card rounded="xl" elevation="0" class="pa-5 border bg-white cursor-pointer" @click="router.push('/user')">
          <div class="d-flex justify-space-between align-center mb-3">
            <span class="text-caption font-weight-bold text-uppercase text-medium-emphasis">Total Users</span>
            <v-avatar color="blue-lighten-5" size="38">
              <v-icon color="primary" size="20">mdi-account-group</v-icon>
            </v-avatar>
          </div>
          <div class="text-h4 font-weight-bold text-grey-darken-4">{{ stats.totalUsers }}</div>
          <div class="text-caption text-primary mt-1">Stored in MySQL users table →</div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="4">
        <v-card rounded="xl" elevation="0" class="pa-5 border bg-white cursor-pointer" @click="router.push('/role')">
          <div class="d-flex justify-space-between align-center mb-3">
            <span class="text-caption font-weight-bold text-uppercase text-medium-emphasis">Total Roles</span>
            <v-avatar color="teal-lighten-5" size="38">
              <v-icon color="teal" size="20">mdi-shield-account</v-icon>
            </v-avatar>
          </div>
          <div class="text-h4 font-weight-bold text-grey-darken-4">{{ stats.totalRoles }}</div>
          <div class="text-caption text-teal mt-1">Manage access roles →</div>
        </v-card>
      </v-col>

      <v-col cols="12" sm="4">
        <v-card rounded="xl" elevation="0" class="pa-5 border bg-white cursor-pointer" @click="router.push('/portfolio')">
          <div class="d-flex justify-space-between align-center mb-3">
            <span class="text-caption font-weight-bold text-uppercase text-medium-emphasis">Portfolio Profile</span>
            <v-avatar color="indigo-lighten-5" size="38">
              <v-icon color="indigo" size="20">mdi-briefcase-check</v-icon>
            </v-avatar>
          </div>
          <div class="text-h6 font-weight-bold text-grey-darken-4 mt-1">Kaday Htay Win</div>
          <div class="text-caption text-indigo mt-1">View developer portfolio →</div>
        </v-card>
      </v-col>
    </v-row> -->

    <!-- Recent Users Table -->
    <!-- <v-card rounded="xl" elevation="0" class="border bg-white">
      <v-card-title class="pa-5 d-flex justify-space-between align-center">
        <div class="d-flex align-center">
          <v-icon color="primary" class="mr-2">mdi-database-check-outline</v-icon>
          <span class="text-subtitle-1 font-weight-bold">Recent Registered Users (MySQL)</span>
        </div>
        <v-btn size="small" variant="text" color="primary" class="text-none" @click="router.push('/user')">
          View All
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">ID</th>
            <th class="text-left">Full Name</th>
            <th class="text-left">Username</th>
            <th class="text-left">Email</th>
            <th class="text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in stats.recentUsers" :key="u.id">
            <td>#{{ u.id }}</td>
            <td class="font-weight-medium">{{ u.name }}</td>
            <td>@{{ u.username }}</td>
            <td>{{ u.email || '—' }}</td>
            <td>
              <v-chip size="x-small" color="primary" variant="tonal">
                {{ u.role_name }}
              </v-chip>
            </td>
          </tr>
          <tr v-if="stats.recentUsers.length === 0">
            <td colspan="5" class="text-center py-6 text-medium-emphasis">
              No users found yet.
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card> -->
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { apiRequest } from '@/services/api'

const router = useRouter()
const auth = useAuthStore()

const loading = ref(false)
const error = ref('')
const stats = ref({
  totalUsers: 0,
  totalRoles: 0,
  recentUsers: [],
})

const loadDashboard = async () => {
  loading.value = true
  error.value = ''
  try {
    const data = await apiRequest('/dashboard')
    stats.value = data
  } catch (err) {
    error.value = 'Could not reach backend API. Make sure Express server is running on port 5000.'
  } finally {
    loading.value = false
  }
}

onMounted(loadDashboard)
</script>

<style scoped>
.border {
  border: 1px solid #e2e8f0 !important;
}
.cursor-pointer {
  cursor: pointer;
  transition: transform 0.15s ease;
}
.cursor-pointer:hover {
  transform: translateY(-2px);
}
</style>
