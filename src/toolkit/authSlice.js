import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_BACKEND_URL
const initialState = {
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserByToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserByToken.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserByToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const getUserByToken = createAsyncThunk('auth/getUserByToken', async (_, thunkAPI) => {
  try {
    let accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    let res = null

    try {
      // İlk olarak access token ile dene
      res=  await axios.get(`${apiUrl}/api/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (err) {
      if (err.response && err.response.status === 403 && refreshToken) {
        // Token süresi dolmuş → refresh token ile yeni token al
        const refreshRes = await axios.post(`${apiUrl}/api/refresh-token`, {
          refreshToken,
        });

        accessToken = refreshRes.data.accessToken;
        localStorage.setItem("accessToken", accessToken);

        // Yeni token ile yeniden dene
        res = await axios.get(`${apiUrl}/api/me`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
      } else {
        throw err;
      }
    }

    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Token doğrulama hatası");
  }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
