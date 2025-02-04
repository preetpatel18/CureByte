import axios from 'axios';  // Import axios

const API_BASE_URL = 'http://localhost:5000/api';

export const getHelloMessage = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/hello`);
    return response.data;
  } catch (error) {
    console.error('Error fetching message', error);
    throw error;
  }
};
