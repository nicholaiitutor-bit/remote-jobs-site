import { auth, db } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const navbar = document.getElementById("navbar");

onAuthStateChanged(auth, async (user) => {

  if (!navbar) return;

  if (!user) {

    navbar.innerHTML = `
      <a href="index.html">Home</a>
      <a href="jobs.html">Jobs</a>
      <a href="login.html">Login</a>
      <a href="signup.html">Sign Up</a>
    `;

    return;
  }

  const snap = await getDoc(doc(db, "users", user.uid));

  if (!snap.exists()) return;

  const data = snap.data();

  if (data.role === "employer") {

    navbar.innerHTML = `
      <a href="index.html">Home</a>
      <a href="jobs.html">Jobs</a>
      <a href="post-job.html">Post Job</a>
      <a href="employer-dashboard.html">Dashboard</a>
      <a href="#" id="logoutBtn">Logout</a>
    `;

  } else {

    navbar.innerHTML = `
      <a href="index.html">Home</a>
      <a href="jobs.html">Jobs</a>
      <a href="jobseeker-dashboard.html">My Applications</a>
      <a href="#" id="logoutBtn">Logout</a>
    `;

  }

  document
    .getElementById("logoutBtn")
    ?.addEventListener("click", async (e) => {

      e.preventDefault();

      await signOut(auth);

      window.location.href = "index.html";

    });

});
