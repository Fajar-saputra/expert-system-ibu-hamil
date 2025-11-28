// frontend/src/components/Header.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Ambil user state dari Redux
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout()); // Panggil async thunk logout
    dispatch(reset());
    navigate('/');
  };

  return (
    <header style={{ padding: '10px', background: '#333', color: 'white' }}>
      <div className='logo'>
        <Link to='/' style={{ color: 'white', textDecoration: 'none' }}>
          Sistem Pakar
        </Link>
      </div>
      <nav>
        {user ? (
          // Jika sudah login
          <div style={{ float: 'right' }}>
            {/* Tampilkan link Admin jika role adalah 'admin' */}
            {user.role === 'admin' && (
              <Link to='/admin/dashboard' style={{ color: 'yellow', marginRight: '15px' }}>
                Admin Dashboard
              </Link>
            )}
            <span style={{ marginRight: '15px' }}>Welcome, {user.nama} ({user.role})</span>
            <button onClick={onLogout} style={{ background: 'red', color: 'white', border: 'none', cursor: 'pointer' }}>
              Logout
            </button>
          </div>
        ) : (
          // Jika belum login
          <div style={{ float: 'right' }}>
            <Link to='/login' style={{ color: 'white', marginRight: '15px' }}>
              Login
            </Link>
            <Link to='/register' style={{ color: 'white' }}>
              Register
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;