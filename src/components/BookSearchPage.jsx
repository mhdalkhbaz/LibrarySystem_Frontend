import React, { useState, useEffect } from 'react';
import { Container, Paper, Box, Avatar, Tooltip, IconButton, Typography } from '@mui/material';
import { useBookSearch } from '../hooks/useBookSearch';
import BookFilter from './BookFilter';
import BookList from './BookList';
import ConfirmationModal from './ConfirmationModal';
import LoginModal from './LoginModal';
import api from '../services/api';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const BookSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [savedBooks, setSavedBooks] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState('');
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [viewMode, setViewMode] = useState('all');

  const { books, categories, isLoading, reloadBooks } = useBookSearch(userId, searchQuery);

  useEffect(() => {
    const storedId = localStorage.getItem('userId');
    const storedName = localStorage.getItem('username');
    if (storedId && Number(storedId) > 0) {
      setUserId(Number(storedId));
      if (storedName) setUsername(storedName);
    } else {
      setOpenLoginModal(true);
    }
  }, []);

  const handleLoginSubmit = async () => {
    if (!username.trim()) {
      toast.warning('Please enter a username');
      return;
    }
    try {
      const id = await api.registerUser(username);
      localStorage.setItem('userId', id);
      localStorage.setItem('username', username);
      setUserId(id);
      setOpenLoginModal(false);
    } catch (err) {
      toast.error(err || 'Login failed. Please try again.');
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    );
  };

  const toggleSaveBook = (bookId) => {
    setSavedBooks(prev =>
      prev.includes(bookId)
        ? prev.filter(id => id !== bookId)
        : [...prev, bookId]
    );
  };

  const handleBorrowClick = (book) => {
    setSelectedBook(book);
    setOpenModal(true);
  };

  const confirmBorrow = async (isBorrowing) => {
    if (!selectedBook || !userId) return;

    try {
      await api.borrowOrReturnBook(selectedBook.id, isBorrowing, userId);
      toast.success(
        `${isBorrowing ? '📚 Book borrowed' : '📦 Book returned'}: "${selectedBook.title}"`,
        {
          autoClose: 3000,
          style: {
            background: '#f0f9ff',
            color: '#0f172a',
            fontWeight: 'bold',
            fontSize: '14px',
            borderRadius: '8px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          },
          icon: isBorrowing ? '✅' : '↩️',
        }
      );
      reloadBooks();
      setOpenModal(false);
    } catch (err) {
      toast.error(err || 'Operation failed. Please try again.');
    }
  };

  const filteredBooks = books?.filter(book => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      (book.isbn && book.isbn.toLowerCase().includes(q));
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(book.category);
    const matchesViewMode =
      viewMode === 'all' || (viewMode === 'borrowed' && book.borrowedByThisUser);

    return matchesSearch && matchesCategory && matchesViewMode;
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <ToastContainer />
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 4,
          gap: 2
        }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Library system
          </Typography>

          {userId && (
            <Box display="flex" alignItems="center" gap={1}>
              <Tooltip title={username} arrow>
                <IconButton sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {username.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Typography variant="body1" fontWeight="medium">
                {username}
              </Typography>
            </Box>
            
          )}
        </Box>

        <BookFilter
          searchQuery={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryClick={handleCategoryClick}
          viewMode={viewMode}
          onViewModeChange={(e, newValue) => newValue && setViewMode(newValue)}
          userId={userId}
        />

        <BookList
          books={books}
          filteredBooks={filteredBooks}
          savedBooks={savedBooks}
          onSaveToggle={toggleSaveBook}
          onBorrowClick={handleBorrowClick}
          userId={userId}
          isLoading={isLoading}
          viewMode={viewMode}
        />
      </Paper>

      <ConfirmationModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        book={selectedBook}
        userId={userId}
        onConfirm={confirmBorrow}
        isLoading={isLoading}
      />

      <LoginModal
        open={openLoginModal}
        username={username}
        onUsernameChange={(e) => setUsername(e.target.value)}
        onSubmit={handleLoginSubmit}
        isLoading={isLoading}
      />
    </Container>
  );
};

export default BookSearchPage;