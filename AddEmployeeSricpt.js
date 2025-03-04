document.addEventListener("DOMContentLoaded", function () {
  // Ensure user is logged in
  if (localStorage.getItem("loggedIn") !== "true") {
      window.location.href = "index.html";
  }

  // Get the logged-in user's role
  const userRole = localStorage.getItem("userRole");

  // Restrict access to non-admins
  if (userRole !== "admin") {
      alert("Access Denied: Only admins can add employees.");
      window.location.href = "dashboard.html"; // Redirect unauthorized users
  }

  // Handle form submission
  document.getElementById("addEmployeeForm").addEventListener("submit", function (event) {
      event.preventDefault();

      let name = document.getElementById("name").value.trim();
      let birthday = document.getElementById("birthday").value;
      let contact = document.getElementById("contact").value.trim();
      let employeeType = document.getElementById("employeeType").value;
      let username = document.getElementById("username").value.trim();
      let password = document.getElementById("password").value.trim();

      if (!name || !birthday || !contact || !employeeType || !username || !password) {
          alert("Please fill in all fields.");
          return;
      }

      // Get existing employees from localStorage
      let employees = JSON.parse(localStorage.getItem("employees")) || [];

      // Check if username already exists
      if (employees.some(emp => emp.username === username)) {
          alert("Username already exists. Please choose a different one.");
          return;
      }

      // Add new employee
      employees.push({ name, birthday, contact, employeeType, username, password });
      localStorage.setItem("employees", JSON.stringify(employees));

      alert("Employee added successfully!");
      document.getElementById("addEmployeeForm").reset(); // Reset form
  });
});