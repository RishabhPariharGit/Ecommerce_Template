import api from '../Api_Intersecptor/AxiosWebsite';


export const getAllAnnouncementsforSite = async () => {
    try {
        
        const response = await api.get('/GetAllActiveAnnouncement');
        console.log("response.data",response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching Announcements:', error);
        throw error;
    }
};