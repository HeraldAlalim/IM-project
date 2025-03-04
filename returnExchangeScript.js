document.addEventListener("DOMContentLoaded", function () {
  // 🔹 Define restricted pages for each role
  const restrictions = {
      cashier: ["inventory.html", "employee_attendance.html", "add_employee.html"],
      sales: ["sales.html", "employee_attendance.html", "add_employee.html"],
  };



  // 🔹 Form submission handling
  document.getElementById("returnExchangeForm").addEventListener("submit", function(event) {
      event.preventDefault();

      // Get input values
      const customerName = document.getElementById("customerName").value;
      const productName = document.getElementById("productName").value;
      const returnReason = document.getElementById("returnReason").value;
      const returnDate = document.getElementById("returnDate").value;
      const exchangeOption = document.getElementById("exchangeOption").value;

      // Insert record into table
      const table = document.getElementById("recordsTable");
      const newRow = table.insertRow();
      newRow.innerHTML = `
          <td>${customerName}</td>
          <td>${productName}</td>
          <td>${returnReason}</td>
          <td>${returnDate}</td>
          <td>${exchangeOption}</td>
      `;

      // Clear form fields
      this.reset();

      alert("Return/Exchange recorded successfully!");
  });
});
