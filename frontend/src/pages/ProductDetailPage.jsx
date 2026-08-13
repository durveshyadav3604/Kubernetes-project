import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Grid,
  Typography,
  Button,
  Box,
  Rating,
  Chip,
  Paper,
  Divider,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllProducts } from '../features/products/productSelectors';
import { addItem } from '../features/cart/cartSlice';
import { formatPrice } from '../utils/helpers';
import QuantitySelector from '../components/QuantitySelector/QuantitySelector';
import MessageDialog from '../components/MessageDialog/MessageDialog';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allProducts = useSelector(selectAllProducts);
  const product = allProducts.find((p) => p.id === id);

  const [quantity, setQuantity] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  if (!product) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" gutterBottom>
          Product not found
        </Typography>
        <Button variant="contained" onClick={() => navigate('/shop')} sx={{ mt: 2 }}>
          Back to Shop
        </Button>
      </Box>
    );
  }

  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    dispatch(addItem({ ...product, quantity }));
    setSnackbarOpen(true);
  };

  return (
    <Box>
      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '400px',
            }}
          >
            <Box
              component="img"
              src={product.imageUrl}
              alt={product.name}
              sx={{
                maxWidth: '100%',
                maxHeight: '500px',
                objectFit: 'contain',
              }}
            />
          </Paper>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.name}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={product.rating} readOnly precision={0.1} />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({product.rating}) • {product.stock} in stock
            </Typography>
          </Box>

          <Typography variant="h5" color="primary" gutterBottom sx={{ mb: 2 }}>
            {formatPrice(product.price)}
          </Typography>

          <Box sx={{ mb: 3 }}>
            {isOutOfStock ? (
              <Chip label="Out of Stock" color="error" size="large" />
            ) : (
              <Chip label="In Stock" color="success" size="large" />
            )}
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>

          <Typography variant="subtitle2" gutterBottom>
            Category: {product.category}
          </Typography>

          {!isOutOfStock && (
            <>
              <Box sx={{ my: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Quantity:
                </Typography>
                <QuantitySelector
                  quantity={quantity}
                  onQuantityChange={setQuantity}
                  max={product.stock}
                />
              </Box>

              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handleAddToCart}
                sx={{ py: 1.5 }}
              >
                Add to Cart
              </Button>
            </>
          )}

          <Button
            variant="outlined"
            size="large"
            fullWidth
            onClick={() => navigate('/shop')}
            sx={{ mt: 2, py: 1.5 }}
          >
            Continue Shopping
          </Button>
        </Grid>
      </Grid>

      <MessageDialog
        open={snackbarOpen}
        message="Item added to cart!"
        onClose={() => setSnackbarOpen(false)}
      />
    </Box>
  );
};

export default ProductDetailPage;

