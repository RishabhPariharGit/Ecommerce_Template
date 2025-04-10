import api from '../Api_Intersecptor/AxiosAdmin';
import Cookies from 'js-cookie'; 
// Add Category
export const addCategory = async (CategoryData) => {
    try {
        
          const token = Cookies.get('token');
      
          const headers = {
            withCredentials: true,
          };
      
          if (token) {
            headers.Authorization = `Bearer ${token}`;
          }
        const response = await api.post('/CreateCategory', CategoryData);
        return response.data;
    } catch (error) {
        console.error('Error adding category:', error);
        throw error;
    }
};

// Get All Categories
export const getAllCategories = async () => {
    try {
        const token = Cookies.get('token');
          const headers = {
            withCredentials: true,
          };
          if (token) {
            headers.Authorization = `Bearer ${token}`;
          }
        const response = await api.get('/GetAllCategory');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
};

// Get Category by Slug
export const getCategoryBySlug = async (Slug) => {
    try {
        
        const token = Cookies.get('token');
        const headers = {
          withCredentials: true,
        };
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
        const response = await api.get(`/Category/Edit/${Slug}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching category by slug:', error);
        throw error;
    }
};

// Update Category
export const updateCategory = async (slug, CategoryData) => {
    try {
        const token = Cookies.get('token');
        const headers = {
          withCredentials: true,
        };
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
        const response = await api.put(`/UpdateCategory/${slug}`, CategoryData);
        return response.data;
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
};

// Delete Category
export const deleteCategory = async (categoryId) => {
    try {
        const token = Cookies.get('token');
        const headers = {
          withCredentials: true,
        };
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
        const response = await api.delete(`/DeleteCategory/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting category:', error);
        throw error;
    }
};
