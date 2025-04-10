import api from '../Api_Intersecptor/AxiosAdmin';

export const addProduct = async (Product) => {
    try {
      
      console.log(Product)
      const response = await api.post('/CreateProduct', Product);
      return response.data ;
    } catch (error) {
      console.error('Error add Category:', error);
      throw error;
    }
  };
  export const updateProduct = async (slug, ProductData) => {
    try {
      const response = await api.put(`/UpdateProduct/${slug}`, ProductData); 
      return response.data;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  };
  export const getProductBySlug = async (Slug) => {
    try {
  
      const response = await api.get(`/Product/Edit/${Slug}`)
      return response.data;
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      throw error;
    }
  };
  export const getAllProducts  = async () => {
    try {
      
     
      const response = await api.get('/GetAllProducts');
      console.log("return response.data;", response.data);
      return response.data;
    } catch (error) {
      console.error('Error add Category:', error);
      throw error;
    }
  };
  export const deleteProduct = async (ProductId) => {
    try {
      
      const response = await api.delete(`/DeleteProduct/${ProductId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  };
