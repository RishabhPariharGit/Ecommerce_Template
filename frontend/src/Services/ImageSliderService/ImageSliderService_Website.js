

import api from '../Api_Intersecptor/AxiosWebsite';


export const getAllImageforSite = async () => {
    try {
        
        const response = await api.get('/GetAllActiveImageSlider');
        console.log("response.data",response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching Category:', error);
        throw error;
    }
};