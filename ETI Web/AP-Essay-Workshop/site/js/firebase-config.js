// ============================================
// Firebase Configuration
// ============================================
// INSTRUCTIONS:
// 1. Go to https://console.firebase.google.com
// 2. Create a new project (or use existing)
// 3. Go to Project Settings > General > Your Apps > Add Web App
// 4. Copy the config values below
// 5. Go to Authentication > Sign-in method > Enable Google
// 6. Go to Firestore Database > Create database (start in test mode)
// 7. Add your domain to Authentication > Settings > Authorized domains

const firebaseConfig = {
  apiKey: "AIzaSyCaxchF57v8bkXC9q_j6mNX09wJX5lHS1k",
  authDomain: "educationthatinspires-bb11a.firebaseapp.com",
  projectId: "educationthatinspires-bb11a",
  storageBucket: "educationthatinspires-bb11a.firebasestorage.app",
  messagingSenderId: "814755133920",
  appId: "1:814755133920:web:73bc209be8417154881385"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
