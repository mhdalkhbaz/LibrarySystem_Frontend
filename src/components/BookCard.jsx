// BookCard.jsx
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Button,
  Rating,
  Divider,
  Fade
} from '@mui/material';
import {
  Bookmark,
  BookmarkBorder,
  LocalLibrary as BorrowIcon,
  AssignmentReturn as ReturnIcon
} from '@mui/icons-material';

const BookCard = ({
  book,
  savedBooks,
  toggleSaveBook,
  handleBorrowClick
}) => {
  const [hoverOnImage, setHoverOnImage] = useState(false);
  return (
    <Card
      sx={{
        width: 250,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'scale(1.03)',
          boxShadow: 6,
        },
      }}
    >
      <Box
        onMouseEnter={() => setHoverOnImage(true)}
        onMouseLeave={() => setHoverOnImage(false)}
        sx={{
          position: 'relative',
          height: 220,
          overflow: 'hidden',
        }}
      >
        {/* Main Image */}
        <CardMedia
          component="img"
          height="220"
          image={book.cover}
          alt={book.title}
          sx={{
            transition: 'all 0.5s ease',
            transform: hoverOnImage ? 'scale(1.05)' : 'scale(1)',
            filter: hoverOnImage ? 'brightness(0.7)' : 'brightness(1)',
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(40,40,40,0.9)',
            color: '#FFFFFF',
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            opacity: hoverOnImage ? 1 : 0,
            transition: 'opacity 0.5s ease',
            overflow: 'auto',
          }}
        >
          <Typography variant="body2" sx={{
            textAlign: 'center',
            color: '#F5F5F5',
            maxHeight: '70%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            mb: 1
          }}>
            {book.description}
          </Typography>

          <Typography variant="body2" sx={{
            textAlign: 'center',
            color: '#FFC107',
            fontWeight: 'bold',
            fontSize: '0.9rem'
          }}>
            Category: {book.category}
          </Typography>

          <Typography variant="body2" sx={{
            textAlign: 'center',
            color: book.available ? '#66BB6A' : '#EF5350',
            fontWeight: 'bold',
            fontSize: '0.9rem',
            mt: 0.5
          }}>
            Status :  {book.available ? '  Available ' : 'Checked out'}
          </Typography>
        </Box>
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="h2" sx={{ fontSize: '1rem' }}>
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary"  >
          {book.author}
        </Typography>
        <Box sx={{
          display: 'flex',
          marginTop: '20px',
          marginBottom: '10px',
          alignItems: 'end',
          mt: 1,
          position: 'absolute',
          bottom: 60,
          left: 16
        }} >
          <Rating value={book.rating} precision={0.1} readOnly size="small" />
          <Typography variant="body2" sx={{ ml: 1 }}>
            {book.rating}
          </Typography>
        </Box>
      </CardContent>

      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
        <IconButton
          onClick={() => { }}
          color={savedBooks?.includes(book.id) ? 'primary' : 'default'}
        >
          {savedBooks?.includes(book.id) ? <Bookmark /> : <BookmarkBorder />}
        </IconButton>

        {
          !book.borrowedByThisUser?
            <Button
              variant="contained"
              size="small"
              startIcon={<BorrowIcon />}
              disabled={!book.available }
              onClick={(e) => {
                e.stopPropagation();
                handleBorrowClick(book);
              }}
            >
              Borrow
            </Button> :
            <Button
              variant="contained"
              color="secondary"
              size="small"
              startIcon={<ReturnIcon />}
              onClick={(e) => {
                e.stopPropagation();
                handleBorrowClick(book);
              }}
            >
              Return
            </Button>
        }
      </Box>
    </Card >
  );
};

export default BookCard;
