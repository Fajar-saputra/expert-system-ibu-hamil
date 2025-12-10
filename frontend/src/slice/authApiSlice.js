import { apiSlice } from "./apiSlice"; // Import base API slice Anda

// Endpoint yang akan digunakan untuk Auth
const AUTH_URL = '/api/users'; 

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // 1. Endpoint untuk Login
        login: builder.mutation({
            query: (data) => ({
                url: `${AUTH_URL}/login`,
                method: 'POST',
                body: data,
            }),
        }),
        // 2. Endpoint untuk Register
        register: builder.mutation({
            query: (data) => ({
                url: AUTH_URL, // Asumsi endpoint register adalah POST ke /api/users
                method: 'POST',
                body: data,
            }),
        }),
        // 3. Endpoint untuk Logout (biasanya POST/GET ke backend untuk clear cookie/session)
        logout: builder.mutation({
            query: () => ({
                url: `${AUTH_URL}/logout`,
                method: 'POST',
            }),
        }),
    }),
});

// Ekspor hook yang otomatis dibuat oleh RTK Query
export const { 
    useLoginMutation, 
    useRegisterMutation, 
    useLogoutMutation 
} = authApiSlice;