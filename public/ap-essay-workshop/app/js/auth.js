// ============================================
// Authentication Module
// ============================================
import { auth, googleProvider } from './firebase-config.js';

const authScreen = document.getElementById('auth-screen');
const mainApp = document.getElementById('main-app');
const signInBtn = document.getElementById('sign-in-btn');
const signOutBtn = document.getElementById('sign-out-btn');
const userName = document.getElementById('user-name');

let currentUser = null;
let onAuthCallback = null;

export function onUserReady(callback) {
  onAuthCallback = callback;
}

export function getCurrentUser() {
  return currentUser;
}

// Auth state listener
auth.onAuthStateChanged((user) => {
  if (user) {
    currentUser = user;
    authScreen.classList.add('hidden');
    mainApp.classList.remove('hidden');
    userName.textContent = user.displayName || user.email;
    if (onAuthCallback) onAuthCallback(user);
  } else {
    currentUser = null;
    authScreen.classList.remove('hidden');
    mainApp.classList.add('hidden');
  }
});

// Sign in
signInBtn.addEventListener('click', async () => {
  try {
    await auth.signInWithPopup(googleProvider);
  } catch (err) {
    if (err.code !== 'auth/popup-closed-by-user') {
      console.error('Sign-in error:', err);
    }
  }
});

// Sign out
signOutBtn.addEventListener('click', async () => {
  try {
    await auth.signOut();
  } catch (err) {
    console.error('Sign-out error:', err);
  }
});
