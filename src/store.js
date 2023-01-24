import { configureStore } from '@reduxjs/toolkit';
import user from './store/userSlice.js';
import data from './store/dataSlice.js';

export default configureStore({
  reducer: {
    data: data.reducer,
    user: user.reducer,
  },
});
