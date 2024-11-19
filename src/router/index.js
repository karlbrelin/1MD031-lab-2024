import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue';
import Dispatcher from '../views/DispatcherView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/dispatcher',
      name: 'Dispatcher',
      component: Dispatcher
    }
  ]
})

export default router