import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import gejalaReducer from '../features/gejala/gejalaSlice'

export const store = configureStore({
  reducer: {
    // Daftarkan authReducer di sini
    auth: authReducer, 
    gejala: gejalaReducer
  },
});