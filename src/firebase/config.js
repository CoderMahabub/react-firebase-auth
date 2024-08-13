
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA_RExZBKES3Xec7zqZp9j36FouxxWlCoE",
    authDomain: "book-list-with-firebase-124f7.firebaseapp.com",
    projectId: "book-list-with-firebase-124f7",
    storageBucket: "book-list-with-firebase-124f7.appspot.com",
    messagingSenderId: "877346490423",
    appId: "1:877346490423:web:e1f9fc8909f6bc364317b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);