function signup() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let role = document.getElementById("role").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // prevent duplicate emails
  let exists = users.find(u => u.email === email);
  if (exists) {
    alert("Email already exists!");
    return;
  }

  users.push({ name, email, password, role });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Account created successfully!");
  window.location.href = "login.html";
}

function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    alert("Invalid email or password!");
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(user));

  alert("Welcome " + user.name);
  window.location.href = "index.html";
}

function logout() {
  localStorage.removeItem("loggedInUser");
  alert("Logged out successfully!");
  window.location.href = "index.html";
}

function getUser() {
  return JSON.parse(localStorage.getItem("loggedInUser"));
}
