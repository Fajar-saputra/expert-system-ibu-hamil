// frontend/src/pages/admin/GejalaFormScreen.jsx

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getGejala, createGejala, updateGejala, resetData } from '../../features/data/dataSlice';

const GejalaFormScreen = () => {
  const [formData, setFormData] = useState({
    kode: '',
    nama: '',
    pertanyaan_diagnosa: '',
  });

  const { kode, nama, pertanyaan_diagnosa } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: gejalaId } = useParams(); // Ambil ID dari URL jika ini mode Edit

  const { gejala, isLoading, isError, isSuccess, message } = useSelector((state) => state.data);

  // Efek untuk mode EDIT: Memuat data Gejala ke dalam form
  useEffect(() => {
    // Jika ada ID (mode Edit)
    if (gejalaId) {
      // Pastikan data gejala sudah dimuat
      if (gejala.length === 0) {
        dispatch(getGejala()); // Ambil data jika belum ada di state
      }

      const existingGejala = gejala.find((g) => g._id === gejalaId);

      if (existingGejala) {
        setFormData({
          kode: existingGejala.kode,
          nama: existingGejala.nama,
          pertanyaan_diagnosa: existingGejala.pertanyaan_diagnosa,
        });
      } else if (isSuccess && gejala.length > 0) {
         // Jika data sudah dimuat tapi ID tidak ditemukan
         // Sebaiknya ditangani dengan lebih baik, misal redirect ke 404
      }
    }
    
    // Penanganan Error & Success
    if (isError) {
      alert(`Error: ${message}`);
    }
    
    // Redirect setelah operasi berhasil (CREATE/UPDATE)
    if (isSuccess && !gejalaId) { // Jika sukses CREATE
        alert('Gejala baru berhasil ditambahkan!');
        navigate('/admin/gejala');
        dispatch(resetData());
    } else if (isSuccess && gejalaId) { // Jika sukses UPDATE
        alert('Gejala berhasil diperbarui!');
        navigate('/admin/gejala');
        dispatch(resetData());
    }

  }, [gejalaId, gejala, isError, isSuccess, message, dispatch, navigate]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const gejalaData = { kode, nama, pertanyaan_diagnosa };

    if (gejalaId) {
      // UPDATE
      dispatch(updateGejala({ id: gejalaId, gejalaData }));
    } else {
      // CREATE
      dispatch(createGejala(gejalaData));
    }
  };

  if (isLoading) {
    return <h1>{gejalaId ? 'Memuat Data Edit...' : 'Menyimpan Data...'}</h1>;
  }

  const title = gejalaId ? 'Edit Gejala' : 'Tambah Gejala Baru';

  return (
    // <div className='container' style={styles.container}>
    <div className='container'>
      {/* <Link to="/admin/gejala" style={styles.backButton}>Kembali ke Daftar Gejala</Link> */}
      <Link to="/admin/gejala">Kembali ke Daftar Gejala</Link>
      <h1>{title}</h1>

      {/* <form onSubmit={onSubmit} style={styles.form}> */}
      <form onSubmit={onSubmit}>
        {/* <div style={styles.formGroup}> */}
        <div>
          <label htmlFor="kode">Kode Gejala (Contoh: G01)</label>
          <input
            type="text"
            id="kode"
            name="kode"
            value={kode}
            onChange={onChange}
            required
            readOnly={gejalaId} // Kode tidak boleh diubah saat Edit
            // style={styles.input}
          />
        </div>

        {/* <div style={styles.formGroup}> */}
        <div>
          <label htmlFor="nama">Nama Gejala</label>
          <input
            type="text"
            id="nama"
            name="nama"
            value={nama}
            onChange={onChange}
            required
            // style={styles.input}
          />
        </div>
        
        <div style={styles.formGroup}>
          <label htmlFor="pertanyaan_diagnosa">Pertanyaan Diagnosa (Akan ditampilkan ke User)</label>
          <textarea
            id="pertanyaan_diagnosa"
            name="pertanyaan_diagnosa"
            value={pertanyaan_diagnosa}
            onChange={onChange}
            rows="3"
            required
            // style={styles.textarea}
          />
        </div>

        <button type="submit">
        {/* <button type="submit" style={styles.submitButton}> */}
          {gejalaId ? 'Perbarui Gejala' : 'Simpan Gejala'}
        </button>
      </form>
    </div>
  );
};

// Style minimalis
const styles = {
    container: {
        maxWidth: '700px',
        margin: '0 auto',
        padding: '20px',
    },
    backButton: {
        display: 'inline-block',
        marginBottom: '20px',
        color: '#007bff',
        textDecoration: 'none',
    },
    form: {
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    formGroup: {
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box',
        marginTop: '5px',
    },
    textarea: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box',
        marginTop: '5px',
        resize: 'vertical',
    },
    submitButton: {
        backgroundColor: '#28a745',
        color: 'white',
        padding: '12px 20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        width: '100%',
        marginTop: '10px',
    },
};

export default GejalaFormScreen;