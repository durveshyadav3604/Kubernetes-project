import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Divider,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSelector } from 'react-redux';
import { selectOrder } from '../features/order/orderSelectors';
import { formatPrice } from '../utils/helpers';

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const order = useSelector(selectOrder);

  useEffect(() => {
    // Redirect to home if no order exists
    if (!order.orderId) {
      navigate('/');
    }
  }, [order.orderId, navigate]);

  if (!order.orderId) {
    return null; // Will redirect
  }

  return (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <CheckCircleIcon sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
      <Typography variant="h3" component="h1" gutterBottom>
        Thank You For Your Order!
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
        Your order has been placed successfully
      </Typography>

      <Paper sx={{ p: 4, maxWidth: 800, mx: 'auto', mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Order Details
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ textAlign: 'left', mb: 3 }}>
          <Typography variant="body1" gutterBottom>
            <strong>Order ID:</strong> {order.orderId}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Order Total:</strong> {formatPrice(order.orderTotal)}
          </Typography>
          {order.orderDetails?.customer && (
            <>
              <Typography variant="body1" gutterBottom>
                <strong>Customer:</strong> {order.orderDetails.customer.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Email:</strong> {order.orderDetails.customer.email}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Shipping Address:</strong> {order.orderDetails.customer.address}
              </Typography>
            </>
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom sx={{ textAlign: 'left' }}>
          Ordered Items:
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {order.orderDetails?.items?.map((item) => (
            <Grid item xs={12} sm={6} key={item.id}>
              <Card>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <CardMedia
                      component="img"
                      image={item.imageUrl}
                      alt={item.name}
                      sx={{ height: '80px', objectFit: 'cover' }}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <CardContent>
                      <Typography variant="body2" fontWeight="bold">
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Quantity: {item.quantity}
                      </Typography>
                      <Typography variant="body2" color="primary">
                        {formatPrice(item.price * item.quantity)}
                      </Typography>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Button
        variant="contained"
        size="large"
        onClick={() => navigate('/')}
        sx={{ px: 4, py: 1.5 }}
      >
        Continue Shopping
      </Button>
    </Box>
  );
};

export default OrderConfirmationPage;

