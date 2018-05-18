import firebase from 'firebase'
require('firebase/firestore')
var config = {
    apiKey: "AIzaSyDQ33SYTlVJyUAa51csm8MT2BcLR8Azlyg",
    authDomain: "projectlink-c4a56.firebaseapp.com",
    databaseURL: "https://projectlink-c4a56.firebaseio.com",
    projectId: "projectlink-c4a56",
    storageBucket: "",
    messagingSenderId: "164135122402"
  };
  var firebase_init=firebase.initializeApp(config);
  export const Authprovider = new firebase.auth.GoogleAuthProvider();
  export const auth = firebase.auth();
  export const firestore=firebase.firestore();
  export default firebase_init;