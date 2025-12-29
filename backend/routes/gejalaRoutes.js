// backend/routes/gejalaRoutes.js (VERSI PERBAIKAN)

import express from "express";
import { getGejala, getGejalaById, createGejala, updateGejala, deleteGejala, deleteAllGejala } from "../controllers/gejalaController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getGejala).post(protect, admin, createGejala).delete(protect, admin, deleteAllGejala);

router.route("/:id").get(getGejalaById).put(protect, admin, updateGejala).delete(protect, admin, deleteGejala);
export default router;
