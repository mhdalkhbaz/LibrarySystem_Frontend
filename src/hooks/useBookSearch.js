import { useState, useEffect } from 'react';
import api from '../services/api';

export const useBookSearch = (userId, searchQuery) => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadBooks = async () => {
    if (!userId) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const booksData = await api.fetchBooks(searchQuery, userId);
      setBooks(booksData);
      setCategories([...new Set(booksData.map(x => x.category))]);
    } catch (err) {
      setError(err.message || 'Failed to load books');
      console.error('Error loading books:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, [userId, searchQuery]);

  return { books, categories, isLoading, error, reloadBooks: loadBooks };
};