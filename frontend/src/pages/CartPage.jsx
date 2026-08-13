import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Typography,
  Button,
  Box,
  Paper,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCartItems,
  selectCartSubtotal,
  selectShippingCost,
  selectCartTotal,
} from '../features/cart/cartSelectors';
import { removeItem, updateQuantity } from '../features/cart/cartSlice';
import { formatPrice } from '../utils/helpers';
import QuantitySelector from '../components/QuantitySelector/QuantitySelector';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const shippingCost = useSelector(selectShippingCost);
  const total = useSelector(selectCartTotal);

  if (cartItems.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" gutterBottom>
          Your cart is empty
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Start adding items to your cart!
        </Typography>
        <Button variant="contained" size="large" onClick={() => navigate('/shop')}>
          Start Shopping
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Shopping Cart
      </Typography>

      <Grid container spacing={3}>
        {/* Left Column - Cart Items */}
        <Grid item xs={12} md={8}>
          {cartItems.map((item) => (
            <Card key={item.id} sx={{ mb: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={4} sm={3}>
                  <CardMedia
                    component="img"
                    image={item.imageUrl}
                    alt={item.name}
                    sx={{ height: '120px', objectFit: 'cover' }}
                  />
                </Grid>
                <Grid item xs={8} sm={9}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" gutterBottom>
                          {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {item.category}
                        </Typography>
                        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                          {formatPrice(item.price)}
                        </Typography>
                      </Box>
                      <IconButton
                        color="error"
                        onClick={() => dispatch(removeItem(item.id))}
                        aria-label="remove item"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Typography variant="body2">Quantity:</Typography>
                      <QuantitySelector
                        quantity={item.quantity}
                        onQuantityChange={(qty) =>
                          dispatch(updateQuantity({ id: item.id, quantity: qty }))
                        }
                      />
                      <Typography variant="body1" sx={{ ml: 'auto' }}>
                        Subtotal: {formatPrice(item.price * item.quantity)}
                      </Typography>
                    </Box>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          ))}
        </Grid>

        {/* Right Column - Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body1">Subtotal:</Typography>
              <Typography variant="body1">{formatPrice(subtotal)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body1">Shipping:</Typography>
              <Typography variant="body1">
                {shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6" color="primary">
                {formatPrice(total)}
              </Typography>
            </Box>
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={() => navigate('/checkout')}
              sx={{ py: 1.5 }}
            >
              Proceed to Checkout
            </Button>
            <Button
              variant="outlined"
              size="large"
              fullWidth
              onClick={() => navigate('/shop')}
              sx={{ mt: 2, py: 1.5 }}
            >
              Continue Shopping
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartPage;

