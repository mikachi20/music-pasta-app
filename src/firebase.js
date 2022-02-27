import Vue from "vue";
import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
// import "./firebase.js";

const firebaseConfig = {
  apiKey: "AIzaSyBKYWVcMOaj5xxLQHj7XMuIln_X9UeHzuw",
  authDomain: "search-osusume.firebaseapp.com",
  projectId: "search-osusume",
  storageBucket: "search-osusume.appspot.com",
  messagingSenderId: "605574738049",
  appId: "1:605574738049:web:23fa7e529ed8bd22739d80",
  measurementId: "G-F0H1HHVVYJ",
};

firebase.initializeApp(firebaseConfig);

export const functions = firebase.functions();

const initialUserState = {
  uid: "",
  displayName: "",
  photoURL: "",
};
const $auth = Vue.observable({
  currentUser: { ...initialUserState },
});
firebase.auth().onAuthStateChanged((user) => {
  let state;
  if (user) {
    const { uid, displayName, photoURL } = user;
    state = {
      uid,
      displayName,
      photoURL,
    };
  } else {
    state = initialUserState;
  }
  Object.assign($auth.currentUser, state);
});
Vue.prototype.$auth = $auth;
