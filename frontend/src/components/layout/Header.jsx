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
        <header className='bg-white shadow-md w-5xl mx-auto'>
            <div className='px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16'>
                
                {/* 1. KIRI: Nama User / Selamat Datang */}
                <div className='flex-1 text-blue-600 font-bold text-lg'>
                    {user ? (
                        <Link to='/profile'>Hallo, {user.name || user.nama}</Link>
                    ) : (
                        <Link to='/'>Bunda Care</Link>
                    )}
                </div>

                {/* 2. TENGAH: Navbar Utama */}
                <nav className='flex-1 flex justify-center'>
                    <ul className='flex space-x-8 font-medium text-gray-700'>
                        <li><Link to='/' className='hover:text-blue-600 transition'>Home</Link></li>
                        <li><Link to='/about' className='hover:text-blue-600 transition'>About</Link></li>
                        <li><Link to='/diagnosa' className='hover:text-blue-600 transition'>Diagnosa</Link></li>
                    </ul>
                </nav>

                {/* 3. KANAN: Tombol Login / Logout */}
                <div className='flex-1 flex justify-end'>
                    <ul className='flex items-center space-x-6'>
                        {user ? (
                            <li>
                                <button onClick={onLogout} className='flex items-center text-red-600 hover:text-red-800 transition'>
                                    <FaSignOutAlt className='mr-1' /> Keluar
                                </button>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link to='/login' className='flex items-center text-gray-700 hover:text-blue-600 transition'>
                                        <FaSignInAlt className='mr-1' /> Masuk
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/register' className='flex items-center text-gray-700 hover:text-blue-600 transition'>
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