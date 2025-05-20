import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { userApiRequests } from "../services/base"
import {jwtDecode} from 'jwt-decode';



const initialState = {
    items: [],
    user: JSON.parse(localStorage.getItem("user")) || null
}
export const refreshUser = createAsyncThunk(
  'user/refreshUser',
  async (_, thunkAPI) => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const decoded = jwtDecode(refreshToken);
      const userId = decoded.userId;
      console.log(decoded)
      const response = await userApiRequests.getUserById(userId);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Refresh failed");
    }
  }
);
const userReducer = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setAllUsers: (state, action) => {
            state.items = action.payload
        },
        loginUser: (state, action) => {
            state.user = action.payload
        },
        logoutUser: (state) => {
            state.user = null
            userApiRequests.logoutUser()
            localStorage.removeItem("refreshToken")
            localStorage.removeItem("accessToken")
        },
        setUser : (state, action) => {
            state.user = action.payload
        },
        addNewUser: (state, action) => {
            state.items.push(action.payload);
            userApiRequests.addNewUser(action.payload)
        },
        removeUser: (state, action) => {
            state.items = state.items.filter((item) => item._id !== action.payload)
            userApiRequests.removeUser(action.payload)
        },
        editUser: (state, action) => {
            const index = state.items.findIndex((item) => item._id === action.payload._id)
            state.items[index] = action.payload
            userApiRequests.editUser(action.payload._id, action.payload)
        }
    }
})
export const { setAllUsers, loginUser, logoutUser, addNewUser, removeUser, editUser,setUser} = userReducer.actions
export default userReducer.reducer