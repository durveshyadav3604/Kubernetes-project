import React from 'react';
import { Typography, Box, Paper, Grid } from '@mui/material';

const AboutUsPage = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        About Us
      </Typography>

      <Paper sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Welcome to Bags & Luggage
        </Typography>
        <Typography variant="body1" paragraph>
          We are a premier destination for high-quality bags and luggage, offering a
          wide selection of products to meet all your travel and lifestyle needs. Since
          our founding, we have been committed to providing our customers with
          exceptional products and outstanding service.
        </Typography>
        <Typography variant="body1" paragraph>
          Our mission is to help you travel in style and comfort, whether you're
          embarking on a business trip, a weekend getaway, or a long adventure. We
          carefully curate our collection to include only the finest products from
          trusted manufacturers.
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Quality Products
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We source only the highest quality bags and luggage to ensure durability
              and satisfaction.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Customer Service
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Our dedicated team is here to help you find the perfect product for your
              needs.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Fast Shipping
            </Typography>
            <Typography variant="body2" color="text.secondary">
              We offer fast and reliable shipping to get your order to you as quickly as
              possible.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutUsPage;

