import express from 'express';
import multer from 'multer';
import path from 'path';
import { getAllArticles, getArticleBySlug, createArticle } from '../controllers/articleController.js';

const router = express.Router();

// Konfigurasi Penyimpanan Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Pastikan folder 'uploads' sudah dibuat di root backend
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nama file unik
  }
});

const upload = multer({ storage: storage });

// Routes
router.get('/', getAllArticles);
router.get('/:slug', getArticleBySlug);
router.post('/', upload.single('image'), createArticle); // 'image' adalah nama field di form-data

export default router;