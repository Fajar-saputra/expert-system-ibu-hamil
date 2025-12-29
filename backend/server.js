import express from "express";
import dotenv from "dotenv";
import path from "path"; // Tambahkan ini
import { fileURLToPath } from "url"; // Tambahkan ini
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import penyakitRoutes from "./routes/penyakitRoutes.js";
import gejalaRoutes from "./routes/gejalaRoutes.js";
import ruleRoutes from "./routes/ruleRoutes.js";
import diagnoseRoutes from "./routes/diagnoseRoutes.js";
import articleRoutes from "./routes/articleRoutes.js"; // Import route baru
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cors from "cors";

// --- KONFIGURASI __dirname UNTUK ES MODULES ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// ----------------------------------------------

dotenv.config({ path: "./.env" });

const app = express();

connectDB();

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    })
);

app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- MEMBUAT FOLDER UPLOADS JADI STATIS ---
// Sekarang gambar bisa diakses via http://localhost:5000/uploads/nama-file.jpg
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// ------------------------------------------

app.get("/", (req, res) => {
    res.send("API is running for Expert System Ibu Hamil");
});

// DEFINISI ROUTE API
app.use("/api/users", userRoutes);
app.use("/api/penyakit", penyakitRoutes); 
app.use("/api/gejala", gejalaRoutes);
app.use("/api/rule", ruleRoutes);
app.use("/api/diagnose", diagnoseRoutes);
app.use("/api/articles", articleRoutes); 

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
export default app;