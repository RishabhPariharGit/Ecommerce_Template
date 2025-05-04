

import api from '../Api_Intersecptor/AxiosWebsite';


export const getAllScrollingTextforSite = async () => {
    try {
        
        const response = await api.get('/GetAllActiveScrollingText');
        console.log("response.data",response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching Category:', error);
        throw error;
    }
};