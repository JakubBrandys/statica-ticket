import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import VirtualScroller from 'primevue/virtualscroller'

const app = createApp(App)

app.use(PrimeVue)
app.component('VirtualScroller', VirtualScroller)

app.mount('#app')