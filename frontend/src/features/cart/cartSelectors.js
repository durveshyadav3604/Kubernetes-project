import { createSelector } from '@reduxjs/toolkit';

const selectCartState = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartState],
  (cartState) => cartState.items
);

export const selectCartItemCount = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + item.quantity, 0)
);

export const selectCartSubtotal = createSelector(
  [selectCartItems],
  (items) => items.reduce((total, item) => total + item.price * item.quantity, 0)
);

export const selectShippingCost = createSelector(
  [selectCartSubtotal],
  (subtotal) => (subtotal > 500 ? 0 : 10)
);

export const selectCartTotal = createSelector(
  [selectCartSubtotal, selectShippingCost],
  (subtotal, shippingCost) => subtotal + shippingCost
);

