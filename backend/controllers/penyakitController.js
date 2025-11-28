import Penyakit from '../models/Penyakit.js';

// @desc    Mendapatkan semua Penyakit
// @route   GET /api/penyakit
export const getPenyakit = async (req, res) => {
    try {
        const penyakit = await Penyakit.find({});
        res.status(200).json(penyakit);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Mendapatkan Penyakit berdasarkan ID
// @route   GET /api/penyakit/:id
export const getPenyakitById = async (req, res) => {
    try {
        const penyakit = await Penyakit.findById(req.params.id);
        if (penyakit) {
            res.json(penyakit);
        } else {
            res.status(404).json({ message: 'Penyakit tidak ditemukan' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Menambah Penyakit baru
// @route   POST /api/penyakit
export const createPenyakit = async (req, res) => {
    try {
        const penyakit = await Penyakit.create(req.body);
        res.status(201).json(penyakit);
    } catch (error) {
        res.status(400).json({ message: 'Gagal membuat penyakit', details: error.message });
    }
};

// @desc    Memperbarui Penyakit
// @route   PUT /api/penyakit/:id
export const updatePenyakit = async (req, res) => {
    try {
        const penyakit = await Penyakit.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Mengembalikan dokumen yang sudah diperbarui
            runValidators: true,
        });
        if (penyakit) {
            res.json(penyakit);
        } else {
            res.status(404).json({ message: 'Penyakit tidak ditemukan' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Gagal memperbarui penyakit', details: error.message });
    }
};

// @desc    Menghapus Penyakit
// @route   DELETE /api/penyakit/:id
export const deletePenyakit = async (req, res) => {
    try {
        const penyakit = await Penyakit.findByIdAndDelete(req.params.id);
        if (penyakit) {
            res.json({ message: 'Penyakit berhasil dihapus' });
        } else {
            res.status(404).json({ message: 'Penyakit tidak ditemukan' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};