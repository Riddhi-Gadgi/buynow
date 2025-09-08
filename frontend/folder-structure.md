buynow/
├─ backend/ # Node.js + Express backend
│ ├─ models/
│ │ ├─ Product.js
│ │ └─ User.js
│ ├─ routes/
│ │ ├─ products.js
│ │ ├─ users.js
│ │ ├─ cart.js
│ │ └─ seed.js
│ ├─ middleware/
│ │ └─ auth.js
│ ├─ uploads/ # For product images (optional)
│ ├─ .env # Environment variables
│ ├─ package.json
│ └─ index.js # Server entry point
│
├─ frontend/ # React + Tailwind frontend
│ ├─ src/
│ │ ├─ api.js # Axios instance with backend URL
│ │ ├─ App.jsx
│ │ ├─ main.jsx
│ │ ├─ pages/
│ │ │ ├─ Shop.jsx
│ │ │ ├─ MyProducts.jsx
│ │ │ └─ ProductForm.jsx
│ │ ├─ components/
│ │ │ ├─ ProductCard.jsx
│ │ │ └─ FilterBar.jsx
│ │ └─ styles/
│ │ └─ index.css
│ ├─ public/
│ │ └─ default.png  
│ ├─ package.json
│ └─ vite.config.js
│
├─ README.md
└─ .gitignore
