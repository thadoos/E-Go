// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { signInWithEmailAndPassword } from "firebase/auth";

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBvDXd5V_VtD7QUwavPJBHiVeDsuO--aj0",
  authDomain: "e-go-18484.firebaseapp.com",
  projectId: "e-go-18484",
  storageBucket: "e-go-18484.appspot.com",
  messagingSenderId: "686061265966",
  appId: "1:686061265966:web:533010269c00dce8992bbf",
  measurementId: "G-X2SGJD4GFN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)