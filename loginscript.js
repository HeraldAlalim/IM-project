document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();
  
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  // Predefined users with roles
  const users = {
      admin: { password: "admin123", role: "admin" },
      cashier: { password: "cash123", role: "cashier" },
      sales: { password: "sales123", role: "sales" }
  };

  // Validate login
  if (users[username] && users[username].password === password) {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("userRole", users[username].role);
      window.location.href = "dashboard.html"; // Redirect to dashboard
  } else {
      document.getElementById("error-message").textContent = "Invalid username or password!";
  }
});
