export function renderNav() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const nav = document.getElementById("navbar");

  if (!nav) return;

  if (!user) {
    nav.innerHTML = `
      <a href="index.html">Home</a>
      <a href="jobs.html">Jobs</a>
      <a href="login.html">Login</a>
      <a href="signup.html">Sign Up</a>
    `;
  }

  else if (user.role === "employer") {
    nav.innerHTML = `
      <a href="index.html">Home</a>
      <a href="jobs.html">Jobs</a>
      <a href="post-job.html">Post Job</a>
      <a href="employer-dashboard.html">Dashboard</a>
      <a href="#" id="logout">Logout</a>
    `;
  }

  else {
    nav.innerHTML = `
      <a href="index.html">Home</a>
      <a href="jobs.html">Jobs</a>
      <a href="jobseeker-dashboard.html">My Applications</a>
      <a href="#" id="logout">Logout</a>
    `;
  }

  const logoutBtn = document.getElementById("logout");

  if (logoutBtn) {
    logoutBtn.onclick = () => {
      localStorage.removeItem("currentUser");
      window.location.href = "index.html";
    };
  }
}
