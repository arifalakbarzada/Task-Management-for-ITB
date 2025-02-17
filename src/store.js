import { configureStore, createSlice } from '@reduxjs/toolkit';
import departmentReducer from './toolkit/departmentSlice'
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
    departmentReducer : departmentReducer,
    
  },
});

export const { setState } = appSlice.actions;
export default store;
