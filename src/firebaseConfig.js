
//declan's firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8ha0vvuVKNW0uZkcSs-Ut7Vq_1HzgOTQ",
  authDomain: "e-go-9daa0.firebaseapp.com",
  projectId: "e-go-9daa0",
  storageBucket: "e-go-9daa0.appspot.com",
  messagingSenderId: "156758455805",
  appId: "1:156758455805:web:4ff7b03086e5ca50a51594",
  measurementId: "G-SBDF0W82W3"
};

let app;
// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const auth = firebase.auth();

export { auth };
