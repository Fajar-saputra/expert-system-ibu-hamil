// frontend/src/features/gejala/gejalaSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import gejalaService from "./gejalaService";

const initialState = {
    gejalas: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: "",
};

// =======================================================
// Thunks untuk CRUD
// =======================================================

// Create Gejala
export const createGejala = createAsyncThunk("gejala/create", async (gejalaData, thunkAPI) => {
    try {
        return await gejalaService.createGejala(gejalaData);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Get Semua Gejala
export const getGejalas = createAsyncThunk("gejala/getAll", async (_, thunkAPI) => {
    try {
        return await gejalaService.getGejalas();
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Delete Gejala
export const deleteGejala = createAsyncThunk("gejala/delete", async (id, thunkAPI) => {
    try {
        await gejalaService.deleteGejala(id);
        return id; // Mengembalikan ID untuk filter di reducer
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Update Gejala
export const updateGejala = createAsyncThunk("gejala/update", async (gejalaData, thunkAPI) => {
    try {
        return await gejalaService.updateGejala(gejalaData);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// =======================================================
// Slice Reducer
// =======================================================
export const gejalaSlice = createSlice({
    name: "gejala",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            // --- GET GEJALAS ---
            .addCase(getGejalas.pending, (state) => {
                state.isLoading = true;
            })
            // .addCase(getGejalas.fulfilled, (state, action) => {
            //     state.isLoading = false;
            //     state.isSuccess = true;
            //     state.gejalas = action.payload;
            // })

            .addCase(getGejalas.fulfilled, (state, action) => {
                state.isLoading = false;
                state.gejalas = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(getGejalas.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // --- CREATE GEJALA ---
            .addCase(createGejala.fulfilled, (state, action) => {
                state.isSuccess = true;
                state.gejalas.push(action.payload); // Tambahkan gejala baru ke state
            })
            .addCase(createGejala.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
            })
            // --- DELETE GEJALA ---
            .addCase(deleteGejala.fulfilled, (state, action) => {
                state.isSuccess = true;
                // Filter gejala yang dihapus
                state.gejalas = state.gejalas.filter((gejala) => gejala._id !== action.payload);
            })
            .addCase(deleteGejala.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
            })
            // --- UPDATE GEJALA ---
            .addCase(updateGejala.fulfilled, (state, action) => {
                state.isSuccess = true;
                const index = state.gejalas.findIndex((g) => g._id === action.payload._id);
                if (index !== -1) {
                    state.gejalas[index] = action.payload; // Ganti gejala lama dengan yang baru
                }
            })
            .addCase(updateGejala.rejected, (state, action) => {
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = gejalaSlice.actions;
export default gejalaSlice.reducer;
