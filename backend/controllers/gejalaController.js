import Gejala from '../models/Gejala.js';

// @desc    Mendapatkan semua Gejala
// @route   GET /api/gejala
export const getGejala = async (req, res) => {
    try {
        const gejala = await Gejala.find({});
        res.status(200).json(gejala);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Mendapatkan Gejala berdasarkan ID
// @route   GET /api/gejala/:id
export const getGejalaById = async (req, res) => {
    try {
        const gejala = await Gejala.findById(req.params.id);
        if (gejala) {
            res.json(gejala);
        } else {
            res.status(404).json({ message: 'Gejala tidak ditemukan' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc    Menambah Gejala baru
// @route   POST /api/gejala
export const createGejala = async (req, res) => {
    try {
        // Mongoose akan otomatis memvalidasi skema (kode, nama, dll.)
        const gejala = await Gejala.create(req.body); 
        res.status(201).json(gejala);
    } catch (error) {
        res.status(400).json({ message: 'Gagal membuat gejala', details: error.message });
    }
};

// @desc    Memperbarui Gejala
// @route   PUT /api/gejala/:id
export const updateGejala = async (req, res) => {
    try {
        const gejala = await Gejala.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Mengembalikan dokumen yang sudah diperbarui
            runValidators: true, // Menjalankan validasi skema saat update
        });
        if (gejala) {
            res.json(gejala);
        } else {
            res.status(404).json({ message: 'Gejala tidak ditemukan' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Gagal memperbarui gejala', details: error.message });
    }
};

// @desc    Menghapus Gejala
// @route   DELETE /api/gejala/:id
export const deleteGejala = async (req, res) => {
    try {
        const gejala = await Gejala.findByIdAndDelete(req.params.id);
        if (gejala) {
            res.json({ message: 'Gejala berhasil dihapus' });
        } else {
            res.status(404).json({ message: 'Gejala tidak ditemukan' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};