import mongoose from 'mongoose'; // Gunakan import
import Penyakit from './Penyakit.js';
import Gejala from './Gejala.js';

// Definisi Skema Rule
const ruleSchema = mongoose.Schema(
    {
        // Penyakit yang menjadi KESIMPULAN (THEN)
        penyakit: {
            // Menggunakan referensi ke model Penyakit
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Penyakit', 
            required: [true, 'Rule harus merujuk ke Penyakit tertentu'],
        },
        
        // Daftar Gejala yang menjadi PREMIS (IF)
        gejala: [{
            // Array dari referensi ke model Gejala
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Gejala',
            required: [true, 'Rule harus memiliki setidaknya satu Gejala'],
        }],

        // Bobot atau Nilai CF (Certainty Factor)
        // Opsional, tapi sangat berguna untuk sistem pakar yang lebih akurat
        bobot: {
            type: Number,
            required: false, // Kita buat opsional dulu
            default: 1.0,    // Default 1.0 jika tidak menggunakan CF
        },
    },
    {
        timestamps: true,
    }
);

// Membuat Model dari Skema
const Rule = mongoose.model('Rule', ruleSchema);

export default Rule; // Gunakan export default