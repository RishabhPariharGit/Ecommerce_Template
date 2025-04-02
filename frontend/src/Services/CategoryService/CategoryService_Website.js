

import api from '../Api_Intersecptor/AxiosWebsite';


export const getAllCategoryforSite = async () => {
    try {
        
        const response = await api.get('/GetAllActiveCategory');
        console.log("response.data",response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching Category:', error);
        throw error;
    }
};