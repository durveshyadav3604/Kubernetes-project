# Bags & Luggage E-Commerce - Backend API

A Node.js, Express, and MongoDB backend API for processing and storing customer orders.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas account)
- npm or yarn

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Update the `MONGO_URI` with your MongoDB connection string:
     - For local MongoDB: `mongodb://localhost:27017/bags-luggage`
     - For MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/bags-luggage`

3. **Start the Server**
   ```bash
   # Development mode (with auto-reload)
   npm run dev

   # Production mode
   npm start
   ```

4. **Verify Server is Running**
   - The server will start on `http://localhost:5000`
   - Check health endpoint: `http://localhost:5000/api/health`

## API Endpoints

### POST /api/orders
Create a new order.

**Request Body:**
```json
{
  "items": [
    {
      "id": "product-id",
      "name": "Product Name",
      "price": 99.99,
      "quantity": 2,
      "imageUrl": "https://..."
    }
  ],
  "customer": {
    "name": "John Doe",
    "email": "john@example.com",
    "address": "123 Main St, City, State 12345"
  },
  "total": 199.98
}
```

**Response:** 201 Created with the saved order object

### GET /api/orders
Fetch all orders (for debugging/admin purposes).

**Response:** 200 OK with array of all orders

## Project Structure

```
backend/
├── models/
│   └── Order.js         # Mongoose schema for orders
├── routes/
│   └── orderRoutes.js   # API routes for orders
├── .env                 # Environment variables (not committed)
├── .env.example         # Example environment variables
├── .gitignore
├── package.json
├── server.js            # Main server entry point
└── README.md
```

## Notes

- The backend only handles order processing. Product data is managed by the frontend.
- CORS is enabled to allow requests from `localhost:3000` (frontend).
- All orders are stored with automatic timestamps (`createdAt`, `updatedAt`).

