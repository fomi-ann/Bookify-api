import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
// Bootstrap JS (optional but recommended)
import 'bootstrap'

createApp(App).use(router).mount('#app')
