import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Grid,
  Container,
  Paper,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { selectAllProducts } from '../features/products/productSelectors';
import ProductCard from '../components/ProductCard/ProductCard';

const HomePage = () => {
  const navigate = useNavigate();
  const allProducts = useSelector(selectAllProducts);

  // Get top rated products (rating >= 4.7)
  const topRatedProducts = [...allProducts]
    .filter((p) => p.rating >= 4.7)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  // Get latest arrivals (last 4 products)
  const latestArrivals = [...allProducts].slice(-4);

  return (
    <Box>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundImage: 'url(https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=600&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: { xs: '400px', md: '500px' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 6,
          borderRadius: 2,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: 2,
          }}
        />
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{ color: 'white', fontWeight: 'bold' }}
          >
            Premium Bags & Luggage
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ color: 'white', mb: 4 }}
          >
            Travel in Style, Travel with Confidence
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/shop')}
            sx={{ px: 4, py: 1.5 }}
          >
            Shop Now
          </Button>
        </Box>
      </Paper>

      <Container maxWidth="lg">
        {/* Top Rated Products Section */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
            Top Rated Products
          </Typography>
          <Grid container spacing={3}>
            {topRatedProducts.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Latest Arrivals Section */}
        <Box>
          <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
            Latest Arrivals
          </Typography>
          <Grid container spacing={3}>
            {latestArrivals.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;

