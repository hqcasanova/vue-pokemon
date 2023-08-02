import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './tailwind.css';

const app = createApp(App);

app.use(router);
app.mount('#app');

// Stylistically signals the app's been fully loaded
document.documentElement.classList.add('bg-light-primary');
