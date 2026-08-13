import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { getCategories } from '../../data/products';

const CategoryFilter = ({ value, onChange }) => {
  const categories = getCategories();

  return (
    <FormControl fullWidth>
      <InputLabel id="category-filter-label">Category</InputLabel>
      <Select
        labelId="category-filter-label"
        id="category-filter"
        value={value}
        label="Category"
        onChange={(e) => onChange(e.target.value)}
      >
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryFilter;

