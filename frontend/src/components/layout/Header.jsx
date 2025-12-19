import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../features/auth/authSlice';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/login');
    };

    return (
        <header className='fixed top-0 left-0 right-0 z-50 bg-[#6155F5] shadow-lg transition-all duration-300'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16'>
                
                {/* 1. KIRI: Nama User / Logo dengan teks putih */}
                <div className='flex-1 text-white font-bold text-xl tracking-tight'>
                    {user ? (
                        <Link to='/profile' className='hover:opacity-80 transition'>
                            Hallo, {user.name || user.nama}
                        </Link>
                    ) : (
                        <Link to='/' className='hover:opacity-80 transition'>Bunda Care</Link>
                    )}
                </div>

                {/* 2. TENGAH: Navbar Utama dengan hover warna putih terang */}
                <nav className='flex-1 flex justify-center'>
                    <ul className='flex space-x-8 font-semibold text-white/90'>
                        <li>
                            <Link to='/' className='hover:text-white transition-colors duration-200 border-b-2 border-transparent hover:border-white py-1'>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to='/about' className='hover:text-white transition-colors duration-200 border-b-2 border-transparent hover:border-white py-1'>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to='/diagnose' className='hover:text-white transition-colors duration-200 border-b-2 border-transparent hover:border-white py-1'>
                                Diagnosa
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* 3. KANAN: Tombol Login / Logout */}
                <div className='flex-1 flex justify-end'>
                    <ul className='flex items-center space-x-6'>
                        {user ? (
                            <li>
                                <button 
                                    onClick={onLogout} 
                                    className='flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all shadow-md active:scale-95'
                                >
                                    <FaSignOutAlt className='mr-2' /> Keluar
                                </button>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link to='/login' className='flex items-center text-white hover:text-gray-200 transition font-medium'>
                                        <FaSignInAlt className='mr-1' /> Masuk
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/register' className='flex items-center bg-white text-[#6155F5] px-4 py-2 rounded-lg font-bold hover:bg-gray-100 transition shadow-md active:scale-95'>
                                        <FaUser className='mr-1' /> Daftar
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;