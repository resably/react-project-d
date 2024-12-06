import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBg2wC5eNkTb5kIyPwxypjH6aZ5P01lSlU",
    authDomain: "projectd-19a7d.firebaseapp.com",
    projectId: "projectd-19a7d",
    storageBucket: "projectd-19a7d.firebasestorage.app",
    messagingSenderId: "413080022800",
    appId: "1:413080022800:web:732e4accbfe8873883ff95"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);