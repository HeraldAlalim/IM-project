document.addEventListener("DOMContentLoaded", function () {
  let cartButton = document.getElementById("cartButton");
  let cartPopup = document.getElementById("cartPopup");
  let closeCart = document.getElementById("closeCart");
  let addToCartButtons = document.querySelectorAll(".add-to-cart");
  let cartContent = document.querySelector(".cart-content");

  let cartItems = [];

  // Ensure user is logged in
  if (localStorage.getItem("loggedIn") !== "true") {
      window.location.href = "index.html";
  }

  // Get the logged-in user's role
  const userRole = localStorage.getItem("userRole");

  // Define restricted pages for each role
  const restrictions = {
      cashier: ["inventory.html"],
      sales: ["sales.html"],
  };

  const currentPage = window.location.pathname.split("/").pop();

  // Restrict access to certain pages based on role
  if (restrictions[userRole] && restrictions[userRole].includes(currentPage)) {
      alert("Access Denied: You do not have permission to access this page.");
      window.location.href = "dashboard.html"; // Redirect to dashboard
  }

  // Hide sidebar links based on role restrictions
  function hideRestrictedLinks() {
      if (userRole === "cashier") {
          let inventoryLink = document.querySelector('a[href="inventory.html"]');
          if (inventoryLink) inventoryLink.parentElement.style.display = "none";
      }
      if (userRole === "sales") {
          let salesLink = document.querySelector('a[href="sales.html"]');
          if (salesLink) salesLink.parentElement.style.display = "none";
      }
  }

  hideRestrictedLinks(); // Call function to hide links

  // Logout functionality
  document.getElementById("logoutButton").addEventListener("click", function () {
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("userRole"); // Clear stored role
      window.location.href = "index.html";
  });

  // Toggle Cart Popup
  cartButton.addEventListener("click", function () {
      cartPopup.style.display = cartPopup.style.display === "block" ? "none" : "block";
  });

  // Close Cart Popup
  closeCart.addEventListener("click", function () {
      cartPopup.style.display = "none";
  });

  // Add to cart functionality
  addToCartButtons.forEach(button => {
      button.addEventListener("click", (e) => {
          let productName = e.target.parentElement.querySelector("h3").innerText;
          let productPrice = e.target.parentElement.querySelector("p").innerText;
          cartItems.push({ name: productName, price: productPrice });
          updateCart();
      });
  });

  function updateCart() {
      cartContent.innerHTML = "";
      if (cartItems.length === 0) {
          cartContent.innerHTML = "<p>No items in cart.</p>";
      } else {
          cartItems.forEach(item => {
              let itemElement = document.createElement("p");
              itemElement.textContent = `${item.name} - ${item.price}`;
              cartContent.appendChild(itemElement);
          });
      }
  }
});
