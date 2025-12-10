import { configureStore } from "@reduxjs/toolkit";
// Import authReducer untuk state lokal (seperti sebelumnya)
import authReducer from "./slices/authSlice";
// Import apiSlice (base) dan gejalaApiSlice (Anda sudah punya)
import { apiSlice } from "./slices/apiSlice";
import { gejalaApiSlice } from "./slices/gejalaApiSlice";
// Import authApiSlice yang baru dibuat
import { authApiSlice } from "./slices/authApiSlice";

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,

        [gejalaApiSlice.reducerPath]: gejalaApiSlice.reducer, //
        [authApiSlice.reducerPath]: authApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            apiSlice.middleware,
            gejalaApiSlice.middleware,
            authApiSlice.middleware
        ),
    devTools: true, //
});

export default store;
