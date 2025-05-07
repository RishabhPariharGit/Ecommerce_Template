import api from '../Api_Intersecptor/AxiosAdmin';

export const addCollection = async (Collection) => {
    try {
      
      console.log(Collection)
      const response = await api.post('/Createcollection', Collection);
      return response.data ;
    } catch (error) {
      console.error('Error add Category:', error);
      throw error;
    }
  };


  export const updateCollection = async (Id, CollectionData) => {
    try {
      const response = await api.put(`/UpdateCollection/${Id}`, CollectionData); 
      return response.data;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  };

  export const getCollectionById = async (Id) => {
    try {
  
      const response = await api.get(`/GetCollectionById/Edit/${Id}`)
      return response.data;
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      throw error;
    }
  };


  export const getAllCollections  = async () => {
    try {
      
     
      const response = await api.get('/GetAllCollections');
      console.log("return response.data;", response.data);
      return response.data;
    } catch (error) {
      console.error('Error add Category:', error);
      throw error;
    }
  };


  export const deleteCollection = async (Id) => {
    try {
      
      const response = await api.delete(`/DeleteCollection/${Id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  };
