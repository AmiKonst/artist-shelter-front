import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

import stores from '@/stores';

import '🔗/assets/scss/base.scss';

if (import.meta.env.VITE_APP_TITLE) {
    document.title = import.meta.env.VITE_APP_TITLE;
}

export const app = createApp(App);

app.use(router);
router.app = app;

const pinia = createPinia();

app.use(pinia);
app.use(stores.locale().create());

app.mount('#shelter-app');
