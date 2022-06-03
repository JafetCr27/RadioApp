import firebase from 'firebase/app'

import 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyBND2T6Hc8ha2xGfsSaGiqnrx_07dHIlPI",
  authDomain: "restaurants-62299.firebaseapp.com",
  projectId: "restaurants-62299",
  storageBucket: "restaurants-62299.appspot.com",
  messagingSenderId: "279531283437",
  appId: "1:279531283437:web:f65838bb476f2c564afde4"
};
export const firebaseApp = firebase.initializeApp(firebaseConfig)