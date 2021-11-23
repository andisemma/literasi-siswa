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
    path: '/:id',
    name: 'artikel',
    component: () => import(/* webpackChunkName: "User" */ '../views/Artikel.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () =>
      import(/* webpackChunkName: "UserDetail" */ '../views/admin.vue'),
  },
  {
    path: '/admin/:id',
    name: 'adminDetails',
    component: () =>
      import(/* webpackChunkName: "UserDetail" */ '../views/adminDetail.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
