import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Replace with the URL of your backend API
});

export default api;
