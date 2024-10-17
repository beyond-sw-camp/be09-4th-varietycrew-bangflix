import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import { createPinia } from 'pinia';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import Tooltip from 'primevue/tooltip';
import router from '@/router/routes';
import Noir from './assets/PrimeVueNoirPreset';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import '@/assets/main.css';
import '@/assets/utils.css';
import 'primeicons/primeicons.css';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

// use()
app.use(pinia);
app.use(PrimeVue, {
  // Default theme configuration
  theme: {
    preset: Noir,
  },
});
app.use(ConfirmationService);
app.use(ToastService);
app.use(router);

app.directive('tooltip', Tooltip);

app.mount('#app');
