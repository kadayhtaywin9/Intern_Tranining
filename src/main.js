import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
//import User from './components/UserTest.vue/index.js'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
const app = createApp(App)

const vuetify = createVuetify({
    components,
    directives,
    icons: {
    defaultSet: 'mdi',
    // aliases,
    // sets: {
    //   mdi,
    // },
  },
})

app.use(createPinia())
app.use(router)
app.use(vuetify)

//component registration
//app.component('user', User)

app.mount('#app')
