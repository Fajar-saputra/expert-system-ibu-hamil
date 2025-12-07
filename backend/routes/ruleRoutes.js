import express from 'express';
import { getRules, createRule, getRuleById, updateRule, deleteRule, deleteAllRule } from '../controllers/ruleController.js'; // Asumsi Anda sudah melengkapi fungsi CRUD di Controller
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getRules).post(createRule); 
router.route('/:id').get(getRuleById).put(updateRule).delete(deleteRule); 

router.route('/')
    .get(protect, admin, getRules) // Admin harus login untuk melihat Rules
    .post(protect, admin, createRule) // Admin harus login untuk membuat Rule
    .delete(protect, admin, deleteAllRule);

router.route('/:id')
    .get(protect, admin, getRuleById) // Admin harus login untuk melihat detail
    .put(protect, admin, updateRule)
    .delete(protect, admin, deleteRule);

export default router;