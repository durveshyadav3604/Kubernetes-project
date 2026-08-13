import { createSelector } from '@reduxjs/toolkit';

const selectOrderState = (state) => state.order;

export const selectOrder = createSelector(
  [selectOrderState],
  (orderState) => orderState
);

export const selectOrderId = createSelector(
  [selectOrderState],
  (orderState) => orderState.orderId
);

export const selectOrderDetails = createSelector(
  [selectOrderState],
  (orderState) => orderState.orderDetails
);

