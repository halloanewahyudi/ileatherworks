<script setup>
import { useAuthStore } from "@/stores/authStore";
import Unlock from '@/components/icons/Unlock.vue';
const auth = useAuthStore()
</script>
<template>
    <div class="flex justify-between items-center gap-4">
        <div class="logo">
            <img src="@/assets/logo.png" class="w-32" alt="">
        </div>
        <div class="menu flex items-center gap-4">
            <router-link to="/"> Dashboard </router-link>
            <router-link to="/print"> Print </router-link>
            <button
                class="py-2 px-4 rounded-full bg-brand-600 text-brand-50 hover:bg-brand-800 duration-300 flex items-center gap-2">
                Logout
                <Unlock />
            </button>
        </div>
    </div>
</template>