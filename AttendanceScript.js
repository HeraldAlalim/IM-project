document.addEventListener("DOMContentLoaded", function () {
  // Ensure user is logged in
  if (localStorage.getItem("loggedIn") !== "true") {
      window.location.href = "index.html";
  }

  // Get the logged-in user's role
  const userRole = localStorage.getItem("userRole");

  // Define restricted pages for each role
  const restrictions = {
      cashier: ["inventory.html", "employee_attendance.html", "add_employee.html"],
      sales: ["sales.html", "employee_attendance.html", "add_employee.html"],
  };

  const currentPage = window.location.pathname.split("/").pop();

  // Restrict access to certain pages based on role
  if (restrictions[userRole] && restrictions[userRole].includes(currentPage)) {
      alert("Access Denied: You do not have permission to access this page.");
      window.location.href = "dashboard.html"; // Redirect to dashboard
  }

  // Hide restricted sidebar links based on role
  function hideRestrictedLinks() {
      if (restrictions[userRole]) {
          restrictions[userRole].forEach(page => {
              let link = document.querySelector(`a[href="${page}"]`);
              if (link) link.parentElement.style.display = "none"; // Hide the link
          });
      }
  }

  hideRestrictedLinks(); // Call function to hide links

  // Update the attendance title when a month button is clicked
  document.querySelectorAll(".month-btn").forEach(button => {
      button.addEventListener("click", function() {
          document.getElementById("selectedMonth").textContent = "Employee Attendance - " + this.dataset.month;
          document.querySelectorAll(".month-btn").forEach(btn => btn.classList.remove("active-month"));
          this.classList.add("active-month");
      });
  });
});