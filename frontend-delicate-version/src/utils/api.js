import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', // Mock for now, backend later
});

export default api;