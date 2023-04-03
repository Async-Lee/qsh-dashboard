import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './maps';

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: routes
});

export default router;
