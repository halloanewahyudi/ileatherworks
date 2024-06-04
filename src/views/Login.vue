<script setup>

import { useAuthStore } from '@/stores/authStore';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  const router = useRouter()
  const useAuth = useAuthStore();
  const username = ref('');
  const password = ref('');
  
  const performLogin = () => {
    try {
      useAuth.login(username.value, password.value);
      router.push('/'); // Pindah ke halaman utama setelah login berhasil
    } catch (error) {
      alert(error.message);
    }
  };
</script>

<template>

    <div class="grid grids-cols-1 md:grid-cols-2">
        <div class="bg-brand-50 min-h-screen flex flex-col items-center justify-center">
            <img src="../assets/logo.png" alt="" class="w-48">
        </div>
        <div class="flex flex-col justify-center items-center bg-white">
            <div class="login-form max-w-[300px] w-full">
                <h2 class="text-2xl mb-5">Login</h2>
                <form  @submit.prevent="performLogin" class="space-y-4 md:space-y-6" >
                    <div>
                        <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input type="text" v-model="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-brand-600 focus:border-brand-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-brand-500 dark:focus:border-brand-500" placeholder="username" required="">
                    </div>
                    <div >
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" v-model="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-brand-600 focus:border-brand-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-brand-500 dark:focus:border-brand-500" required="">
                    </div>
  
                    <button type="submit" class="w-full text-white bg-brand-700 hover:bg-brand-800 focus:ring-4 focus:outline-none focus:ring-brand-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sign in</button>
                </form>
            </div>
        </div>
    </div>
</template>