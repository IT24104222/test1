import axios from 'axios';

// Update this line with your Railway URL
const API_URL = 'https://test1-production-8f83.up.railway.app';

const api = axios.create({
  baseURL: API_URL
});

export default api;