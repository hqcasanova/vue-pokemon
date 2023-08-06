/* Vue */
import { createApp } from 'vue';
import router from '@/router';
import App from '@/App.vue';

/* Other */
import '@/tailwind.css';

const app = createApp(App);
app.use(router);
app.mount('#app');

// Stylistically signals the app's been fully loaded
document.documentElement.classList.add('bg-light-primary');
