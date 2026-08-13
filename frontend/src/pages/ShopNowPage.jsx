import React from 'react';
import {
  Grid,
  TextField,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCategoryFilter,
  setSortOrder,
  setSearchQuery,
} from '../features/products/productSlice';
import {
  selectCategoryFilter,
  selectSortOrder,
  selectSearchQuery,
  selectFilteredAndSortedProducts,
} from '../features/products/productSelectors';
import ProductCard from '../components/ProductCard/ProductCard';
import CategoryFilter from '../components/CategoryFilter/CategoryFilter';
import SortDropdown from '../components/SortDropdown/SortDropdown';

const ShopNowPage = () => {
  const dispatch = useDispatch();
  const categoryFilter = useSelector(selectCategoryFilter);
  const sortOrder = useSelector(selectSortOrder);
  const searchQuery = useSelector(selectSearchQuery);
  const filteredProducts = useSelector(selectFilteredAndSortedProducts);

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Shop All Products
      </Typography>

      <Grid container spacing={3}>
        {/* Left Column - Filters */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3, position: 'sticky', top: 20 }}>
            <Typography variant="h6" gutterBottom>
              Filters
            </Typography>
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Search Products"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                sx={{ mb: 2 }}
              />
              <CategoryFilter
                value={categoryFilter}
                onChange={(value) => dispatch(setCategoryFilter(value))}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Right Column - Products */}
        <Grid item xs={12} md={9}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="body1" color="text.secondary">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </Typography>
            <SortDropdown
              value={sortOrder}
              onChange={(value) => dispatch(setSortOrder(value))}
            />
          </Box>

          {filteredProducts.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                No products found.
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Try adjusting your filters or search query.
              </Typography>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {filteredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShopNowPage;

