# Bags & Luggage - Full-Stack MERN E-Commerce Application

A complete e-commerce application for bags and luggage products, built with the MERN stack (MongoDB, Express, React, Node.js).

## Project Overview

This application consists of two separate projects:

1. **Backend** (`backend/`): Node.js/Express API for processing and storing orders
2. **Frontend** (`frontend/`): React application for browsing products and managing cart

## Architecture

- **Frontend**: Manages product catalog locally and handles all UI interactions
- **Backend**: Solely responsible for receiving and storing customer orders in MongoDB
- **Separation**: Product data is managed by the frontend; backend only handles order processing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas account)
- npm or yarn

## Quick Start

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example if available)
# Add your MongoDB connection string:
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/bags-luggage

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:5000`

### 2. Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm start
```

The frontend will run on `http://localhost:3000` and automatically open in your browser.

## Project Structure

```
bags-luggage/
├── backend/
│   ├── models/
│   │   └── Order.js
│   ├── routes/
│   │   └── orderRoutes.js
│   ├── .env
│   ├── server.js
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── data/
│   │   ├── features/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── utils/
│   ├── .env
│   ├── package.json
│   └── README.md
└── README.md
```

## Features

### Frontend Features
- Product browsing with search and filtering
- Shopping cart management
- Product detail pages
- Checkout process
- Order confirmation
- Responsive design with Material-UI

### Backend Features
- RESTful API for order processing
- MongoDB integration for order storage
- CORS enabled for frontend communication
- Order validation and error handling

## API Endpoints

### POST /api/orders
Create a new order.

**Request Body:**
```json
{
  "items": [...],
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "address": "123 Main St, City, State 12345"
  },
  "total": 199.98
}
```

### GET /api/orders
Fetch all orders (for debugging/admin).

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/bags-luggage
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000
```

## Development

- Backend runs on port 5000
- Frontend runs on port 3000
- Both servers need to run simultaneously for full functionality
- Backend uses nodemon for auto-reload in development mode

## Production Build

### Frontend
```bash
cd frontend
npm run build
```

The build folder will contain the production-ready static files.

### Backend
```bash
cd backend
npm start
```

## License

ISC

## Support

For issues or questions, please refer to the individual README files in the `backend/` and `frontend/` directories.

