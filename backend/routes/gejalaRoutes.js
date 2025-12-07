import express from "express";
// Import semua fungsi dari controller yang sudah diperbaiki
import { getGejala, getGejalaById, createGejala, updateGejala, deleteGejala, deleteAllGejala } from "../controllers/gejalaController.js";
import { protect, admin } from "../middleware/authMiddleware.js"; // Asumsi Anda punya middleware ini

const router = express.Router(); // DEFINISIKAN ROUTER

// Public GET (Jika Anda ingin user non-admin juga bisa lihat)
router
    .route("/")
    .get(getGejala) // Public access
    .post(protect, admin, createGejala) // Admin Only
    .delete(protect, admin, deleteAllGejala);

// Admin Routes (Harus dilindungi)
// POST (Create)
router.route("/").post(protect, admin, createGejala);

// GET by ID, PUT (Update), DELETE (Delete)
// Note: PUT/DELETE biasanya hanya untuk Admin
router
    .route("/:id")
    .get(getGejalaById) // Jika user non-admin boleh lihat detail
    .put(protect, admin, updateGejala)
    .delete(protect, admin, deleteGejala);

export default router; // EXPORT DEFAULT yang benar
