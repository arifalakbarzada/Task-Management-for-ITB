// import { legacy_createStore as createStore } from 'redux'

// const initialState = {
//   sidebarShow: true,
//   theme: 'light',
// }

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case 'set':
//       return { ...state, ...rest }
//     default:
//       return state
//   }
// }

// const store = createStore(changeState)
// export default store
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Başlangıç state'i
const initialState = {
  sidebarShow: true,
  theme: 'light',
};

// Slice oluşturma
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setState: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

// Redux Store'u oluştur
const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

export const { setState } = appSlice.actions;
export default store;
