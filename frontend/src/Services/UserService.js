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

export const getAllUsers  = async () => {
  try {
    debugger
   
    const response = await axios.get(`${API_URL}/GetAllUsers`);
    return response;
  } catch (error) {
    console.error('Error add Category:', error);
    throw error;
  }
};

export const deleteUser = async (UserId) => {
  try {
    debugger
    const response = await axios.delete(`${API_URL}/DeleteUser/${UserId}`);
    return response;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

export const getUserByUsername = async (Username) => {
  try {
debugger
    const response = await axios.get(`${API_URL}/User/Edit/${Username}`)
    return response
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    throw error;
  }
};

export const updateUser = async (Username, UserData) => {
  try {
    const response = await axios.put(`${API_URL}/UpdateUser/${Username}`, UserData); 
    return response;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

export const getUserProfile = async (token) => {
  try {
    debugger
    const response = await axios.get(`${API_URL}/UserProfile`, {
      headers: {
        Authorization: `Bearer ${token}`, // Send token in Authorization header
      },
    });
    return response.data; // Return the data from the response
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
};

