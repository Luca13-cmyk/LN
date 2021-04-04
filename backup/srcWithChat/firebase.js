
// import firebase from 'firebase'
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/auth';

// Get a Firestore instance
  const db = firebase
  .initializeApp({ 
    apiKey: "AIzaSyCrk-0oFFGmcqvIVx6oMvLmyHqWgP4BnBc",
    authDomain: "ln-app-626c8.firebaseapp.com",
    projectId: "ln-app-626c8",
    storageBucket: "ln-app-626c8.appspot.com",
    messagingSenderId: "546655056410",
    appId: "1:546655056410:web:99dc49ed31b9cff58997a3",
    measurementId: "G-XXWQJ9K0RZ"

   })
  .firestore()
  firebase.analytics();

export { firebase, db }

// if using Firebase JS SDK < 5.8.0
db.settings({ timestampsInSnapshots: true })