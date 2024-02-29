// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3yxqLc9pZ_gytopzWqOMJ1IpH9fecqBc",
  authDomain: "love4num-app.firebaseapp.com",
  projectId: "love4num-app",
  storageBucket: "love4num-app.appspot.com",
  messagingSenderId: "288253781118",
  appId: "1:288253781118:web:425a440a8a76f71d5be42f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export Firestore for use in your app
export { db };
