import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Ambil user dari Local Storage
// Ini akan menjalankan logic 'hydration' saat aplikasi dimuat
const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// =======================================================
// THUNKS (ASYNC ACTIONS)
// =======================================================

// 1. LOGIN
export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post('/api/users/login', userData);
      
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
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

// 2. LOGOUT
export const logout = createAsyncThunk('auth/logout', async () => {
  await localStorage.removeItem('user');
});

// 3. REGISTER
export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      // Panggil API POST /api/users
      const response = await axios.post('/api/users', userData); 
      
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
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
// AUTH SLICE DEFINITION
// =======================================================
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Reducer untuk mereset state error/success
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN PENDING
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      // LOGIN FULFILLED (Sukses)
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      // LOGIN REJECTED (Gagal)
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload; // Pesan error dari backend
        state.user = null;
      })
      
      // LOGOUT FULFILLED
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })
      
      // REGISTER PENDING
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      // REGISTER FULFILLED (Sukses)
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      // REGISTER REJECTED (Gagal)
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;