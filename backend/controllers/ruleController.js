import Rule from '../models/Rule.js';

// @desc    Mendapatkan semua Rule (dengan detail Penyakit dan Gejala)
// @route   GET /api/rule
export const getRules = async (req, res) => {
    try {
        // Menggunakan .populate() untuk mengambil detail dari ID yang direferensikan
        const rules = await Rule.find({})
            .populate('penyakit', 'kode nama') // Ambil kode & nama penyakit
            .populate('gejala', 'kode nama pertanyaan_diagnosa'); // Ambil detail gejala
            
        res.status(200).json(rules);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Mendapatkan Rule berdasarkan ID (dengan detail Penyakit dan Gejala)
// @route   GET /api/rule/:id
export const getRuleById = async (req, res) => {
    try {
        const rule = await Rule.findById(req.params.id)
            .populate('penyakit', 'kode nama')
            .populate('gejala', 'kode nama pertanyaan_diagnosa');

        if (rule) {
            res.json(rule);
        } else {
            res.status(404).json({ message: 'Rule tidak ditemukan' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Menambah Rule baru
// @route   POST /api/rule
export const createRule = async (req, res) => {
    // req.body harus berisi { penyakit: <ObjectId Penyakit>, gejala: [<ObjectId Gejala1>, <ObjectId Gejala2>, ...] }
    try {
        const rule = await Rule.create(req.body);
        res.status(201).json(rule);
    } catch (error) {
        res.status(400).json({ message: 'Gagal membuat aturan', details: error.message });
    }
};

// @desc    Memperbarui Rule
// @route   PUT /api/rule/:id
export const updateRule = async (req, res) => {
    try {
        const rule = await Rule.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        if (rule) {
            // Kita kembalikan Rule yang sudah diperbarui dengan detail populasi
            const updatedRule = await Rule.findById(rule._id)
                .populate('penyakit', 'kode nama')
                .populate('gejala', 'kode nama pertanyaan_diagnosa');
                
            res.json(updatedRule);
        } else {
            res.status(404).json({ message: 'Rule tidak ditemukan' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Gagal memperbarui aturan', details: error.message });
    }
};

// @desc    Menghapus Rule
// @route   DELETE /api/rule/:id
export const deleteRule = async (req, res) => {
    try {
        const rule = await Rule.findByIdAndDelete(req.params.id);
        if (rule) {
            res.json({ message: 'Rule berhasil dihapus' });
        } else {
            res.status(404).json({ message: 'Rule tidak ditemukan' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};