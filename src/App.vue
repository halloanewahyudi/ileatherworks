<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import { useAuthStore } from './stores/authStore';
const auth = useAuthStore()
</script>

<template>
  <header v-if="auth.user" class="py-2 border-b bg-white">
    <div class="container">
      <Navbar />
    </div>
  </header>
  <main class="bg-brand-50 min-h-screen">
    <RouterView />
  </main>
</template>
