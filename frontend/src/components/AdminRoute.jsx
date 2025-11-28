// frontend/src/components/AdminRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
  // Ambil state autentikasi dari Redux
  const { user, isLoading } = useSelector((state) => state.auth);

  // Jika masih memuat (misalnya, mengambil data dari local storage), tampilkan loading
  if (isLoading) {
    return <h1>Memuat Data Pengguna...</h1>; 
  }

  // Cek Kondisi Otorisasi:
  // 1. user harus ada (sudah login)
  // 2. user.role harus 'admin'
  // Jika kondisi terpenuhi, tampilkan konten anak-anak (Outlet, yaitu DashboardScreen)
  // Jika TIDAK, arahkan user ke halaman login
  return user && user.role === 'admin' ? (
    <Outlet />
  ) : (
    <Navigate to='/login' replace />
  );
};

export default AdminRoute;