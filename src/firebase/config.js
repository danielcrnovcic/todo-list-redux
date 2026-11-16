// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDp6uIQUR3PwmvZbKoHQmpmB73VIUcqk6s",
  authDomain: "todo-list-with-firebase-897c9.firebaseapp.com",
  projectId: "todo-list-with-firebase-897c9",
  storageBucket: "todo-list-with-firebase-897c9.firebasestorage.app",
  messagingSenderId: "1065368652591",
  appId: "1:1065368652591:web:30b0e6e6bc570028aaafda"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



export const auth = getAuth(app);
export const db = getFirestore(app);
