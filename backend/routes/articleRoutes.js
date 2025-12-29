import express from "express";
import multer from "multer";
import path from "path";
import {
  getAllArticles,
  getArticleBySlug,
  createArticle,
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
router.get("/", getAllArticles);
router.get("/:slug", getArticleBySlug);
router.post("/", upload.single("image"), createArticle);

export default router;
