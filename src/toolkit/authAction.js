import axios from 'axios';
import { loginSuccess } from './authSlice';
import { loginUser } from './userSlice';
import dotenv from 'dotenv';

const apiUrl = import.meta.env.VITE_BACKEND_URL
export const login = (userData) => async (dispatch) => {
  try {
    console.log(apiUrl)
    const response = await axios.post(`${apiUrl}/api/login`, {
      email: userData.email,
      password: userData.password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { accessToken, refreshToken } = response.data;

    // Redux'a login success action'ını dispatch et
    dispatch(loginSuccess({ accessToken, refreshToken }));
    // dispatch(loginUser(response.data.user));
  } catch (error) {
    console.error("Login error: ", error);
  }
};
