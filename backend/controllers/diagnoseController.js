import Rule from '../models/Rule.js';
import Penyakit from '../models/Penyakit.js';

// @desc    Menjalankan proses Forward Chaining dan memberikan hasil diagnosa
// @route   POST /api/diagnose
// @access  Public
export const runDiagnose = async (req, res) => {
    // 1. Ambil data gejala yang diinput pengguna (fakta awal)
    // Asumsi req.body.gejala adalah array of Gejala ObjectId atau Kode Gejala
    const inputGejalaIds = req.body.gejala || []; 

    if (inputGejalaIds.length === 0) {
        return res.status(400).json({ message: "Harap masukkan setidaknya satu gejala." });
    }

    try {
        // 2. Ambil semua aturan (Rules) dari Basis Pengetahuan
        // Populasikan Penyakit karena kita butuh detail Penyakit di hasil akhir
        const rules = await Rule.find({})
            .populate('penyakit', 'kode nama deskripsi solusi')
            .populate('gejala', 'kode'); // Hanya perlu kode Gejala untuk pencocokan

        // 3. Mesin Inferensi (Forward Chaining Logic)
        let matchedPenyakit = [];
        const diagnosedPenyakitIds = new Set(); // Untuk mencegah duplikasi

        // Iterasi melalui setiap Rule (Aturan)
        for (const rule of rules) {
            // Dapatkan ID Gejala dari aturan saat ini
            const ruleGejalaIds = rule.gejala.map(g => g._id.toString());
            
            // Periksa apakah SEMUA gejala dalam aturan (Premis) ada dalam input pengguna (Fakta)
            const allSymptomsMatch = ruleGejalaIds.every(ruleGId => 
                inputGejalaIds.includes(ruleGId) // Cocokkan ID Gejala
            );

            // Jika semua gejala dalam Rule cocok dengan input pengguna
            if (allSymptomsMatch) {
                const penyakitId = rule.penyakit._id.toString();
                
                // Pastikan Penyakit ini belum pernah ditambahkan
                if (!diagnosedPenyakitIds.has(penyakitId)) {
                    // Tambahkan hasil diagnosa
                    matchedPenyakit.push({
                        kode: rule.penyakit.kode,
                        nama: rule.penyakit.nama,
                        deskripsi: rule.penyakit.deskripsi,
                        solusi: rule.penyakit.solusi,
                        confidence: rule.bobot // Dapat dikembangkan untuk perhitungan CF
                    });
                    diagnosedPenyakitIds.add(penyakitId);
                }
            }
        }
        
        // 4. Berikan Hasil
        if (matchedPenyakit.length > 0) {
            // Sortir berdasarkan confidence (jika menggunakan bobot) atau berikan semua
            res.status(200).json({
                message: "Diagnosa selesai. Berikut hasil yang paling mungkin.",
                results: matchedPenyakit
            });
        } else {
            res.status(200).json({
                message: "Tidak ada penyakit yang cocok dengan gejala yang dimasukkan. Mohon konsultasi lebih lanjut.",
                results: []
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error internal saat menjalankan diagnosa.", details: error.message });
    }
};