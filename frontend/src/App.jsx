// frontend/src/App.jsx (VERSI BERSIH DAN BENAR)

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Komponen/Pages
import Header from "./components/Header";
import AdminRoute from "./components/AdminRoute"; 
import HomeScreen from "./pages/public/HomeScreen"; // Menggantikan HomePage
import LoginScreen from "./pages/public/LoginPage";
import RegisterPage from "./pages/public/RegisterPage"; // Menggunakan RegisterPage
import AboutPage from "./pages/public/AboutPage"; // Asumsi ada
import DiagnosePage from "./pages/public/DiagnosePage"; // Asumsi ada

// Admin Pages  
import DashboardScreen from "./pages/admin/DashboardScreen";
import GejalaListScreen from "./pages/admin/GejalaListScreen";
import PenyakitListScreen from "./pages/admin/PenyakitListScreen"; // Akan kita buat

const App = () => {
    return (
        <Router>
            <Header /> {/* 1. Header/Navbar harus di luar Routes agar selalu terlihat */}
            <main className="py-3">
                <Routes> {/* 2. SEMUA Route harus di dalam Routes */}
                    
                    {/* Rute Publik */}
                    <Route path="/" element={<HomeScreen />} /> 
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/diagnose" element={<DiagnosePage />} />

                    {/* Rute ADMIN - DILINDUNGI (Menggunakan AdminRoute sebagai Guard) */}
                    <Route path="/admin" element={<AdminRoute />}>
                        
                        {/* 3. Nested Routes - DashboardScreen sebagai Layout */}
                        <Route path="dashboard" element={<DashboardScreen />}>
                            
                            {/* Rute Default Dashboard (/admin/dashboard) */}
                            <Route
                                index
                                element={
                                    <div className="text-center p-10 bg-white rounded-lg shadow">
                                        <h3 className="text-3xl font-bold text-gray-700">Selamat Datang di Admin Dashboard</h3>
                                        <p className="text-gray-500 mt-2">Pilih menu di samping untuk mengelola data sistem pakar.</p>
                                    </div>
                                }
                            />

                            {/* Rute CRUD Gejala */}
                            <Route path="gejala" element={<GejalaListScreen />} />

                            {/* Rute CRUD Penyakit (Langkah kita berikutnya) */}
                            <Route path="penyakit" element={<PenyakitListScreen />} />
                            
                            {/* Rute CRUD Rules akan ditambahkan di sini */}
                            <Route path="rules" element={<h1>Kelola Rules</h1>} />
                            
                        </Route>
                    </Route>
                    
                    {/* Rute Wildcard/404 (Opsional) */}
                    {/* <Route path="*" element={<h1>Halaman Tidak Ditemukan</h1>} /> */}

                </Routes>
            </main>
            <ToastContainer /> {/* 4. ToastContainer di luar main/di bawah Router */}
        </Router>
    );
};

export default App;