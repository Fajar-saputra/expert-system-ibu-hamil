// frontend/src/features/auth/authService.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL + '/users/';

const register = async (userData) => {
    const response = await axios.post(API_URL, userData);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

// Fungsi Logout (kita butuh ini di authSlice)
const logout = () => {
    localStorage.removeItem('user');
};

const authService = {
    register,
    logout,
};

export default authService;