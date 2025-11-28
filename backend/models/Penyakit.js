import mongoose from 'mongoose';

// Definisi Skema Penyakit
const penyakitSchema = mongoose.Schema(
    {
        // ID otomatis dibuat oleh MongoDB, kita tidak perlu mendefinisikannya
        
        kode: {
            type: String,
            required: [true, 'Kode penyakit harus diisi'],
            unique: true,
            trim: true,
            uppercase: true // Contoh: P01, P02
        },
        nama: {
            type: String,
            required: [true, 'Nama penyakit harus diisi'],
            trim: true,
        },
        deskripsi: {
            type: String,
            required: [true, 'Deskripsi penyakit harus diisi'],
        },
        solusi: {
            type: String,
            required: [true, 'Solusi atau penanganan harus diisi'],
        },
        pencegahan: {
            type: String,
            required: false, // Pencegahan mungkin opsional
        },
    },
    {
        timestamps: true, // Otomatis menambahkan createdAt dan updatedAt
    }
);

// Membuat Model dari Skema
const Penyakit = mongoose.model('Penyakit', penyakitSchema);

export default Penyakit;