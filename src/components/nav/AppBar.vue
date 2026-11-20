<template>
  <Drawer v-model="drawer" />

  <v-app-bar flat border-b color="white">
    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-app-bar-title class="font-weight-bold text-grey-darken-3">
      RFID Library <span class="text-primary">/ {{ pageTitle }}</span>
    </v-app-bar-title>

    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Drawer from './Drawer.vue'
import { useAuthStore } from '@/stores/auth'

const drawer = ref(true)
const route = useRoute()
const auth = useAuthStore()

const pageTitle = computed(() => route.name || 'Dashboard')
</script>
