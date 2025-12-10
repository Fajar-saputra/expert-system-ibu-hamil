// frontend/src/pages/admin/GejalaListScreen.jsx (VERSI RTK QUERY)

import React from 'react';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
// Import hook dari API Slice yang baru dibuat
import { useGetGejalaQuery, useDeleteGejalaMutation } from '../../slices/gejalaApiSlice'; 
import { toast } from 'react-toastify'; // Asumsi Anda menggunakan react-toastify

const GejalaListScreen = () => {
    // 🛑 1. FETCH DATA 🛑
    const { 
        data: gejala, 
        isLoading, 
        error, 
        refetch 
    } = useGetGejalaQuery();

    // 🛑 2. MUTATION DELETE 🛑
    const [deleteGejala, { isLoading: loadingDelete }] = useDeleteGejalaMutation();

    // 🛑 3. HANDLER DELETE 🛑
    const deleteHandler = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus Gejala ini?')) {
            try {
                await deleteGejala(id).unwrap();
                toast.success('Gejala berhasil dihapus');
                // refetch tidak perlu jika invalidatesTags: ['Gejala'] sudah benar
            } catch (err) {
                toast.error(err?.data?.message || err.error);
            }
        }
    };
    
    // Nanti akan ada handler untuk create dan edit
    
    return (
        <div className="shadow-lg rounded-xl bg-white">
            
            <div className="flex justify-between items-center bg-gray-100 p-4 rounded-t-xl border-b border-gray-200">
                <h1 className="text-2xl font-bold text-gray-700">Daftar Gejala</h1>
                <button 
                    className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-semibold transition duration-300"
                    // onClick={handleCreateGejala} // Fungsionalitas CREATE akan ditambahkan
                >
                    <FaPlus className="mr-1" /> 
                    <span>Tambah Gejala</span>
                </button>
            </div>

            <div className="p-4">
                {isLoading ? (
                    <p className="text-center py-4">Memuat data...</p>
                ) : error ? (
                    <p className="text-red-600">Error: {error?.data?.message || error.error}</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                {/* Header kolom tetap sama */}
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kode</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Gejala</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pertanyaan Diagnosis</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {/* MENGGUNAKAN DATA DARI API */}
                                {gejala.map((item) => (
                                    <tr key={item._id} className="hover:bg-indigo-50 transition duration-150">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item._id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-indigo-600">{item.kode}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.nama}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.pertanyaan_diagnosa}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button 
                                                // onClick={() => handleEdit(item._id)} // Fungsi edit
                                                className="text-indigo-600 hover:text-indigo-800 mx-2 transition duration-150"
                                            >
                                                <FaEdit className="inline" />
                                            </button>
                                            <button 
                                                onClick={() => deleteHandler(item._id)} // Handler Delete
                                                className="text-red-600 hover:text-red-800 mx-2 transition duration-150"
                                                disabled={loadingDelete} // Nonaktifkan saat proses delete
                                            >
                                                <FaTrash className="inline" />
                                            </button>
                                            {loadingDelete && <p className="text-xs text-red-500 inline ml-2">Menghapus...</p>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GejalaListScreen;