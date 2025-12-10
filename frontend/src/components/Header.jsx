import React from 'react';
// Import hook Redux dan Router
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
// Gunakan hook useLogoutMutation dari RTK Query
import { useLogoutMutation } from '../slices/authApiSlice'; 
// Import action logout lokal dari authSlice
import { logout as localLogout } from '../slices/authSlice'; 
import { toast } from 'react-toastify'; 
import { FaSignOutAlt, FaSignInAlt, FaUser } from 'react-icons/fa'; // Import ikon

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // Ambil data user dari state auth lokal
    const { user } = useSelector((state) => state.auth); 
    
    // Gunakan mutasi logout dari RTK Query
    const [logoutApiCall] = useLogoutMutation();

    // Handler Logout menggunakan RTK Query
    const onLogout = async () => {
        try {
            // Panggil endpoint logout di backend
            await logoutApiCall().unwrap();
            
            // Clear state lokal dan localStorage
            dispatch(localLogout()); 
            
            // Navigasi
            navigate('/login');
            toast.success('Berhasil Logout');
        } catch (err) {
            // Walaupun API error, kita tetap log out lokal untuk keamanan
            dispatch(localLogout()); 
            navigate('/login');
            toast.error('Logout berhasil, namun terjadi kesalahan pada server.');
        }
    };

    // Navigasi Publik dan Admin
    const navLinks = [
        { path: '/', name: 'Home' },
        { path: '/diagnose', name: 'Diagnosa' },
        { path: '/about', name: 'About' },
        { path: '/testimonial', name: 'Testimonial' },
    ];
    
    // Tambahkan link Admin jika user adalah admin
    if (user && user.role === 'admin') {
        navLinks.push({ path: '/admin/dashboard', name: 'Admin Dashboard' });
    }

    return (
        <header className="bg-indigo-600 shadow-md sticky top-0 z-40">
            <div className="container max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
                
                {/* 1. KIRI: Logo/Brand */}
                <div className="flex items-center space-x-4">
                    <Link to='/' className="text-2xl font-bold text-white hover:text-indigo-100 transition duration-200">
                        Sistem Pakar
                    </Link>
                    {user && user.role === 'admin' && (
                        <span className="text-xs font-semibold px-2 py-1 bg-white text-indigo-700 rounded-full">ADMIN</span>
                    )}
                </div>

                {/* 2. TENGAH: Navigasi Utama */}
                <nav className="hidden md:flex flex-grow justify-center">
                    <ul className="flex space-x-6">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link 
                                    to={link.path} 
                                    className="text-white hover:text-indigo-200 font-medium transition duration-200"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* 3. KANAN: Auth / User Info / Logout */}
                <ul className="flex space-x-3 items-center">
                    {user ? (
                        <>
                            {/* Tampilkan Nama User atau Role */}
                            <li className="hidden sm:block text-white text-sm font-semibold">
                                <FaUser className="inline mr-1" /> 
                                {user.name.split(' ')[0]} 
                            </li>
                            {/* Tombol Logout */}
                            <li>
                                <button 
                                    onClick={onLogout}
                                    className="flex items-center text-white bg-indigo-500 hover:bg-indigo-400 py-2 px-3 rounded-lg text-sm font-semibold transition duration-200"
                                >
                                    <FaSignOutAlt className="mr-2" /> Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            {/* Tombol Masuk */}
                            <li>
                                <Link to='/login' className="flex items-center text-white hover:text-indigo-200 transition duration-200">
                                    <FaSignInAlt className="mr-1" /> Masuk
                                </Link>
                            </li>
                            {/* Tombol Daftar */}
                            <li className="hidden sm:block">
                                <Link 
                                    to='/register' 
                                    className="bg-indigo-500 hover:bg-indigo-400 text-white py-2 px-3 rounded-lg text-sm font-semibold transition duration-200"
                                >
                                    Daftar
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </header>
    );
}

export default Header;