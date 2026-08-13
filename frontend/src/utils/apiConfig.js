// API Configuration
// This ensures the API URL is always correctly set
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  ORDERS: `${API_BASE_URL}/api/orders`,
};

