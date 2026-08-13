# Bags & Luggage E-Commerce - Frontend

A modern React e-commerce frontend application for browsing and purchasing bags and luggage products.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   - The `.env` file is already created with the default backend API URL
   - Update `REACT_APP_API_URL` if your backend is running on a different port or URL

3. **Start the Development Server**
   ```bash
   npm start
   ```

4. **Access the Application**
   - The app will automatically open in your browser at `http://localhost:3000`
   - Make sure the backend server is running on `http://localhost:5000` for order processing

## Features

- **Product Browsing**: Browse through a catalog of bags and luggage products
- **Product Search & Filtering**: Search by name/description and filter by category
- **Product Sorting**: Sort products by price, rating, or name
- **Shopping Cart**: Add items to cart, update quantities, and remove items
- **Checkout**: Complete checkout process with shipping information
- **Order Management**: Place orders and view order confirmations
- **Responsive Design**: Fully responsive design using Material-UI

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── app/
│   │   └── store.js             # Redux store configuration
│   ├── components/
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   ├── ProductCard/
│   │   ├── QuantitySelector/
│   │   ├── CategoryFilter/
│   │   ├── SortDropdown/
│   │   └── MessageDialog/
│   ├── data/
│   │   └── products.js          # Local product database
│   ├── features/
│   │   ├── cart/                # Cart Redux slice
│   │   ├── products/            # Products Redux slice
│   │   └── order/               # Order Redux slice
│   ├── layouts/
│   │   └── MainLayout.jsx       # Main layout with Navbar and Footer
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── ShopNowPage.jsx
│   │   ├── ProductDetailPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── OrderConfirmationPage.jsx
│   │   ├── AboutUsPage.jsx
│   │   └── ContactUsPage.jsx
│   ├── styles/
│   │   ├── theme.js             # MUI theme configuration
│   │   └── global.css           # Global styles
│   ├── utils/
│   │   └── helpers.js           # Utility functions
│   ├── App.js                   # Main router setup
│   └── index.js                 # React entry point
├── .env                         # Environment variables
├── package.json
└── README.md
```

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm build`: Builds the app for production
- `npm test`: Launches the test runner

## Technology Stack

- **React**: UI library
- **Redux Toolkit**: State management
- **React Router**: Client-side routing
- **Material-UI (MUI)**: UI component library
- **React Scripts**: Build tooling

## Notes

- Product data is stored locally in `src/data/products.js`
- The frontend communicates with the backend API only for order processing
- All product browsing, filtering, and cart management happens client-side
- Images are loaded from Unsplash (placeholder images for demo purposes)

