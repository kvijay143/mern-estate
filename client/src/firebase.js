// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-2cc10.firebaseapp.com",
  projectId: "mern-estate-2cc10",
  storageBucket: "mern-estate-2cc10.appspot.com",
  messagingSenderId: "363218677224",
  appId: "1:363218677224:web:7037925e8aac493d81885d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
