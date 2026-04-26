import axios from 'axios';

// Vite requires 'import.meta.env' to read .env variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL
});

export default api;