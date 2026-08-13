import React from 'react';
import { IconButton, TextField, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const QuantitySelector = ({ quantity, onQuantityChange, min = 1, max = 99 }) => {
  const handleDecrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= min && value <= max) {
      onQuantityChange(value);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <IconButton
        size="small"
        onClick={handleDecrease}
        disabled={quantity <= min}
        aria-label="decrease quantity"
      >
        <RemoveIcon />
      </IconButton>
      <TextField
        type="number"
        value={quantity}
        onChange={handleInputChange}
        inputProps={{
          min,
          max,
          style: { textAlign: 'center', width: '60px' },
        }}
        sx={{ width: '80px' }}
        size="small"
      />
      <IconButton
        size="small"
        onClick={handleIncrease}
        disabled={quantity >= max}
        aria-label="increase quantity"
      >
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default QuantitySelector;

