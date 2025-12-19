import Rule from "../models/Rule.js";
import asyncHandler from "express-async-handler";

export const diagnose = asyncHandler(async (req, res) => {
    const { answers } = req.body;

    // 1. Validasi Input: Pastikan answers ada dan punya gejalaId
    if (!answers || !Array.isArray(answers)) {
        res.status(400);
        throw new Error("Format jawaban tidak valid");
    }

    const selectedGejalaIds = answers
        .filter((a) => a.value === 1 && a.gejalaId) // Pastikan gejalaId tidak null
        .map((a) => a.gejalaId.toString());

    // 2. Ambil semua rule dan populate
    const allRules = await Rule.find({}).populate("penyakit").populate("gejala");

    const diseaseMap = {};

    allRules.forEach((rule) => {
        // 1. Validasi data
        if (!rule.penyakit || !rule.gejala || !Array.isArray(rule.gejala)) return;

        const pId = rule.penyakit._id.toString();

        if (!diseaseMap[pId]) {
            diseaseMap[pId] = {
                penyakit: rule.penyakit,
                totalGejalaDiSistem: 0,
                gejalaCocok: 0,
            };
        }

        // 2. Loop di dalam array gejala milik rule tersebut
        rule.gejala.forEach((g) => {
            diseaseMap[pId].totalGejalaDiSistem += 1;

            // Cek apakah ID gejala ini ada dalam jawaban user
            if (selectedGejalaIds.includes(g._id.toString())) {
                diseaseMap[pId].gejalaCocok += 1;
            }
        });
    });

    // 3. Kalkulasi hasil akhir
    const finalResults = Object.values(diseaseMap)
        .map((item) => {
            const percentage = (item.gejalaCocok / item.totalGejalaDiSistem) * 100;
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
