import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Movies from '../views/Movies.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/movies',
    name: 'movies',
    component: Movies
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
