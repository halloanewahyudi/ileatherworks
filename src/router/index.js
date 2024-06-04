import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { createPinia } from 'pinia'
import { useAuthStore } from '@/stores/authStore';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Login.vue')
    },
    {
      path: '/',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/print',
      name: 'print',
      component: () => import('../views/Print.vue'),
      meta: {
        requiresAuth: true,
      },
    }
  ]
})

// Route guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Pemeriksaan otentikasi menggunakan informasi pengguna dari Pinia
  //  console.log('Authenticating. User:', authStore.user);
    if (!authStore.user) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
