// backend/routes/penyakitRoutes.js
import express from "express";
const router = express.Router();
import { getPenyakit, getPenyakitById, createPenyakit, updatePenyakit, deletePenyakit, deleteAllPenyakit } from "../controllers/penyakitController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router
    .route("/")
    .get(getPenyakit)
    .post(protect, admin, createPenyakit) //
    .delete(protect, admin, deleteAllPenyakit);

router.route("/:id").get(getPenyakitById).put(protect, admin, updatePenyakit).delete(protect, admin, deletePenyakit);

export default router;
