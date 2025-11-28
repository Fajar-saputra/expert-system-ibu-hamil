// backend/controllers/gejalaController.js

import asyncHandler from 'express-async-handler';
import Gejala from '../models/Gejala.js'; // Import Model Gejala

// @desc    Get all gejala
// @route   GET /api/gejala
// @access  Private/Admin
const getGejala = asyncHandler(async (req, res) => {
  const gejala = await Gejala.find({});
  res.status(200).json(gejala);
});

// @desc    Set new gejala (Create)
// @route   POST /api/gejala
// @access  Private/Admin
const setGejala = asyncHandler(async (req, res) => {
  const { kode, nama, pertanyaan_diagnosa } = req.body;

  if (!kode || !nama || !pertanyaan_diagnosa) {
    res.status(400);
    throw new Error('Harap lengkapi semua field: Kode, Nama, dan Pertanyaan Diagnosa.');
  }

  // Cek apakah kode sudah ada
  const kodeExists = await Gejala.findOne({ kode });
  if (kodeExists) {
    res.status(400);
    throw new Error('Kode gejala sudah digunakan.');
  }

  const gejala = await Gejala.create({
    kode,
    nama,
    pertanyaan_diagnosa,
  });

  res.status(201).json(gejala);
});

// @desc    Update gejala
// @route   PUT /api/gejala/:id
// @access  Private/Admin
const updateGejala = asyncHandler(async (req, res) => {
  const gejala = await Gejala.findById(req.params.id);

  if (!gejala) {
    res.status(404);
    throw new Error('Gejala tidak ditemukan.');
  }

  // Jika kode diubah, pastikan kode baru belum ada (kecuali kode milik item ini sendiri)
  if (req.body.kode && req.body.kode !== gejala.kode) {
    const kodeExists = await Gejala.findOne({ kode: req.body.kode });
    if (kodeExists) {
        res.status(400);
        throw new Error('Kode gejala baru sudah digunakan oleh item lain.');
    }
  }

  const updatedGejala = await Gejala.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGejala);
});

// @desc    Delete gejala
// @route   DELETE /api/gejala/:id
// @access  Private/Admin
const deleteGejala = asyncHandler(async (req, res) => {
  const gejala = await Gejala.findById(req.params.id);

  if (!gejala) {
    res.status(404);
    throw new Error('Gejala tidak ditemukan.');
  }

  await Gejala.deleteOne({ _id: req.params.id });

  res.status(200).json({ id: req.params.id, message: 'Gejala berhasil dihapus.' });
});

export { getGejala, setGejala, updateGejala, deleteGejala };