import express from "express";
import { getRules, createRule, getRuleById, updateRule, deleteRule, deleteAllRule } from "../controllers/ruleController.js"; // Asumsi Anda sudah melengkapi fungsi CRUD di Controller
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getRules).post(protect, admin, createRule).delete(protect, admin, deleteAllRule);

router.route("/:id").get(getRuleById).put(protect, admin, updateRule).delete(protect, admin, deleteRule);

export default router;
