import express from 'express';
import { diagnose } from '../controllers/diagnoseController.js';

const router = express.Router();

router.post('/', diagnose);

export default router;