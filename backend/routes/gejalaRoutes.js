import express from 'express';
import { getGejala, createGejala, getGejalaById, updateGejala, deleteGejala } from '../controllers/gejalaController.js'; 

const router = express.Router();

router.route('/').get(getGejala).post(createGejala); 
router.route('/:id').get(getGejalaById).put(updateGejala).delete(deleteGejala); 

export default router;