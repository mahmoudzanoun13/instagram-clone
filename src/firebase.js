import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyALDJPOPmLEZw9y6LjDqDQ18h7sf8DBDbc",
  authDomain: "instagram-clone-bd071.firebaseapp.com",
  databaseURL: "https://instagram-clone-bd071-default-rtdb.firebaseio.com",
  projectId: "instagram-clone-bd071",
  storageBucket: "instagram-clone-bd071.appspot.com",
  messagingSenderId: "40409760245",
  appId: "1:40409760245:web:8500aeff9636f2ffea60bc",
  measurementId: "G-8NQRBPST7V"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

