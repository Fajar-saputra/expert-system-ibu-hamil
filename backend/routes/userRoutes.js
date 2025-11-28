import express from 'express';
import { authUser, registerUser, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js'; 

const router = express.Router();

// POST /api/users - Register User
router.route('/').post(registerUser); 

// POST /api/users/login - Login User
router.post('/login', authUser); 

// GET /api/users/profile - Dapatkan Profile (Hanya setelah login)
// Rute ini menggunakan middleware 'protect'
router.route('/profile').get(protect, getUserProfile); 


export default router;