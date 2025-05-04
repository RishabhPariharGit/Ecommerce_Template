

import api from '../Api_Intersecptor/AxiosWebsite';


export const getUspsforSite = async () => {
    try {
        
        const response = await api.get('/GetAll_Active_Usps');
        console.log("response.data",response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching Category:', error);
        throw error;
    }
};