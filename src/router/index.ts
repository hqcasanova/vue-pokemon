import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: 'pokemon/:id?',
          name: 'stats',
          props: true,
          component: () => import('../views/StatsView.vue'),
        },
      ],
    },
  ],
});

export default router;
