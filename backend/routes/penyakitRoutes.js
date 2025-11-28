import express from 'express';
import { getPenyakit, getPenyakitById, createPenyakit, updatePenyakit, deletePenyakit } from '../controllers/penyakitController.js';
import { protect, admin } from '../middleware/authMiddleware.js'; // <-- Import protect & admin

const router = express.Router();

// GET Publik, POST hanya Admin
router.route('/').get(getPenyakit).post(protect, admin, createPenyakit); 
// GET Publik, PUT/DELETE hanya Admin
router.route('/:id').get(getPenyakitById).put(protect, admin, updatePenyakit).delete(protect, admin, deletePenyakit); 

export default router;