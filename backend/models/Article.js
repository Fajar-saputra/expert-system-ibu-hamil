import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true }, // Untuk URL ramah SEO (misal: anemia-pada-ibu-hamil)
  content: { type: String, required: true }, // Menyimpan konten HTML dari Rich Text Editor
  image: { type: String }, // Menyimpan path file gambar (misal: /uploads/gambar1.jpg)
  diseaseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Penyakit' }, // Relasi ke data diagnosa utama
  createdAt: { type: Date, default: Date.now },
});

const Article = mongoose.model('Article', articleSchema);
export default Article;