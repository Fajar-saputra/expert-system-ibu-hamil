import mongoose from 'mongoose'; // Gunakan import karena Anda menggunakan type: module

// Definisi Skema Gejala
const gejalaSchema = mongoose.Schema(
    {
        kode: {
            type: String,
            required: [true, 'Kode gejala harus diisi'],
            unique: true,
            trim: true,
            uppercase: true // Contoh: G01, G02
        },
        nama: {
            type: String,
            required: [true, 'Nama gejala harus diisi'],
            trim: true,
        },
        pertanyaan_diagnosa: {
            type: String,
            required: [true, 'Pertanyaan untuk diagnosa gejala ini harus diisi'],
        },
    },
    {
        timestamps: true,
    }
);

// Membuat Model dari Skema
const Gejala = mongoose.model('Gejala', gejalaSchema);

export default Gejala; // Gunakan export default