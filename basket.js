
//en son kod//en son kod//en son kod//en son kod//en son kod//en son kod//en son kod//en son kod//en son kod//en son kod//en son kod

document.addEventListener("DOMContentLoaded", () => {
  const accessToken = "";
  const apiUrl = "http://localhost:3000/api/baskets";

  const basketCountEl = document.getElementById("basket-count");
  const totalPriceEl = document.getElementById("total-price");
  const cartItemsEl = document.getElementById("cart-items");
  const clearCartBtn = document.getElementById("clear-cart");

  // Fetch basket items
  async function fetchBasketItems() {
    try {
      const response = await fetch(`${apiUrl}/view`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch basket items");
      }

      const data = await response.json();
      renderCartItems(data.basket.products || []);
    } catch (error) {
      console.error(error);
      alert("Error fetching basket items");
    }
  }

  // Render basket items
  function renderCartItems(items) {
    cartItemsEl.innerHTML = ""; // Clear previous items
    let totalPrice = 0;

    items.forEach((item) => {
      totalPrice += item.productId.price * item.quantity;

      const cartItem = document.createElement("div");
      cartItem.className = "bg-white p-4 rounded shadow";

      cartItem.innerHTML = `
        <img src="${item.productId.image}" alt="${item.productId.name}" class="w-full h-40 object-cover mb-2">
        <h3 class="text-lg font-bold">${item.productId.name}</h3>
        <p class="text-gray-500">$${item.productId.price} x ${item.quantity}</p>
        <button 
          class="mt-2 bg-red-500 text-white px-4 py-1 rounded"
          data-id="${item.productId._id}">
          Remove
        </button>
      `;

      const removeBtn = cartItem.querySelector("button");
      removeBtn.addEventListener("click", () => removeBasketItem(item.productId._id));

      cartItemsEl.appendChild(cartItem);
    });

    basketCountEl.textContent = items.length;
    totalPriceEl.textContent = `$${totalPrice}`;
  }

  // Add item to basket
  async function addBasketItem(productId, quantity) {
    try {
      const response = await fetch(`${apiUrl}/add`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to basket");
      }

      await fetchBasketItems();
    } catch (error) {
      console.error(error);
      alert("Error adding item to basket");
    }
  }

  // Remove item from basket
  async function removeBasketItem(productId) {
    try {
      const response = await fetch(`${apiUrl}/remove/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to remove item from basket");
      }

      await fetchBasketItems();
    } catch (error) {
      console.error(error);
      alert("Error removing item from basket");
    }
  }

  // Clear all items in basket
  async function clearBasket() {
    try {
      const response = await fetch(`${apiUrl}/clearAll`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to clear basket");
      }

      await fetchBasketItems();
    } catch (error) {
      console.error(error);
      alert("Error clearing basket");
    }
  }

  $("#user-icon").click((e) => {
    e.stopPropagation();
    $("#dropdown-menu").toggleClass("hidden");
  });
  
  $("#dropdown-menu #manageMyAccount").click((e) => {
    checkLogin()
  });
  
  $("#dropdown-menu #logOut").click((e) => {
    window.location.href = "login.html"
  })
  
  $("#basket-shopping").click((e) => {
    ClearCookies()
    window.location.href = "basket.html"
  })

  // Attach event listener to clear cart button
  clearCartBtn.addEventListener("click", clearBasket);

  // Initial fetch
  fetchBasketItems();
});
