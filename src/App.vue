<template>
  <v-app class="bg-grey-lighten-4">
    <AppBar v-if="showNavigation" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppBar from '@/components/nav/AppBar.vue'

const route = useRoute()
const showNavigation = computed(() => !route.meta?.guestOnly)
</script>
