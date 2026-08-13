import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const SortDropdown = ({ value, onChange }) => {
  const sortOptions = [
    { value: 'default', label: 'Default' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating-desc', label: 'Highest Rated' },
    { value: 'name-asc', label: 'Name: A to Z' },
  ];

  return (
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel id="sort-label">Sort By</InputLabel>
      <Select
        labelId="sort-label"
        id="sort-select"
        value={value}
        label="Sort By"
        onChange={(e) => onChange(e.target.value)}
      >
        {sortOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SortDropdown;

