import { configureStore, createSlice } from '@reduxjs/toolkit';
import departmentReducer from './toolkit/departmentSlice'
import userReducer from './toolkit/userSlice'
import taskReducer from './toolkit/taskSlice';
import authSlice from './toolkit/authSlice';
const initialState = {
  sidebarShow: true,
  theme: 'light',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setState: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    department : departmentReducer,
    users: userReducer,
    tasks : taskReducer,
    auth: authSlice
  },
});

export const { setState } = appSlice.actions;
export default store;
