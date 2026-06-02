import { initAuth, currentUser, logout } from "./auth.js";

export function loadNavbar() {
  const navbar = document.getElementById("navbar");

  initAuth(() => {
    if (!navbar) return;

    if (!currentUser) {
      navbar.innerHTML = `
        <a href="index.html">Home</a>
        <a href="jobs.html">Jobs</a>
        <a href="login.html">Login</a>
        <a href="signup.html">Sign Up</a>
      `;
    } else if (currentUser.role === "employer") {
      navbar.innerHTML = `
        <a href="index.html">Home</a>
        <a href="jobs.html">Jobs</a>
        <a href="post-job.html">Post Job</a>
        <a href="employer-dashboard.html">Dashboard</a>
        <a href="#" id="logout">Logout</a>
      `;
    } else {
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
