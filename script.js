document.addEventListener("DOMContentLoaded", function () {
  let cartButton = document.getElementById("cartButton");
  let cartPopup = document.getElementById("cartPopup");
  let closeCart = document.getElementById("closeCart");
  let addToCartButtons = document.querySelectorAll(".add-to-cart");
  let cartContent = document.querySelector(".cart-content");

  let cartItems = [];

  // Toggle Cart Popup
  cartButton.addEventListener("click", function () {
      cartPopup.style.display = cartPopup.style.display === "block" ? "none" : "block";
  });

  // Close Cart Popup
  closeCart.addEventListener("click", function () {
      cartPopup.style.display = "none";
  });

  // Hide cart popup when clicking outside
  document.addEventListener("click", function (event) {
      if (!cartPopup.contains(event.target) && !cartButton.contains(event.target)) {
          cartPopup.style.display = "none";
      }
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

          // Payment Option Dropdown (Fully Paid / Installment)
          let paymentLabel = document.createElement("label");
          paymentLabel.textContent = "Payment Option: ";
          let paymentSelect = document.createElement("select");

          let options = ["Fully Paid", "Installment (3 Months)", "Installment (6 Months)", "Installment (12 Months)"];
          options.forEach(optionText => {
              let option = document.createElement("option");
              option.value = optionText;
              option.textContent = optionText;
              paymentSelect.appendChild(option);
          });

          // Payment Method Dropdown (Cash, GCash, Credit Card)
          let methodLabel = document.createElement("label");
          methodLabel.textContent = "Payment Method: ";
          let methodSelect = document.createElement("select");

          let methods = ["Cash", "GCash", "Credit Card"];
          methods.forEach(methodText => {
              let option = document.createElement("option");
              option.value = methodText;
              option.textContent = methodText;
              methodSelect.appendChild(option);
          });

          // Confirm Payment Button
          let confirmButton = document.createElement("button");
          confirmButton.textContent = "Confirm Payment";
          confirmButton.className = "confirm-button";
          confirmButton.addEventListener("click", () => {
              let selectedOption = paymentSelect.value;
              let selectedMethod = methodSelect.value;
              
              alert(`You selected: ${selectedOption} using ${selectedMethod}`);
              cartItems = [];
              updateCart();
          });

          // Append Elements to Cart Popup
          cartContent.appendChild(paymentLabel);
          cartContent.appendChild(paymentSelect);
          cartContent.appendChild(document.createElement("br")); // Line Break
          cartContent.appendChild(methodLabel);
          cartContent.appendChild(methodSelect);
          cartContent.appendChild(document.createElement("br")); // Line Break
          cartContent.appendChild(confirmButton);
      }
  }

  // 🔎 Search Bar Functionality (ADDED)
  const searchInput = document.getElementById("searchBar");
  const productCards = document.querySelectorAll(".card");

  searchInput.addEventListener("keyup", function () {
      const searchText = searchInput.value.toLowerCase();

      productCards.forEach(card => {
          const productName = card.textContent.toLowerCase();
          card.style.display = productName.includes(searchText) ? "block" : "none";
      });
  });

});
