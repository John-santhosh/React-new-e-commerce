// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "react-e-commerce-website-acdae.firebaseapp.com",
  projectId: "react-e-commerce-website-acdae",
  storageBucket: "react-e-commerce-website-acdae.appspot.com",
  messagingSenderId: "851083538157",
  appId: "1:851083538157:web:afa9954e07174e5f48e6e4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Google auth

export const provider = new GoogleAuthProvider();

// Initialize Cloud
export const db = getFirestore(app);
