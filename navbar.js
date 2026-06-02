<script>
const user = JSON.parse(localStorage.getItem("currentUser"));
</script>

<header>
  <h2>Remote Work Hub PH</h2>

  <nav id="navbar"></nav>
</header>

<script>
function renderNav() {
  const nav = document.getElementById("navbar");

  if (!user) {
    nav.innerHTML = `
      <a href="index.html">Home</a>
      <a href="jobs.html">Jobs</a>
      <a href="login.html">Login</a>
      <a href="signup.html">Sign Up</a>
    `;
  } else if (user.role === "employer") {
    nav.innerHTML = `
      <a href="index.html">Home</a>
      <a href="jobs.html">Jobs</a>
      <a href="post-job.html">Post Job</a>
      <a href="employer-dashboard.html">Dashboard</a>
      <a href="#" onclick="logout()">Logout</a>
    `;
  } else {
    nav.innerHTML = `
      <a href="index.html">Home</a>
      <a href="jobs.html">Jobs</a>
      <a href="freelancer-dashboard.html">My Applications</a>
      <a href="#" onclick="logout()">Logout</a>
    `;
  }
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

renderNav();
</script>
