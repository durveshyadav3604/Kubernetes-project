import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderId: null,
  orderDetails: null,
  orderTotal: 0,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      const order = action.payload;
      state.orderId = order._id || order.id;
      state.orderDetails = order;
      state.orderTotal = order.total;
    },
    clearOrder: (state) => {
      state.orderId = null;
      state.orderDetails = null;
      state.orderTotal = 0;
    },
  },
});

export const { placeOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;

