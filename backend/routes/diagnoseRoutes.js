// backend/routes/diagnoseRoutes.js
import express from 'express';
const router = express.Router();
import { diagnose } from '../controllers/diagnoseController.js';

router.route('/').post(diagnose);

export default router;