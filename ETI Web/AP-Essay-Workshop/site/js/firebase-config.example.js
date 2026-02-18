// ============================================
// Firebase Configuration — EXAMPLE FILE
// ============================================
// Copy this file to firebase-config.js and fill in your values.
// firebase-config.js is gitignored — do not commit it directly.
//
// Get these values from:
// Firebase Console → Project Settings → General → Your Apps → Web App

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
