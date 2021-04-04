// import firebase from 'firebase'
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/analytics";
import "firebase/auth";

// Get a Firestore instance
const db = firebase.initializeApp({}).firestore();
firebase.analytics();

export { firebase, db };

// if using Firebase JS SDK < 5.8.0
db.settings({ timestampsInSnapshots: true });
