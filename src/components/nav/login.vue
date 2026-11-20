<template>
  <v-container class="fill-height bg-grey-lighten-4" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="5" lg="4">
        <v-card rounded="xl" elevation="0" class="pa-8 border bg-white">
          <div class="text-center mb-6">
            <v-avatar color="primary" size="48" class="mb-3 text-white font-weight-bold">
              R
            </v-avatar>
            <h2 class="text-h5 font-weight-bold text-grey-darken-4">Welcome Back</h2>
            <p class="text-caption text-medium-emphasis mt-1">
              Sign in to access your Dashboard
            </p>
          </div>

          <v-alert
            v-if="errorMessage"
            type="error"
            variant="tonal"
            density="compact"
            class="mb-4"
            closable
            @click:close="errorMessage = ''"
          >
            {{ errorMessage }}
          </v-alert>

          <v-form @submit.prevent="handleLogin">
            <v-text-field
              v-model="form.username"
              label="Username or Email"
              prepend-inner-icon="mdi-account-outline"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              class="mb-3"
              required
            ></v-text-field>

            <v-text-field
              v-model="form.password"
              label="Password"
              prepend-inner-icon="mdi-lock-outline"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              :type="showPassword ? 'text' : 'password'"
              @click:append-inner="showPassword = !showPassword"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              class="mb-4"
              required
            ></v-text-field>

            <v-btn
              type="submit"
              color="primary"
              block
              size="large"
              rounded="lg"
              :loading="loading"
              class="text-none font-weight-bold mb-4"
            >
              Sign In
            </v-btn>
          </v-form>

          <v-divider class="my-4"></v-divider>

          <div class="text-center text-body-2">
            <router-link to="/signup" class="text-primary font-weight-bold text-decoration-none">
              Create an Account
            </router-link>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()

const form = reactive({
  username: '',
  password: '',
})
const showPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  errorMessage.value = ''
  loading.value = true
  try {
    await auth.login(form.username, form.password)
    router.push('/')
  } catch (err) {
    errorMessage.value = err.message || 'Login failed. Please check your credentials.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.border {
  border: 1px solid #e2e8f0 !important;
}
</style>
