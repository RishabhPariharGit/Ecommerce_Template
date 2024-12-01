import axios from 'axios';

const API_URL = 'http://localhost:8080';


export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/RegisterUser`, userData);
    return response;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};


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
    
   
    const response = await axios.get(`${API_URL}/GetAllUsers`);
    return response;
  } catch (error) {
    console.error('Error add Category:', error);
    throw error;
  }
};

export const deleteUser = async (UserId) => {
  try {
    
    const response = await axios.delete(`${API_URL}/DeleteUser/${UserId}`);
    return response;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};

export const getUserByUsername = async (Username) => {
  try {

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
    
    const response = await axios.get(`${API_URL}/UserProfile`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error; 
  }
};

export const getUserAddresses = async (token) => {
  try {
    debugger
    const response = await axios.get(`${API_URL}/User/addresses`, {
      headers: { Authorization: `Bearer ${token}` },
    });   
    return response; 
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error; 
  }
};


export const addUserAddress = async (token, addressdata) => {
  try {
    debugger
    const response = await axios.post(`${API_URL}/User/address`, addressdata,
    {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};


export const updateUserAddress = async (token, editingAddressId, newAddress) => {
  try {
    debugger
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    };
    const response = await axios.put(
      `${API_URL}/updateUserAddress/${editingAddressId}`, 
      newAddress,
      config
    );
    return response.data; 
  } catch (error) {
    console.error('Error updating address:', error);
    throw error; 
  }
};


export const deleteUserAddress = async (token, id) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    };
    const response = await axios.delete(
      `${API_URL}/deleteUserAddress/${id}`,
      config 
    );
    return response.data; 
  } catch (error) {
    console.error('Error deleting address:', error);
    throw error; 
  }
};

export const UpdateDefaultAddress = async (addressId) => {
  try {
    const response = await axios.put(`${API_URL}/addresses/default/${addressId}`); 
    return response;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};