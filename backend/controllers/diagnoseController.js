// backend/controllers/diagnoseController.js
import Rule from '../models/Rule.js';
import asyncHandler from 'express-async-handler';

// @desc    Melakukan Diagnosis berdasarkan Gejala yang dipilih
// @route   POST /api/diagnose
// @access  Public (atau Private, tergantung kebutuhan aplikasi)
export const diagnose = asyncHandler(async (req, res) => {
    // Input: Array ID Gejala yang dialami pengguna (dari frontend)
    const { selectedGejalaIds } = req.body;

    if (!selectedGejalaIds || selectedGejalaIds.length === 0) {
        res.status(400);
        throw new Error('Pilih minimal satu gejala untuk memulai diagnosis.');
    }

    // 1. Ambil semua Rule dari database
    const rules = await Rule.find({})
        .populate('penyakit', 'kode nama deskripsi solusi pencegahan')
        .populate('gejala', 'kode nama');

    if (!rules || rules.length === 0) {
        res.status(404);
        throw new Error('Basis aturan (Rule) belum ditemukan. Hubungi admin.');
    }

    let results = [];
    
    // 2. Lakukan Inferensi (Contoh: Simple Forward Chaining/Matching)
    rules.forEach(rule => {
        // Cek apakah SEMUA Gejala dalam satu Rule terpenuhi oleh Gejala yang dipilih pengguna
        // rule.gejala adalah array objek Mongoose
        
        const ruleGejalaIds = rule.gejala.map(g => g._id.toString());
        
        const isMatch = ruleGejalaIds.every(id => selectedGejalaIds.includes(id));
        
        if (isMatch) {
            // Jika semua gejala dalam rule cocok, tambahkan penyakit ke hasil
            results.push({
                penyakit: rule.penyakit,
                bobot: rule.bobot, // Bobot kepastian (CF) dari Rule ini
                matchedGejalaCount: ruleGejalaIds.length,
            });
        }
    });

    // 3. Filter dan tampilkan hasil terbaik
    if (results.length > 0) {
        // Urutkan berdasarkan bobot atau jumlah gejala yang cocok (opsional)
        // results.sort((a, b) => b.bobot - a.bobot);

        res.json({
            message: "Diagnosis selesai",
            diagnosis: results,
            topResult: results[0] // Tampilkan hasil teratas
        });
    } else {
        res.json({
            message: "Tidak ada penyakit yang cocok dengan kombinasi gejala yang dipilih.",
            diagnosis: [],
        });
    }
});