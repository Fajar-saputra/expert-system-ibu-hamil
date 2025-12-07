import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import asyncHandler from 'express-async-handler';
// Pastikan Anda sudah menginstal npm install bcryptjs jsonwebtoken

// @desc    Auth user & get token (Login)
// @route   POST /api/users/login
export const authUser =asyncHandler( async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            nama: user.nama,
            email: user.email,
            role: user.role,
            token: generateToken(user._id), 
        });
    } else {
        res.status(401).json({ message: 'Email atau password salah' });
    }
});

// @desc    Register user baru (default role: ibu_hamil)
// @route   POST /api/users
export const registerUser =asyncHandler( async (req, res) => {
    const { nama, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        return res.status(400).json({ message: 'User dengan email ini sudah terdaftar' });
    }

    try {
        const user = await User.create({
            nama,
            email,
            password, // Password akan di-hash oleh pre-save hook di Model User.js
            role: 'ibu_hamil', // Default untuk registrasi publik
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                nama: user.nama,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Data user tidak valid' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', details: error.message });
    }
});


// @desc    Get user profile (Harus diakses setelah login/token valid)
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile =asyncHandler( async (req, res) => {
    // Req.user adalah objek user yang ditambahkan oleh middleware otentikasi
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            nama: user.nama,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(404).json({ message: 'User tidak ditemukan' });
    }
});


// ... (setelah fungsi getUserProfile)

// @desc    Buat user Admin PERTAMA (Hanya digunakan untuk setup awal)
// @route   POST /api/users/init-admin
// @access  Public (HANYA UNTUK SETUP)
export const initAdmin =asyncHandler( async (req, res) => {
    const { nama, email, password } = req.body;
    
    // Pastikan tidak ada Admin yang sudah terdaftar
    const adminExists = await User.findOne({ role: 'admin' });

    if (adminExists) {
        return res.status(400).json({ message: 'Admin sudah ada, tidak bisa membuat lagi.' });
    }

    try {
        const adminUser = await User.create({
            nama,
            email,
            password,
            role: 'admin', // Role disetel ke admin
        });
        res.status(201).json({ message: 'Admin pertama berhasil dibuat!', user: adminUser });
    } catch (error) {
        res.status(500).json({ message: 'Gagal membuat admin', details: error.message });
    }
});