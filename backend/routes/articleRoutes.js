import express from "express";
import multer from "multer";
import path from "path";
import { getAllArticles, getArticleBySlug, createArticle, deleteArticle, getArticleById, updateArticle } from "../controllers/articleController.js";

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Routes
router.get("/edit/:id", getArticleById);
router.delete("/:id", deleteArticle);
router.put("/:id", upload.single("image"), updateArticle);
router.get("/", getAllArticles);
router.post("/", upload.single("image"), createArticle);
router.get("/:slug", getArticleBySlug);

export default router;
