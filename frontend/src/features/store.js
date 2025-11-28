// frontend/src/features/store.js (Modifikasi)
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import dataReducer from './data/dataSlice'; // <-- IMPORT BARU

const store = configureStore({
  reducer: {
    auth: authReducer,
    data: dataReducer, // <-- TAMBAHKAN DI SINI
  },
});

export default store;