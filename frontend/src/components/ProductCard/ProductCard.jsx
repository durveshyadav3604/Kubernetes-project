import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Rating,
  Chip,
} from '@mui/material';
import { formatPrice } from '../../utils/helpers';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const isOutOfStock = product.stock === 0;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.imageUrl}
        alt={product.name}
        sx={{ objectFit: 'cover', cursor: 'pointer' }}
        onClick={() => navigate(`/products/${product.id}`)}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom noWrap>
          {product.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating value={product.rating} readOnly precision={0.1} size="small" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({product.rating})
          </Typography>
        </Box>
        <Typography variant="h6" color="primary" gutterBottom>
          {formatPrice(product.price)}
        </Typography>
        <Box sx={{ mt: 1 }}>
          {isOutOfStock ? (
            <Chip label="Out of Stock" color="error" size="small" />
          ) : (
            <Chip label="In Stock" color="success" size="small" />
          )}
        </Box>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          fullWidth
          onClick={() => navigate(`/products/${product.id}`)}
          disabled={isOutOfStock}
        >
          {isOutOfStock ? 'Out of Stock' : 'View Details'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;

