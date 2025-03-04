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

  // Calculate total inventory value
  function calculateTotalInventoryValue() {
      let total = 0;
      const rows = document.querySelectorAll("#inventoryTable tbody tr");

      rows.forEach(row => {
          const price = parseFloat(row.children[2].textContent.replace('$', '')) || 0;
          total += price;
      });

      document.getElementById("totalInventoryValue").textContent = `${total.toFixed(2)}`;
  }

  // Function to add a product
  function addProduct() {
      let brand = document.getElementById("brand").value;
      let model = document.getElementById("model").value;
      let price = document.getElementById("price").value;
      let unit = document.getElementById("unit").value;

      if (brand && model && price && unit) {
          let table = document.getElementById("inventoryTable").getElementsByTagName('tbody')[0];
          let newRow = table.insertRow();

          newRow.innerHTML = `
              <td>${brand}</td>
              <td>${model}</td>
              <td>$${parseFloat(price).toFixed(2)}</td>
              <td>${parseInt(unit)}</td>
              <td><button onclick="deleteRow(this)">Delete</button></td>
          `;

          calculateTotalInventoryValue();
          document.getElementById("brand").value = "";
          document.getElementById("model").value = "";
          document.getElementById("price").value = "";
          document.getElementById("unit").value = "";
      } else {
          alert("Please fill all fields.");
      }
  }

  // Function to delete a product row
  function deleteRow(button) {
      let row = button.parentNode.parentNode;
      row.parentNode.removeChild(row);
      calculateTotalInventoryValue();
  }

  // Initialize total inventory value
  calculateTotalInventoryValue();

  // Expose functions to global scope
  window.addProduct = addProduct;
  window.deleteRow = deleteRow;
});