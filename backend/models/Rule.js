import mongoose from 'mongoose'; 

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
        bobot: {
            type: Number,
            required: [true, 'Bobot harus diisi (nilai antara 0.0 sampai 1.0).'],
            min: [0.0, 'Bobot tidak boleh kurang dari 0.0'],
            max: [1.0, 'Bobot tidak boleh lebih dari 1.0'],
            default: 1.0, 
        },
    },
    {
        timestamps: true,
    }
);

// Membuat Model dari Skema
const Rule = mongoose.model('Rule', ruleSchema);

export default Rule; // Gunakan export default