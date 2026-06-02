import { initAuth, currentUser, logout } from "./auth.js";

export function loadNavbar() {
  const navbar = document.getElementById("navbar");

  initAuth(() => {
    if (!navbar) return;

    // =========================
    // GUEST USER (OLJ STYLE SIMPLE)
    // =========================
    if (!currentUser) {
      navbar.innerHTML = `
        <a href="index.html">Home</a>
        <a href="jobs.html">Jobs</a>
        <a href="login.html">Login</a>
        <a href="signup.html" class="nav-btn">Sign Up</a>
      `;
    }

    // =========================
    // EMPLOYER DASHBOARD NAV
    // =========================
    else if (currentUser.role === "employer") {
      navbar.innerHTML = `
        <a href="index.html">Home</a>
        <a href="jobs.html">Browse Jobs</a>
        <a href="post-job.html" class="nav-btn">Post Job</a>
        <a href="employer-dashboard.html">Dashboard</a>
        <a href="#" id="logout">Logout</a>
      `;
    }

    // =========================
    // FREELANCER NAV
    // =========================
    else {
      navbar.innerHTML = `
        <a href="index.html">Home</a>
        <a href="jobs.html">Find Jobs</a>
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
