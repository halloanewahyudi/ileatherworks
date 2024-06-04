import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueHtmlToPaper from 'vue-html-to-paper';

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia();

const options = {
    name: '_blank',
    specs: [
      'fullscreen=yes',
      'titlebar=yes',
      'scrollbars=yes'
    ],
    styles: [
        'https://cdn.jsdelivr.net/npm/tailwindcss@3.3.1/dist/tailwind.min.css', 
        '/src/assets/main.css'
    ]
  }

app.use(VueHtmlToPaper, options);
app.use(pinia)
app.use(router)

app.mount('#app')
