// backend/routes/penyakitRoutes.js
import express from "express";
const router = express.Router();
import { getPenyakit, getPenyakitById, createPenyakit, updatePenyakit, deletePenyakit,deleteAllPenyakit } from "../controllers/penyakitController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router  
    .route("/")
    .get(getPenyakit) // Public access
    .post(protect, admin, createPenyakit) // Admin Only
    .delete(protect, admin, deleteAllPenyakit);

router
    .route("/:id")
    .get(getPenyakitById) // Public access
    .put(protect, admin, updatePenyakit) // Admin Only
    .delete(protect, admin, deletePenyakit); // Admin Only

export default router;
