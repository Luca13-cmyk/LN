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
    subjects: [],
    topics: [],
    links: []
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
    bindSubjects: firestoreAction((context) => {

        return context.bindFirestoreRef('subjects', db.collection('users')
        .doc(context.state.userAuth.user.email)
        .collection("subjects")
        );
    }),
    unbindSubjects: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef('subjects');
    }),
    bindTopics: firestoreAction((context, payload) => {
      return context.bindFirestoreRef('topics', db.collection('users')
        .doc(context.state.userAuth.user.email)
        .collection("subjects").doc(payload.filter).collection('topics').limit(payload.limit));
    }),
    unbindTopics: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef('topics');
    }),
    bindLinks: firestoreAction((context) => {
      return context.bindFirestoreRef('links', db.collection('users')
        .doc(context.state.userAuth.user.email)
        .collection("links"));
    }),
    unbindLinks: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef('links');
    }), 
  },
  
})
