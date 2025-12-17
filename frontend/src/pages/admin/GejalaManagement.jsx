// frontend/src/pages/admin/GejalaManagement.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGejalas, createGejala, deleteGejala, reset, updateGejala } from "../../features/gejala/gejalaSlice";
import { toast } from "react-toastify";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

function GejalaManagement() {
    const dispatch = useDispatch();
    // const { gejalas, isLoading, isError, message } = useSelector((state) => state.gejala);

    const { gejalas, isLoading, isError, message } = useSelector((state) => state.gejala);

    // State untuk Form (Create/Update)
    const [formData, setFormData] = useState({ kode: "", nama: "", pertanyaan_diagnosa: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [showForm, setShowForm] = useState(false);

    // Gunakan pola ini untuk keduanya

    
    useEffect(() => {
        dispatch(getGejalas());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
            toast.error(message);
            // JANGAN panggil dispatch(reset()) di sini
        }
    }, [isError, message]);

    // Panggil reset hanya saat benar-benar meninggalkan halaman
    useEffect(() => {
        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    // Handler Submit Form (Create/Update)
    const onSubmit = (e) => {
        e.preventDefault();

        if (isEditing) {
            // Logic Update
            dispatch(updateGejala({ id: editId, ...formData }))
                .unwrap()
                .then(() => {
                    toast.success("Gejala berhasil diperbarui!");
                    resetForm();
                })
                .catch((error) => toast.error(error));
        } else {
            // Logic Create
            dispatch(createGejala(formData))
                .unwrap()
                .then(() => {
                    toast.success("Gejala baru berhasil ditambahkan!");
                    resetForm();
                })
                .catch((error) => toast.error(error));
        }
    };

    const onChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // Fungsi untuk Reset Form
    const resetForm = () => {
        setIsEditing(false);
        setEditId(null);
        setShowForm(false);
        setFormData({ kode: "", nama: "", pertanyaan_diagnosa: "" });
    };

    // Handler Edit
    // const handleEdit = (gejala) => {
    //     setFormData({ kode: gejala.kode, nama: gejala.nama });
    //     setIsEditing(true);
    //     setEditId(gejala._id);
    //     setShowForm(true);
    // };

const handleEdit = (gejala) => {
    setFormData({
        kode: gejala.kode,
        nama: gejala.nama,
        pertanyaan_diagnosa: gejala.pertanyaan_diagnosa,
    });
    setIsEditing(true);
    setEditId(gejala._id);
    setShowForm(true);
};


    // Handler Delete
    const handleDelete = (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus gejala ini?")) {
            dispatch(deleteGejala(id))
                .unwrap()
                .then(() => {
                    toast.success("Gejala berhasil dihapus!");
                })
                .catch((error) => toast.error(error));
        }
    };

    if (isLoading) {
        return <h1 className="text-center">Memuat Data Gejala...</h1>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6 text-blue-700">Manajemen Data Gejala ({gejalas.length} data)</h1>

            <button
                onClick={() => {
                    // 🛑 GANTI DENGAN INI 🛑
                    if (showForm) {
                        resetForm(); // Jika sedang tampil, tutup dan reset
                    } else {
                        setShowForm(true); // Jika tidak tampil, tampilkan
                    }
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-6 hover:bg-blue-600 transition flex items-center"
            >
                <FaPlus className="mr-2" /> {showForm ? "Tutup Form" : "Tambah Gejala Baru"}
            </button>

            {/* FORM CREATE/UPDATE */}
            {showForm && (
                <div className="mb-6 p-4 border rounded-lg shadow-inner bg-gray-50">
                    <h2 className="text-xl font-semibold mb-3">{isEditing ? "Edit Gejala" : "Tambah Gejala"}</h2>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <input type="text" name="kode" placeholder="Kode Gejala (misal: G01)" value={formData.kode} onChange={onChange} className="w-full p-2 border rounded" required />
                        <input type="text" name="nama" placeholder="Nama/Deskripsi Gejala" value={formData.nama} onChange={onChange} className="w-full p-2 border rounded" required />
                        <input
                            type="text"
                            name="pertanyaan_diagnosa"
                            placeholder="Pertanyaan Diagnosa (misal: Apakah Anda merasakan demam?)"
                            value={formData.pertanyaan_diagnosa}
                            onChange={onChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                        <button type="submit" className={`px-4 py-2 rounded-lg text-white transition ${isEditing ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"}`}>
                            {isEditing ? "Perbarui Gejala" : "Simpan Gejala"}
                        </button>
                        <button type="button" onClick={resetForm} className="ml-3 px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400">
                            Batal
                        </button>
                    </form>
                </div>
            )}

            {/* TABEL DATA GEJALA */}
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No.</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Gejala</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(gejalas) &&
                            gejalas.map((gejala, index) => (
                                <tr key={gejala._id} className="border-b hover:bg-gray-50">
                                    <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{gejala.kode}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">{gejala.nama}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-sm">
                                        <button onClick={() => handleEdit(gejala)} className="text-yellow-600 hover:text-yellow-800 mr-3">
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => handleDelete(gejala._id)} className="text-red-600 hover:text-red-800">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                {gejalas.length === 0 && !isLoading && <p className="p-4 text-center text-gray-500">Belum ada data gejala.</p>}
            </div>
        </div>

        // <div className="p-6">
        //     <h1 className="text-4xl text-red-500">KOMPONEN INI BERHASIL DILOAD!</h1>
        // </div>
    );
}

export default GejalaManagement;
