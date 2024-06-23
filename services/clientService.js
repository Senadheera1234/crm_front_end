import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getClients = async () => {
  try {
    const response = await apiClient.get('/clients');
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching clients: ${error.message}`);
  }
};
