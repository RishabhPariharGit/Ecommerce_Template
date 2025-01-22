import axios from 'axios';
const API_URL = 'http://localhost:8080';

export const createTemplate = async (templatedata, stylingdata) => {
  try {
    // Combine the template and styling data into one object
    const payload = {
      templatePayload: templatedata,
      stylingPayload: stylingdata,
    };

    // Send the combined payload to the backend
    const response = await axios.post(`${API_URL}/CreateTemplate`, payload);

    console.log(response);
    return response;
  } catch (error) {
    console.error('Error creating template and styling:', error);
    throw error;
  }
};


export const getAllTemplates  = async () => {  
    try {
      const response = await axios.get(`${API_URL}/GetAllTemplate`);
      return response;
    } catch (error) {
      console.error('Error add Template:', error);
      throw error;
    }
  };

  export const deleteTemplate = async (TemplateId) => {
    try {
      
      const response = await axios.delete(`${API_URL}/deleteTemplate/${TemplateId}`);
      return response;
    } catch (error) {
      console.error('Error deleting Page:', error);
      throw error;
    }
  };

  export const getTemplateById = async (Id) => {
    try {
      const response = await axios.get(`${API_URL}/Template/Edit/${Id}`)
      return response
    } catch (error) {
      console.error('Error fetching Template:', error);
      throw error;
    }
  };

  export const updateTemplate = async (id, templatedata,stylingdata) => {
    try {
        
        const payload = {
            templatePayload: templatedata,
            stylingPayload: stylingdata,
          };
      const response = await axios.put(`${API_URL}/UpdateTemplate/${id}`, payload); 
      return response;
    } catch (error) {
      console.error('Error updating category:', error);
      throw error;
    }
  };
