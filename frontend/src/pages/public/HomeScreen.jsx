// frontend/src/pages/public/HomeScreen.jsx

import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
  // Ambil user state dari Redux
  const { user } = useSelector((state) => state.auth);

  return (
    <div className='container' style={styles.container}>
      {user ? (
        /* --- KONTEN UNTUK USER YANG SUDAH LOGIN --- */
        <div style={styles.card}>
          <h1>Selamat Datang, {user.nama}!</h1>
          <p>Anda telah berhasil masuk sebagai **{user.role === 'admin' ? 'Administrator' : 'Ibu Hamil'}**.</p>

          {user.role === 'admin' ? (
            // Jika Admin, arahkan ke Dashboard
            <Link to="/admin/dashboard" style={styles.adminButton}>
              Buka Admin Dashboard
            </Link>
          ) : (
            // Jika Ibu Hamil, arahkan ke Diagnosis
            <div style={styles.content}>
              <p>Anda dapat memulai proses diagnosis untuk mengetahui kondisi kehamilan Anda.</p>
              <Link to="/diagnosis" style={styles.button}>
                Mulai Diagnosis Sekarang
              </Link>
            </div>
          )}
        </div>
      ) : (
        /* --- KONTEN UNTUK USER YANG BELUM LOGIN --- */
        <div style={styles.card}>
          <h1>Sistem Pakar Kehamilan</h1>
          <p>Selamat datang di Sistem Pakar Pendeteksi Risiko Kehamilan.</p>
          <p>Silakan **Login** jika Anda sudah memiliki akun atau **Daftar** untuk memulai diagnosis.</p>
          <div style={styles.buttonGroup}>
            <Link to="/login" style={{ ...styles.button, marginRight: '15px' }}>
              Login
            </Link>
            <Link to="/register" style={styles.buttonOutline}>
              Daftar
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

// Style minimalis
const styles = {
  container: {
    padding: '40px 20px',
    textAlign: 'center',
    minHeight: '80vh',
    backgroundColor: '#f8f9fa',
  },
  card: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '30px',
    borderRadius: '10px',
    backgroundColor: 'white',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  content: {
    marginTop: '20px',
  },
  buttonGroup: {
    marginTop: '20px',
  },
  button: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#6c63ff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  buttonOutline: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: 'transparent',
    color: '#6c63ff',
    border: '2px solid #6c63ff',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    transition: 'all 0.3s',
  },
  adminButton: {
    display: 'block',
    margin: '20px auto 0',
    padding: '12px 25px',
    backgroundColor: '#ffc107',
    color: '#333',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
  }
};

export default HomeScreen;