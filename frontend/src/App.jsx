import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Komponen/Pages
import Header from "./components/Header";
import AdminRoute from "./components/AdminRoute"; // Untuk melindungi rute admin
import HomeScreen from "./pages/public/HomeScreen";
import LoginScreen from "./pages/public/LoginPage";
import RegisterScreen from "./pages/public/RegisterPage";
import DashboardScreen from "./pages/admin/DashboardScreen"; // Buat file ini (kosong saja dulu)
import GejalaListScreen from "./pages/admin/GejalaListScreen";
import { ToastContainer } from "react-toastify";
import RegisterPage from "./pages/public/RegisterPage";


const App = () => {
    return (
        <Router>
            <RegisterPage/>
            {/* <Header /> Header/Navbar akan selalu terlihat */}
            {/* <main className="py-3"> */}
            {/* <ToastContainer> */}
            {/* <Routes> */}
            {/* Rute Publik (Siapapun bisa mengakses) */}
            {/* <Route path="/" element={<HomeScreen />} /> */}
            {/* <Route path="/login" element={<LoginScreen />} /> */}
            {/* <Route path="/register" element={<RegisterPage />} /> */}

            {/* Rute Admin (Hanya bisa diakses oleh Admin) */}
            {/* Outlet ini akan mengecek user.role === 'admin' */}
            {/* /* RUTE ADMIN YANG DILINDUNGI */}
            {/* <Route path="" element={<AdminRoute />}> */}
            {/* <Route path="/admin/dashboard" element={<DashboardScreen />} /> */}

            {/* TAMBAHKAN RUTE CRUD ADMIN DI SINI */}
            {/* <Route path="/admin/gejala" element={<GejalaListScreen />} /> */}
            {/* <Route path="/admin/penyakit" element={<h1>Kelola Penyakit</h1>} /> */}
            {/* <Route path="/admin/gejala" element={<h1>Kelola Gejala</h1>} /> */}
            {/* <Route path="/admin/rules" element={<h1>Kelola Rules</h1>} /> */}
            {/* </Route> */}
            {/* </Routes> */}
            {/* </ToastContainer> */}
            {/* </main> */}
        </Router>
    );
};

export default App;
