
import api from './Api_Intersecptor/AxiosAdmin';

export const CreateSectionsLayout = async (Section) => {
    try {
      console.log(Section);
      const response = await api.post('/CreateSectionsLayout', Section);
      return response;
    } catch (error) {
      console.error('Error CreateSectionsLayout:', error);
      throw error;
    }
  };

  export const getAllSectionsLayouts  = async () => {  
    try {
      const response = await api.get('/GetAllSectionsLayout');
      return response;
    } catch (error) {
      console.error('Error add section:', error);
      throw error;
    }
  };
  export const getSectionsLayoutById = async (Id) => {
    try {
      
        const response = await api.get(`/SectionsLayout/Edit/${Id}`); 
        return response;
    } catch (error) {
        console.error('Error fetching section:', error);
        throw error;
    }
  };

  export const updateSectionsLayout = async (Id, SectionData) => {
    try {
        
      const response = await api.put(`/UpdateSectionsLayout/${Id}`, SectionData); 
      return response;
    } catch (error) {
      console.error('Error updating section:', error);
      throw error;
    }
  };

  export const deleteSectionsLayout = async (Id) => {
    try {
      
      const response = await api.delete(`/DeleteSectionsLayout/${Id}`);
      return response;
    } catch (error) {
      console.error('Error deleting section:', error);
      throw error;
    }
  };
 