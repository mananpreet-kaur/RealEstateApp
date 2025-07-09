// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "urban-abode-f9277.firebaseapp.com",
  projectId: "urban-abode-f9277",
  storageBucket: "urban-abode-f9277.firebasestorage.app",
  messagingSenderId: "575064130989",
  appId: "1:575064130989:web:c844a4c8d381fc80948d24"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);