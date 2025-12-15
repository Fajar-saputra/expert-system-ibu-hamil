// backend/routes/gejalaRoutes.js (VERSI PERBAIKAN)

import express from "express";
import { getGejala, getGejalaById, createGejala, updateGejala, deleteGejala, deleteAllGejala } from "../controllers/gejalaController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router(); 

// Rute untuk endpoint /api/gejala/
router
    .route("/")
    .get(getGejala) // READ ALL (Public/Shared access)
    .post(protect, admin, createGejala) // CREATE (Admin Only)
    .delete(protect, admin, deleteAllGejala); // DELETE ALL (Admin Only - Hati-hati)

// Rute untuk endpoint /api/gejala/:id
router
    .route("/:id")
    .get(getGejalaById) // READ ONE (Public/Shared access)
    .put(protect, admin, updateGejala) // UPDATE (Admin Only)
    .delete(protect, admin, deleteGejala); // DELETE ONE (Admin Only)

export default router;