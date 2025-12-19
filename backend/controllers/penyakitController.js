// backend/controllers/penyakitController.js
import Penyakit from "../models/Penyakit.js";
import asyncHandler from "express-async-handler";

// @desc    Mendapatkan semua Penyakit (Public access)
// @route   GET /api/penyakit
export const getPenyakit = asyncHandler(async (req, res) => {
    const penyakit = await Penyakit.find({});
    res.json(penyakit);
});

// @desc    Mendapatkan Penyakit berdasarkan ID (Public access)
// @route   GET /api/penyakit/:id
export const getPenyakitById = asyncHandler(async (req, res) => {
    const penyakit = await Penyakit.findById(req.params.id);

    if (penyakit) {
        res.json(penyakit);
    } else {
        res.status(404);
        throw new Error("Penyakit tidak ditemukan");
    }
});

// @desc    Menambah Penyakit baru (Admin only)
// @route   POST /api/penyakit
export const createPenyakit = asyncHandler(async (req, res) => {
    // 1. Destructuring HANYA field yang dikirim dari Postman
    const { kode, nama, deskripsi, solusi, pencegahan } = req.body;

    // 2. Buat objek Penyakit secara eksplisit
    const penyakit = await Penyakit.create({
        kode: kode,
        nama: nama,
        deskripsi: deskripsi,
        solusi: solusi,
        pencegahan: pencegahan || "", // Gunakan nilai default jika tidak ada pencegahan
    });

    res.status(201).json(penyakit);
});

// @desc    Memperbarui Penyakit (Admin only)
// @route   PUT /api/penyakit/:id
export const updatePenyakit = asyncHandler(async (req, res) => {
    const penyakit = await Penyakit.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (penyakit) {
        res.json(penyakit);
    } else {
        res.status(404);
        throw new Error("Penyakit tidak ditemukan");
    }
});

// @desc    Menghapus Penyakit (Admin only)
// @route   DELETE /api/penyakit/:id
// backend/controllers/penyakitController.js

export const deletePenyakit = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const penyakit = await Penyakit.findById(id);

    if (penyakit) {
        // 1. Hapus penyakitnya
        await Penyakit.findByIdAndDelete(id);

        // 2. OTOMATIS hapus rule yang memakai penyakit ini (CASCADE DELETE)
        await Rule.deleteMany({ penyakit: id });

        res.json({ message: "Penyakit dan Rule terkait berhasil dihapus" });
    } else {
        res.status(404);
        throw new Error("Penyakit tidak ditemukan");
    }
});

// @desc    Menghapus SEMUA Penyakit (Admin only)
// @route   DELETE /api/penyakit/
export const deleteAllPenyakit = asyncHandler(async (req, res) => {
    // Mongoose Model.deleteMany({}) akan menghapus semua dokumen dalam koleksi
    const result = await Penyakit.deleteMany({});

    res.json({
        message: "Semua data Penyakit berhasil dihapus.",
        count: result.deletedCount, // Menampilkan jumlah dokumen yang dihapus
    });
});
