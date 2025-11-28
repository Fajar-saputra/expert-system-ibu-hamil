import mongoose from 'mongoose';

const penyakitSchema = mongoose.Schema(
    {
        kode: {
            type: String,
            required: [true, 'Kode penyakit harus diisi'],
            unique: true,
            trim: true,
            uppercase: true,
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
            required: false, 
        },
        // ** (HILANGKAN relasi gejalaTerkait di sini, karena sudah ada di Rule.js)**
    },
    {
        timestamps: true,
    }
);

const Penyakit = mongoose.model('Penyakit', penyakitSchema);
export default Penyakit;