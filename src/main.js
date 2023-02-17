import { createApp } from 'vue';
import App from './App.vue';
import {Vuelidate} from "vuelidate";
import router from './router';
import store from './store'
import './style.css'
import '/src/output.css'

createApp(App)
    .use(Vuelidate)
    .use(store)
    .use(router)
    .mount('#app')
