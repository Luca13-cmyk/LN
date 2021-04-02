import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store/index';
import { FirebaseActions } from "@/utils/FirebaseActions";

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
    beforeEnter: (to, from, next) => {
      if(store.state.userAuth.inadmin) {
        next();
      }
      else {
        next('/');
      }
    }
    // Validar entrada somente administrador
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
  {
    path: '/logout',
    beforeEnter: (to, from, next) => {
      FirebaseActions.signOutUser()
        .then(() => {
          window.location.reload();
          next('/');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  },
  {
    path: '*',
    component: () => import("../views/404.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
