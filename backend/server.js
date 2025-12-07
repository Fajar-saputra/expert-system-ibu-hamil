import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import penyakitRoutes from "./routes/penyakitRoutes.js"; // JANGAN LUPA IMPORT PENYAKIT ROUTE
import gejalaRoutes from "./routes/gejalaRoutes.js";
import ruleRoutes from "./routes/ruleRoutes.js";
import diagnoseRoutes from "./routes/diagnoseRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config({ path: "./.env" }); 

const app = express();

connectDB();


app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running for Expert System Ibu Hamil");
});

// DEFINISI ROUTE API
app.use("/api/users", userRoutes);
app.use("/api/penyakit", penyakitRoutes); // Pastikan ini diimpor
app.use("/api/gejala", gejalaRoutes);
app.use("/api/rule", ruleRoutes);
app.use("/api/diagnose", diagnoseRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));