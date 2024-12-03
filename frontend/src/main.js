import './assets/css/app.min.css'
import './assets/css/icons.min.css'
import './assets/css/bootstrap.min.css'
import VueGtag from 'vue-gtag';


import { createApp } from 'vue'


import App from './App.vue'
import router from './router'




const app = createApp(App)

app.use(VueGtag, {
    config: { id: 'G-8YMZM39GG2' } // Replace with your Google Analytics ID
});

app.use(router)

app.mount('#app')