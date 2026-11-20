<template>
  <v-container class="fill-height bg-grey-lighten-4" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="5" lg="4">
        <v-card rounded="xl" elevation="0" class="pa-8 border bg-white">
          <div class="text-center mb-6">
            <v-avatar color="primary" size="48" class="mb-3 text-white font-weight-bold">
              R
            </v-avatar>
            <h2 class="text-h5 font-weight-bold text-grey-darken-4">Create Account</h2>
            <p class="text-caption text-medium-emphasis mt-1">
              Register a new user in MySQL database
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

          <v-form @submit.prevent="handleSignup">
            <v-text-field
              v-model="form.name"
              label="Full Name *"
              prepend-inner-icon="mdi-badge-account-outline"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              class="mb-3"
              required
            ></v-text-field>

            <v-text-field
              v-model="form.username"
              label="Username *"
              prepend-inner-icon="mdi-account-outline"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              class="mb-3"
              required
            ></v-text-field>

            <v-text-field
              v-model="form.email"
              label="Email Address (Optional)"
              type="email"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              class="mb-3"
            ></v-text-field>

            <v-text-field
              v-model="form.password"
              label="Password *"
              prepend-inner-icon="mdi-lock-outline"
              :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              :type="showPassword ? 'text' : 'password'"
              @click:append-inner="showPassword = !showPassword"
              variant="outlined"
              density="comfortable"
              rounded="lg"
              class="mb-3"
              required
            ></v-text-field>

            <v-text-field
              v-model="form.confirmPassword"
              label="Confirm Password *"
              prepend-inner-icon="mdi-lock-check-outline"
              :type="showPassword ? 'text' : 'password'"
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
              Sign Up
            </v-btn>
          </v-form>

          <v-divider class="my-4"></v-divider>

          <div class="text-center text-body-2">
            Already have an account?
            <router-link to="/login" class="text-primary font-weight-bold text-decoration-none">
              Sign In
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
  name: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
})
const showPassword = ref(false)
const loading = ref(false)
const errorMessage = ref('')

const handleSignup = async () => {
  errorMessage.value = ''
  if (form.password !== form.confirmPassword) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  loading.value = true
  try {
    await auth.signup({
      name: form.name,
      username: form.username,
      email: form.email,
      password: form.password,
    })
    router.push('/')
  } catch (err) {
    errorMessage.value = err.message || 'Signup failed.'
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
