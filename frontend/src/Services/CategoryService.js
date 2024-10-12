import axios from 'axios';

const API_URL = 'http://localhost:8080';


//Category Service
export const addCategory = async (CategoryData) => {
  try {
    debugger
    console.log(CategoryData)
    const response = await axios.post(`${API_URL}/CreateCategory`, CategoryData);
    return response;
  } catch (error) {
    console.error('Error add Category:', error);
    throw error;
  }
};
export const getAllCategories  = async () => {
  try {
    debugger
   
    const response = await axios.get(`${API_URL}/GetAllCategory`);
    return response;
  } catch (error) {
    console.error('Error add Category:', error);
    throw error;
  }
};
export const getCategoryBySlug = async (Slug) => {
  try {
      const response = await axios.get(`${API_URL}/Category/Edit/${Slug}`); 
      return response;
  } catch (error) {
      console.error('Error fetching subcategories:', error);
      throw error;
  }
};
export const updateCategory = async (slug, CategoryData) => {
  try {
    const response = await axios.put(`${API_URL}/UpdateCategory/${slug}`, CategoryData); 
    return response;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};
export const deleteCategory = async (categoryId) => {
  try {
    const response = await axios.delete(`${API_URL}/DeleteCategory/${categoryId}`);
    return response;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};
//SubCategory Service
export const addSubCategory = async (SubCategoryData) => {
  try {
    debugger
    console.log(SubCategoryData)
    const response = await axios.post(`${API_URL}/CreateSubCategory`, SubCategoryData);
    return response;
  } catch (error) {
    console.error('Error add Category:', error);
    throw error;
  }
};
export const getAllSubCategoriesByCategoryId = async (CategoryId) => {
  try {

    const response = await axios.post(`${API_URL}/AllSubCategoriesByCategoryId`, { CategoryId }); 
    return response
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    throw error;
  }
};
export const getAllSubCategories  = async () => {
  try {
    debugger
   
    const response = await axios.get(`${API_URL}/GetAllSubCategories`);
    return response;
  } catch (error) {
    console.error('Error add Category:', error);
    throw error;
  }
};
export const getSubCategoryBySlug = async (Slug) => {
  try {
      const response = await axios.get(`${API_URL}/SubCategory/Edit/${Slug}`); 
      return response;
  } catch (error) {
      console.error('Error fetching subcategories:', error);
      throw error;
  }
};
export const updatesubCategory = async (slug, SubCategoryData) => {
  try {
    const response = await axios.put(`${API_URL}/UpdateSubCategory/${slug}`, SubCategoryData); 
    return response;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};
export const deleteSubCategory = async (subcategoryId) => {
  try {
    debugger
    const response = await axios.delete(`${API_URL}/DeleteSubCategory/${subcategoryId}`);
    return response;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};
//Product Service
export const addProduct = async (Product) => {
  try {
    debugger
    console.log(Product)
    const response = await axios.post(`${API_URL}/CreateProduct`, Product);
    return response;
  } catch (error) {
    console.error('Error add Category:', error);
    throw error;
  }
};
export const updateProduct = async (slug, ProductData) => {
  try {
    const response = await axios.put(`${API_URL}/UpdateProduct/${slug}`, ProductData); 
    return response;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};
export const getProductBySlug = async (Slug) => {
  try {

    const response = await axios.get(`${API_URL}/Product/Edit/${Slug}`)
    return response
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    throw error;
  }
};
export const getAllProducts  = async () => {
  try {
    debugger
   
    const response = await axios.get(`${API_URL}/GetAllProducts`);
    return response;
  } catch (error) {
    console.error('Error add Category:', error);
    throw error;
  }
};
export const deleteProduct = async (ProductId) => {
  try {
    debugger
    const response = await axios.delete(`${API_URL}/DeleteProduct/${ProductId}`);
    return response;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};


  











