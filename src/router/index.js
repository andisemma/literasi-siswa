import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "User" */ '../views/Home.vue'),
  },
  {
    path: '/artikel/:id',
    name: 'Artikel',
    component: () =>
      import(/* webpackChunkName: "User" */ '../views/Artikel.vue'),
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () =>
      import(/* webpackChunkName: "admin" */ '../views/Admin.vue'),
  },
  {
    path: '/admin/:id',
    name: 'adminDetails',
    component: () =>
      import(/* webpackChunkName: "adminDetail" */ '../views/adminDetail.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue'),
    name: 'NotFound',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
