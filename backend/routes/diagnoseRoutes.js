import express from 'express';
import { runDiagnose } from '../controllers/diagnoseController.js';

const router = express.Router();

// Rute untuk menjalankan diagnosa
router.post('/', runDiagnose); 

export default router;