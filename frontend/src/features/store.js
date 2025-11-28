// frontend/src/features/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice'; // Belum dibuat, akan kita buat di langkah berikutnya

const store = configureStore({
  reducer: {
    auth: authReducer,
    // [nanti_tambah_reducer_lain_di_sini]
  },
  // DevTools otomatis aktif di lingkungan development
});

export default store;