import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import i18n from './lang'
import 'element-plus/dist/index.css'
import store from './store';

createApp(App).use(router).use(i18n).use(store).mount('#app')
