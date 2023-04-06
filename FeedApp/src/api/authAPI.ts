import axios from 'axios';
import {API_URL} from '../constants/api';

export const login = async (email: string, password: string) => {
  const requestBody = {
    user: {
      email: email.toLowerCase(),
      password,
    },
  };

  try {
    const response = await axios.post(`${API_URL}/users/login`, requestBody);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
