import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPenyakits, createPenyakit, updatePenyakit, deletePenyakit, reset } from "../../features/penyakit/penyakitSlice";
import { toast } from "react-toastify";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

function PenyakitManagement() {
    const dispatch = useDispatch();
    const { Penyakit, isLoading, isError, message } = useSelector((state) => state.penyakit);

    // State untuk Form
    const [formData, setFormData] = useState({
        kode: "",
        nama: "",
        deskripsi: "",
        solusi: "",
        pencegahan: "",
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [showForm, setShowForm] = useState(false);

 // 1. Ambil data HANYA SEKALI saat komponen pertama kali muncul
useEffect(() => {
    dispatch(getPenyakits());
}, [dispatch]);

// 2. Tangani Error secara terpisah
useEffect(() => {
    if (isError) {
        toast.error(message);
    }
}, [isError, message]); 

// 3. Reset state HANYA SAAT pindah halaman (unmount)
useEffect(() => {
    return () => {
        dispatch(reset());
    };
}, [dispatch]);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setFormData({ kode: "", nama: "", deskripsi: "", solusi: "", pencegahan: "" });
        setIsEditing(false);
        setEditId(null);
        setShowForm(false);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        if (isEditing) {
            dispatch(updatePenyakit({ id: editId, ...formData }))
                .unwrap()
                .then(() => {
                    toast.success("Data penyakit diperbarui!");
                    resetForm();
                })
                .catch((err) => toast.error(err));
        } else {
            dispatch(createPenyakit(formData))
                .unwrap()
                .then(() => {
                    toast.success("Penyakit baru ditambahkan!");
                    resetForm();
                })
                .catch((err) => toast.error(err));
        }
    };

    const handleEdit = (item) => {
        setFormData({
            kode: item.kode,
            nama: item.nama,
            deskripsi: item.deskripsi,
            solusi: item.solusi,
            pencegahan: item.pencegahan || "",
        });
        setIsEditing(true);
        setEditId(item._id);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Hapus data penyakit ini?")) {
            dispatch(deletePenyakit(id))
                .unwrap()
                .then(() => toast.success("Penyakit dihapus!"))
                .catch((err) => toast.error(err));
        }
    };

    if (isLoading) return <div className="p-6 text-center text-xl">Memuat data...</div>;

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-indigo-700">Manajemen Data Penyakit ({Penyakit?.length || 0})</h1>

            <button onClick={() => (showForm ? resetForm() : setShowForm(true))} className="bg-indigo-600 text-white px-4 py-2 rounded-lg mb-6 hover:bg-indigo-700 transition flex items-center">
                <FaPlus className="mr-2" /> {showForm ? "Tutup Form" : "Tambah Penyakit Baru"}
            </button>

            {showForm && (
                <div className="mb-8 p-6 border rounded-xl shadow-lg bg-white">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">{isEditing ? "Edit Data Penyakit" : "Tambah Penyakit"}</h2>
                    <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" name="kode" placeholder="Kode (P01)" value={formData.kode} onChange={onChange} className="p-2 border rounded" required />
                        <input type="text" name="nama" placeholder="Nama Penyakit" value={formData.nama} onChange={onChange} className="p-2 border rounded" required />

                        <textarea name="deskripsi" placeholder="Deskripsi Penyakit" value={formData.deskripsi} onChange={onChange} className="p-2 border rounded md:col-span-2 h-24" required />
                        <textarea name="solusi" placeholder="Solusi / Penanganan" value={formData.solusi} onChange={onChange} className="p-2 border rounded md:col-span-2 h-24" required />
                        <textarea name="pencegahan" placeholder="Pencegahan (Opsional)" value={formData.pencegahan} onChange={onChange} className="p-2 border rounded md:col-span-2 h-24" />

                        <div className="md:col-span-2 flex gap-2">
                            <button type="submit" className={`px-6 py-2 rounded text-white ${isEditing ? "bg-yellow-500" : "bg-green-600"}`}>
                                {isEditing ? "Perbarui" : "Simpan"}
                            </button>
                            <button type="button" onClick={resetForm} className="px-6 py-2 rounded bg-gray-400 text-white">
                                Batal
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="overflow-x-auto bg-white rounded-xl shadow-md">
                <table className="min-w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase">Kode</th>
                            <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase">Nama</th>
                            <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {Penyakit?.map((p) => (
                            <tr key={p._id} className="hover:bg-gray-50 transition">
                                <td className="py-4 px-6 text-sm font-bold text-indigo-600">{p.kode}</td>
                                <td className="py-4 px-6 text-sm text-gray-800">{p.nama}</td>
                                <td className="py-4 px-6 flex gap-4">
                                    <button onClick={() => handleEdit(p)} className="text-yellow-600 hover:text-yellow-800">
                                        <FaEdit size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(p._id)} className="text-red-600 hover:text-red-800">
                                        <FaTrash size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PenyakitManagement;
