// frontend/src/components/AdminRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// Asumsi Anda memiliki state Redux untuk mengambil informasi user yang sedang login
// Di sini kita akan menggunakan placeholder sementara

// import { useSelector } from 'react-redux';

const AdminRoute = () => {
    // const { userInfo } = useSelector((state) => state.auth);

    // Placeholder data user dari Local Storage atau Redux
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    // Cek apakah user ada dan memiliki role 'admin'
    if (userInfo && userInfo.role === 'admin') {
        // Jika admin, izinkan akses ke child routes (Outlet)
        return <Outlet />;
    } else {
        // Jika bukan admin, arahkan ke halaman login
        // 'replace' memastikan pengguna tidak bisa kembali ke halaman admin dengan tombol back
        return <Navigate to="/login" replace />;
    }
};

export default AdminRoute;