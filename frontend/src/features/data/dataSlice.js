// frontend/src/features/data/dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  penyakit: [], // Array untuk menyimpan semua data Penyakit
  gejala: [],
  rules: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// =======================================================
// THUNK UNTUK GET SEMUA PENYAKIT (READ CRUD)
// =======================================================
export const getPenyakit = createAsyncThunk(
  'data/getPenyakit',
  async (_, thunkAPI) => {
    try {
      // Dapatkan token dari state auth
      const token = thunkAPI.getState().auth.user.token;

      // Konfigurasi header otorisasi
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Panggil API GET /api/penyakit
      const response = await axios.get('/api/penyakit', config);
      return response.data;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// =======================================================
// DATA SLICE
// =======================================================
export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    resetData: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPenyakit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPenyakit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.penyakit = action.payload; // Simpan data penyakit
      })
      .addCase(getPenyakit.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
      // [Nanti tambahkan case untuk create, update, delete]
  },
});

export const { resetData } = dataSlice.actions;
export default dataSlice.reducer;