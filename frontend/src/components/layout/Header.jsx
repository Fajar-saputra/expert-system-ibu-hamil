// frontend/src/components/layout/Header.jsx

import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // Ambil state user dari Redux store
    const { user } = useSelector((state) => state.auth); 

    const onLogout = () => {
        dispatch(logout()); // Panggil thunk logout
        dispatch(reset()); // Reset state Redux
        navigate('/login');
    };

    return (
        <header className='p-4 bg-white shadow-md mb-8'>
            <div className='container mx-auto flex justify-between items-center'>
                {/* Logo atau Nama Aplikasi */}
                <div className='text-xl font-bold text-blue-600'>
                    <Link to='/'>Sistem Pakar Ibu Hamil</Link>
                </div>

                <nav>
                    <ul className='flex space-x-6'>
                        {user ? (
                            <>
                                {/* Tampilkan Nama User atau Role */}
                                <li className='flex items-center text-gray-700 font-medium'>
                                    Halo, {user.nama} ({user.role})
                                </li>
                                {/* Tombol Logout */}
                                <li>
                                    <button onClick={onLogout} className='flex items-center text-red-600 hover:text-red-800 transition duration-150'>
                                        <FaSignOutAlt className='mr-1' /> Keluar
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                {/* Link Login */}
                                <li>
                                    <Link to='/login' className='flex items-center text-gray-700 hover:text-blue-600 transition duration-150'>
                                        <FaSignInAlt className='mr-1' /> Masuk
                                    </Link>
                                </li>
                                {/* Link Register */}
                                <li>
                                    <Link to='/register' className='flex items-center text-gray-700 hover:text-blue-600 transition duration-150'>
                                        <FaUser className='mr-1' /> Daftar
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default Header;