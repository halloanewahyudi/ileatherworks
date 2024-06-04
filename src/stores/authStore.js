// src/store/authStore.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: null,
    admin:'Admin'
  }),
  actions: {
    login(username, password) {
      // Lakukan logika otentikasi di sini
      if (username === 'admin' && password === 'loremipsum') {
        this.user = { username };
    //    console.log('Login successful. User:', this.user);
        // Simpan informasi pengguna di dalam Pinia
        // Anda dapat menyimpan di localStorage juga jika diperlukan
        // localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        throw new Error('Invalid credentials');
      }
    },
    logout() {
      // Logout pengguna
      this.user = null;
      $router.push('/login')
      // Hapus informasi pengguna dari localStorage jika perlu
      // localStorage.removeItem('user');
    },
  },
});
