import { apiSlice } from './apiSlice'; // Import base API slice Anda

// Endpoint base untuk operasi user/auth
const AUTH_URL = '/api/users'; 

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // 1. Login Mutation (POST /api/users/auth atau /api/users/login)
        login: builder.mutation({
            query: (data) => ({
                // Sesuaikan endpoint backend Anda (misalnya /api/users/login)
                url: `${AUTH_URL}/login`, 
                method: 'POST',
                body: data,
            }),
        }),
        
        // 2. Register Mutation (POST /api/users)
        register: builder.mutation({
            query: (data) => ({
                url: AUTH_URL, 
                method: 'POST',
                body: data,
            }),
        }),

        // 3. Logout Mutation (POST /api/users/logout)
        logout: builder.mutation({
            query: () => ({
                // Endpoint untuk membersihkan cookie HTTP-only di backend
                url: `${AUTH_URL}/logout`, 
                method: 'POST',
            }),
        }),
        
        // TODO: Tambahkan endpoint updateProfile jika diperlukan
    }),
});

// Export hook yang akan digunakan di komponen (misalnya LoginPage, Header)
export const { 
    useLoginMutation, 
    useRegisterMutation, 
    useLogoutMutation 
} = authApiSlice;