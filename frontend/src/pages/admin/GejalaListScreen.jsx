// frontend/src/pages/admin/GejalaListScreen.jsx

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getGejala, deleteGejala, resetData } from '../../features/data/dataSlice';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';

const GejalaListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Ambil state dari Redux
  const { gejala, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.data
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }

    if (isError) {
      alert(`Error memuat data: ${message}`);
    }

    // Panggil Thunk untuk mengambil semua data Gejala
    dispatch(getGejala());

    // Cleanup function untuk reset state data saat keluar
    return () => {
      dispatch(resetData()); 
    };
  }, [dispatch, isError, message, user, navigate]);


  // Handler untuk menghapus Gejala
  const deleteHandler = (id, kode) => {
    if (window.confirm(`Yakin ingin menghapus Gejala KODE ${kode} (${id})?`)) {
      dispatch(deleteGejala(id));
      alert(`Gejala ${kode} berhasil dihapus.`); // Feedback sederhana setelah dispatch
    }
  };

  if (isLoading) {
    return <h1>Memuat Data Gejala...</h1>;
  }

  return (
    <div className='container' style={styles.container}>
      <div style={styles.header}>
        <h1>Daftar Gejala</h1>
        {/* Tombol Tambah Gejala */}
        <Link to="/admin/gejala/tambah" style={styles.addButton}>
          <FaPlus style={{ marginRight: '8px' }} /> Tambah Gejala Baru
        </Link>
      </div>

      {gejala.length === 0 ? (
        <p>Belum ada data gejala yang ditambahkan. Silakan tambah data baru.</p>
      ) : (
        /* Tampilan Tabel Data */
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{...styles.th, width: '10%'}}>Kode</th>
              <th style={{...styles.th, width: '30%'}}>Nama Gejala</th>
              <th style={{...styles.th, width: '45%'}}>Pertanyaan Diagnosa</th>
              <th style={{...styles.th, width: '15%'}}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {gejala.map((item) => (
              <tr key={item._id}>
                <td style={styles.td}>{item.kode}</td>
                <td style={styles.td}>{item.nama}</td>
                <td style={styles.td}>{item.pertanyaan_diagnosa}</td>
                <td style={styles.td}>
                  {/* Link ke halaman Edit */}
                  <Link to={`/admin/gejala/edit/${item._id}`} style={styles.editButton}>
                    <FaEdit />
                  </Link>
                  {/* Tombol Delete */}
                  <button 
                    onClick={() => deleteHandler(item._id, item.kode)} 
                    style={styles.deleteButton}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Style sederhana
const styles = {
  container: {
    padding: '40px 20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  addButton: {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 15px',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    backgroundColor: 'white',
  },
  th: {
    backgroundColor: '#f2f2f2',
    border: '1px solid #ddd',
    padding: '12px 8px',
    textAlign: 'left',
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px',
  },
  editButton: {
    backgroundColor: '#ffc107',
    color: 'white',
    border: 'none',
    padding: '8px',
    borderRadius: '3px',
    cursor: 'pointer',
    textDecoration: 'none',
    marginRight: '5px',
    display: 'inline-block',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '8px',
    borderRadius: '3px',
    cursor: 'pointer',
  }
};

export default GejalaListScreen;