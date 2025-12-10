import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Ambil URL Backend dari environment variable
const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL, 
    // Jika Anda perlu otentikasi (Authorization Bearer Token), tambahkan ini:
    prepareHeaders: (headers, { getState }) => {
        // Ambil token dari state authSlice
        const token = getState().auth.userInfo?.token; 
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

// Definisi API Slice dasar
export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User', 'Gejala', 'Penyakit', 'Rule'], // Daftar tag yang digunakan untuk caching/invalidating
    endpoints: (builder) => ({
        // Endpoint akan diinject di file slice spesifik (seperti gejalaApiSlice.js)
    }),
});