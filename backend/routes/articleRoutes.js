import express from "express";
import multer from "multer";
import path from "path";
import {
  getAllArticles,
  getArticleBySlug,
  createArticle,
  deleteArticle,
  getArticleById,
  updateArticle
} from "../controllers/articleController.js";

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
router.delete("/:id", deleteArticle);
router.get("/", getAllArticles);
router.get("/:slug", getArticleBySlug);
router.post("/", upload.single("image"), createArticle);
router.put("/:id", upload.single("image"), updateArticle);
router.get("/edit/:id", getArticleById);



export default router;
