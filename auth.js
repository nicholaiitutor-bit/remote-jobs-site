import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export let currentUser = null;

export function initAuth(callback) {
  onAuthStateChanged(auth, async (user) => {

    if (user) {
      const snap = await getDoc(doc(db, "users", user.uid));

      if (snap.exists()) {
        currentUser = {
          uid: user.uid,
          ...snap.data()
        };
      }
    } else {
      currentUser = null;
    }

    if (callback) callback(currentUser);
  });
}

export function logout() {
  return signOut(auth);
}
