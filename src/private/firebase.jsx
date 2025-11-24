import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyCwMl_gqnCvWG0toyl523zlxZ3m73e45IM",
  authDomain: "wc-employermanagementsystem.firebaseapp.com",
  projectId: "wc-employermanagementsystem",
  storageBucket: "wc-employermanagementsystem.firebasestorage.app",
  messagingSenderId: "956979200851",
  appId: "1:956979200851:web:b09581842cb1fb57d417a6",
  measurementId: "G-4LLSZVPRFQ",
  databaseURL: "https://wc-employermanagementsystem-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);