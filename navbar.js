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

if (!navbar) {
  console.warn("Navbar not found on this page");
}

onAuthStateChanged(auth, async (user) => {

  if (!navbar) return;

  // GUEST
  if (!user) {
    navbar.innerHTML = `
      <a href="index.html">Home</a>
      <a href="jobs.html">Jobs</a>
      <a href="login.html">Login</a>
      <a href="signup.html">Sign Up</a>
    `;
    return;
  }

  try {
    const snap = await getDoc(doc(db, "users", user.uid));

    const data = snap.exists() ? snap.data() : null;

    const baseNav = `
      <a href="index.html">Home</a>
      <a href="jobs.html">Jobs</a>
    `;

    let roleNav = "";

    if (data?.role === "employer") {
      roleNav = `
        <a href="post-job.html">Post Job</a>
        <a href="employer-dashboard.html">Dashboard</a>
      `;
    } else {
      roleNav = `
        <a href="jobseeker-dashboard.html">My Applications</a>
      `;
    }

    navbar.innerHTML = `
      ${baseNav}
      ${roleNav}
      <a href="#" id="logoutBtn">Logout</a>
    `;

    document.getElementById("logoutBtn")?.addEventListener("click", async (e) => {
      e.preventDefault();
      await signOut(auth);
      window.location.href = "index.html";
    });

  } catch (err) {
    console.error(err);
  }
});
