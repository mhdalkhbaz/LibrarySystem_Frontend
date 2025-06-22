import React from 'react';
import {
  TextField,
  Chip,
  Box,
  Typography,
  Grid
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { StyledToggleButton, StyledToggleGroup } from '../styles/BookFilter.styles';

const BookFilter = ({
  searchQuery,
  onSearchChange,
  categories,
  selectedCategories,
  onCategoryClick,
  viewMode,
  onViewModeChange,
  userId
}) => {
  return (
    <>
      <Box sx={{
        mb: 4,
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        flexDirection: { xs: 'column', sm: 'row' }
      }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for books by title, author, or ISBN..."
          value={searchQuery}
          onChange={onSearchChange}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1 }} />
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '30px',
            },
            flexGrow: 1
          }}
        />
        <StyledToggleGroup
          value={viewMode}
          exclusive
          onChange={onViewModeChange}
        >
          <StyledToggleButton value="all">
            All Books
          </StyledToggleButton>
          <StyledToggleButton value="borrowed" disabled={!userId}>
            My Books
          </StyledToggleButton>
        </StyledToggleGroup>
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Book Categories
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Select one or more categories to filter
        </Typography>
      </Box>

      <Grid container spacing={1} sx={{ mb: 4 }}>
        {categories.map((category) => (
          <Grid item key={category}>
            <Chip
              label={category}
              clickable
              color={selectedCategories.includes(category) ? 'primary' : 'default'}
              onClick={() => onCategoryClick(category)}
              sx={{
                fontSize: '1rem',
                padding: '8px 12px'
              }}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default BookFilter;