import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    image: { type: String },
    diseaseId: { type: mongoose.Schema.Types.ObjectId, ref: "Penyakit" },
    createdAt: { type: Date, default: Date.now },
});

const Article = mongoose.model("Article", articleSchema);
export default Article;
