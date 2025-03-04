document.addEventListener("DOMContentLoaded", function () {
  const userRole = localStorage.getItem("userRole");

  if (!userRole) {
      console.error("No user role found. Redirecting to login.");
      window.location.href = "index.html";
      return;
  }

  const accessRules = {
      admin: ["dashboard.html", "sales.html", "inventory.html", "return_exchange.html", "attendance.html", "employee_attendance.html", "add_employee.html", "Employee.html", "logout.html"],
      cashier: ["dashboard.html", "sales.html", "return_exchange.html", "employee_attendance.html", "logout.html"],
      sales: ["dashboard.html", "inventory.html", "employee_attendance.html", "logout.html"]
  };

  if (!accessRules[userRole]) {
      console.error("Invalid user role detected. Redirecting to login.");
      window.location.href = "index.html";
      return;
  }

  // Hide unauthorized menu items
  document.querySelectorAll("ul li").forEach(item => {
      const link = item.querySelector("a");
      if (link) {
          const href = link.getAttribute("href");
          if (!accessRules[userRole].includes(href)) {
              item.remove(); // Fully remove the element instead of just hiding it
          }
      }
  });

  console.log(`Access rules applied for ${userRole}`);
});
