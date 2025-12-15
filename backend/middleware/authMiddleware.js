// backend/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from 'express-async-handler'; 

// Fungsi untuk melindungi rute (Memastikan user sudah login)
export const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Cek apakah ada token di header Authorization (format: 'Bearer <token>')
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Ambil token dari header
            token = req.headers.authorization.split(' ')[1];

            // Verifikasi token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Ambil user dari database (tanpa password) dan masukkan ke req
            req.user = await User.findById(decoded.id).select('-password');

            next(); // Lanjut ke controller
        } catch (error) {
            console.error(error);
            // Gunakan res.status di dalam catch
            res.status(401).json({ message: 'Token tidak valid, otorisasi gagal' });
        }
    }

    if (!token) {
        // Jika tidak ada token, kirim response
        res.status(401).json({ message: 'Tidak ada token, otorisasi gagal' });
    }
});


// Fungsi untuk membatasi akses hanya untuk Admin
export const admin = (req, res, next) => {
    // Asumsi req.user sudah diisi oleh middleware protect
    if (req.user && req.user.role === 'admin') {
        next(); // Lanjut ke controller
    } else {
        res.status(403).json({ message: 'Akses ditolak. Hanya untuk Admin.' });
    }
};