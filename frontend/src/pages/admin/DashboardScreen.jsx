// frontend/src/pages/admin/DashboardScreen.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const DashboardScreen = () => {
  // Kita bisa menggunakan data user dari Redux untuk personalisasi
  const { user } = useSelector((state) => state.auth);

  return (
    <div className='container' style={styles.container}>
      <h1 style={styles.heading}>
        Dashboard Admin
      </h1>
      <h3 style={styles.subHeading}>
        Selamat datang di panel kontrol, {user && user.nama}.
      </h3>

      <div style={styles.cardContainer}>
        {/* Card 1: Pengelolaan Penyakit */}
        <Link to="/admin/penyakit" style={styles.cardLink}>
          <div style={styles.card}>
            <h2>Kelola Penyakit</h2>
            <p>Tambah, Edit, Hapus data penyakit dan solusinya.</p>
          </div>
        </Link>
        
        {/* Card 2: Pengelolaan Gejala */}
        <Link to="/admin/gejala" style={styles.cardLink}>
          <div style={styles.card}>
            <h2>Kelola Gejala</h2>
            <p>Tambah dan edit daftar gejala yang digunakan dalam diagnosis.</p>
          </div>
        </Link>

        {/* Card 3: Pengelolaan Rule (Basis Pengetahuan) */}
        <Link to="/admin/rules" style={styles.cardLink}>
          <div style={styles.card}>
            <h2>Kelola Rules (IF-THEN)</h2>
            <p>Atur logika dan aturan untuk sistem pakar (Basis Pengetahuan).</p>
          </div>
        </Link>
      </div>
      
    </div>
  );
};

// Style sederhana
// const styles = {
//   container: {
//     padding: '40px 20px',
//     minHeight: '80vh',
//   },
//   heading: {
//     textAlign: 'center',
//     marginBottom: '10px',
//     color: '#333',
//   },
//   subHeading: {
//     textAlign: 'center',
//     marginBottom: '30px',
//     color: '#666',
//     fontSize: '1.2em',
//   },
//   cardContainer: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     gap: '20px',
//     justifyContent: 'center',
//   },
//   cardLink: {
//     textDecoration: 'none',
//     color: 'inherit',
//     flexBasis: 'calc(33.333% - 20px)', // Tiga kolom per baris
//     maxWidth: '300px',
//   },
//   card: {
//     padding: '20px',
//     borderRadius: '8px',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//     backgroundColor: 'white',
//     transition: 'transform 0.2s, box-shadow 0.2s',
//     height: '100%',
//     textAlign: 'center',
//   },
// };

export default DashboardScreen;