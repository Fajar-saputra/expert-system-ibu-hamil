import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// public page
import HomePage from "./pages/public/HomePage";
import LoginPage from "./pages/public/LoginPage";
import RegisterPage from "./pages/public/RegisterPage";
import Header from "./components/layout/Header";
import AboutPage from "./pages/public/AboutPage";

// admin page
import AdminRoute from "./components/layout/AdminRoute";
import Dashboard from "./pages/admin/Dashboard";
import GejalaManagement from "./pages/admin/GejalaManagement";
import PenyakitManagement from "./pages/admin/PenyakitManagement";
import RuleManagement from "./pages/admin/RuleManagement";
import DiagnosePage from "./pages/public/DiagnosePage";
import ResultPage from "./pages/public/ResultPage";

function App() {
    return (
        <>
            <Router>
                <Header />
                <div className="container mx-auto">
                    <Routes>
                        {/* Rute Publik */}
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/diagnose" element={<DiagnosePage />} />
                        <Route path="/result" element={<ResultPage />} />

                        {/* Rute Admin (PRIVATE ROUTE) */}
                        <Route path="/admin" element={<AdminRoute />}>
                            <Route index element={<Dashboard />} />
                            <Route path="gejala" element={<GejalaManagement />} />
                            <Route path="penyakit" element={<PenyakitManagement />} />
                            <Route path="rule" element={<RuleManagement />} />
                        </Route>
                    </Routes>
                </div>
            </Router>
            <ToastContainer />
        </>
    );
}

export default App;
