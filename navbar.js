import { initAuth, currentUser, logout } from "./auth.js";

export function loadNavbar() {
  const navbar = document.getElementById("navbar");

  initAuth(() => {

    // GUEST USER
    if (!currentUser) {
      navbar.innerHTML = `
        <a href="index.html">Home</a>
        <a href="jobs.html">Jobs</a>
        <a href="login.html">Login</a>
        <a href="signup.html">Sign Up</a>
      `;
    }

    // EMPLOYER
    else if (currentUser.role === "employer") {
      navbar.innerHTML = `
        <a href="index.html">Home</a>
        <a href="jobs.html">Jobs</a>
        <a href="post-job.html">Post Job</a>
        <a href="employer-dashboard.html">Dashboard</a>
        <a href="#" id="logout">Logout</a>
      `;
    }

    // FREELANCER
    else {
      navbar.innerHTML = `
        <a href="index.html">Home</a>
        <a href="jobs.html">Jobs</a>
        <a href="freelancer-dashboard.html">My Applications</a>
        <a href="#" id="logout">Logout</a>
      `;
    }

    document.getElementById("logout")?.addEventListener("click", async () => {
      await logout();
      location.reload();
    });
  });
}
