# ShopEasy - Simple E-Commerce Store

A beginner-friendly e-commerce website built with HTML, CSS, JavaScript and Express.js (Node.js).

## Features
- Product listings with grid layout
- Product detail page
- Shopping cart (add/remove items)
- User registration and login
- Order placement
- REST API backend with Express.js

## Project Structure
```
ecommerce-store/
├── public/
│   ├── index.html      ← Homepage with products
│   ├── product.html    ← Product detail page
│   ├── cart.html       ← Shopping cart page
│   ├── login.html      ← Login / Register page
│   ├── style.css       ← All styles
│   └── cart.js         ← Cart logic (shared across pages)
├── server.js           ← Express.js backend
├── package.json        ← Project info & dependencies
└── .gitignore          ← Files to exclude from Git
```

## How to Run

**Step 1** - Make sure Node.js is installed: https://nodejs.org

**Step 2** - Install dependencies:
```bash
npm install
```

**Step 3** - Start the server:
```bash
node server.js
```

**Step 4** - Open your browser and go to:
```
http://localhost:3000
```

## API Endpoints
| Method | URL | What it does |
|--------|-----|-------------|
| GET | /api/products | Get all products |
| GET | /api/products/:id | Get one product |
| POST | /api/register | Register new user |
| POST | /api/login | Login user |
| POST | /api/orders | Place an order |
| GET | /api/orders | View all orders |

## Technologies Used
- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express.js
- **Storage**: localStorage (frontend), in-memory (backend demo)
