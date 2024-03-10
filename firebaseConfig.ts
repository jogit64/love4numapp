// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2ZoZ655sK2zuNyJHJH5tb49VVdomC5NY",
  authDomain: "love4num-3ffd4.firebaseapp.com",
  projectId: "love4num-3ffd4",
  storageBucket: "love4num-3ffd4.appspot.com",
  messagingSenderId: "122238583413",
  appId: "1:122238583413:web:4fdc52aa3a128e42b22e3c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export Firestore for use in your app
export { db };
