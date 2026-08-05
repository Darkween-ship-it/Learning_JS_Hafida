// Selecting elements
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");

// Toggle Cart Panel
cartIcon.addEventListener("click", () => {
    cart.classList.add("active");
});

cartClose.addEventListener("click", () => {
    cart.classList.remove("active");
});

// Add to Cart Functionality
const addCartButtons = document.querySelectorAll(".add-cart");

addCartButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        const productBox = event.target.closest(".product-box");
        addToCart(productBox);
    });
});

let cartItemCount = 0;

function addToCart(productBox) {
    const productImgSrc = productBox.querySelector("img").src;
    const productTitle = productBox.querySelector(".product-title").innerText;
    const productPrice = productBox.querySelector(".price").innerText;

    const cartContent = document.querySelector(".cart-content");
    const cartItems = cartContent.querySelectorAll(".cart-product-title");

    // Check for duplicate products in cart
    for (let item of cartItems) {
        if (item.innerText === productTitle) {
            alert("This item is already in the cart.");
            return;
        }
    }

    // Create cart box element dynamically
    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");

    cartBox.innerHTML = `
        <img src="${productImgSrc}" class="cart-img">
        <div class="cart-detail">
            <h2 class="cart-product-title">${productTitle}</h2>
            <span class="cart-price">${productPrice}</span>
            <div class="cart-quantity">
                <button class="decrement">-</button>
                <span class="number">1</span>
                <button class="increment">+</button>
            </div>
        </div>
        <i class="ri-delete-bin-line cart-remove"></i>
    `;

    cartContent.appendChild(cartBox);

    // Remove item listener
    cartBox.querySelector(".cart-remove").addEventListener("click", () => {
        cartBox.remove();
        updateTotalCalculations();
        updateCartCount(-1);
    });

    // Quantity change listener
    cartBox.querySelector(".cart-quantity").addEventListener("click", (event) => {
        const numberElement = cartBox.querySelector(".number");
        const decrementButton = cartBox.querySelector(".decrement");
        let quantity = parseInt(numberElement.innerText);

        if (event.target.classList.contains("decrement") && quantity > 1) {
            quantity--;
            if (quantity === 1) {
                decrementButton.style.color = "#888";
            }
        } else if (event.target.classList.contains("increment")) {
            quantity++;
            decrementButton.style.color = "#2b2b2b";
        }

        numberElement.innerText = quantity;
        updateTotalCalculations();
    });

    updateTotalCalculations();
    updateCartCount(1);
}

// Update Total Price
function updateTotalCalculations() {
    const totalPriceElement = document.querySelector(".total-price");
    const cartBoxes = document.querySelectorAll(".cart-box");
    let total = 0;

    cartBoxes.forEach(cartBox => {
        const priceElement = cartBox.querySelector(".cart-price");
        const quantityElement = cartBox.querySelector(".number");
        
        const price = parseFloat(priceElement.innerText.replace("$", ""));
        const quantity = parseInt(quantityElement.innerText);

        total += price * quantity;
    });

    totalPriceElement.innerText = `$${total}`;
}

// Update Cart Badge Item Count
function updateCartCount(change) {
    const cartItemCountBadge = document.querySelector(".cart-item-count");
    cartItemCount += change;

    if (cartItemCount > 0) {
        cartItemCountBadge.style.visibility = "visible";
        cartItemCountBadge.innerText = cartItemCount;
    } else {
        cartItemCountBadge.style.visibility = "hidden";
        cartItemCountBadge.innerText = "";
    }
}

// Buy Button Action
const buyButton = document.querySelector(".btn-buy");

buyButton.addEventListener("click", () => {
    const cartBoxes = document.querySelectorAll(".cart-box");

    if (cartBoxes.length === 0) {
        alert("Your cart is empty. Please add items to your cart before buying.");
        return;
    }

    cartBoxes.forEach(cartBox => cartBox.remove());
    cartItemCount = 0;
    updateCartCount(0);
    updateTotalCalculations();

    alert("Thank you for your purchase!");
});


