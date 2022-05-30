// import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

// // TODO: Replace the following with your app's Firebase project configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyCrZ8bhqbPg5_NZlajN1ROCPvqTpGBVe7U",
//     authDomain: "chat-quasar-be0a4.firebaseapp.com",
//     projectId: "chat-quasar-be0a4",
//     storageBucket: "chat-quasar-be0a4.appspot.com",
//     messagingSenderId: "399303049787",
//     appId: "1:399303049787:web:665d1df5b5c4c3f2d7121e",
//     measurementId: "G-HRXNF7SH5F"
// };

// let firebaseApp = firebase.initializeApp(firebaseConfig);
// let firebaseAuth = firebaseApp.auth();
// let firebaseDb = firebaseApp.database();
// // const app = initializeApp(firebaseConfig);
// export default {firebaseApp, firebaseAuth, firebaseDb}

import * as firebase from 'firebase/app'

var firebaseConfig = {
    apiKey: "AIzaSyCrZ8bhqbPg5_NZlajN1ROCPvqTpGBVe7U",
    authDomain: "chat-quasar-be0a4.firebaseapp.com",
    projectId: "chat-quasar-be0a4",
    storageBucket: "chat-quasar-be0a4.appspot.com",
    messagingSenderId: "399303049787",
    appId: "1:399303049787:web:665d1df5b5c4c3f2d7121e",
    measurementId: "G-HRXNF7SH5F"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;