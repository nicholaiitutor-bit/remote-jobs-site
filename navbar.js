import { auth } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

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

  const userDoc = await getDoc(doc(db, "users", user.uid));

  if (!userDoc.exists()) {
    return;
  }

  const userData = userDoc.data();

  if (userData.role === "employer") {

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

  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      await signOut(auth);
      window.location.href = "index.html";
    });
  }

});
