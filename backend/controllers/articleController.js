import Article from "../models/Article.js";

// 1️⃣ Get semua artikel (Sidebar kiri)
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

// 2️⃣ Get satu artikel berdasarkan slug (Konten utama + sidebar kanan)
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

// 3️⃣ Create artikel baru
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

        if (!article) {
            return res.status(404).json({ message: "Artikel tidak ditemukan" });
        }

        await article.deleteOne();
        res.status(200).json({ message: "Artikel berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
