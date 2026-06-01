function signup() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let role = document.getElementById("role").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  users.push({ name, email, password, role });

  localStorage.setItem("users", JSON.stringify(users));

  alert("Account created! Please login.");
  window.location.href = "login.html";
}

function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid login!");
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(user));

  alert("Welcome " + user.name);
  window.location.href = "index.html";
}

function logout() {
  localStorage.removeItem("loggedInUser");
  alert("Logged out");
  window.location.href = "index.html";
}

function getUser() {
  return JSON.parse(localStorage.getItem("loggedInUser"));
}
