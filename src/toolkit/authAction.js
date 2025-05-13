import axios from 'axios';
import { loginSuccess } from './authSlice';
import { loginUser } from './userSlice';

export const login = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(`${import.meta.env.BACK_END_URL}/api/login`, {
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
