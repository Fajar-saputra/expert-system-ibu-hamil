import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import penyakitRoutes from "./routes/penyakitRoutes.js";
import gejalaRoutes from "./routes/gejalaRoutes.js";
import ruleRoutes from "./routes/ruleRoutes.js";
import diagnoseRoutes from "./routes/diagnoseRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

import cors from "cors";

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

app.get("/", (req, res) => {
    res.send("API is running for Expert System Ibu Hamil");
});

// DEFINISI ROUTE API
app.use("/api/users", userRoutes);
app.use("/api/penyakit", penyakitRoutes); 
app.use("/api/gejala", gejalaRoutes);
app.use("/api/rule", ruleRoutes);
app.use("/api/diagnose", diagnoseRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
export default app;
