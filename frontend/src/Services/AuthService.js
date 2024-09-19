import axios from 'axios';

const API_URL = 'http://localhost:8080';

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/RegisterUser`, userData);
    return response;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/LoginUser`, credentials, {
      withCredentials: true // Include cookies in the request
    });
    return response;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

