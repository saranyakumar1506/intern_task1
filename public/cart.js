// ===== CART FUNCTIONS =====
// Cart is stored in localStorage so it persists across pages

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(id, name, price) {
  const cart = getCart();
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }

  saveCart(cart);
  updateCartCount();
  alert(`"${name}" added to cart!`);
}

function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
  renderCart(); // refresh cart page
}

function updateCartCount() {
  const cart = getCart();
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  const el = document.getElementById("cart-count");
  if (el) el.textContent = total;
}

function renderCart() {
  const cart = getCart();
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total-amount");

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = '<p class="empty-cart">Your cart is empty. <a href="index.html">Shop now</a></p>';
    if (totalEl) totalEl.textContent = "0";
    return;
  }

  let total = 0;
  container.innerHTML = "";

  cart.forEach(item => {
    total += item.price * item.quantity;
    container.innerHTML += `
      <div class="cart-item">
        <div>
          <div class="cart-item-name">${item.name}</div>
          <div style="font-size:13px; color:#888;">Qty: ${item.quantity}</div>
        </div>
        <div class="cart-item-price">₹${item.price * item.quantity}</div>
        <button class="btn-remove" onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `;
  });

  if (totalEl) totalEl.textContent = total.toLocaleString();
  updateCartCount();
}
