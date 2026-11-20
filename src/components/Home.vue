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
      </div>
    </v-card>

    <v-alert v-if="error" type="warning" variant="tonal" class="mb-6" closable>
      {{ error }}
    </v-alert>

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
