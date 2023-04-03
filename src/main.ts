import { createApp } from 'vue';
import { createPinia } from 'pinia';
import installElementPlus from './plugins/element-plus';
import 'element-plus/theme-chalk/index.css';

import App from './App.vue';
import router from './router';

import './assets/styles/reset.css';

const app = createApp(App);

installElementPlus(app);

app.use(createPinia());
app.use(router);

app.mount('#app');
