
import firebase from 'firebase'
// import 'firebase/firestore'

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
  // firebase.analytics();

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples

export { firebase, db }

// if using Firebase JS SDK < 5.8.0
db.settings({ timestampsInSnapshots: true })