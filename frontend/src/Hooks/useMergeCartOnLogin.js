import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:8080';

const useMergeCartOnLogin = () => {
  const mergeCartItems = async () => {
    const token = Cookies.get('token');
    const guid = Cookies.get('guid');
    if (!token || !guid) {
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/mergeCartItems`,
        { GUID: guid },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        Cookies.remove('guid'); // Remove GUID after merging
        console.log('Cart items merged successfully.');
      } else {
        console.error('Failed to merge cart items.');
      }
    } catch (error) {
      console.error('Error merging cart items:', error);
    }
  };

  return mergeCartItems;
};

export default useMergeCartOnLogin;
