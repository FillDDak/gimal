import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VCalendar from 'v-calendar'
import { loadFonts } from './plugins/webfontloader'
import 'v-calendar/style.css'  // v-calendar 스타일을 직접 가져옵니다
import axios from 'axios'

// Load fonts
loadFonts()

// Create Vue app
const app = createApp(App)

// Use plugins
app.use(router)
app.use(store)
app.use(vuetify)
app.use(VCalendar, {
  componentPrefix: 'vc',  // Use <vc-calendar /> instead of <v-calendar />
  locales: {
    'en-US': {
      firstDayOfWeek: 1, // Monday
      masks: {
        L: 'YYYY-MM-DD',
        title: 'MMMM YYYY',
        weekdays: 'WEEKDAY',
        navMonths: 'MMM',
        input: ['YYYY-MM-DD', 'YYYY/MM/DD'],
        dayPopover: 'WWW, MMMM D, YYYY'
      }
    }
  }
})
app.config.globalProperties.$axios = axios

// Mount app
app.mount('#app')
