// frontend/src/pages/public/RegisterScreen.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../../features/auth/authSlice'; // Import register
import { Link } from 'react-router-dom';

const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: '',
    password2: '', // Konfirmasi password
  });

  const { nama, email, password, password2 } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      alert(`Error Registrasi: ${message}`);
    }
    // Jika sukses atau user sudah ada (sudah login), redirect ke home
    if (isSuccess || user) {
      navigate('/');
    }
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      alert('Password dan Konfirmasi Password tidak cocok!');
    } else {
      const userData = {
        nama,
        email,
        password,
      };
      // Panggil thunk register
      dispatch(register(userData)); 
    }
  };

  if (isLoading) {
    return <h1>Sedang memproses registrasi...</h1>;
  }

  return (
    <div className='container' style={styles.container}>
      <div style={styles.card}>
        <h1>Daftar Akun Baru</h1>
        <p>Silakan isi data Anda sebagai Ibu Hamil</p>
        
        <form onSubmit={onSubmit}>
          {/* Input Nama */}
          <div style={styles.formGroup}>
            <label>Nama Lengkap</label>
            <input
              type='text'
              name='nama'
              value={nama}
              onChange={onChange}
              placeholder='Masukkan nama Anda'
              required
              style={styles.input}
            />
          </div>

          {/* Input Email */}
          <div style={styles.formGroup}>
            <label>Email</label>
            <input
              type='email'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='Masukkan email'
              required
              style={styles.input}
            />
          </div>

          {/* Input Password */}
          <div style={styles.formGroup}>
            <label>Password</label>
            <input
              type='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Masukkan password'
              required
              style={styles.input}
            />
          </div>

          {/* Input Konfirmasi Password */}
          <div style={styles.formGroup}>
            <label>Konfirmasi Password</label>
            <input
              type='password'
              name='password2'
              value={password2}
              onChange={onChange}
              placeholder='Ulangi password'
              required
              style={styles.input}
            />
          </div>

          <button type='submit' style={styles.button}>
            Daftar
          </button>
        </form>

        <div style={styles.linkContainer}>
          Sudah punya akun? <Link to='/login' style={styles.link}>Login</Link>
        </div>
      </div>
    </div>
  );
};

// Style sederhana untuk menyerupai desain modern
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    // Background bisa disetel di sini jika perlu
  },
  card: {
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: '15px',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '5px 0 10px 0',
    display: 'inline-block',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  button: {
    backgroundColor: '#6c63ff', // Warna ungu yang cerah
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
    fontSize: '16px',
    marginTop: '10px',
  },
  linkContainer: {
    marginTop: '20px',
    fontSize: '14px',
  },
  link: {
    color: '#6c63ff',
    textDecoration: 'none',
    fontWeight: 'bold',
  }
};

export default RegisterScreen;