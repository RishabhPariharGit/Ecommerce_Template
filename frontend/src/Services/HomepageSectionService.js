import axios from 'axios';

const API_URL = 'http://localhost:8080';


export const addsection = async (sectionData) => {
  try {
    const response = await axios.post(`${API_URL}/AddSection`, sectionData);
    return response;
  } catch (error) {
    console.error('Error Adding Section:', error);
    throw error;
  }
};

export const getAllsections  = async () => {
    try {
        debugger
      const response = await axios.get(`${API_URL}/GetAllSections`);
      return response;
    } catch (error) {
      console.error('Error add Category:', error);
      throw error;
    }
  };

  export const getSectionById = async (id) => {
    try {
      debugger     
        const response = await axios.get(`${API_URL}/HomePageSection/Edit/${id}`); 
        return response;
    } catch (error) {
        console.error('Error fetching HomePageSection:', error);
        throw error;
    }
  };

  export const updateSection = async (id, SectionData) => {
    try {
      const response = await axios.put(`${API_URL}/UpdateSection/${id}`, SectionData); 
      return response;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  };
  export const deleteSection = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/DeleteSection/${id}`);
      return response;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  };

  export const getAllsectionsforwebsite  = async () => {
    try {
        debugger
      const response = await axios.get(`${API_URL}/GetAllsectionsforwebsite`);
      return response;
    } catch (error) {
      console.error('Error add Category:', error);
      throw error;
    }
  };

  export const updateSectionsAddToSidenav = async (sections) => {
    try {
      const response = await axios.put(`${API_URL}/SectionsAddToSidenav`, { sections });
      return response;
    } catch (error) {
      console.error('Error Adding Section:', error);
      throw error;
    }
  };