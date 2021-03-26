import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import(/* webpackChunkName: "users" */ '../views/Users.vue'),
  },
  {
    path: '/to-do',
    name: 'ToDo',
    component: () => import(/* webpackChunkName: "ToDo" */ '../views/ToDo.vue'),
  },
  {
    path: '/subjects',
    name: 'Subjects',
    props: true,
    component: () => import(/* webpackChunkName: "subjects" */ '../views/Subjects.vue'),
    children: [
      { 
        path: ':id',
        name: 'Subject',
        component: () =>  import('../components/Subject.vue'),
        props: true 
      }
    ]
  },
  {
    path: '/contact/:id',
    name: 'Contact',
    props: true,
    component: () => import(/* webpackChunkName: "contacts" */ '../views/Contact.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
