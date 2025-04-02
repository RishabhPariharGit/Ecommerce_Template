// axiosWebsite.js
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const apiWebsite = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default apiWebsite;
