import Article from '../models/Article.js';

// Get semua artikel (untuk list di sidebar kiri)
export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().select('title slug'); // Hanya ambil judul dan slug untuk sidebar
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get satu artikel berdasarkan slug
export const getArticleBySlug = async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug }).populate('diseaseId');
    if (!article) return res.status(404).json({ message: "Artikel tidak ditemukan" });
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create Artikel Baru
export const createArticle = async (req, res) => {
  const { title, slug, content, diseaseId } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null; // Simpan path gambar

  try {
    const newArticle = new Article({ title, slug, content, image, diseaseId });
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};