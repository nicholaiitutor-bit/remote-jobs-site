import { initAuth, currentUser, logout } from "./auth.js";

export function loadNavbar(navElementId = "navbar") {
  const navbar = document.getElementById(navElementId);

  initAuth(() => {

    // NOT LOGGED IN
    if (!currentUser) {
      navbar.innerHTML = `
        <a href="index.html">Home</a>
        <a href="jobs.html">Jobs</a>
        <a href="login.html">Login</a>
        <a href="signup.html">Sign Up</a>
      `;
      return;
    }

    // EMPLOYER
    if (currentUser.role === "employer") {
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

    const btn = document.getElementById("logout");
    if (btn) {
      btn.onclick = async () => {
        await logout();
        location.reload();
      };
    }
  });
}
