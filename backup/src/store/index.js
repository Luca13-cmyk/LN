import Vue from 'vue'
import Vuex from 'vuex'
import {vuexfireMutations, firestoreAction} from 'vuexfire';
import { db } from '@/firebase';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    userBind: [],
    userAuth: [],
    subjects: []
  },
  mutations: {
    ...vuexfireMutations,
  },
  actions: {
    bindUsers: firestoreAction(context => {
      return context.bindFirestoreRef('users', db.collection('users'))
    }),
    unbindUsers:  firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef('users');
    }),
    bindUser: firestoreAction((context) => {
      return context.bindFirestoreRef('userBind', db.collection('users').doc(context.state.userAuth.user.email))
    }), 
    bindSubjects: firestoreAction((context, payload) => {
      console.log(payload.filter);
      return context.bindFirestoreRef('subjects', db.collection('users')
      .doc(context.state.userAuth.user.email)
      .collection("subjects")
      .where("type", "==", payload.filter).limit(payload.limit))
    }),
  },
  
})
