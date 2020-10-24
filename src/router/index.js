import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Banker from '../views/Banker.vue'
import Client from '../views/Client.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/banker/:uid',
    name: 'Banker',
    component: Banker
  },
  {
    path: '/client/:uid',
    name: 'Client',
    component: Client
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
