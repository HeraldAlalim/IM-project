document.addEventListener("DOMContentLoaded", function () {
  // Ensure user is logged in
  if (localStorage.getItem("loggedIn") !== "true") {
      window.location.href = "index.html";
  }

  // Get the logged-in user's role
  const userRole = localStorage.getItem("userRole");

  // Restrict access to non-admins
  if (userRole !== "admin") {
      alert("Access Denied: Only admins can view employee records.");
      window.location.href = "dashboard.html"; // Redirect unauthorized users
  }

  // Load employee records from localStorage
  function loadEmployees() {
      let employees = JSON.parse(localStorage.getItem("employees")) || [];
      const tableBody = document.getElementById("employeeTableBody");

      tableBody.innerHTML = ""; // Clear existing rows

      employees.forEach(emp => {
          let row = document.createElement("tr");
          row.innerHTML = `
              <td>${emp.name}</td>
              <td>${emp.birthday}</td>
              <td>${emp.contact}</td>
              <td>${emp.employeeType}</td>
              <td>${emp.username}</td>
          `;
          tableBody.appendChild(row);
      });
  }

  // Call function to load employees
  loadEmployees();
});
