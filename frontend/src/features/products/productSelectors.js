import { createSelector } from '@reduxjs/toolkit';

const selectProductsState = (state) => state.products;

export const selectAllProducts = createSelector(
  [selectProductsState],
  (productsState) => productsState.items
);

export const selectCategoryFilter = createSelector(
  [selectProductsState],
  (productsState) => productsState.categoryFilter
);

export const selectSortOrder = createSelector(
  [selectProductsState],
  (productsState) => productsState.sortOrder
);

export const selectSearchQuery = createSelector(
  [selectProductsState],
  (productsState) => productsState.searchQuery
);

export const selectFilteredAndSortedProducts = createSelector(
  [selectAllProducts, selectCategoryFilter, selectSearchQuery, selectSortOrder],
  (allProducts, categoryFilter, searchQuery, sortOrder) => {
    // Filter by category
    let filtered = allProducts;
    if (categoryFilter !== 'All Products') {
      filtered = filtered.filter((product) => product.category === categoryFilter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    // Sort products
    const sorted = [...filtered];
    switch (sortOrder) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'name-asc':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Keep original order
        break;
    }

    return sorted;
  }
);

