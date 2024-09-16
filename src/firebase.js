// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA0yQn0K5lq82PtlcJz1kA8xUfscYEYsuw",
    authDomain: "student-teacher-ff7d3.firebaseapp.com",
    projectId: "student-teacher-ff7d3",
    storageBucket: "student-teacher-ff7d3.appspot.com",
    messagingSenderId: "577125850723",
    appId: "1:577125850723:web:a325df09b89e6dbfd5a256",
    measurementId: "G-L9RMX5KG6P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);