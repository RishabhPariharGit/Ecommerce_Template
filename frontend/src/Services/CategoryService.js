import axios from 'axios';

const API_URL = 'http://localhost:8080';

// Register user
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

export const getAllSubCategoriesByCategoryId = async (CategoryId) => {
  try {

    const response = await axios.post(`${API_URL}/AllSubCategoriesByCategoryId`, { CategoryId }); 
    return response
  } catch (error) {
    console.error('Error fetching subcategories:', error);
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
  export const getAllSubCategories  = async () => {
    try {
      debugger
     
      const response = await axios.get(`${API_URL}/GetAllSubCategory`);
      return response;
    } catch (error) {
      console.error('Error add Category:', error);
      throw error;
    }
  };

