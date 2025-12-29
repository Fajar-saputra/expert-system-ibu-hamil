import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useRef } from "react";

const AdminArticleForm = () => {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [diseaseId, setDiseaseId] = useState("");
    const [diseases, setDiseases] = useState([]);
    const fileRef = useRef(null);

    // Ambil daftar penyakit untuk dropdown relasi
    useEffect(() => {
        const fetchDiseases = async () => {
            const { data } = await axios.get("http://localhost:5000/api/penyakit");
            setDiseases(data);
        };
        fetchDiseases();
    }, []);

    // Otomatis buat slug dari judul
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
        setSlug(
            e.target.value
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "")
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Karena ada file gambar, kita WAJIB pakai FormData
        const formData = new FormData();
        formData.append("title", title);
        formData.append("slug", slug);
        formData.append("content", content);
        formData.append("image", image);
        formData.append("diseaseId", diseaseId);

        try {
            const config = { headers: { "Content-Type": "multipart/form-data" } };
            await axios.post("http://localhost:5000/api/articles", formData, config);

            alert("Artikel berhasil diterbitkan!");

            // ✅ RESET FORM
            setTitle("");
            setSlug("");
            setContent("");
            setImage(null);
            setDiseaseId("");
            fileRef.current.value = null;
        } catch (error) {
            console.error(error);
            alert("Gagal menambah artikel");
        }
    };

    return (
        <div className="bg-white p-8 rounded shadow-md max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">Tambah Artikel Edukasi</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Judul */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Judul Artikel</label>
                    <input
                        type="text"
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="Contoh: Mengenal Preeklampsia pada Ibu Hamil"
                        required
                    />
                </div>

                {/* Slug (Read Only agar konsisten) */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">URL Slug (Otomatis)</label>
                    <input type="text" className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-md p-2 text-gray-500 cursor-not-allowed" value={slug} readOnly />
                </div>

                {/* Relasi ke Database Penyakit */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Hubungkan ke Jenis Penyakit</label>
                    <select className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm" value={diseaseId} onChange={(e) => setDiseaseId(e.target.value)} required>
                        <option value="">-- Pilih Penyakit --</option>
                        {diseases.map((d) => (
                            <option key={d._id} value={d._id}>
                                {d.nama}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Upload Gambar */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Gambar Utama Artikel</label>
                    <input
                        ref={fileRef}
                        type="file"
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        onChange={(e) => setImage(e.target.files[0])}
                        accept="image/*"
                    />
                </div>

                {/* Rich Text Editor */}
                <div className="h-80 mb-12">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Isi Konten Artikel</label>
                    <ReactQuill theme="snow" value={content} onChange={setContent} className="h-64" placeholder="Tulis penjelasan lengkap di sini..." />
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition duration-300 mt-10">
                    Terbitkan Artikel
                </button>
            </form>
        </div>
    );
};

export default AdminArticleForm;
