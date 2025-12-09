// frontend/src/components/Header.jsx (Contoh Perbaikan)
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
// ✅ Import thunk 'logout' dari authSlice
import { logout, reset } from '../features/auth/authSlice'; 

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout()); // Memanggil thunk logout
        dispatch(reset());
        navigate('/login');
    };

    return (
        <header>
            <div className='logo'>
                <Link to='/'>Sistem Pakar</Link>
            </div>
            <ul>
                {user ? (
                    <li>
                        {/* Panggil fungsi onLogout saat tombol diklik */}
                        <button onClick={onLogout}>Logout</button>
                    </li>
                ) : (
                    <>
                        <li><Link to='/login'>Masuk</Link></li>
                        <li><Link to='/register'>Daftar</Link></li>
                    </>
                )}
            </ul>
        </header>
    );
}

export default Header;