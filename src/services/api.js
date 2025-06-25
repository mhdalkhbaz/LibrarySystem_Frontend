import axios from 'axios';

 
 export const registerUser = async (username) => {
  try {
    const response = await axios.post(`User/RegisterUser/register-user`,
      { username },
    );
    return response.data.data;
  } catch (error) {
    throw error.response?.data.error || error;
  }
};
 export const fetchBooks = async (searchKey = '', userId = null) => {
  try {
    const res = await axios.get(`Book/GetBooks`, {
      params: { searchKey, userId },
    });
    return res.data.data || [];
  } catch (error) {
    throw error.response?.data.error || error;
  }
};


export const borrowOrReturnBook = async (bookId, isBorrowing, userId) => {
  try {
    const res = await axios.post(
      `/Book/BorrowOrReturnBook/${bookId}?isBorrowing=${isBorrowing}&userId=${userId}`
    );
    return res.data.data;
  } catch (error) {
    debugger
    throw error.response?.data.error || error;
  }
};

export default {
  registerUser,
  fetchBooks,
  borrowOrReturnBook
};