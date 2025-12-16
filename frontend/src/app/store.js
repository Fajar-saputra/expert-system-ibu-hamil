// frontend/src/app/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'; // Import authReducer

export const store = configureStore({
  reducer: {
    // Daftarkan authReducer di sini
    auth: authReducer, 
    // Reducer fitur lain akan ditambahkan di sini
  },
});