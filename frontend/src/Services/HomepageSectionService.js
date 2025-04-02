import api from './Api_Intersecptor/AxiosAdmin';





export const addsection = async (sectionData) => {
  try {
    const response = await api.post(`/AddSection`, sectionData);
    return response;
  } catch (error) {
    console.error('Error Adding Section:', error);
    throw error;
  }
};

export const getAllsections  = async () => {
    try {
        
      const response = await api.get('/GetAllSections');
      return response;
    } catch (error) {
      console.error('Error add Category:', error);
      throw error;
    }
  };

  export const getSectionById = async (id) => {
    try {
           
        const response = await api.get(`/HomePageSection/Edit/${id}`); 
        return response;
    } catch (error) {
        console.error('Error fetching HomePageSection:', error);
        throw error;
    }
  };

  export const updateSection = async (id, SectionData) => {
    try {
      const response = await api.put(`/UpdateSection/${id}`, SectionData); 
      return response;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  };
  export const deleteSection = async (id) => {
    try {
      const response = await api.delete(`/DeleteSection/${id}`);
      return response;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  };

  export const getAllsectionsforwebsite  = async () => {
    try {
        
      const response = await api.get('/GetAllsectionsforwebsite');
      return response;
    } catch (error) {
      console.error('Error add Category:', error);
      throw error;
    }
  };

  export const updateSectionsAddToSidenav = async (sections) => {
    try {
      const response = await api.put('/SectionsAddToSidenav', { sections });
      return response;
    } catch (error) {
      console.error('Error Adding Section:', error);
      throw error;
    }
  };