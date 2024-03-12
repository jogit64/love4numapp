// generateFirebaseConfig.js
const fs = require("fs");
const path = require("path");

// Remplacez les valeurs ci-dessous par les noms de vos variables d'environnement réelles
const configContent = `
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export Firestore for use in your app
export { db };
`;

const filePath = path.join(__dirname, "firebaseConfig.ts"); // Ajustez le chemin selon la structure de votre projet
fs.writeFileSync(filePath, configContent.trim());
console.log("firebaseConfig.ts generated successfully.");
