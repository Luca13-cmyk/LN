import Vue from 'vue'
import Vuex from 'vuex'
import {vuexfireMutations, firestoreAction} from 'vuexfire';
import info from './modules/info';
import edit from './modules/edit';
import {FirebaseActions} from '@/utils/FirebaseActions'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    info,
    edit
  },
  state: {
    login: false,
    users: [],
    userBind: [],
    userAuth: [],
    subjects: [],
    topics: [],
    links: [],
    toDo: [],
    contacts: []
  },
  mutations: {
    ...vuexfireMutations,
  },
  actions: {
    bindUsers: firestoreAction(context => {
      return context.bindFirestoreRef('users', FirebaseActions.getUsers())
    }),
    unbindUsers:  firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef('users');
    }),
    bindUser: firestoreAction((context) => {
      return context.bindFirestoreRef('userBind', 
      FirebaseActions.getUserAuth())
    }), 
    bindSubjects: firestoreAction((context) => {

        return context.bindFirestoreRef('subjects', 
          FirebaseActions.getCollectionUserAuth("subjects")
        );
    }),
    unbindSubjects: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef('subjects');
    }),
    bindTopics: firestoreAction((context, payload) => {
      return context.bindFirestoreRef('topics', 
      FirebaseActions.getSubjectUserAuth(payload.filter)
      .collection('topics').limit(payload.limit));
    }),
    unbindTopics: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef('topics');
    }),
    bindLinks: firestoreAction((context) => {
      return context.bindFirestoreRef('links', 
      FirebaseActions.getCollectionUserAuth("links"));
    }),
    unbindLinks: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef('links');
    }),
    bindTodo: firestoreAction((context) => {
      return context.bindFirestoreRef('toDo', 
      FirebaseActions.getCollectionUserAuth("ToDo")
        .orderBy("timeStamp", "desc"));
    }),
    unbindTodo: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef('toDo');
    }),
    bindContacts: firestoreAction((context) => {
      return context.bindFirestoreRef('contacts', 
      FirebaseActions.getCollectionUserAuth("contacts")
        .orderBy("name", "desc"));
    }),
    unbindContacts: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef('contacts');
    }), 
  },
  
})
