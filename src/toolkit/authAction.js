import axios from 'axios';
const apiUrl = import.meta.env.VITE_BACKEND_URL
export const login = (userData) => async () => {
  try {
    const response = await axios.post(`${apiUrl}api/login`, {
      email: userData.email,
      password: userData.password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error("Login error: ", error);
  }
};
