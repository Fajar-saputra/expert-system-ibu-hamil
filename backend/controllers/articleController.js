import Article from "../models/Article.js";
import fs from "fs";
import path from "path";


// Get semua artikel (Sidebar kiri)
export const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find()
            .select("title slug")
            .sort({ createdAt: -1 });

        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//  Get satu artikel berdasarkan slug (Konten utama + sidebar kanan)
export const getArticleBySlug = async (req, res) => {
    try {
        const article = await Article.findOne({ slug: req.params.slug })
            .populate("diseaseId");

        if (!article) {
            return res.status(404).json({ message: "Artikel tidak ditemukan" });
        }

        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//  Create artikel baru
export const createArticle = async (req, res) => {
    const { title, slug, content, diseaseId } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const newArticle = new Article({
            title,
            slug,
            content,
            image,
            diseaseId,
        });

        await newArticle.save();
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteArticle = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) return res.status(404).json({ message: "Artikel tidak ditemukan" });

        if (article.image) {
            // Hilangkan "/" di awal jika ada, agar path menjadi "uploads/filename.jpg"
            const cleanPath = article.image.startsWith('/') ? article.image.substring(1) : article.image;
            const filePath = path.join(process.cwd(), cleanPath);

            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                console.log("File gambar berhasil dihapus dari server");
            } else {
                console.log("File tidak ditemukan di:", filePath);
            }
        }

        await article.deleteOne();
        res.json({ message: "Artikel dan gambar berhasil dihapus" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// GET artikel by ID (untuk edit)
export const getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) return res.status(404).json({ message: "Artikel tidak ditemukan" });
        res.json(article);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE artikel
export const updateArticle = async (req, res) => {
    const { title, slug, content, diseaseId } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    try {
        const article = await Article.findById(req.params.id);
        if (!article) return res.status(404).json({ message: "Artikel tidak ditemukan" });

        article.title = title;
        article.slug = slug;
        article.content = content;
        article.diseaseId = diseaseId;
        if (image) article.image = image;

        await article.save();
        res.json(article);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

