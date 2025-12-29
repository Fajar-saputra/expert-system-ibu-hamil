import Rule from "../models/Rule.js";
import Gejala from "../models/Gejala.js";
import asyncHandler from "express-async-handler";

export const diagnose = asyncHandler(async (req, res) => {
    const { answers } = req.body;

    // 1. Validasi Input: Pastikan answers ada dan punya gejalaId
    if (!answers || !Array.isArray(answers)) {
        res.status(400);
        throw new Error("Format jawaban tidak valid");
    }

    // --- TAMBAHAN VALIDASI ---
    const totalGejalas = await Gejala.countDocuments(); // Ambil total semua gejala di database
    const selectedGejalaIds = answers
        .filter((a) => a.value === 1 && a.gejalaId)
        .map((a) => a.gejalaId.toString());

    // Jika user menjawab "Ya" lebih dari 70% dari total gejala yang ada
    if (selectedGejalaIds.length > totalGejalas * 0.7) {
        return res.json({
            message: "Diagnosa tidak valid karena terlalu banyak gejala dipilih",
            diagnosis: [],
            topResult: null,
            isInvalid: true 
        });
    }
    // ----------------------------------------

    // 2. Ambil semua rule dan populate
    const allRules = await Rule.find({}).populate("penyakit").populate("gejala");

    const diseaseMap = {};

    allRules.forEach((rule) => {
        if (!rule.penyakit || !rule.gejala || !Array.isArray(rule.gejala)) return;

        const pId = rule.penyakit._id.toString();

        if (!diseaseMap[pId]) {
            diseaseMap[pId] = {
                penyakit: rule.penyakit,
                totalGejalaDiSistem: 0,
                gejalaCocok: 0,
                maxBobot: rule.bobot || 1.0, // Ambil bobot dari rule
            };
        }

        rule.gejala.forEach((g) => {
            diseaseMap[pId].totalGejalaDiSistem += 1;

            if (selectedGejalaIds.includes(g._id.toString())) {
                diseaseMap[pId].gejalaCocok += 1;
            }
        });
    });

    // 3. Kalkulasi hasil akhir dengan integrasi Bobot Pakar
    const finalResults = Object.values(diseaseMap)
        .map((item) => {
            // Rumus: (Gejala Cocok / Total Gejala) * (Bobot Pakar * 100)
            const percentage = (item.gejalaCocok / item.totalGejalaDiSistem) * (item.maxBobot * 100);
            
            return {
                penyakit: item.penyakit,
                persentase: Math.round(percentage),
                gejalaCocok: item.gejalaCocok,
                totalGejala: item.totalGejalaDiSistem,
            };
        })
        .filter((r) => r.persentase > 0)
        .sort((a, b) => b.persentase - a.persentase);

    res.json({
        message: "Diagnosa berhasil",
        diagnosis: finalResults,
        topResult: finalResults[0] || null,
    });
});