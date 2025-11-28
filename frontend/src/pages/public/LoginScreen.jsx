// frontend/src/pages/public/LoginScreen.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../../features/auth/authSlice';

const LoginScreen = () => {
  const [formData, setFormData] = useState({
    email: 'admin@systems.com', // Default Admin Email
    password: 'verysecretpassword', // Default Admin Password
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Ambil state dari Redux Store
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // Logic Redirect setelah Login Berhasil
    if (isError) {
      alert(message); // Tampilkan error di browser (bisa diganti Toast/Snackbar)
    }

    if (isSuccess || user) {
      // Jika berhasil login, cek role
      if (user.role === 'admin') {
        navigate('/admin/dashboard'); // Redirect ke dashboard Admin
      } else {
        navigate('/'); // Redirect ke home page user biasa (ibu_hamil)
      }
    }

    dispatch(reset()); // Reset state error/success
  }, [user, isError, isSuccess, message, navigate, dispatch]);


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
    
    // Panggil async thunk login yang akan berkomunikasi dengan backend
    dispatch(login(userData)); 
  };
  
  // Tampilan sederhana saat loading
  if (isLoading) {
    return <h1>Loading...</h1>; 
  }

  return (
    <div className='container'>
      <h1>Login Sistem Pakar</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={onChange}
            placeholder='Masukkan email'
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={onChange}
            placeholder='Masukkan password'
            required
          />
        </div>
        <button type='submit'>Login</button>
      </form>
      {/* Tampilkan pesan error jika ada */}
      {isError && <p style={{ color: 'red' }}>{message}</p>}
    </div>
  );
};

export default LoginScreen;