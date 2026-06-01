import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* 🔥 YOUR FIREBASE CONFIG */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

/* SIGN UP */
export async function signup(email, password) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

/* LOGIN */
export async function login(email, password) {
  return await signInWithEmailAndPassword(auth, email, password);
}

/* LOGOUT */
export function logout() {
  return signOut(auth);
}

/* CHECK USER */
export function onUserChanged(callback) {
  return onAuthStateChanged(auth, callback);
}
