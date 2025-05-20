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
    const accessToken = localStorage.getItem("accessToken");
    const res = await axios.get(`${apiUrl}/api/me`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      }
    });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || "Token doğrulama hatası");
  }
});
export const { logout } = authSlice.actions;

export default authSlice.reducer;
