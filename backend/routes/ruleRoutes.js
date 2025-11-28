import express from 'express';
import { getRules, createRule, getRuleById, updateRule, deleteRule } from '../controllers/ruleController.js'; // Asumsi Anda sudah melengkapi fungsi CRUD di Controller

const router = express.Router();

router.route('/').get(getRules).post(createRule); 
router.route('/:id').get(getRuleById).put(updateRule).delete(deleteRule); 

export default router;