import { Box, Typography, Grid } from '@mui/material';
import BookCard from './BookCard'

const BookList = ({
  books,
  filteredBooks,
  savedBooks,
  onSaveToggle,
  onBorrowClick,
  isLoading,
  viewMode
}) => {
  if (isLoading && !books.length) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <Typography>Loading books...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        {filteredBooks.length} {viewMode === 'borrowed' ? 'borrowed' : 'available'} books
      </Typography>

      <Grid container spacing={3}>
        {filteredBooks.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
            <BookCard
              book={book}
              isSaved={savedBooks.includes(book.id)}
              onSaveToggle={onSaveToggle}
              handleBorrowClick={onBorrowClick}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BookList;