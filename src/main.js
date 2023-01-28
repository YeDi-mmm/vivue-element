import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import i18n from './lang'
import 'element-plus/dist/index.css'
import store from './store';

import { setupMock } from '../mock'; //mock
if(import.meta.env === 'development'){ //dev环境开启mock
  setupMock()
}

createApp(App).use(router).use(i18n).use(store).mount('#app')
