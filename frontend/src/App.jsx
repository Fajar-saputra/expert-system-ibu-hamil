import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from './pages/admin/HomePage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import Header from './components/layout/Header';

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
            
            {/* Rute Admin akan ditambahkan di sini nanti */}
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;