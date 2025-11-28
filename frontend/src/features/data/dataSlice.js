import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  penyakit: [], // Array untuk menyimpan semua data Penyakit
  gejala: [],   // Array untuk menyimpan semua data Gejala
  rules: [],    // Array untuk menyimpan semua data Rules (Belum diimplementasi)
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Fungsi utilitas untuk menangani error
const handleAsyncError = (error, thunkAPI) => {
  const message =
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString();
  return thunkAPI.rejectWithValue(message);
};

// =======================================================
// THUNK UNTUK CRUD PENYAKIT (READ AJA DULU)
// =======================================================
export const getPenyakit = createAsyncThunk('data/getPenyakit', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get('/api/penyakit', config);
    return response.data;
  } catch (error) {
    return handleAsyncError(error, thunkAPI);
  }
});

// =======================================================
// THUNK UNTUK CRUD GEJALA
// =======================================================

// GET SEMUA GEJALA (READ)
export const getGejala = createAsyncThunk('data/getGejala', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get('/api/gejala', config);
    return response.data;
  } catch (error) {
    return handleAsyncError(error, thunkAPI);
  }
});

// CREATE GEJALA
export const createGejala = createAsyncThunk('data/createGejala', async (gejalaData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.post('/api/gejala', gejalaData, config);
    return response.data;
  } catch (error) {
    return handleAsyncError(error, thunkAPI);
  }
});

// UPDATE GEJALA
export const updateGejala = createAsyncThunk('data/updateGejala', async ({ id, gejalaData }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.put(`/api/gejala/${id}`, gejalaData, config);
    return response.data; // Mengembalikan item yang diperbarui
  } catch (error) {
    return handleAsyncError(error, thunkAPI);
  }
});

// DELETE GEJALA
export const deleteGejala = createAsyncThunk('data/deleteGejala', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    await axios.delete(`/api/gejala/${id}`, config);
    return id; // Kembalikan ID untuk dihapus di state
  } catch (error) {
    return handleAsyncError(error, thunkAPI);
  }
});


// =======================================================
// DATA SLICE (REDUCER)
// =======================================================
export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    // Reducer non-async, digunakan untuk mereset state
    resetData: (state) => {
      // Pertahankan data yang sudah dimuat, hanya reset status
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
    // Reducer untuk membersihkan semua data jika diperlukan
    clearAllData: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // ================= PENYAKIT (READ) =================
      .addCase(getPenyakit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPenyakit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.penyakit = action.payload;
      })
      .addCase(getPenyakit.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // ================= GEJALA: READ =================
      .addCase(getGejala.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGejala.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.gejala = action.payload;
      })
      .addCase(getGejala.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      
      // ================= GEJALA: CREATE =================
      .addCase(createGejala.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.gejala.push(action.payload);
      })
      // NOTE: Anda bisa menambahkan .addCase(createGejala.rejected, ...) untuk error handling
      
      // ================= GEJALA: UPDATE =================
      .addCase(updateGejala.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Cari dan ganti Gejala yang diperbarui di state
        state.gejala = state.gejala.map((g) => 
          g._id === action.payload._id ? action.payload : g
        );
      })
      
      // ================= GEJALA: DELETE =================
      .addCase(deleteGejala.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Hapus Gejala dari state berdasarkan ID (action.payload adalah ID)
        state.gejala = state.gejala.filter(
          (gejala) => gejala._id !== action.payload
        );
      });
  },
});

export const { resetData, clearAllData } = dataSlice.actions;

// Ekspor semua thunk agar bisa diakses dari komponen React
export default dataSlice.reducer;