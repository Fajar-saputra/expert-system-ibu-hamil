import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/public/HomePage";
import LoginPage from "./pages/public/LoginPage";
import RegisterPage from "./pages/public/RegisterPage";
import Header from "./components/layout/Header";
import AdminRoute from "./components/layout/AdminRoute";
import Dashboard from "./pages/admin/Dashboard";
import GejalaManagement from "./pages/admin/GejalaManagement";

function App() {
    return (
        <>
            <Router>
                <Header />
                <div className="container mx-auto">
                    <Routes>
                        {/* Rute Publik */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />

                        {/* 🛑 Rute Admin (PRIVATE ROUTE) 🛑 */}
                        <Route path="/admin" element={<AdminRoute />}>
                            <Route index element={<Dashboard />} />
                            <Route path="gejala" element={<GejalaManagement />} />
                            <Route path="penyakit" element={<p>Halaman Manajemen Penyakit</p>} />
                            <Route path="rule" element={<p>Halaman Manajemen Aturan</p>} />
                        </Route>
                    </Routes>
                </div>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
