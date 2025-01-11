
import axios from 'axios';
import Cookies from 'js-cookie'; 
const API_URL = 'http://localhost:8080';

export const addPage = async (Pagedata) => {
    try {
      debugger
      console.log(Pagedata)
      const response = await axios.post(`${API_URL}/CreatePage`, Pagedata);
      return response;
    } catch (error) {
      console.error('Error add Category:', error);
      throw error;
    }
  };

  export const getAllPages  = async () => {  
    try {
      const response = await axios.get(`${API_URL}/GetAllPages`);
      return response;
    } catch (error) {
      console.error('Error add Pages:', error);
      throw error;
    }
  };


  export const deletePage = async (PageId) => {
    try {
      const response = await axios.delete(`${API_URL}/DeletePage/${PageId}`);
      return response;
    } catch (error) {
      console.error('Error deleting Page:', error);
      throw error;
    }
  };

  export const getPageBySlug = async (Slug) => {
    try {
        const response = await axios.get(`${API_URL}/Page/Edit/${Slug}`); 
        return response;
    } catch (error) {
        console.error('Error fetching Page:', error);
        throw error;
    }
  };