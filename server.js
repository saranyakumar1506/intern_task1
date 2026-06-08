// ===== server.js - Backend for ShopEasy =====
// Run this with: node server.js
// Then open: http://localhost:3000

const express = require("express");
const path    = require("path");
const app     = express();
const PORT    = 3000;

// ===== MIDDLEWARE =====
app.use(express.json());                              // read JSON from requests
app.use(express.static(path.join(__dirname, "public"))); // serve HTML files

// ===== FAKE DATABASE (in-memory for now) =====
// In a real project you'd use SQLite or MongoDB
let users  = [];
let orders = [];

const products = [
  { id: 1, name: "Wireless Headphones", price: 2499 },
  { id: 2, name: "Smart Watch",         price: 4999 },
  { id: 3, name: "Laptop Backpack",     price: 1299 },
  { id: 4, name: "Bluetooth Speaker",   price: 1799 },
  { id: 5, name: "Running Shoes",       price: 3499 },
  { id: 6, name: "Sunglasses",          price: 899  }
];

// ===== API ROUTES =====

// GET all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// GET one product by ID
app.get("/api/products/:id", (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});

// POST - Register a new user
app.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const exists = users.find(u => u.email === email);
  if (exists) {
    return res.status(400).json({ error: "Email already registered" });
  }

  users.push({ id: users.length + 1, name, email, password });
  res.json({ message: "Account created successfully!" });
});

// POST - Login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: "Wrong email or password" });
  }

  res.json({ message: "Login successful", name: user.name });
});

// POST - Place an order
app.post("/api/orders", (req, res) => {
  const { userEmail, cartItems } = req.body;

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ error: "Cart is empty" });
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const order = {
    id: orders.length + 1,
    userEmail,
    items: cartItems,
    total,
    date: new Date().toISOString()
  };

  orders.push(order);
  res.json({ message: "Order placed!", orderId: order.id, total });
});

// GET all orders (admin use)
app.get("/api/orders", (req, res) => {
  res.json(orders);
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log(`
  ✅ ShopEasy server is running!
  👉 Open in browser: http://localhost:${PORT}
  `);
});
